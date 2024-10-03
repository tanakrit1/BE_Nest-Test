import { forwardRef, Module } from "@nestjs/common";
import { AuthController } from "../controller/auth.controller";
import { UserRepository } from "../repository/user.repository";
import { AuthService } from "../service/auth.service";
import { User } from "src/database/entities/user.entity";
import { UserModule } from "./user.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: process.env.APP_JWT_SIGNATURE,
            // signOptions: { expiresIn: '1d' },
            // signOptions: { expiresIn: '5s' },
        }),
        forwardRef(()=>UserModule),
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService]
})

export class AuthModule { }