import { Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    email: string;
}

export class ResponseUserDto {
    @Expose()
    name: string;
    @Expose()
    email: string; 
}