import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SongsRepository } from "../repositories/songs.repository";

@Injectable()
export class SongsService {

    constructor(@InjectRepository(SongsRepository) private songsRepository: SongsRepository,
    ){}

    get_all_songs(){
        return this.songsRepository;
    }
}