import {  HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel, } from '@nestjs/mongoose';
import {  Model } from 'mongoose';
import { User } from './user.schema';
import { CreateUserDto } from './dto/user.create';
@Injectable()
export class UserService {
   private readonly userModel;
   constructor(@InjectModel(User.name) userModel : Model<User>){
       this.userModel = userModel;
   }

   async addUser(CreateUserDto: CreateUserDto): Promise<User> {
    try {
      const user = new this.userModel(CreateUserDto);
      return user.save();
    
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    }
    async getUsers(): Promise<User[]> {
      try {
        const data: User[] | [] = await this.userModel.find({});
        console.log(data)
        return data;
      }
      catch(error) {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    async getUser(id: string): Promise<User> {
      try {
        const user: User = await this.userModel.findById(id);
        return user;
      } catch (error) {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    async getUserAllPosts(email: string): Promise<User> {
      try {
        const userwithPosts = await this.userModel.findOne({email}).populate('posts').exec();
        return userwithPosts;
      }
      catch(error) {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      }
   }

  }
