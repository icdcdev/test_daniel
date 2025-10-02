import { NotFoundException } from "../../../shared/utils/exceptions";
import { DatesRepository } from "../../infraestructure/persistence/dates.repository.entity";
import { CreateDateDto, UpdateDateDto } from "../dto/dates.dto";
import { DateTime } from "luxon";

export class UpdateDateUseCase {
  static async execute(id: number, dto: UpdateDateDto) {
    const existingDate = await DatesRepository.findById(id);
    const user = existingDate.user;

    if (!existingDate) {
      throw new NotFoundException("Date not found");
    }

    if (dto.date) {
      const overlappingDates = await DatesRepository.findDatesByDate(
        existingDate.date,
        29
      );

      if (overlappingDates.some((d) => d.id !== id)) {
        throw new NotFoundException(
          "Another date exists within the specified range of minutes"
        );
      }

      const userTimezone = user.timezone || "UTC";
      const dateInUserTz = DateTime.fromISO(dto.date, { zone: "utc" })
        .setZone(userTimezone)
        .toJSDate();
      existingDate.date = dateInUserTz;
    }

    if( dto.comments ) {
        existingDate.comments = dto.comments;
    }

    if(dto.status){
        existingDate.status = dto.status;
    }

    const updatedDate = await DatesRepository.updateDate(existingDate);

    return updatedDate;
  }
}
