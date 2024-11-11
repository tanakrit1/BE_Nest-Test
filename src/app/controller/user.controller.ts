import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto, SearchUserDto } from "../dto/user.dto";
import { UserService } from "../service/user.service";
import { AuthService } from "../service/auth.service";
import { ApiTags } from "@nestjs/swagger";
import { PaginationVm } from "../view-model/pagination.vm";

@ApiTags('User')
@Controller('user')
export class UserContoller {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService
    ){}
    
    @Post('search')
    async search(@Body() dto: SearchUserDto){
        const result = await this.userService.search(dto)
        const pagination = {
            page: Number(dto.page),
            limit: Number(dto.limit),
            totalItems: Number(result.totalItem)
        }
        const response = PaginationVm.convertToVm(result.data, pagination)
        return response
    }

    @Post()
    async create(@Body() dto:CreateUserDto){
        console.log("dto---> ", dto)
        const hashedPassword = this.authService.hashPassword(dto.password)
        const body = {...dto, password: hashedPassword}
        return await this.userService.create(body)
    }
    
}