import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Department } from "./department.entity";

@Entity({name: 'user'})
export class User extends BaseEntity {
    @Column({ type: 'varchar', name: 'username', nullable: false, length: 50, unique: true })
    username: string;

    @Column({ type: 'varchar', name: 'password', nullable: false, length: 512 })
    password: string;

    @Column({ type: 'varchar', name: 'firstname', nullable: false, length: 50 })
    firstname: string;

    @Column({ type: 'varchar', name: 'lastname', nullable: false, length: 50 })
    lastname: string;

    @Column({ type: 'varchar', name: 'nickname', nullable: true, length: 50 })
    nickname: string;

    @Column({ type: 'varchar', name: 'phone', nullable: true, length: 50 })
    phone: string;

    @Column({ type: 'varchar', name: 'email', nullable: true, length: 50 })
    email: string;

    @ManyToOne( type=> Department, (department) => department.users) 
    department: Department
    
}