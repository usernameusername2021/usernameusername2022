import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRegisterRequestDto } from "../dto/user-register.req.dto";
import { User } from "../entities/user.entity";
import { UserRepository } from "../repositories/user.repository";
import * as bcrypt from 'bcrypt';
import { getRepository } from "typeorm";
import { Songs } from "src/modules/songs/entities/songs.entity";

@Injectable()
export class UserService {

    async do_user_registration(userRegister: UserRegisterRequestDto): Promise<User> {
        const salt = await bcrypt.genSalt();
        const password = await bcrypt.hash(userRegister.password, salt)
        const user = new User();
        user.name = userRegister.name;
        user.password = password;
        return await user.save()
    }

    constructor(@InjectRepository(UserRepository) private userRepository: UserRepository,
    ){}



    async get_user(user_name: string): Promise<User | undefined> {
        const user = getRepository(User)
        .createQueryBuilder("user")
        .where("user.name = :name", { name: user_name })
        .getOne();

        return user;
    }

    async get_liked_songs(user_id: number): Promise<Songs[] | undefined> {
        const user = await this.userRepository.findOne({
            where:{
                id: user_id
            }
        });

        return user.songs;
    }

    async like_song(user_id: number, song_id: number) {

        const user = await this.userRepository.findOne({
            where:{
                id: user_id
            }
        });


        const song = await getRepository(Songs)
        .createQueryBuilder("songs")
        .where("songs.id = :id", { id: song_id }).getOne();

        if (user.songs.includes(song)){
            user.songs.splice(user.songs.indexOf(song), 1)
        }else{
            user.songs.push(song)
        }

    }

    // async unlike_song(user_id: number, song_id: number){
    //     const user = await this.userRepository.findOne({
    //         where:{
    //             id: user_id
    //         }
    //     });

    //     const song = getRepository(Songs)
    //     .createQueryBuilder("songs")
    //     .where("songs.id = :id", { id: song_id }).getOne();
    // }

}