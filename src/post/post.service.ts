import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './post.schema';
import { CreatePostDto } from './dto/post.create.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PostService {
    private readonly postModel;
    private readonly userService;
   constructor(@InjectModel(Post.name) postModel : Model<Post>,userService:UserService) {
          this.postModel = postModel;
          this.userService = userService;
      }
    async addPost(post: CreatePostDto): Promise<Post> {
        try {
            const user = await this.userService.getUser(post.userId);
            const newPost = new this.postModel(post);
            user.posts.push(newPost._id);
            await user.save();
            return await newPost.save();
        } catch (error) {
            throw new Error(error);
        }
    }
}
