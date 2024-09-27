import { Module } from "@nestjs/common";
import { UserContoller } from "../controller/user.controller";
import { User } from "src/database/entities/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserService } from "../service/user.service";
import { UserRepository } from "../repository/user.repository";
import { AuthService } from "../service/auth.service";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserContoller],
    providers: [UserService, UserRepository, AuthService],
    exports: [UserService, UserRepository]
})

export class UserModule { }