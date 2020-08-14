import { ApiProperty } from "@nestjs/swagger";

export class UserResponse {
    @ApiProperty()
    id: number;

    @ApiProperty({
        type: String,
        description: 'name of user'
    })
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    created_at:Date
}