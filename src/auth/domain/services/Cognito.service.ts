import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  InitiateAuthRequest,
  InitiateAuthResponse,
  InternalErrorException,
  SignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { LoginDto } from "../../application/dto/login.dto";
import { LoginVO } from "../vo/login.vo";
import { CreateUserDto } from '../../../user/application/dto/user.dto';
import { InternalServerErrorException } from "../../../shared/utils/exceptions";

const client = new CognitoIdentityProviderClient();
const COGNITO_CLIENT_ID = process.env.COGNITO_CLIENT_ID;

export class CognitoService {
  static async authenticateUser(dto: LoginDto) : Promise<LoginVO> {
    const input: InitiateAuthRequest = {
      ClientId: COGNITO_CLIENT_ID,
      AuthFlow: "USER_PASSWORD_AUTH",
      AuthParameters: {
        USERNAME: dto.email,
        PASSWORD: dto.password,
      },
    };

    const command = new InitiateAuthCommand(input);
    const response: InitiateAuthResponse = await client.send(command);

    if (!response.AuthenticationResult) {
      throw new Error("Invalid credentials");
    }

    return {
      token: response.AuthenticationResult.IdToken,
      type: response.AuthenticationResult.TokenType,
      expiresIn: response.AuthenticationResult.ExpiresIn,
    };
  }

  static async createUser(dto: CreateUserDto): Promise<void> {
    try {
      await client.send(
      new SignUpCommand({
        ClientId: COGNITO_CLIENT_ID,
        Username: dto.email,
        Password: dto.password,
      }),
    );
    } catch (error) {
      throw new InternalServerErrorException('Error creating user in Cognito');
    }
  }
}
