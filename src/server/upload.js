const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const { uuid } = require('uuidv4');

aws.config.update({
    region: process.env.AWSRegion,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    signatureVersion: 'v4'
});

let s3 = new aws.S3({apiVersion: '2006-03-01'});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWSBucket,
        key: (req, file, cb) => { 
            req.body.id = uuid();
            cb(null, req.body.id + '_' + file.originalname);
        }
    })
}).single('file');

module.exports = {
    create: {
        write: {
            before: (req, res, context) => {
                upload(req, res, () => {
                    req.body.img = req.file.location;
                    return context.continue(req.body);
                })
            }
        }
    }
}