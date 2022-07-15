/**
 * Wraps Controllers for easy import from other modules
 */
import HealthController from "./HealthController";
import EmployeeController from "./EmployeeController";
import { EmployeeService } from "../service/EmployeeService";
import DeptController from "./DepartmentController";
import { EmployeeRespository } from "../repository/EmployeeRepository";
import { DeptRespository } from "../repository/DeptRepository";
import { DeptService } from "../service/DeptService";
import EmployeeAddressController from "./EmployeeAddressConstroller";
import { EmployeeAddressRepository } from "../repository/EmployeeAddressRepository";
import { EmployeeAddressService } from "../service/EmployeeAddresServices";
export default [
  new HealthController(),
  new EmployeeController(new EmployeeService(new EmployeeRespository(), new EmployeeAddressRepository()), new EmployeeAddressService(new EmployeeAddressRepository())),
  new DeptController(new DeptService(new DeptRespository())),
  new EmployeeAddressController(new EmployeeAddressService(new EmployeeAddressRepository())),
  
];
export const enum Users{
  ADMIN = "admin",
  HR = "hr",
  MANAGER = "manager",
  ENGINEER = "engineer"

}
