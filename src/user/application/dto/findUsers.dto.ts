import { IsNumberString, IsOptional } from "class-validator";

export class FindUsersDto {

    @IsOptional()
    q?: string;

    @IsOptional()
    @IsNumberString()
    page?: number;

    @IsOptional()
    @IsNumberString()
    limit?: number;
}