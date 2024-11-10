import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { IUserPasswordInput } from '../../../plugins/contracts';

/**
 * User password input DTO validation
 */
export class UserPasswordDTO implements IUserPasswordInput {

    @ApiProperty({ type: () => String })
    @IsNotEmpty()
    readonly password: string;
}
