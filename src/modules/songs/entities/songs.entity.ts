import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";

@Entity('songs')
export class Songs extends BaseEntity{
    @PrimaryGeneratedColumn({
        comment: "The song id number",
        type: "integer",
    })
    id: number; 

    @Column({
        comment: "The song name",
        type: "varchar",
    })
    name: string;

    @Column({
        comment: "The song artist",
        type: "varchar",
    })
    artist: string;

    @Column({
        comment: "The song img path",
        type: "varchar",
    })
    img: string;

    @Column({
        comment: "The song audio path",
        type: "varchar",
    })
    audio: string;

    @ManyToMany(() => User, (users) => users.liked_songs)
    users: User[];
}