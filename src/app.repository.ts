import * as AWS from 'aws-sdk';
import { InternalServerErrorException } from '@nestjs/common';

AWS.config.update({
    region: 'ap-northeast-1',
});

export class AppRepository {
    // private tableName = process.env.USER_TABLE_NAME;
    private tableName = 'SandBox';

    async createUser(user): Promise<AWS.DynamoDB.DocumentClient.PutItemOutput> {
        const params: AWS.DynamoDB.DocumentClient.PutItemInput = {
            TableName: this.tableName,
            Item: {
                name: user.name,
                ID: user.ID,
            }
        }

        try {
            return await new AWS.DynamoDB.DocumentClient()
                .put(params)
                .promise();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async updateUser(user): Promise<AWS.DynamoDB.DocumentClient.UpdateItemOutput> {
        const params: AWS.DynamoDB.DocumentClient.UpdateItemInput = {
            TableName: this.tableName,
            Key: {
                name: user.name,
            },
            UpdateExpression: 'set ID = :i',
            ExpressionAttributeValues: {
                ':i': user.ID,
            },
            ReturnValues: 'UPDATED_NEW',
        }

        try {
            return await new AWS.DynamoDB.DocumentClient()
                .update(params)
                .promise();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async deleteUser(user): Promise<AWS.DynamoDB.DocumentClient.DeleteItemOutput> {
        const params: AWS.DynamoDB.DocumentClient.DeleteItemInput = {
            TableName: this.tableName,
            Key: {
                name: user.name,
            },
        }

        try {
            return await new AWS.DynamoDB.DocumentClient()
                .delete(params)
                .promise();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async getUsers(): Promise<AWS.DynamoDB.DocumentClient.ScanOutput> {
        return await new AWS.DynamoDB.DocumentClient()
            .scan({
                TableName: this.tableName,
            })
            .promise();
    }
}