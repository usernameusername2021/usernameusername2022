import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SongsController } from './modules/songs/controllers/songs.controller';
import { Songs } from './modules/songs/entities/songs.entity';
import { SongsRepository } from './modules/songs/repositories/songs.repository';
import { SongsService } from './modules/songs/services/songs.service';
import { SongsModule } from './modules/songs/songs.module';
@Injectable()
export class AppService {

  constructor(private songsService: SongsService){}

  getViewName(): string {
    return 'index';
  }

  async get_all_songs():Promise<Songs[]>{
    return await this.songsService.get_all_songs();
  }
}

