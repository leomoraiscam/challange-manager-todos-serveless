import { APIGatewayProxyHandler } from "aws-lambda";
import { v4 as uuidv4 } from 'uuid';
import { document } from '../utils/dynamodbClient'
 
export const handle: APIGatewayProxyHandler = async (event) => {
  const { title, deadline } = JSON.parse(event.body);
  const { user_id } = event.pathParameters

  await document.put({
    TableName: 'todos',
    Item: {
      id: uuidv4(),
      user_id,
      title,
      done: false,
      deadline: new Date(deadline)
    }
  }).promise()


  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Todo created with successfully for user!"
    }),
    headers: {
      "Content-Type": "application/json"
    }
  }
}