const dotenv = require('dotenv').config();

module.exports = {
    iam_access_id: process.env.IAM_ACCESS_ID,
    iam_secret: process.env.IAM_SECRET,
    img_url : process.env.AWS_URL,
    bucket_name: process.env.BUCKET_NAME,
}