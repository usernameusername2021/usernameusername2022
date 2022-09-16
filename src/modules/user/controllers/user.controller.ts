import { Controller, Get } from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {

    constructor(private userService: UserService){}

    @Get()
    get_all_users(){
        return this.userService.get_all_users();
    }
}
