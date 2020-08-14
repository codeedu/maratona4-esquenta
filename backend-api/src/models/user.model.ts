import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from "typeorm";
import {Exclude} from 'class-transformer';
//
@Entity()
export class User{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Exclude()
    @CreateDateColumn({type: 'timestamp'})
    created_at: Date
}