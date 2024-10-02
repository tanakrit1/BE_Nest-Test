import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto, SearchUserDto } from "../dto/user.dto";
import { UserService } from "../service/user.service";
import { AuthService } from "../service/auth.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('User')
@Controller('user')
export class UserContoller {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService
    ){}
    
    @Post('search')
    async search(@Body() dto: SearchUserDto){
        return await this.userService.search(dto)
    }

    @Post()
    async create(@Body() dto:CreateUserDto){
        console.log("dto---> ", dto)
        const hashedPassword = this.authService.hashPassword(dto.password)
        const body = {...dto, password: hashedPassword}
        return await this.userService.create(body)
    }
    
}