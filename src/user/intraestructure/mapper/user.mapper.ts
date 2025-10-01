import { UserEntity } from "../../domain/entities/user.entity";
import { UserVO } from "../../domain/vo/user.vo";

export class UserMapper {

    static toUserVO(entity: UserEntity) : UserVO{
        const { password , ...user } = entity;
        return user;
    }

}