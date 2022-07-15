import { getConnection, ObjectLiteral } from "typeorm";
import { Employee } from "../entities/employee";




export class EmployeeRespository{
    async getAllEmployees(){
         const employeeRepo = getConnection().getRepository(Employee);
         const employeeDetails = await employeeRepo.find({relations:['department','employeeaddress']})
        return employeeDetails;
    }
    public async saveEmployeeDetails(employeeDetails: Employee) {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.save(employeeDetails);
    }
    async createANewEmployee(body: any) {
        console.log(body);
        const employeeRepo = getConnection().getRepository(Employee).save(body);
    }
    async getAnEmployee(id: string) {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.findOne(id);
    }
   
    async updateEmployee(employeeData: ObjectLiteral) {
        const employeeRepo = getConnection().getRepository(Employee);
        const data = await employeeRepo.findOne({id:employeeData.id});
        data.name = employeeData.name;

        return await employeeRepo.save(data);
    }
    async deleteEmployee(id: string) {
        const employeeRepo = getConnection().getRepository(Employee);
        const data = await employeeRepo.softDelete(id);

        return data
    }

    // Add in EmpoyeeRepository.ts

    public async getEmployeeByName(username: string) {
        const employeeRepo = getConnection().getRepository(Employee);
        const employeeDetail = await employeeRepo.findOne({
            where: { name: username },
        });
        return employeeDetail;
    }
}

