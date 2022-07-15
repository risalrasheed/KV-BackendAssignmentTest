import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "./AbstractEntity";
import { Dept } from "./dept";
import { EmployeeAddress } from "./employee_address";



@Entity("employee")
export class Employee extends AbstractEntity {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column({ nullable: false, default:"default" })
    public name: string;

    @Column({ nullable: true})
    public password: string;

    @Column({nullable:true})
    public role: string;
    
    @ManyToOne(() => Dept, { cascade: true })
    @JoinColumn()
    public department: Dept;

        @Column({ nullable: false })
        public departmentId: string;

    //@OneToOne(() => EmployeeAddress)
    @OneToOne(() => EmployeeAddress, {cascade: true})
    @JoinColumn()
    public employeeaddress: EmployeeAddress;

        @Column({nullable:true})
        public employeeaddressId:string;

}