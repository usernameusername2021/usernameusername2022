import { Get, Controller, Request, Render, UseInterceptors, Post, UseGuards, UseFilters } from '@nestjs/common';
import { ApiBasicAuth, ApiBody, ApiCookieAuth, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { profile } from 'console';
import { userInfo } from 'os';
import { LoginRequestDto } from './app-login.req.dto';
import { AppService } from './app.service';
import { AppInterceptor } from './interceptors/app.interceptor';
import { AuthFilter } from './modules/auth/filters/auth.filter';
import { AuthenticatedGuard } from './modules/auth/guard/authenticated.guard';
import { LocalAuthGuard } from './modules/auth/guard/local-auth.guard';
import { Songs } from './modules/songs/entities/songs.entity';

@Controller()
@UseInterceptors(AppInterceptor)
export class AppController {
  getHello(): any {
    throw new Error('Method not implemented.');
  }
  constructor(private appService: AppService,) {}

  @ApiOperation({
      summary: 'Go to main page'
  })
  @Get()
  @Render('index')
  async root(@Request() req) {
    let liked = null;
    if(req.user != undefined){
      liked = await this.appService.get_liked_songs(req.user.userID);
    }
    const all_songs = await this.appService.get_all_songs()
    return {
              loading_speed: '',
              songs: all_songs,
              liked_songs: liked
            }
  }

  @ApiOperation({
      summary: 'Go to lab 5 page'
  })
  @Get("/lab5")
  @Render('labs')
  labs() {
    return {
              loading_speed: ''
            };
  }

  @ApiBasicAuth()
  @ApiOperation({
      summary: 'Go to liked page'
  })
  @UseGuards(AuthenticatedGuard)
  @UseFilters(new AuthFilter())
  @Get("/liked")
  @Render("liked")
  async liked(@Request() req) {
    const liked_songs = await this.appService.get_liked_songs(req.user.userID);
    return {
              songs: liked_songs,
              liked_songs: liked_songs,
              loading_speed: '',
            };
  }


 @ApiBody({
  type: LoginRequestDto,
  examples: {
      a: {
          summary: "login",
          description: "correct form of login",
          value: {name: "user123", password: "Password1"}
      }
  }
  })
  @ApiOperation({
      summary: 'login'
  })
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  post_login(@Request() req): any{ 
    return {
              msg: "User has logged in!",
              authentificated: true
            };
  }

  
  @ApiOperation({
    summary: 'Go to login page'
  })
  @Get("/login")
  @Render("login")
  get_login(){
    return {loading_speed: '',};
  }

  @ApiBasicAuth()
  @ApiOperation({
  summary: 'Go to profile page'
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.'
  })
  @UseGuards(AuthenticatedGuard)
  @UseFilters(new AuthFilter())
  @Get("/profile")
  @Render("profile")
  async profile(@Request() req){
    return {
              loading_speed: '',
              username: req.user.userName,
            }
  }

  @ApiOperation({
    summary: 'Go to login page'
  })
  @Get('/logout')
  logout(@Request() req): any {
    req.session.destroy();
    return { 
              loading_speed: '',
              msg: 'The user session has ended',
              logout: true 
            }
  }

  @ApiOperation({
      summary: 'Go to registration page'
  })
  @Get('/registration')
  @Render("registration")
  registration(@Request() req): any {
    return {loading_speed: ''}
  }
}