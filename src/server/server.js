const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const finale = require('finale-rest');
const app = express();
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const uploadMiddleware = require('./upload');

app.use(cors());
app.use(bodyParser.json());
// serve static files of our react app
app.use(express.static(path.join(__dirname, '../../dist')));


const port = 8080;

// configure the jwt
const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
      // Validate the audience and the issuer.
  audience: process.env.REACT_APP_AUTH0_CLIENT_ID,
  issuer: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
});

// create a post with the SQLite database
const database = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite'
});

// define the model for the Posts data model
const Post = database.define('posts', {
    title: Sequelize.STRING,
    content: Sequelize.TEXT,
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    type: Sequelize.STRING,
    postDate: Sequelize.STRING,
    // img will just be a reference url to the actual post
    img: Sequelize.STRING
});

// Post.drop().then(() => {
//     console.log("Posts table dropped");
// })

// initialize the rdatabase with our app & database we setup
finale.initialize({ app, sequelize: database });

// create a rest endpoint, namely posts and posts/:id for POST, GET, DELETE, UPDATE
const PostResource = finale.resource({
    model: Post,
    endpoints: ['/api/posts', '/api/posts/:id'],
    sort: {
        param: 'orderby',
        attributes: ['createdAt']
    }
});

PostResource.create.auth((req, res, context) => {
    return new Promise((resolve) => {
        checkJwt(req, res, (arg) => {
            if(arg) {
                res.status(401).send({message: "Unauthorized"});
                resolve(context.stop);
            } else {
                resolve(context.continue);
            }
        });
    })
});

PostResource.use(uploadMiddleware);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'), (err) => {
        if(err) {
            res.status(500).send(err);
        }
    });
});

database.sync().then(() => {
    app.listen(port, () => console.log(`Blog app listening on port ${port}`))
});
