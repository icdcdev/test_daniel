import { UserMapper } from "../../intraestructure/mapper/user.mapper";
import { UserRepository } from "../../intraestructure/persistence/user.repository";
import { FindUsersDto } from "../dto/findUsers.dto";

export class FindUsersUseCase {
    static async execute(dto: FindUsersDto)  {
        const users =  await UserRepository.find(dto );

        return users.map(UserMapper.toUserVO);
    }
}