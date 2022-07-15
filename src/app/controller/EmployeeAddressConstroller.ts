import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import { EmployeeAddressService } from "../service/EmployeeAddresServices";

class EmployeeAddressController extends AbstractController {
  constructor(private employeeaddressservice: EmployeeAddressService) {
    super(`${APP_CONSTANTS.apiPrefix}/employeeaddress`);
    this.initializeRoutes();
  }
  protected initializeRoutes() {
    this.router.get(`${this.path}`, this.employeeAddressResponse);
    //this.router.post(`${this.path}`, this.employeePOST)
  }
  private employeeAddressResponse = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = { message: "Employee Address"};
      response.status(200);
      //response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
      response.send(await this.employeeaddressservice.getAllEmployeeAddress());
    } catch (error) {
      return next(error);
    }
  }
  /*
  private employeePOST = async(request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
        const data: any = {message: "Employee Post"};
        response.status(200);
        response.send(this.employeeservice.getResonseToPost());
    } catch(error) {
        return next(error);
    }
  }*/
}

export default EmployeeAddressController;