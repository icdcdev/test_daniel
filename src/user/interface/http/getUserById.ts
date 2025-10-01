import { Context } from 'vm';
import Response from '../../../shared/utils/response';
import { APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda';
import { CustomException } from '../../../shared/utils/exceptions';
import { FindUserByIdUseCase } from '../../application/use-cases/findById.usecase';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, context: Context) => {

    try {

        const userId = event.pathParameters?.id;

        if (!userId) {
            return Response.BadRequest({ message: 'Bad Request: User ID is required' });
        }

        const response = await FindUserByIdUseCase.execute(Number(userId));

        return Response.Ok(response);
    }
    catch (error) {
        
        if(error instanceof CustomException) {
            return Response.ResponseException(error.status, { message: error.message });
        }

        return Response.InternalServerError({ message: error.message });
    }
};