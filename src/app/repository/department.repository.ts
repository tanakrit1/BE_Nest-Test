import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Department } from "src/database/entities/department.entity";
import { Repository } from "typeorm";

@Injectable()
export class DepartmentRepository {
    constructor(
        @InjectRepository(Department)
        private readonly departmentRepository: Repository<Department>
    ){}
    async save(body: any){
        try{
            return await this.departmentRepository.save(body)
        }catch(err){
            throw new InternalServerErrorException(err.message + err?.query);
        }
    }
}