import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class PostService {

  constructor(

    @InjectRepository(Post)
    private postRepo : Repository<Post>

  ) {}




  
    async createPost(createPostDto:CreatePostDto, user:User) {

      const newpost = await this.postRepo.create({...createPostDto, author:user})
      await this.postRepo.save(newpost)
      return newpost



    }
  


}
