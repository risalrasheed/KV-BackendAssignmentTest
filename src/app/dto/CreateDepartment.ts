import { IsString } from "class-validator";

export class CreateDeptDto {
    @IsString()
    public name:string;
}