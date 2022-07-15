import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import { EmployeeService } from "../service/EmployeeService";
import validationMiddleware from "../middleware/ValidationMiddleware";
import { CreateEmployeeDto } from "../dto/CreateEmployee";
import authorize from "../middleware/Authorization";
import { Users } from ".";
import { EmployeeAddressService } from "../service/EmployeeAddresServices";

class EmployeeController extends AbstractController {
  constructor(private employeeservice: EmployeeService, private addressservice:EmployeeAddressService) {
    super(`${APP_CONSTANTS.apiPrefix}/employee`);
    this.initializeRoutes();
  }
  protected initializeRoutes() {
  
    this.router.get(`${this.path}`/*,authorize([Users.ADMIN])*/, this.employeeResponse);
    this.router.post(`${this.path}`,validationMiddleware(CreateEmployeeDto, APP_CONSTANTS.body), this.createEmployee);
    this.router.get(`${this.path}/:id`, this.getAnEmployee);
    this.router.get(`${this.path}/:id`, this.getAnEmployee);
    this.router.put(`${this.path}`, this.updateEmployee);
    this.router.delete(`${this.path}/:id`,authorize([Users.ADMIN,Users.HR]),this.deleteEmployee)

    this.router.post(`${this.path}/login`,this.login);
    console.log(`${this.path}/login`,this.login);
  }
  private employeeResponse = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
     
      response.status(200);
      //response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
      const data = await this.employeeservice.getAllEmployees();
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK"));
      
    } catch (error) {
      return next(error);
    }
  }
  // private createEmployeeResponse = async (request: RequestWithUser, response: Response, next: NextFunction) => {


  // }
  
  private createEmployee = async(request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
        
        
        response.status(200);
        const addressdata = await this.addressservice.createAnEmployeeAddress(request.body.address);
        const data = await this.employeeservice.createEmployee(request.body, addressdata.id);

        response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK"));
  //Change made here      
    } catch(error) {
        return next(error);
    }
  }

  private getAnEmployee = async(request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
        // const data: any = {message: "Get an Employee"};
        
        response.status(200);
        const data = await this.employeeservice.getAnEmployee(request.params.id);
        response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK"));
        
        
    } catch(error) {
        return next(error);
    }
  }
  private updateEmployee = async(request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
        // const data: any = {message: "Get an Employee"};
        
        response.status(200);
        
        const data = await this.employeeservice.updateEmployee(request.body);
        response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK"));
        
        
    } catch(error) {
        return next(error);
    }
  }
  
  private deleteEmployee = async(request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
        // const data: any = {message: "Get an Employee"};
        
        response.status(200);
        const data = await this.employeeservice.deleteEmployee(request.params.id);
        response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK"));
        
        
    } catch(error) {
        return next(error);
    }
  }


  private login = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    const loginData = request.body;
    const loginDetail = await this.employeeservice.employeeLogin(
      loginData.name.toLowerCase(),
      loginData.password
    );
    response.send(
      this.fmt.formatResponse(loginDetail, Date.now() - request.startTime, "OK")
    );
  };

  
}

export default EmployeeController;