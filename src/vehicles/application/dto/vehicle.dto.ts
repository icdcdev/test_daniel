import { IsNumber, IsString } from "class-validator";

export class CreateVehicleDto {

    @IsString()
    vin: string;
    
    @IsString()
    year: string;

    @IsString()
    model: string;

    @IsString()
    plates: string;

    @IsString()
    color: string;

    @IsNumber()
    ownerId: number;

}