import { CognitoService } from "../../../auth/domain/services/Cognito.service";
import { ConflictException } from "../../../shared/utils/exceptions";
import { UserRoleEnum } from "../../domain/entities/user.entity";
import { UserVO } from "../../domain/vo/user.vo";
import { UserMapper } from "../../intraestructure/mapper/user.mapper";
import { UserRepository } from "../../intraestructure/persistence/user.repository";
import { CreateUserDto } from "../dto/user.dto";

export class CreateUserUseCase {

    static async execute(dto: CreateUserDto) : Promise<UserVO> {

        const existsEmail = await UserRepository.findByEmail(dto.email);

        if(existsEmail) {
            throw new ConflictException('Email already exists');
        }
        
        const entity = await UserRepository.save(dto);

        // if(dto.role === UserRoleEnum.ADMIN)
        //     // await CognitoService.createUser(dto);

        return UserMapper.toUserVO(entity);

    }

}