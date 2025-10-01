import { Context } from 'vm';
import Response from '../../../shared/utils/response';
import { APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda';
import { CustomException } from '../../../shared/utils/exceptions';
import { validateDto } from '../../../shared/utils/validateDto';
import { FindUsersDto } from '../../application/dto/findUsers.dto';
import { FindUsersUseCase } from '../../application/use-cases/findUsers.usecase';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, context: Context) => {

    try {

        const q = event.queryStringParameters?.q;
        const limit = event.queryStringParameters?.limit ? Number(event.queryStringParameters.limit) : undefined;
        const page = event.queryStringParameters?.page ? Number(event.queryStringParameters.page) : undefined;

        const dto = await validateDto(FindUsersDto, { q, limit, page });

        const response = await FindUsersUseCase.execute(dto);

        return Response.Ok(response);
    }
    catch (error) {
        
        if(error instanceof CustomException) {
            return Response.ResponseException(error.status, { message: error.message });
        }

        return Response.InternalServerError({ message: error.message });
    }
};