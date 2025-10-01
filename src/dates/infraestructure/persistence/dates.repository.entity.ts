import { getConnection } from "../../../shared/db/connection";
import { UserEntity } from "../../../user/domain/entities/user.entity";
import { CreateDateDto } from "../../application/dto/dates.dto";
import { DatesEntity, DateStatusEnum } from "../../domain/entities/dates.entity";
import { DateTime } from "luxon";

export class DatesRepository {

    static async save(dto: CreateDateDto, user: UserEntity) : Promise<DatesEntity> {
        await getConnection();

        const date = new DatesEntity();
        const userTimezone = user.timezone || 'UTC';
        const dateInUserTz = DateTime.fromISO(dto.date, { zone: 'utc' })
            .setZone(userTimezone)
            .toJSDate();
        date.date = dateInUserTz;
        date.comments = dto.comments;
        date.user = user;

        await date.save();

        return date;
    }

    static async findDatesByDate(date: Date, hoursRange?: number) : Promise<DatesEntity[]> {
        await getConnection();


        let startOfDay: Date;
        let endOfDay: Date;

        if(!hoursRange) {
            startOfDay = new Date(date);
            startOfDay.setHours(0, 0, 0, 0);
            endOfDay = new Date(date);
            endOfDay.setHours(23, 59, 59, 999);
        }else {
            const dateTime = DateTime.fromJSDate(date);
            startOfDay = dateTime.minus({ hours: hoursRange }).toJSDate();
            endOfDay = dateTime.plus({ hours: hoursRange }).toJSDate();
        }

        const qb = DatesEntity.createQueryBuilder('dates')
            .where('dates.date BETWEEN :startOfDay AND :endOfDay', { startOfDay, endOfDay })
            .leftJoinAndSelect('dates.user', 'user')

        if(hoursRange) {
            qb.andWhere('dates.status = :status', { status: DateStatusEnum.ENABLED });
        }

        
        return await qb.getMany();
    }


}