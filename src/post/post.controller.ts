import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,Req } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RequestWithUser } from 'src/auth/interfaces/requestWithUser';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}


  @UseGuards(JwtAuthGuard)
  @Post()
  async createP(@Body() c:CreatePostDto, @Req() r:RequestWithUser) {

    return await this.postService.createPost(c, r.user)



  }


}
