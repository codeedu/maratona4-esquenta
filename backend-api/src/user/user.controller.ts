import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  ValidationPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'src/models/user.model';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { UserResponse } from 'src/api-doc/user.response';
import { UserDto } from 'src/dto/user.dto';

//API REST - POST users
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UserController {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>, //Generic
  ) {}

  @Get()
  async index(): Promise<User[]> {
    return this.userRepo.find();
  }

  @ApiOkResponse({
    type: UserResponse
  })
  @Get(':id')
  show(@Param('id') id: string): Promise<User> {
    return this.userRepo.findOneOrFail(id);
  }

  @ApiCreatedResponse({
    type: UserResponse
  })
  @Post()
  async store(@Body(new ValidationPipe({
    errorHttpStatusCode: 422
  })) body: UserDto): Promise<User> {
    const user = this.userRepo.create(body);
    return this.userRepo.save(user);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: User): Promise<User> {
    await this.userRepo.findOneOrFail(+id);
    this.userRepo.update({id: +id}, body);
    return this.userRepo.findOneOrFail(+id);
  }

  @Delete(':id')
  @HttpCode(204)
  async destroy(@Param('id') id: string): Promise<void> { ///204 - No content
    await this.userRepo.findOneOrFail(+id);
    this.userRepo.delete(id);
  }
}