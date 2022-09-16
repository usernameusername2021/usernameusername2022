import { Controller, Get } from '@nestjs/common';
import { SongsService } from '../services/songs.service';

@Controller('songs')
export class SongsController {

    constructor(private songsService: SongsService){}

    @Get()
    get_all_songs(){
        return this.songsService.get_all_songs();
    }
}
