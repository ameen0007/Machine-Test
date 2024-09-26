import React, { useState, useEffect } from 'react';
import './employeeModal.scss';
import AOS from 'aos';
import 'aos/dist/aos.css';

export const EmployeeModal = ({ isOpen, onClose, mode, employeeData, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    contact: '',
    hiringDate: '',
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  // Email regex pattern for validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, [isOpen]);

  // Function to format the date to YYYY-MM-DD
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Load employee data for editing
  useEffect(() => {
    if (mode === 'edit' && employeeData) {
      console.log(employeeData,"dataaaaaa");
      
      setFormData({
        _id : employeeData._id || '', 
        name: employeeData.name || '',
        department: employeeData.department || '',
        contact: employeeData.contact || '',
        hiringDate: formatDate(employeeData.hiringDate),
      });
    } else {
      setFormData({
        name: '',
        department: '',
        contact: '',
        hiringDate: '',
      });
    }
  }, [mode, employeeData]);

  // Check form validity (ensures no fields are empty and contact is a valid email)
  useEffect(() => {
    const isValid = 
      Object.values(formData).every((value) => typeof value === 'string' && value.trim() !== '') && 
      emailRegex.test(formData.contact);
    
    setIsFormValid(isValid);
  }, [formData]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    validateField(name, value);
  };

  // Validate form fields
  const validateField = (name, value) => {
    let message = '';

    if (name === 'contact') {
      // Check if the contact field is a valid email using regex
      if (!emailRegex.test(value)) {
        message = 'Please enter a valid email address.';
      }
    } else if (!value) {
      message = `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: message,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    const excludedFields = ['__v', '_id', 'createdAt', 'updatedAt'];

    Object.keys(formData).forEach((key) => {
      if (!excludedFields.includes(key)) {
        validateField(key, formData[key]);
        if (!formData[key]) {
          newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required.`;
        }
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave(formData);
    onClose();
  };

  return (
    <div className={`modal-overlay ${isOpen ? 'show' : ''}`}>
      <div
        className={`modal-content ${isOpen ? 'show' : ''}`}
        data-aos={isOpen ? 'zoom-in' : 'zoom-out'}
        data-aos-duration="300"
      >
        <h2>{mode === 'edit' ? 'Edit Employee' : 'Add Employee'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="department">Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            />
            {errors.department && <div className="error-message">{errors.department}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="contact">Contact (Email)</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
            />
            {errors.contact && <div className="error-message">{errors.contact}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="hiringDate">Hiring Date</label>
            <input
              type="date"
              name="hiringDate"
              value={formData.hiringDate}
              onChange={handleChange}
              required
            />
            {errors.hiringDate && <div className="error-message">{errors.hiringDate}</div>}
          </div>
          <div className="modal-actions">
            <button type="submit" className="save-btn" disabled={!isFormValid}>
              {mode === 'edit' ? 'Save Changes' : 'Add Employee'}
            </button>
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
