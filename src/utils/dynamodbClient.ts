import { DynamoDB } from 'aws-sdk';

const devOption = {
  region: process.env.AWS_REGION,
  endpoint:  process.env.AWS_DB_URL
}

const options = {
  region: 'localhost',
  endpoint: 'http://localhost:8000'
}

const isOffline = () => {
  return process.env.IS_OFFLINE
}

export const document = isOffline() ? 
  new DynamoDB.DocumentClient(options) : 
  new DynamoDB.DocumentClient(devOption)
