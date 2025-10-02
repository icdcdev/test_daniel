import { getConnection } from "../../../shared/db/connection";
import { UserEntity } from "../../../user/domain/entities/user.entity";
import { CreateVehicleDto } from "../../application/dto/vehicle.dto";
import { VehicleEntity } from "../../domain/entities/vechile.entity";

export class VehiclesRepository {

    static async findById(id: number) : Promise<VehicleEntity | null> {

        await getConnection();

        return await VehicleEntity.findOneBy({ id });
    }

    static async save(dto: CreateVehicleDto, user: UserEntity) : Promise<VehicleEntity> {

        await getConnection();

        const vehicle = new VehicleEntity();
        vehicle.vin = dto.vin;
        vehicle.year = dto.year;
        vehicle.model = dto.model;
        vehicle.plates = dto.plates;
        vehicle.color = dto.color;
        vehicle.owner = user;

        const savedVehicle = await VehicleEntity.save(vehicle);

        delete savedVehicle.owner.password;
        
        return savedVehicle;

    }

    static async findByVin(vin: string) : Promise<VehicleEntity | null> {
        await getConnection();
        return await VehicleEntity.findOneBy({ vin });
    }

    static async findByPlates(plates: string) : Promise<VehicleEntity | null> {
        await getConnection();
        return await VehicleEntity.findOneBy({ plates });
    }

}