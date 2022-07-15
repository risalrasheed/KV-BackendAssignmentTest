import { ObjectLiteral } from "typeorm";
import { DeptRespository } from "../repository/DeptRepository";


export class DeptService {
    /*
    getAllDept() {
        const deptDetails = [
            {
                "id":"1",
                "name":"dept_one"
            },
            {
                "id":"2"
            }
        ]
        return deptDetails;
    }*/

    constructor(private deptrepo: DeptRespository) {}

    async getAllDept() {
        return await this.deptrepo.getAllDept();
    }

    async createADepartment(body: any) {
        
        return await this.deptrepo.createANewDept(body);
    }



    
    

    async getAllEmployees() {
        return await this.deptrepo.getAllDept();
    }

    async getADepartment(id: string) {
        const data = await this.deptrepo.getDeptByName(id);
        return data;

    }
    async updateDepartment(employeeData: ObjectLiteral) {
        return await this.deptrepo.updateDept(employeeData);
    }


    async deleteDept(id: string) {
        return await this.deptrepo.deleteDept(id);
    }
}