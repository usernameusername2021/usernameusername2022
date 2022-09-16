import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "../repositories/user.repository";

@Injectable()
export class UserService {

    constructor(@InjectRepository(UserRepository) private userRepository: UserRepository,
    ){}

    get_all_users(){
        return ["a", "b", 3, 4];
    }
}