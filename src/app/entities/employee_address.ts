import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "./AbstractEntity";
import { Dept } from "./dept";
import { Employee } from "./employee";



@Entity("employee_address")
export class EmployeeAddress extends AbstractEntity {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column({ nullable: false })
    public address_line1: string;

    @Column({ nullable: false })
    public address_line2: string;

    @Column({ nullable: false })
    public city: string;

    @Column({ nullable: false })
    public state: string;

//     @OneToOne(() => Employee)
//     @JoinColumn()
//     public employee: Employee;

//         @Column({ nullable: false })
//         public employeeId: string;
// 
}