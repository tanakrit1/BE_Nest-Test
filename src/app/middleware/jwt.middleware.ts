import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
    constructor(
        private readonly jwtService: JwtService
    ) { }
    async use(request: Request, response: Response, next: NextFunction) {
        const authHeader = request.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            try {
                const [type, token] = authHeader?.split(' ')
                const payload = await this.jwtService.verifyAsync(token, { secret: process.env.APP_JWT_KEY });
                request['user'] = payload
            } catch (err) {
                throw new UnauthorizedException()
            }
        }else{
            throw new UnauthorizedException()
        }
        next();
    }
}