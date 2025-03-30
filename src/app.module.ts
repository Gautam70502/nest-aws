import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { PostController } from './post/post.controller';
import { PostModule } from './post/post.module';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), // Load .env globally
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'), // Load MongoDB URI from .env
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),UserModule,PostModule],
  controllers: [AppController, UserController, PostController],
  providers: [AppService],
})
export class AppModule {}