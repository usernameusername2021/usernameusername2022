import { IsEmail, IsNotEmpty, Length, Matches } from "class-validator";
import { MESSAGE, REGEX } from "src/app.utils";

export class LoginRequestDto{

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @Length(8, 24)
    password: string;

}
