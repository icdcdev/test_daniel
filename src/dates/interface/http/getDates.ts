import { Context } from 'vm';
import Response from '../../../shared/utils/response';
import { APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda';
import { CustomException } from '../../../shared/utils/exceptions';
import { FindDatesByDateUseCase } from '../../application/usecases/find.usecase';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, context: Context) => {

    try {
        
        const date = event.queryStringParameters?.date;

        if(!date || isNaN(Date.parse(date))) {
            return Response.BadRequest('date query parameter is required and must be a valid date');
        }

        const response = await FindDatesByDateUseCase.execute(new Date(date));

        return Response.Ok(response);
    }
    catch (error) {
        
        if(error instanceof CustomException) {
            return Response.ResponseException(error.status, { message: error.message });
        }

        return Response.InternalServerError({ message: error.message });
    }
};