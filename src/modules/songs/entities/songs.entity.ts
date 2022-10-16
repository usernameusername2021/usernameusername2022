import { type } from "os";
import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";

@Entity('songs', {
    orderBy:{
        id:'DESC'
    }
})
export class Songs extends BaseEntity{
    @PrimaryGeneratedColumn({
        comment: "id number",
        type: "integer",
    })
    id: number; 

    @Column({
        comment: "name",
        type: "varchar",
    })
    name: string;

    @Column({
        comment: "artist",
        type: "varchar",
    })
    artist: string;

    @Column({
        comment: "img path",
        type: "varchar",
    })
    img: string;

    @Column({
        comment: "audio path",
        type: "varchar",
    })
    audio: string;

    @ManyToMany(() => User, (user) => user.liked)
    users: User[];

    @Column({
        nullable: true
    })
    like_counter: number
}