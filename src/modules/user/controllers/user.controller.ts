import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { Songs } from 'src/modules/songs/entities/songs.entity';
import { UserRegisterRequestDto } from '../dto/user-register.req.dto';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {

    constructor(private userService: UserService){}

    @Post("/register")
    async do_user_registration(@Body(ValidationPipe) userRegister: UserRegisterRequestDto): Promise<User>{
        return await this.userService.do_user_registration(userRegister);
    }

    @Get("/liked")
    async get_liked_songs(user_id: number): Promise<Songs[] | undefined> {
        return await this.userService.get_liked_songs(user_id);
    }

    
}
