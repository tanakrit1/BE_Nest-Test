import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/database/entities/user.entity";
import { filterFunction } from "src/helpers/function-filter";
import { Repository } from "typeorm";

@Injectable()
export class UserRepository{
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}

    async findByUsername(username: string){
        try{
            return await this.userRepository.findOne({where: {username: username}})
        }catch(err){
            throw new InternalServerErrorException(err.message + err?.query);
        }
    }

    async findData(body: any){
        try{
            const {conditionValue, relationValue, sortingValue} = await filterFunction(body)
            const [data, count] = await this.userRepository.findAndCount({ 
                relations: relationValue,
                where: conditionValue,
                order: sortingValue,
                skip: (body.page-1) * body.limit,
                take: body.limit,
            })
            return { data, totalItem: count }
        }catch(err){
            throw new InternalServerErrorException(err.message + err?.query);
        }
    }

    async save(body: any){
        try{
            return await this.userRepository.save(body)
        }catch(err){
            throw new InternalServerErrorException(err.message + err?.query);
        }
    }
}