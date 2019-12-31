let aws = require('aws-sdk');
var multer = require('multer');
var multerS3 = require('multer-s3');
var express = require('express');
require('dotenv').config(); // so you can get your env file

aws.config.update({
    region: 'us-west-2',
    accessKeyId: process.env.AWSAccessKeyId,
    secretAccessKey: process.env.AWSSecretKey
})

let s3 = aws.S3({apiVersion: '2006-03-01'});

var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.S3_BUCKET,
        metadata: function(req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function(req, file, cb) {
            cb(null, Date.now().toString());
        }
    })
})

app.post('/upload', upload.array('photos', 3), function(req, res, next) {
    res.send('Successfully uploaded ' + req.files.length + ' files.');
})