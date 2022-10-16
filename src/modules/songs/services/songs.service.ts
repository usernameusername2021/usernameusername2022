import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SongUploadRequestDto } from "../dto/song-upload.req.dto";
import { Songs } from "../entities/songs.entity";
import { SongsRepository } from "../repositories/songs.repository";

@Injectable()
export class SongsService {

    constructor(@InjectRepository(SongsRepository) private songsRepository: SongsRepository,
    ){}

    async get_all_songs():Promise<Songs[]>{
        return await this.songsRepository.createQueryBuilder('s').getMany();
    }

    async add_songs_to_database(songUpload: SongUploadRequestDto): Promise<Songs> {
        const new_song = new Songs();
        new_song.name = songUpload.name;
        new_song.artist = songUpload.artist;
        new_song.img = songUpload.img;
        new_song.audio = songUpload.audio;
        // new_song.like_counter = 0;
        return await new_song.save()
    }


}