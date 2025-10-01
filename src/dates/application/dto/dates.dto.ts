import { IsDateString, IsNumber, IsString } from "class-validator";


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