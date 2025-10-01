export const enum HttpStatusEnum {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
    CONFLICT = 409,
    INTERNAL_ERROR_SERVER = 500
}


export default class Response {

    static Ok(data: any = {}, headers?: any) {
        return  this.parser(HttpStatusEnum.OK,data, headers)
    }
    
    static Created(data?: any, headers?: any) {
        return this.parser(HttpStatusEnum.CREATED, data, headers);
    }
    
    static NoContent() {
        return this.parser(HttpStatusEnum.NO_CONTENT);
    }

    static BadRequest(data?: any, headers?: any) {
        return this.parser(HttpStatusEnum.BAD_REQUEST, data, headers);
    }

    static InternalServerError(data?: any, headers?: any) {
        return this.parser(HttpStatusEnum.INTERNAL_ERROR_SERVER, data, headers);
    }

    static ResponseException(status: HttpStatusEnum, data?: any, headers?: any) {
        return this.parser(status, data, headers);
    }

    static parser(statusCode: number, data?: any, headers?: any) {
        data = data || {};
        headers =  headers || {};
        headers = {
            'Content-Type': 'application/json',
            ...headers
        };
        return {statusCode, headers, body: JSON.stringify(data)};
    }
}