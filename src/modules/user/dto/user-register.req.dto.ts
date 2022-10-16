import { IsEmail, IsNotEmpty, Length, Matches } from "class-validator";
import { MESSAGE, REGEX } from "src/app.utils";

export class UserRegisterRequestDto{

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Length(8, 24)
    @Matches(REGEX.PASSWORD_RULE, {
        message: MESSAGE.PASSWORD_RULE_MESSAGE
    })
    password: string;

    @IsNotEmpty()
    @Length(8, 24)
    @Matches(REGEX.PASSWORD_RULE, {
        message: MESSAGE.PASSWORD_RULE_MESSAGE
    })
    confirm: string;
}
