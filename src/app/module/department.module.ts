import { Module } from "@nestjs/common";
import { DepartmentController } from "../controller/department.controller";
import { DepartmentService } from "../service/department.service";
import { DepartmentRepository } from "../repository/department.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Department } from "src/database/entities/department.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Department])],
    controllers: [DepartmentController],
    providers: [DepartmentService, DepartmentRepository],
    exports: [DepartmentService, DepartmentRepository]
})

export class DepartmentModule {}