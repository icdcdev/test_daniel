import { Context } from 'vm';
import Response from '../../../shared/utils/response';
import { APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda';
import { CustomException } from '../../../shared/utils/exceptions';
import { validateDto } from '../../../shared/utils/validateDto';
import { CreateUserDto } from '../../application/dto/user.dto';
import { CreateUserUseCase } from '../../application/use-cases/create.usecase';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, context: Context) => {

    try {
        if(!event.body) {
            return Response.BadRequest({message: 'Bad Request: Body is required'});
        }
        
        const body = JSON.parse(event.body);

        const dto = await validateDto(CreateUserDto, body)

        const response = await CreateUserUseCase.execute(dto);

        return Response.Ok(response);
    }
    catch (error) {
        
        if(error instanceof CustomException) {
            return Response.ResponseException(error.status, { message: error.message });
        }

        return Response.InternalServerError({ message: error.message });
    }
};