import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Songs } from "../../songs/entities/songs.entity";

@Entity('user')
export class User extends BaseEntity{
    @PrimaryGeneratedColumn({
        comment: "The user id number",
        type: "integer",
    })
    id: number; 

    @Column({
        comment: "The user name",
        type: "varchar",
    })
    name: string;

    @Column({
        comment: "The user password",
        type: "varchar",
    })
    artist: string;
    
    @OneToMany(() => Songs, (songs) => songs.users)
    liked_songs: Songs[];
}