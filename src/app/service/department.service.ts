import { Injectable } from "@nestjs/common";
import { CreateDepartmentDto } from "../dto/department.dto";
import { DepartmentRepository } from "../repository/department.repository";

@Injectable()
export class DepartmentService {
    constructor(
        private readonly departmentRepository: DepartmentRepository
    ){}
    
    async create(dto: CreateDepartmentDto){
        return await this.departmentRepository.save(dto)
    }
}