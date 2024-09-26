import React, { useEffect, useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import axios from 'axios';
import './admindashboard.scss';
import { EmployeeModal } from '../components/EmployeeModal';

export const AdminDashboard = () => {
    const [employees, setEmployees] = useState([]); 
    const [modalOpen, setModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState(null);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('https://machine-test-production.up.railway.app/api/employees');
            console.log(response.data, "getdata");
            setEmployees(response.data); 
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const openAddModal = () => {
        setEditMode(false);
        setCurrentEmployee(null);
        setModalOpen(true);
    };

    const openEditModal = (employee) => {
        setEditMode(true);
        setCurrentEmployee(employee);
        setModalOpen(true);
        console.log(employee,"inside ");
        
    };

    const handleDelete = async (id) => {
        try {
            console.log(id, "id");
            await axios.delete(`https://machine-test-production.up.railway.app/api/employees/delete-employee/${id}`); 
            fetchEmployees(); // Refresh employees after deletion
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleSave = async (employee) => {
        if (editMode) {
            // Update employee on the backend
            console.log(employee,"employee");
            
            await axios.put(`https://machine-test-production.up.railway.app/api/employees/update-employee`, employee);
            fetchEmployees();
        } else {
            // Add employee on the backend
            const response = await axios.post('https://machine-test-production.up.railway.app/api/employees/create-employee', employee);
            setEmployees([...employees, response.data]); 
        }
        setModalOpen(false);
    };

    return (
        <>
            <div className="admin-dashboard">
                <div className="heading">
                    <div className="left-section">Company Employees</div>
                    <div className="right-section">
                        <button className="add-employee" onClick={openAddModal}>Add Employee</button>
                    </div>
                </div>

                {/* Conditional Rendering based on the presence of employees */}
                {employees.length > 0 ? (
                    <div className="box">
                        <div className="details-header">
                            <div>ID</div>
                            <div>Name</div>
                            <div>Department</div>
                            <div>Contact</div>
                            <div>Hiring Date</div>
                            <div>Actions</div>
                        </div>
                        {employees.map((employee, index) => (
                            <div key={employee._id} className="employee-row">
                                <div>{index + 1}</div>
                                <div className="employee-name">
                                    <span>{employee.name}</span>
                                </div>
                                <div>{employee.department}</div>
                                <div>{employee.contact}</div>
                                <div>{new Date(employee.hiringDate).toLocaleDateString()}</div> {/* Format the hiring date */}
                                <div className="actions">
                                    <button className="edit-button" onClick={() => openEditModal(employee)}><FaEdit /></button>
                                    <button className="delete-button" onClick={() => handleDelete(employee._id)}><FaTrash /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="no-employees">
                        <h1 style={{ fontSize : '15px' , textAlign :'center'}}>No Employees</h1>
                    </div>
                )}

                {modalOpen && (
                    <EmployeeModal
                        isOpen={modalOpen}
                        onClose={handleModalClose}
                        onSave={handleSave}
                        employeeData={currentEmployee}
                        mode={editMode ? 'edit' : 'add'}
                    />
                )}
            </div>
        </>
    );
};
