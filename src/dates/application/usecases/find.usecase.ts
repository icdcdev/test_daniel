import { DatesRepository } from "../../infraestructure/persistence/dates.repository.entity";

export class FindDatesByDateUseCase {

    static async execute(date: Date) {
        return await DatesRepository.findDatesByDate(date);
    }
    
}