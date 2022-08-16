// 공식 Doc
const { DynamoDB } = require('aws-sdk')

// 로컬 DynamoDB 사용
const awsConfig = {
    region: 'ap-northeast-2',
    endpoint: "http://localhost:8000"
}

const docClient = new DynamoDB(awsConfig);
module.exports = docClient