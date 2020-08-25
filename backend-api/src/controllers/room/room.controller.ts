import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  HttpCode,
  UseInterceptors,
  ClassSerializerInterceptor,
  ValidationPipe,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Room } from 'src/models/room.model';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomDto } from 'src/dto/room.dto';
import {
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { RoomResponse } from 'src/api-doc/room.response';
import { Public } from 'nestjs-keycloak-admin';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('rooms')
export class RoomController {
  constructor(
    @InjectRepository(Room)
    private roomRepo: Repository<Room>,
  ) {}

//  @Public()
  @ApiOkResponse({ type: RoomResponse })
  @Get()
  async index(): Promise<Room[]> {
    return this.roomRepo.find();
  }

  @ApiOkResponse({
    type: RoomResponse,
  })
  @Get(':id')
  async show(@Param('id') id: string): Promise<Room> {
    return this.roomRepo.findOneOrFail(+id);
  }

  @ApiCreatedResponse({
    type: RoomResponse,
    status: 201,
  })
  @Post()
  async store(@Body(new ValidationPipe()) roomDto: RoomDto): Promise<Room> {
    const room = this.roomRepo.create(roomDto);
    return this.roomRepo.save(room);
  }

  @ApiOkResponse({
    type: RoomResponse,
  })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) roomDto: RoomDto,
  ): Promise<Room> {
    await this.roomRepo.findOneOrFail(+id);
    this.roomRepo.update({ id: +id }, roomDto);
    return this.roomRepo.findOneOrFail(+id);
  }

  @ApiNoContentResponse()
  @Delete(':id')
  @HttpCode(204)
  async destroy(@Param('id') id: string): Promise<void> {
    await this.roomRepo.findOneOrFail(+id);
    this.roomRepo.delete(+id);
  }
}
