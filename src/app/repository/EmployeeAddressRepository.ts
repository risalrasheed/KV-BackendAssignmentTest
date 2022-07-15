import { getConnection, ObjectLiteral } from "typeorm";
import { EmployeeAddress } from "../entities/employee_address";
import { EmployeeRespository } from "./EmployeeRepository";




export class EmployeeAddressRepository{
    async getAllEmployeeAddress(){
         const employeeAddressRepo = getConnection().getRepository(EmployeeAddress);
        return employeeAddressRepo.find({relations:['employee']});
    }

    async createANewEmployeeAddress(body: any) {
        console.log(body);
        const employeeAddressRepo = getConnection().getRepository(EmployeeAddress);
        return employeeAddressRepo.save(body);
    }

    async updateEmployeeAddress(addressData: ObjectLiteral) {
        const employeeAddressRepo = getConnection().getRepository(EmployeeAddress);

        const employeeRepo = new EmployeeRespository();
        const dataOfEMployee = await employeeRepo.getAnEmployee(addressData.id);
        const data = await employeeAddressRepo.findOne({id:addressData.id});
        data.address_line1 = addressData.address_line1;
        data.address_line2 = addressData.address_line2;
        data.city = addressData.city;
        data.state = addressData.state;

        return await employeeAddressRepo.save(data);
    }


}