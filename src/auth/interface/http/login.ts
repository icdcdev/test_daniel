import Response from '../../../shared/utils/response';
import { APIGatewayProxyHandler, APIGatewayProxyEvent, Context } from 'aws-lambda';
import { CustomException } from '../../../shared/utils/exceptions';
import { validateDto } from '../../../shared/utils/validateDto';
import { LoginDto } from '../../application/dto/login.dto';
import { LoginUseCase } from '../../application/use-cases/login.usecase';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, context: Context) => {

    try {
        if(!event.body) {
            return Response.BadRequest({message: 'Bad Request: Body is required'});
        }
        
        const body = JSON.parse(event.body);

        const dto = await validateDto(LoginDto, body)

        const response = await LoginUseCase.execute(dto);

        return Response.Ok(response);
    }
    catch (error) {
        
        if(error instanceof CustomException) {
            return Response.ResponseException(error.status, { message: error.message });
        }

        return Response.InternalServerError({ message: error.message });
    }
};