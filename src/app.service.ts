
import { Injectable } from '@nestjs/common';
import { SongsController } from './modules/songs/controllers/songs.controller';
import { Songs } from './modules/songs/entities/songs.entity';
import { SongsService } from './modules/songs/services/songs.service';
import { UserController } from './modules/user/controllers/user.controller';
import { UserService } from './modules/user/services/user.service';

@Injectable()
export class AppService {
 
  constructor(private songsController: SongsController, private userService: UserService, private songsService: SongsService){}

  async get_liked_songs(userID: number) {
    return await this.userService.get_liked_songs(userID);
  }

  async get_all_songs():Promise<Songs[]>{
    return await this.songsController.get_all_songs();
  }
}

