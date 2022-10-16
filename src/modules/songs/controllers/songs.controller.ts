import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SongUploadRequestDto } from '../dto/song-upload.req.dto';
import { Songs } from '../entities/songs.entity';
import { SongsService } from '../services/songs.service';

@Controller('songs')
export class SongsController {

    constructor(private songsService: SongsService){}
    
    @ApiTags('songs')
    @ApiOperation({
        summary: 'Get all songs'
    })
    @Get()
    async get_all_songs(): Promise<Songs[]>{
        return await this.songsService.get_all_songs();
    }

    // @Post()
    // add_songs_to_database(@Body(ValidationPipe) songUpload: SongUploadRequestDto){
    //     return this.songsService.add_songs_to_database(songUpload);
    // }

}
