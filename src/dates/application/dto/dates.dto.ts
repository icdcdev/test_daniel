import { IsDateString, IsEnum, IsNumber, IsString } from "class-validator";
import { IsOptional } from "class-validator";
import { DateStatusEnum } from "../../domain/entities/dates.entity";


export class CreateDateDto {

    @IsDateString()
    date: string;

    @IsString()
    comments: string;

    @IsNumber()
    userId: number;

    @IsNumber()
    vehicleId: number;

}

export class UpdateDateDto {
    @IsOptional()
    @IsDateString()
    date?: string;

    @IsOptional()
    @IsString()
    comments?: string;

    @IsOptional()
    @IsEnum(DateStatusEnum)
    status?: DateStatusEnum;
}