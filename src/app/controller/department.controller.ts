import { Body, Controller, Post } from "@nestjs/common";
import { CreateDepartmentDto } from "../dto/department.dto";
import { DepartmentService } from "../service/department.service";

@Controller('department')
export class DepartmentController {
    constructor(
        private readonly departmentService : DepartmentService
    ){}

    @Post()
    async create(@Body() dto: CreateDepartmentDto) {
        return await this.departmentService.create(dto)
    }
}