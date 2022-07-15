import { getConnection, ObjectLiteral } from "typeorm";
import { Dept } from "../entities/dept";




export class DeptRespository{
    async getAllDept(){
         const deptRepo = getConnection().getRepository(Dept);
        return deptRepo.find({relations:['employee']});
    }

    
   public async saveDepartmentDetails(deptDetails: Dept) {
       const deptRepo = getConnection().getRepository(Dept);
       return deptRepo.save(deptDetails);
   }
   async createANewDept(body: any) {
       console.log(body);
       const deptRepo = getConnection().getRepository(Dept).save(body);
   }
   async getAnDept(id: string) {
       const deptRepo = getConnection().getRepository(Dept);
       return deptRepo.findOne(id);
   }
   async updateDept(deptData: ObjectLiteral) {
       const deptRepo = getConnection().getRepository(Dept);
       const data = await deptRepo.findOne({
        where: { name: deptData.name },
    });
       data.name = deptData.new_name;

       return await deptRepo.save(data);
   }
   async deleteDept(id: string) {
       const deptRepo = getConnection().getRepository(Dept);
       const data = await deptRepo.softDelete(id);

       return data
   }

   // Add in EmpoyeeRepository.ts

   public async getDeptByName(deptname: string) {
       const deptRepo = getConnection().getRepository(Dept);
       const deptDetail = await deptRepo.findOne({
           where: { name: deptname },
       });
       return deptDetail;
   }
}