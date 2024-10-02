import { Injectable, UnauthorizedException } from "@nestjs/common";
import * as crypto from 'node:crypto';
import { UserRepository } from "../repository/user.repository";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {

    constructor(
        private readonly userRepo: UserRepository,
        private readonly jwtService: JwtService
    ){}

    hashPassword(password: string): string {
        const hash = crypto
            .createHmac('sha256', process.env.APP_PASSWORD_KEY)
            .update(password)
            .digest('hex');
        return hash;
    }

    async login( username:string, password: string ){
        const user = await this.userRepo.findByUsername(username)
        if( !user?.username ){
            throw new UnauthorizedException(`ไม่พบผู้ใช้งาน ${username}`)
        }
        if( user?.password !== this.hashPassword(password) ){
            throw new UnauthorizedException(`รหัสผ่านไม่ถูกต้อง`)
        }
        const payload  = { ...user }
        const access_token = await this.jwtService.signAsync(payload)
        return {access_token}

    }


}