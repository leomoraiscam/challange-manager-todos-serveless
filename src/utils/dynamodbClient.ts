import { DynamoDB } from 'aws-sdk';

const devOption = {
  region: `us-east-1`,
  endpoint: `https://dynamodb.us-east-1.amazonaws.com/`
}

const options = {
  region: 'localhost',
  endpoint: 'http://localhost:8000'
}

const isOffline = () => {
  return false
}

export const document = isOffline() ? 
  new DynamoDB.DocumentClient(options) : 
  new DynamoDB.DocumentClient(devOption)
