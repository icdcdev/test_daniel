import * as bcrypt from "bcryptjs";
import { getConnection } from "../../../shared/db/connection";
import { CreateUserDto } from "../../application/dto/user.dto";
import { UserEntity } from "../../domain/entities/user.entity";
import { FindUsersDto } from "../../application/dto/findUsers.dto";

export class UserRepository {

    static async save(dto: CreateUserDto) : Promise<UserEntity> {

        await getConnection();

        const user = new UserEntity();
        user.email = dto.email;
        user.password = await bcrypt.hash(dto.password, 10);
        user.name = dto.name;
        user.lastName = dto.lastName;
        user.role = dto.role;
        user.timezone = dto.timezone;

        return await UserEntity.save(user);

    }

    static async findByEmail(email: string) : Promise<UserEntity> {
        await getConnection();
        return await UserEntity.findOne({ where: { email } });
    }

    static async findById(id: number) : Promise<UserEntity> {
        await getConnection();
        return await UserEntity.findOne({ where: { id } });
    }

    static async find(query: FindUsersDto) : Promise<UserEntity[]> {
        await getConnection();
        const qb = UserEntity.createQueryBuilder('user');

        if (query.q) {
            qb.where('user.name LIKE :name OR user.lastName LIKE :lastName OR user.email LIKE :email', { name: `%${query.q}%`, lastName: `%${query.q}%`, email: `%${query.q}%` });
        }

        if (query.page && query.limit) {
            const page = Number(query.page) || 1;
            const limit = Number(query.limit) || 10;
            const offset = (page - 1) * limit;
            qb.skip(offset).take(limit);
        }

        qb.orderBy('user.name', 'ASC');

        return await qb.getMany();
    }

}