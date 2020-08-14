import { ApiProperty } from "@nestjs/swagger";
import {IsString, IsNotEmpty, IsEmail} from 'class-validator';

export class UserDto{

    @ApiProperty({
        type: String,
        description: 'name of user'
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;
}