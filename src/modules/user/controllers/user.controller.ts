import { Body, Controller, Get, Post, ValidationPipe, Request, Param, UseFilters, UseGuards} from '@nestjs/common';
import { ApiBasicAuth, ApiBody, ApiCookieAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthFilter } from 'src/modules/auth/filters/auth.filter';
import { AuthenticatedGuard } from 'src/modules/auth/guard/authenticated.guard';
import { Songs } from 'src/modules/songs/entities/songs.entity';
import { UserRegisterRequestDto } from '../dto/user-register.req.dto';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {

    constructor(private userService: UserService){}

    
    @ApiTags('user')
    @ApiBody({
    type: UserRegisterRequestDto,
    examples: {
        a: {
            summary: "registration",
            description: "correct form of registration",
            value: {name: "user123", email: "user123@gmail.com", password: "Password1", confirm: "Password1"}
        }
    }
    })
    @ApiOperation({
        summary: 'Do user registration'
    })
    @ApiResponse({ status: 201, description: 'Пользователь был зарегистрирован.'})
    @ApiResponse({ status: 400, description: 'Поля name, email, paswword, confirm, заполнены неверно.'})
    @Post("/register")
    async do_user_registration(@Body(ValidationPipe) userRegister: UserRegisterRequestDto): Promise<any>{
        return await this.userService.do_user_registration(userRegister);
    }

    @ApiBasicAuth()
    @ApiTags('user')
    @UseGuards(AuthenticatedGuard)
    @UseFilters(new AuthFilter())
    @Post("/like/:songid")
    async like_song(@Request() req, @Param('songid') songid: number){
        return await this.userService.like_song(req.user.userID, songid)
    }

    
}
