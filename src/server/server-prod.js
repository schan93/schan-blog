require('dotenv').config();

import express from 'express';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import session from 'express-session';
import ExpressOIDC from '@okta/oidc-middleware';

import Sequelize from 'sequelize';
import epilogue from 'epilogue';
// ForbiddenError = epilogue.Errors.ForbiddenError;

const app = express(),
            DIST_DIR = __dirname,
            HTML_FILE = path.join(DIST_DIR, 'index.html')

app.use(express.static(DIST_DIR));

app.get('*', (req, res) => {
    res.sendFile(HTML_FILE)
})
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`)
    console.log('Press Ctrl+C to quit.')
})

// const port = 8080;



// // create a user session based on the information passed below
// app.use(session({
//     secret: process.env.RANDOM_SECRET_WORD,
//     resave : true,
//     saveUninitialized: false
// }));

// // setup open id connect against OKTA for authentication 
// const oidc = new ExpressOIDC({
//     appBaseUrl: 'http://localhost:8080',
//     issuer: `${process.env.OKTA_ORG_URL}/oauth2/default`,
//     client_id: process.env.OKTA_CLIENT_ID,
//     client_secret: process.env.OKTA_CLIENT_SECRET,
//     scope: 'openid profile',
//     routes: {
//         loginCallback: {
//             afterCallback: '/admin'
//         }
//     }
// });

// // attach handlers for login / authentication
// app.use(oidc.router);
// app.use(cors());
// app.use(bodyParser.json());

// app.get('/home', (req, res) => {
//     res.send('<h1>Welcome!</h1></div><a href="/login">Login</a>');
// })

// app.get('/admin', oidc.ensureAuthenticated(), (req, res) => {
//     res.send('Admin page');
// })

// app.get('/', (req, res) => {
//     res.redirect('/home');
// })

// app.get('/logout', (req, res) => {
//     req.logout();
//     res.redirect('/home');
// });

// const database = new Sequelize({
//     dialect: 'sqlite',
//     storage: './db.sqlite',
//     operatorsAliases: false
// });

// const Post = database.define('posts', {
//     title: Sequelize.STRING,
//     content: Sequelize.TEXT
// })



// // const PostResource = epilogue.resource({
// //     model: Post,
// //     endpoints: ['/posts', '/posts/:id'],
// // });

// // PostResource.all.auth((res, req, context) => {
// //     return new Promise((resolve, reject) => {
// //         if(!req.isAuthenticated()) {
// //             res.status(401).send({message: "Unauthorized"});
// //             resolve(context.stop);
// //         } else {
// //             resolve(context.continue);
// //         }
// //     });
// // });

// database.sync().then(() => {
//     oidc.on('ready', () => {
//         app.listen(port, () => console.log(`Blog app listening on port ${port}`))
//     })
// });

// oidc.on('error', err => {
//     console.log("oidc error: ", err);
// });