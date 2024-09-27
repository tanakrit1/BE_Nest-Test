import { Column, Entity, OneToMany } from "typeorm";
import { User } from "./user.entity";
import { BaseEntity } from "./base.entity";

@Entity({name: 'department'})
export class Department extends BaseEntity {
    @Column({ type: 'varchar', name: 'name', nullable: false, length: 50 })
    name: string

    @Column({ type: 'varchar', name: 'description', nullable: true, length: 256 })
    description: string

    @OneToMany( type => User,  (user) => user.department )
    users: User[]
}