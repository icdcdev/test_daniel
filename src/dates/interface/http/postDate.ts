import { Context } from 'vm';
import Response from '../../../shared/utils/response';
import { APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda';
import { CustomException } from '../../../shared/utils/exceptions';
import { validateDto } from '../../../shared/utils/validateDto';
import { CreateDateDto } from '../../application/dto/dates.dto';
import { CreateDateUseCase } from '../../application/usecases/create.usecase';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, context: Context) => {

    try {
        if(!event.body) {
            return Response.BadRequest({message: 'Bad Request: Body is required'});
        }
        
        const body = JSON.parse(event.body);

        const dto = await validateDto(CreateDateDto, body)

        const response = await CreateDateUseCase.execute(dto);

        return Response.Created(response);
    }
    catch (error) {
        
        if(error instanceof CustomException) {
            return Response.ResponseException(error.status, { message: error.message });
        }

        return Response.InternalServerError({ message: error.message });
    }
};