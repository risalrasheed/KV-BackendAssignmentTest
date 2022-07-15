import { Type } from "class-transformer";
import { IsNumber, IsString, validate, ValidateIf, ValidateNested } from "class-validator";
import { type } from "os";
import { CreateAddressDto } from "./CreateAddress";



export class CreateEmployeeDto {
    @IsString()
    public name: string;

    // @IsString()
    // public username: string;

    // @IsNumber()
    // public age: number;

    @IsString()
    public departmentId: string;

    @IsString()
    public password: string;

    @IsString()
    public role: string;
/*
    @IsString()
    public address_line1: string;

    @IsString()
    public address_line2:string;

    @IsString()
    public city:string;

    @IsString()
    public state: string;
*/
    @ValidateIf(o => o.address.id==null)
    @ValidateNested({each:true})
    @Type(()=>CreateAddressDto)
    public address: CreateAddressDto;
}