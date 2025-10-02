import { getConnection } from "../../../shared/db/connection";
import { UserEntity } from "../../../user/domain/entities/user.entity";
import { VehicleEntity } from "../../../vehicles/domain/entities/vechile.entity";
import { CreateDateDto } from "../../application/dto/dates.dto";
import { DatesEntity, DateStatusEnum } from "../../domain/entities/dates.entity";
import { DateTime } from "luxon";

export class DatesRepository {

    static async save(dto: CreateDateDto, user: UserEntity, vehicle: VehicleEntity) : Promise<DatesEntity> {
        await getConnection();

        const date = new DatesEntity();
        const userTimezone = user.timezone || 'UTC';
        const dateInUserTz = DateTime.fromISO(dto.date, { zone: 'utc' })
            .setZone(userTimezone)
            .toJSDate();
        date.date = dateInUserTz;
        date.comments = dto.comments;
        date.user = user;
        date.vehicle = vehicle;

        await date.save();

        delete date.user.password;

        return date;
    }

    static async findDatesByDate(date: Date, minutes?: number) : Promise<DatesEntity[]> {
        await getConnection();


        let startOfDay: Date;
        let endOfDay: Date;

        if(!minutes) {
            startOfDay = new Date(date);
            startOfDay.setHours(0, 0, 0, 0);
            endOfDay = new Date(date);
            endOfDay.setHours(23, 59, 59, 999);
        }else {
            const dateTime = DateTime.fromJSDate(date);
            startOfDay = dateTime.minus({ minutes }).toJSDate();
            endOfDay = dateTime.plus({ minutes }).toJSDate();
        }

        const qb = DatesEntity.createQueryBuilder('dates')
            .where('dates.date BETWEEN :startOfDay AND :endOfDay', { startOfDay, endOfDay })
            .leftJoinAndSelect('dates.user', 'user')

        if(minutes) {
            qb.andWhere('dates.status = :status', { status: DateStatusEnum.ENABLED });
        }

        qb.orderBy('dates.date', 'ASC');

        
        return await qb.getMany();
    }

    static async findDates(date: Date) : Promise<DatesEntity[]> {
        const startOfDay: Date = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay: Date = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        await getConnection();

        const qb =  DatesEntity.createQueryBuilder('dates')
            .where('dates.date BETWEEN :startOfDay AND :endOfDay', { startOfDay, endOfDay })
            .leftJoinAndSelect('dates.user', 'user')
            .orderBy('dates.date', 'ASC');
        
        return await qb.getMany();
    }


    static async findById(id: number) : Promise<DatesEntity | null> {
        await getConnection();
        return await DatesEntity.findOne({ where: { id }, relations: ['user'] });
    }

    static async updateDate(date: DatesEntity) : Promise<DatesEntity | null> {
        await getConnection();

        await DatesEntity.update(date.id, { ...date });

        return await DatesEntity.findOne({ where: { id: date.id } });
    }

}