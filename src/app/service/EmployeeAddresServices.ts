import { ObjectLiteral } from "typeorm";
import { ObjectLiteralElement } from "typescript";
import { EmployeeAddress } from "../entities/employee_address";
import { EmployeeAddressRepository } from "../repository/EmployeeAddressRepository";

export class EmployeeAddressService{
    

    constructor(private employeeaddressrepo: EmployeeAddressRepository) {}

    async getAllEmployeeAddress() {
        return await this.employeeaddressrepo.getAllEmployeeAddress();
    }
    async createAnEmployeeAddress(body: ObjectLiteral) {
        
        return await this.employeeaddressrepo.createANewEmployeeAddress(body);
    }

    async updateEmployeeAddress(employeeData: ObjectLiteral) {
        var addressData: EmployeeAddress;
        addressData.id = employeeData.employeeaddressId;
        addressData.address_line1 = employeeData.address_line1;
        addressData.address_line2 = employeeData.address_line2;
        addressData.city = employeeData.city;
        addressData.state = employeeData.state;
        return await this.employeeaddressrepo.updateEmployeeAddress(addressData);
    }
    
    
}