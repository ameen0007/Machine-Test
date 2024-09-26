import Employee from '../../models/Employee.js'


export const getEmployees=async(req,res)=>{
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch employees' });
    }
}


export const createEmployee=async(req,res)=>{
    console.log("req",req.body);
    try {
        const employee = new Employee(req.body);
        console.log("employee:",employee)
        await employee.save();
        res.status(201).json(employee);
    } catch (err) {
        res.status(400).json({ error: 'Failed to create employee', message: err.message });
    }
};


export const updateEmployee=async(req,res)=>{
    try {
        console.log(req.body,"body");
        const employeeId=req.body._id;
        const employee = await Employee.findByIdAndUpdate(employeeId, req.body, { new: true });
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json(employee);
    } catch (err) {
        res.status(400).json({ error: 'Failed to update employee', message: err.message });
    }
}; 


export const deleteEmployee = async (req, res) => {
    console.log("Delete request received");
    console.log(req.params.id, "ID received");
  
    try {
      const employee = await Employee.findByIdAndDelete(req.params.id);
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete employee' });
    }
  };
  

