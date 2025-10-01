import { HttpStatusEnum } from "./response";

export class CustomException extends Error {
    public status = null;
    public message = null;
    constructor(){
        super();
    }
}

export class BadRequestException extends CustomException {
    constructor(message: string = 'Bad Request') {
        super();
        this.status = HttpStatusEnum.BAD_REQUEST;
        this.message = message;
    }
}

export class InternalServerErrorException extends CustomException {
    constructor(message: string = 'Internal Server Error') {
        super();
        this.status = HttpStatusEnum.INTERNAL_ERROR_SERVER;
        this.message = message;
    }
}

export class UnauthorizedException extends CustomException {
    constructor(message: string = 'Unauthorized') {
        super();
        this.status = HttpStatusEnum.UNAUTHORIZED;
        this.message = message;
    }
}

export class NotFoundException extends CustomException {
    constructor(message: string = 'Not Found') {
        super();
        this.status = HttpStatusEnum.NOT_FOUND;
        this.message = message;
    }
}

export class ConflictException extends CustomException {
    constructor(message: string = 'Conflict') {
        super();
        this.status = HttpStatusEnum.CONFLICT;
        this.message = message;
    }
}