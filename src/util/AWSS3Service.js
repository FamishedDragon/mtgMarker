import AWS from 'aws-sdk';

export const s3 = new AWS.S3({
    region: 'us-east-1',
    accessKeyId: '',
    secretAccessKey: '',
    apiVersion: '2006-03-01',
    params: { Bucket: 'holdme' }
});

export const s3GetObject = (prefix, callback) => {
    if(typeof callback != 'function') {
        console.warn('error: callback must be a function')
    }
    s3.listObjectsV2({ Prefix: prefix, },  callback)
}

export const s3GetObjectByPage = (prefix, callback) => {
    s3.listObjects({ Prefix: prefix}).eachPage(callback);
}