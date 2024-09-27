import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "../dto/user.dto";
import { UserRepository } from "../repository/user.repository";

@Injectable()
export class UserService {
    constructor(
        private readonly userRepo : UserRepository
    ){}

    async search(body: any){
        return await this.userRepo.findData(body)
    }

    async create(dto: CreateUserDto){
        return await this.userRepo.save(dto)
    }
}