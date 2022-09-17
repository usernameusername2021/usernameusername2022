import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
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
        unique: true,
    })
    name: string;

    @Column({
        comment: "The user password",
        type: "varchar",
    })
    password: string;
    
    @OneToMany(() => Songs, (songs) => songs.id)
    songs: Songs[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    upddatedAt: Date;
}