import express from 'express';
import { createEmployee, deleteEmployee, getEmployees,updateEmployee } from '../controllers/employeeController.js';
import { validateEmployee } from '../middlewares/validationMiddleware.js';
const employeeRouter=express.Router();

employeeRouter.get('/',getEmployees);
employeeRouter.post('/create-employee',validateEmployee,createEmployee);
employeeRouter.put('/update-employee',validateEmployee,updateEmployee);
employeeRouter.delete('/delete-employee/:id',deleteEmployee);


export default employeeRouter;