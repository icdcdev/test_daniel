import { CognitoService } from "../../domain/services/Cognito.service";
import { LoginVO } from "../../domain/vo/login.vo";
import { LoginDto } from "../dto/login.dto";

export class LoginUseCase {
    
    static async execute(dto: LoginDto) : Promise<LoginVO> {

        // const result = await CognitoService.authenticateUser(dto);
        // return result;

        return {
            token: "dummy-token",
            type: "Bearer",
            expiresIn: 3600
        }

    }

}