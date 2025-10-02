import { ConflictException } from "../../../shared/utils/exceptions";
import { UserRepository } from "../../../user/intraestructure/persistence/user.repository";
import { VehiclesRepository } from "../../../vehicles/infraestructure/persitence/vehicles.repository";
import { DatesRepository } from "../../infraestructure/persistence/dates.repository.entity";
import { CreateDateDto } from "../dto/dates.dto";

export class CreateDateUseCase {

    static async execute(dto: CreateDateDto) {

        const user = await UserRepository.findById(dto.userId);

        if(!user)
            throw new ConflictException('User does not exist');

        const vehicle = await VehiclesRepository.findById(dto.vehicleId);

        if(!vehicle)
            throw new ConflictException('Vehicle does not exist');

        const existingDate = await DatesRepository.findDatesByDate(new Date(dto.date), 29);

        if(existingDate.length) {
            throw new ConflictException('Date already exists within the specified range of minutes');
        }

        return await DatesRepository.save(dto, user, vehicle);
    }

}