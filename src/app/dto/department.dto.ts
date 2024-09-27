import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateDepartmentDto{
    @IsNotEmpty({ message: 'ชื่อหน่วยงาน ต้องไม่เป็นค่าว่าง' })
    @IsString({ message: 'ชื่อหน่วยงาน ต้องเป็นชนิดตัวอักษร' })
    name: string

    @IsOptional()
    @IsString({ message: 'รายละเอียด ต้องเป็นชนิดตัวอักษร' })
    description: string
}