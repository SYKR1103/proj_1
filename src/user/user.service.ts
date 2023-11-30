import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus} from '@nestjs/common';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepo : Repository<User>
  ) {}


  async createU(createUserDto: CreateUserDto) {
    const newuser = await this.userRepo.create(createUserDto)
    await this.userRepo.save(newuser)
    return newuser 
  }

  async findAll() {
    return await this.userRepo.find()
  }

  async findOneU(id: string) {
    const founduser = await this.userRepo.findOneBy({id})
    if (founduser) return founduser
    throw new HttpException('xxxxx', HttpStatus.NOT_FOUND)
  }

  async updateU(id: string, updateUserDto: UpdateUserDto) {
    await this.userRepo.update(id, updateUserDto)
    const updateduser = await this.userRepo.findOneBy({id})
    if (updateduser) return updateduser
    throw new HttpException('xxxxx', HttpStatus.NOT_FOUND)
  }

  async findUserById(id:string) {
    const user = await this.userRepo.findOneBy({id})
    if (user) return user
    throw new HttpException('xxxxx', HttpStatus.NOT_FOUND)
  }


  async findUserByEmail(email:string) {
    const user = await this.userRepo.findOneBy({email})
    if (user) return user
    throw new HttpException('xxxxx', HttpStatus.NOT_FOUND)
  }



}
