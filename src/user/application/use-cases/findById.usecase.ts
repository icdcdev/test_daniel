import { NotFoundException } from "../../../shared/utils/exceptions";
import { UserMapper } from "../../intraestructure/mapper/user.mapper";
import { UserRepository } from "../../intraestructure/persistence/user.repository";

export class FindUserByIdUseCase {
    static async execute(id: number) {

        const user = await UserRepository.findById(id);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return UserMapper.toUserVO(user);
    }
}