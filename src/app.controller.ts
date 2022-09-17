import { Get, Controller, Request, Render, UseInterceptors, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AppInterceptor } from './interceptors/app.interceptor';
import { AuthenticatedGuard } from './modules/auth/guard/authenticated.guard';
import { LocalAuthGuard } from './modules/auth/guard/local-auth.guard';

@Controller()
@UseInterceptors(AppInterceptor)
export class AppController {
  getHello(): any {
    throw new Error('Method not implemented.');
  }
  constructor(private appService: AppService,) {}

  @Get()
  @Render('index')
  async root() {
    const all_songs = await this.appService.get_all_songs()
    return {loading_speed: '',
            songs: all_songs}
  }

  @Get("/lab5")
  @Render('labs')
  labs() {
    return {loading_speed: 'Время загрузки (server): '};
  }

  @UseGuards(AuthenticatedGuard)
  @Get("/liked")
  @Render('liked')
  liked() {
    return {loading_speed: 'Время загрузки (server): '};
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() req): any{
    return {msg: "Logged in!"};
  }
}