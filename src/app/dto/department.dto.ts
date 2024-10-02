import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateDepartmentDto{
    @ApiProperty()
    @IsNotEmpty({ message: 'ชื่อหน่วยงาน ต้องไม่เป็นค่าว่าง' })
    @IsString({ message: 'ชื่อหน่วยงาน ต้องเป็นชนิดตัวอักษร' })
    name: string

    @ApiProperty()
    @IsOptional()
    @IsString({ message: 'รายละเอียด ต้องเป็นชนิดตัวอักษร' })
    description: string
}