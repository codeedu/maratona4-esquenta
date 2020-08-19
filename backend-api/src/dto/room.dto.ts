import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RoomDto {
  @ApiProperty({
      type: String,
      description: "Name of room",
  })  
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}