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
    
    // Get EmailJS credentials from environment variables
    const serviceId = service_tzxgbqi
    const templateId = template_abrxt9l
    const publicKey = qjWhnWz3ioYy9OuWx
    
    // Check if environment variables are loaded
    if (!serviceId || !templateId || !publicKey) {
      setFormStatus({
        submitted: false,
        error: true,
        message: "Email service is not configured. Please contact us directly.",
        loading: false
      });
      return;
    }
    
    // Send email using EmailJS
    emailjs.sendForm(serviceId, templateId, form.current, publicKey)
      .then((result) => {
        console.log('EmailJS success:', result.text);
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
      })
      .catch((error) => {
        console.error('EmailJS error:', error);
        setFormStatus({
          submitted: false,
          error: true,
          message: "There was an error sending your message. Please try again later.",
          loading: false
        });
      });
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