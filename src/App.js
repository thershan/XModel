// App.js
import React, { useState } from 'react';
import './App.css'; // Add necessary CSS for modal

const XModal = () => {
  const [isOpen, setIsOpen] = useState(false); // Modal open/close state
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    dob: '',
    phone: '',
  });
  const [errors, setErrors] = useState({}); // For error tracking

  // Open/close modal
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Validate email format
  const validateEmail = (email) => {
    return email.includes('@');
  };

  // Validate phone number (should be exactly 10 digits)
  const validatePhone = (phone) => {
    return phone.length === 10 && /^\d+$/.test(phone);
  };

  // Validate Date of Birth (should not be a future date)
  const validateDOB = (dob) => {
    const currentDate = new Date();
    const enteredDate = new Date(dob);
    return enteredDate <= currentDate;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    // Check if all fields are filled
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.dob) newErrors.dob = 'Date of Birth is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';

    // Additional validations
    if (formData.email && !validateEmail(formData.email)) {
      alert('Invalid email. Please check your email address.');
      return;
    }
    if (formData.phone && !validatePhone(formData.phone)) {
      alert('Invalid phone number. Please enter a 10-digit phone number.');
      return;
    }
    if (formData.dob && !validateDOB(formData.dob)) {
      alert('Invalid date of birth. Please enter a valid date.');
      return;
    }

    if (Object.keys(newErrors).length === 0) {
      // No errors - Close the modal and reset form
      closeModal();
      setFormData({ username: '', email: '', dob: '', phone: '' });
      setErrors({});
    } else {
      // Show errors
      setErrors(newErrors);
    }
  };

  return (
    <div>
      <button onClick={openModal}>Open Form</button>
      
      {isOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Modal Form</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                />
                {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
              </div>
              <div>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="dob">Date of Birth:</label>
                <input
                  type="date"
                  id="dob"
                  value={formData.dob}
                  onChange={handleChange}
                />
                {errors.dob && <p style={{ color: 'red' }}>{errors.dob}</p>}
              </div>
              <div>
                <label htmlFor="phone">Phone Number:</label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && <p style={{ color: 'red' }}>{errors.phone}</p>}
              </div>
              <button type="submit" className="submit-button">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default XModal;
