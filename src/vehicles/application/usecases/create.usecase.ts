import { ConflictException, NotFoundException } from "../../../shared/utils/exceptions";
import { UserRepository } from "../../../user/intraestructure/persistence/user.repository";
import { VehicleEntity } from "../../domain/entities/vechile.entity";
import { VehiclesRepository } from "../../infraestructure/persitence/vehicles.repository";
import { CreateVehicleDto } from "../dto/vehicle.dto";

export class CreateVehicleUsecase {

    static async execute(dto: CreateVehicleDto) : Promise<VehicleEntity> {
        const user = await UserRepository.findById(dto.ownerId);

        if (!user) throw new NotFoundException("User not found");


        const vin = await VehiclesRepository.findByVin(dto.vin);

        if (vin) throw new ConflictException("Vin already exists");

        const plates = await VehiclesRepository.findByPlates(dto.plates);

        if (plates) throw new ConflictException("Plates already exists");

        return await VehiclesRepository.save(dto, user);
    }

}