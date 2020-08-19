import { ApiProperty } from "@nestjs/swagger";

export class RoomResponse {

    @ApiProperty({
        description: 'Id of User'
    })
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    created_at: Date
}
