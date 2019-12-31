const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const finale = require('finale-rest');
const app = express();
const aws = require('aws-sdk');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const fs = require('fs');

app.use(cors());
aws.config.update({
    region: process.env.AWSRegion,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    signatureVersion: 'v4'
});

let s3 = new aws.S3({apiVersion: '2006-03-01'});

const port = 8080;

app.use(bodyParser.json());
const distPath = express.static(path.join(__dirname, 'dist'));
app.use(distPath);

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

app.use('/s3', require('react-s3-uploader/s3router')({
    bucket: process.env.AWSBucket,
    signatureExpires: 300,
    headers: {'Access-Control-Allow-Origin': '*', 'x-amz-acl': 'public-read'}
}));

app.post('/api/image/upload', (req, res) => {
    const fileContent = fs.readFileSync(process.env.UPLOAD_FILE_PATH + req.body.imageName);
    const params = {
        Bucket: 'schan-blog-img-bucket',
        Key: req.body.postId + '_' + req.body.imageName,
        Body: fileContent
    }

    s3.upload(params, (err, data) => {
        if(err) {
            console.log("Err: ", err);
        } else {
            console.log("returning data from upload: ", data);
            res.send({data: data});
        }
    })
});

app.get('/api/image/:imageId', (req, res, next) => {
    const params = {
        Bucket: 'schan-blog-img-bucket',
        Key: req.params.imageId
    }

    s3.getSignedUrl('getObject', params, (err, url) => {
        if(err) {
            console.log("Err: ", err);
        } else {
            res.send({signedUrl: url});
        }
    })
});

app.get('/api/images', (req, res) => {
    let params = {Bucket: 'schan-blog-img-bucket'};
    s3.listObjectsV2(params, (err, data) => {
        if(err) {
            console.log("Err: ", err);
        } else {
            console.log("Url: ", data);
            res.send({posts: data.Contents});
        }
    });
})

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../dist/index.html'), (err) => {
        if(err) {
            res.status(500).send(err);
        }
    });
});


database.sync().then(() => {
    app.listen(port, () => console.log(`Blog app listening on port ${port}`))
});
