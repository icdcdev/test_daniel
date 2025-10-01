import { IsEmail, IsEnum, IsString } from "class-validator";
import { UserRoleEnum } from "../../domain/entities/user.entity";

export class CreateUserDto {

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    name: string;

    @IsString()
    lastName: string;

    @IsEnum(UserRoleEnum)
    role: UserRoleEnum;

}