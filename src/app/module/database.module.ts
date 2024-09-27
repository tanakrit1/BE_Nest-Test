import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { dataSource } from "src/database/config/database.config";



@Module({
    imports: [TypeOrmModule.forRoot(dataSource)],
})

export class DatabaseModule { }