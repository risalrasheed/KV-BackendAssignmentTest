import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import { DeptService } from "../service/DeptService";
import { Users } from ".";
import validationMiddleware from "../middleware/ValidationMiddleware";
import { CreateDeptDto } from "../dto/CreateDepartment"
import authorize from "../middleware/Authorization";
class DeptController extends AbstractController {
  constructor(private deptservice: DeptService) {
    super(`${APP_CONSTANTS.apiPrefix}/dept`);
    this.initializeRoutes();
  }
  protected initializeRoutes() {
    this.router.get(`${this.path}`, this.deptResponse);
    this.router.get(`${this.path}`/*,authorize([Users.ADMIN])*/, this.deptResponse);
    this.router.post(`${this.path}`,validationMiddleware(CreateDeptDto, APP_CONSTANTS.body), this.createDept);
    this.router.get(`${this.path}/:id`, this.getAnDept);
    this.router.get(`${this.path}/:id`, this.getAnDept);
    this.router.put(`${this.path}`, this.updateDept);
    this.router.delete(`${this.path}/:id`,authorize([Users.ADMIN,Users.HR]),this.deleteDept)
  }
  private deptResponse = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = { message: "Dept"};
      response.status(200);
      //response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
      response.send(await this.deptservice.getAllDept());
    } catch (error) {
      return next(error);
    }
  }

  //code chage start
  
  // private createDeptResponse = async (request: RequestWithUser, response: Response, next: NextFunction) => {


  // }
  
  private createDept = async(request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
        const data: any = {message: "Dept Post"};
        
        response.status(200);
        response.send(this.deptservice.createADepartment(request.body));
  //Change made here      
    } catch(error) {
        return next(error);
    }
  }

  private getAnDept = async(request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
        // const data: any = {message: "Get an Dept"};
        
        response.status(200);
        const data = await this.deptservice.getADepartment(request.params.id);
        response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK"));
        
        
    } catch(error) {
        return next(error);
    }
  }
  private updateDept = async(request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
        // const data: any = {message: "Get an Dept"};
        
        response.status(200);
        const data = await this.deptservice.updateDepartment(request.body);
        response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK"));
        
        
    } catch(error) {
        return next(error);
    }
  }
  
  private deleteDept = async(request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
        // const data: any = {message: "Get an Dept"};
        
        response.status(200);
        const data = await this.deptservice.deleteDept(request.params.id);
        console.log("Checking Error");
        console.log(request.body);
        response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK"));
        
        
    } catch(error) {
        return next(error);
    }
  }

  //code change end
}

export default DeptController;