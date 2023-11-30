


 

import { BaseEntity } from "common/base.entity";
import { Entity, Column, BeforeInsert, OneToMany } from "typeorm";
import { Role } from "./role.enum";
import * as bcrypt from 'bcryptjs'
import { HttpException, HttpStatus, InternalServerErrorException } from "@nestjs/common";
import { Post } from "src/post/entities/post.entity";

@Entity()


export class User extends BaseEntity{

    @Column()
    public nickname : string

    @Column({unique:true})
    public email : string

    @Column()
    public password : string


    @Column({

        type : 'enum',
        enum : Role,
        default : [Role.USER],
        array : true,
    }) public roles: Role[]

    @BeforeInsert()
    async hashedPassword() : Promise<void> {
        try{
        const saltValue = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, saltValue)}
        catch(e) {
            console.log(3)
            throw new InternalServerErrorException()
        }
    }

    async checkPassword(aPassword : string) : Promise<boolean> {

        try{
        const isMatched = await bcrypt.compare(aPassword, this.password)
        return isMatched
        } catch(e) {
            throw new InternalServerErrorException()
        }
    }


    @OneToMany(()=>Post, (post:Post)=>post.author)
    public posts: Post[]


}