import { APIGatewayProxyHandler } from "aws-lambda";
import { v4 as uuidv4 } from 'uuid';
import { document } from '../utils/dynamodbClient'
import { hash } from 'bcryptjs';
 
export const handle: APIGatewayProxyHandler = async (event) => {
  const { username, password } = JSON.parse(event.body);

  const response = await document.scan({
    TableName: 'users',
    ProjectionExpression: 'username, id'
  }).promise();

  const [ userAlreadyExist ] = await response.Items.map((user) => user.username === username);

  if (userAlreadyExist) {
    return {
      statusCode: 409,
      body: JSON.stringify({
        error: "User Already Exists!"
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }
  }

  const hashedPassword = await hash(password, 8);

  await document.put({
    TableName: 'users',
    Item: {
      id: uuidv4(),
      username,
      password: hashedPassword
    }
  }).promise()


  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "User created successfully!"
    }),
    headers: {
      "Content-Type": "application/json"
    }
  }
}