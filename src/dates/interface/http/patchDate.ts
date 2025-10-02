import { Context } from 'vm';
import Response from '../../../shared/utils/response';
import { APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda';
import { CustomException } from '../../../shared/utils/exceptions';
import { validateDto } from '../../../shared/utils/validateDto';
import { UpdateDateDto } from '../../application/dto/dates.dto';
import { UpdateDateUseCase } from '../../application/usecases/update.usecase';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, context: Context) => {

    try {
        if(!event.body) {
            return Response.BadRequest({message: 'Bad Request: Body is required'});
        }

        const id = event.pathParameters?.id;

        if(!id) {
            return Response.BadRequest('Id is required');
        }
        
        const body = JSON.parse(event.body);

        const dto = await validateDto(UpdateDateDto, body)

        const response = await UpdateDateUseCase.execute(+id, dto);

        return Response.Ok(response);
    }
    catch (error) {
        
        if(error instanceof CustomException) {
            return Response.ResponseException(error.status, { message: error.message });
        }

        return Response.InternalServerError({ message: error.message });
    }
};