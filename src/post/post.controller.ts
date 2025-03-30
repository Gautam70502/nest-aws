import { Body, Controller, HttpException, HttpStatus,Post } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/post.create.dto';

@Controller('post')
export class PostController {
    private readonly postService;
    constructor(postService:PostService) {
        this.postService = postService;
    }
    @Post('addpost')
    addPost(@Body() body: CreatePostDto) {
        try {
            
            const post = this.postService.addPost(body);
            return post;
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
