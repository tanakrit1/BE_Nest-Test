import { Body, Controller, Post, } from "@nestjs/common";
import { AuthService } from "../service/auth.service";
import { ApiTags } from "@nestjs/swagger";
import { AuthDto } from "../dto/auth.dto";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ){}

    @Post('sign-in')
    async login(@Body() body: AuthDto) {
        return this.authService.login(body.username, body.password)
    }
}