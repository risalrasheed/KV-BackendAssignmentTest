import { BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "./AbstractEntity";
import { Employee } from "./employee";

@Entity("dept")
export class Dept extends AbstractEntity {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column({ nullable: false })
    public name: string;

    @OneToMany(() => Employee, (employee) => employee.department)
    @JoinColumn()
    public employee: Employee[];
}