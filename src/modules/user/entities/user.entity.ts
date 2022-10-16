import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Songs } from "../../songs/entities/songs.entity";

@Entity('user')
export class User extends BaseEntity{
    @PrimaryGeneratedColumn({
        comment: "id number",
        type: "integer",
    })
    id: number; 

    @Column({
        comment: "user name",
        type: "varchar",
        unique: true,
    })
    name: string;

    @Column({
        comment: "user email",
        type: "varchar",
        unique: true
    })
    email: string;

    @Column({
        comment: "password",
        type: "varchar",
    })
    password: string;
    

    @ManyToMany(() => Songs, (songs) => songs.users)
    @JoinTable()
    liked: Songs[]

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    upddatedAt: Date;
}