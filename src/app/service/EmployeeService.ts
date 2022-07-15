import { plainToClass } from "class-transformer";
import { getConnection, ObjectLiteral } from "typeorm";
import { Employee } from "../entities/employee";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import HttpException from "../exception/HttpException";
import { EmployeeRespository } from "../repository/EmployeeRepository";
import bcrypt from "bcrypt";
import UserNotAuthorizedException from "../exception/UserNotAuthorizedException";
import IncorrectUsernameOrPasswordException from "../exception/IncorrectUsernameOrPasswordException";
import jsonwebtoken from "jsonwebtoken";
import { EmployeeAddressRepository } from "../repository/EmployeeAddressRepository";
export class EmployeeService{
    
    

    constructor(private employeerepo: EmployeeRespository, private employeeaddressrepo: EmployeeAddressRepository) {}

    async createAnEmployee(body: any) {
        
        return await this.employeerepo.createANewEmployee(body);
    }



    public async createEmployee(employeeDetails: any, address_id: string) {
        try {
            const newEmployee = plainToClass(Employee, {
                name: employeeDetails.name,
                username: employeeDetails.username,
                password: employeeDetails.password ?  await bcrypt.hash(employeeDetails.password, 10): '',
                age: employeeDetails.age,
                departmentId: employeeDetails.departmentId,
                role: employeeDetails.role,
                employeeaddressId: address_id,
                isActive: true,
            });
            //console.log(newEmployee);
            const save = await this.employeerepo.saveEmployeeDetails(newEmployee);
            return save;
        } catch (err) {
            //throw new HttpException(400, "Failed to create employee");
        }
    }
    

    async getAllEmployees() {
        return await this.employeerepo.getAllEmployees();
    }

    async getAnEmployee(id: string) {
        const data = await this.employeerepo.getAnEmployee(id);
        if(!data) {
            throw new EntityNotFoundException(
                {
                    CODE:"404",
                    MESSAGE:"User Not Found"
                }
            )
        }
        return data;

    }

    async updateEmployee(employeeData: ObjectLiteral) {
        await this.employeeaddressrepo.updateEmployeeAddress(employeeData);
        return await this.employeerepo.updateEmployee(employeeData);
    }


    async deleteEmployee(id: string) {
        const temp = id;
        const data = await this.employeerepo.getAnEmployee(id);
        if(!data) {
          throw new EntityNotFoundException(
            {
                CODE:"404",
                MESSAGE:"User Not Found, delete operation aborted."
            }
        )
        }
        else {
          return await this.employeerepo.deleteEmployee(id);
        }
        
    }

    public employeeLogin = async (
        name: string,
        password: string
      ) => {
        const employeeDetails = await this.employeerepo.getEmployeeByName(
          name
        );
        if (!employeeDetails) {
          throw new UserNotAuthorizedException();
        }
        const validPassword = await bcrypt.compare(password, employeeDetails.password);
        if (validPassword) {
          let payload = {
            "custom:id": employeeDetails.id,
            "custom:name": employeeDetails.name,
            "custom:role": employeeDetails.role,
          };
          const token = this.generateAuthTokens(payload);
          return {
            idToken: token,
            employeeDetails,
          };
        } else {
          throw new IncorrectUsernameOrPasswordException();
        }
      };

     private generateAuthTokens = (payload: any) => {
        return jsonwebtoken.sign(payload, process.env.JWT_TOKEN_SECRET, {
          expiresIn: process.env.ID_TOKEN_VALIDITY,
        });
      }; 
}

