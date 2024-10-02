import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class AuthDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'username ต้องไม่เป็นค่าว่าง' })
    @IsString({ message: 'username ต้องเป็นชนิดตัวอักษร' })
    username: string

    @ApiProperty()
    @IsNotEmpty({ message: 'password ต้องไม่เป็นค่าว่าง' })
    @IsString({ message: 'password ต้องเป็นชนิดตัวอักษร' })
    password: string
}