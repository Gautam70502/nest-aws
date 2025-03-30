import { Module } from '@nestjs/common';
import { Post,PostSchema } from './post.schema';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [UserModule,MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }])],
    controllers: [PostController],
    providers: [PostService],
    exports: [PostService]
})
export class PostModule {}
