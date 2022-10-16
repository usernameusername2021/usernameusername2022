import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRegisterRequestDto } from "../dto/user-register.req.dto";
import { User } from "../entities/user.entity";
import { UserRepository } from "../repositories/user.repository";
import * as bcrypt from 'bcrypt';
import { getRepository } from "typeorm";
import { Songs } from "src/modules/songs/entities/songs.entity";
import { validate } from "class-validator";

@Injectable()
export class UserService {

    constructor(@InjectRepository(UserRepository) private userRepository: UserRepository,
    ){}

    async do_user_registration(userRegister: UserRegisterRequestDto): Promise<any> {
        const salt = await bcrypt.genSalt();
        const password = await bcrypt.hash(userRegister.password, salt)

        const user = new User();
        const liked: Array<Songs> = [];

        user.liked = liked;
        user.name = userRegister.name;
        user.password = password;
        user.email = userRegister.email
        
        const user_in_repository_by_name = await getRepository(User).createQueryBuilder("user")
        .where("user.name = :name", { name: userRegister.name })
        .getOne();

        const user_in_repository_by_email = await getRepository(User).createQueryBuilder("user")
        .where("user.email = :email", { email: userRegister.email })
        .getOne();

        if(user_in_repository_by_name){
            return {name_message: "Пользователь с таким именем уже существует"};
        } 
        if(user_in_repository_by_email){
            return {name_message: "Данный email адрес уже используется"};
        }
        
        return await user.save()
    }

    async get_user(username: string): Promise<User | undefined> {
        const user = getRepository(User)
        .createQueryBuilder("user")
        .where("user.name = :name", { name: username })
        .getOne();

        console.log(user);
        return user;
    }

    async get_liked_songs(user_id: number): Promise<Songs[] | undefined> {

        const user = await getRepository(User).createQueryBuilder("user").leftJoinAndSelect("user.liked", "songs")
        .where("user.id = :userid", { userid: user_id}).getOne();

        return user.liked.reverse();
    }

    async like_song(user_id: number, song_id: number) {

        const song = await getRepository(Songs)
        .createQueryBuilder("songs")
        .where("songs.id = :id", { id: song_id }).getOne();

        const user = await getRepository(User).createQueryBuilder("user").leftJoinAndSelect("user.liked", "songs")
        .where("user.id = :userid", { userid: user_id}).getOne();

        for (let i = 0; i < user.liked.length; i++){
            if (song_id == user.liked[i].id){
                user.liked.splice(i, 1);
                song.like_counter -= 1;
                song.save();
                user.save();
                return true;
            }
        }
        song.like_counter += 1;
        user.liked.push(song)
        song.save()
        user.save()
        return true;
    }

    
}