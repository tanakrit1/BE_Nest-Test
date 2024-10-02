import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { BaseSearchDto } from "./base-search.dto";
import { ApiProperty } from "@nestjs/swagger";


export class SearchUserDto extends BaseSearchDto {
}

export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'ชื่อผู้ใช้งาน ต้องไม่เป็นค่าว่าง' })
    @IsString({ message: 'ชื่อผู้ใช้งาน ต้องเป็นชนิดตัวอักษร' })
    username: string

    @ApiProperty()
    @IsNotEmpty({ message: 'รหัสผ่าน ต้องไม่เป็นค่าว่าง' })
    @IsString({ message: 'รหัสผ่าน ต้องเป็นชนิดตัวอักษร' })
    password: string

    @ApiProperty()
    @IsNotEmpty({ message: 'ชื่อจริง ต้องไม่เป็นค่าว่าง' })
    @IsString({ message: 'ชื่อจริง ต้องเป็นชนิดตัวอักษร' })
    firstname: string

    @ApiProperty()
    @IsNotEmpty({ message: 'นามสกุล ต้องไม่เป็นค่าว่าง' })
    @IsString({ message: 'นามสกุล ต้องเป็นชนิดตัวอักษร' })
    lastname: string

    @ApiProperty()
    @IsOptional()
    @IsString({ message: 'เบอร์โทร ต้องเป็นชนิดตัวอักษร' })
    phone: string

    @ApiProperty()
    @IsOptional()
    @IsString({ message: 'email ต้องเป็นชนิดตัวอักษร' })
    email: string

    // @IsNotEmpty({ message: 'DepartmentId ต้องไม่เป็นค่าว่าง' })
    // @IsNumber(undefined,{ message: 'DepartmentId ต้องเป็นชนิดตัวเลข' })
    // departmentId: number
}