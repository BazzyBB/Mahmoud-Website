import React, { useState, useRef } from "react";
import emailjs from '@emailjs/browser';

export default function ContactUs() {
  const form = useRef();
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: "",
    loading: false
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        submitted: false,
        error: true,
        message: "Please fill out all required fields.",
        loading: false
      });
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus({
        submitted: false,
        error: true,
        message: "Please enter a valid email address.",
        loading: false
      });
      return;
    }
    
    // Set loading state
    setFormStatus({
      submitted: false,
      error: false,
      message: "",
      loading: true
    });
    
    // Replace these with your actual EmailJS service details
    // You'll get these when you set up your EmailJS account
    const serviceId = 'service_lh789q5';
    const templateId = 'template_d05c97y';
    const publicKey = 'JZrmi4-aYProMXZE6';
    
    // For now, simulate successful form submission
    // In a real implementation, you would use EmailJS here
    setTimeout(() => {
      setFormStatus({
        submitted: true,
        error: false,
        message: "Thank you for your message! We'll get back to you soon.",
        loading: false
      });
      
      // Reset form after successful submission
      setFormData({
        name: "",
        phoneNumber: "",
        email: "",
        subject: "",
        message: ""
      });
    }, 1000);
  };
  
  return (
    <div className="contact-page-container">
      <div className="contact-page-header">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you! Please complete the form below and we'll get back to you as soon as possible.</p>
      </div>
      
      {formStatus.submitted ? (
        <div className="form-success-message">
          <h2>Thank You!</h2>
          <p>{formStatus.message}</p>
          <button 
            className="new-message-btn"
            onClick={() => setFormStatus({...formStatus, submitted: false})}
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <div className="contact-form-container">
          {formStatus.error && (
            <div className="form-error-message">
              <p>{formStatus.message}</p>
            </div>
          )}
          
          <form className="contact-form" ref={form} onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name <span className="required">*</span></label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email <span className="required">*</span></label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Request <span className="required">*</span></label>
              <textarea
                id="message"
                name="message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className={`submit-button ${formStatus.loading ? 'loading' : ''}`}
              disabled={formStatus.loading}
            >
              {formStatus.loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}