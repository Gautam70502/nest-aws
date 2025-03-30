import { Body, Controller,Get,HttpException,HttpStatus,Post, UseInterceptors } from '@nestjs/common';
import { CreateUserDto, ResponseUserDto } from './dto/user.create';
import { UserService } from './user.service';
import { User } from './user.schema';
import { TransformDtoInterceptor } from 'src/interceptors/response-dto';

@Controller('user')
export class UserController {
    private readonly userService;
    constructor(userService: UserService) {
        this.userService = userService;
    }
    @UseInterceptors(new TransformDtoInterceptor(ResponseUserDto))
    @Post('adduser')
     async addUser(@Body() body: CreateUserDto)  {
        try {
            const user = await this.userService.addUser(body);
            console.log(user);
            return user;
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('getusers')
     getUsers(): User[] {
        try {
            const users: User[] =  this.userService.getUsers();
            return users;
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @Post('getuser')
        getUser(@Body() body: {id: string}): User {
            try {
                const user: User = this.userService.getUser(body.id);
                return user;
            } catch (error) {
                throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    @Post('getuserallposts')
        getUserAllPosts(@Body() body: {email: string}): User {
            try {
                const user: User = this.userService.getUserAllPosts(body.email);
                return user;
            } catch (error) {
                throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
}
