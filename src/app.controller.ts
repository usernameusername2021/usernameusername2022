import { Get, Controller, Res, Render, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { AppInterceptor } from './interceptors/app.interceptor';

@Controller()
@UseInterceptors(AppInterceptor)
export class AppController {
  getHello(): any {
    throw new Error('Method not implemented.');
  }
  constructor(private appService: AppService) {}

  @Get()
  @Render('index')
  root() {
    return {loading_speed: 'Время загрузки (server): '};
  }

  @Get("/lab5")
  @Render('labs')
  labs() {
    
    return {loading_speed: 'Время загрузки (server): '};
  }

  @Get("/liked")
  @Render('liked')
  liked() {
    return {loading_speed: 'Время загрузки (server): '};
  }
}