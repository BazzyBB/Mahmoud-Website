import React, { useState, useRef } from "react";
import emailjs from '@emailjs/browser';
import { useAnalytics } from "../hooks/useAnalytics.js";
import SEOHead from "../Components/SEOHead.jsx";

export default function ContactUs() {
  const form = useRef();
  const { trackFormSubmission, trackButtonClick } = useAnalytics();
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
    
    // Get EmailJS credentials (hardcoded)
    const serviceId = 'service_tzxgbqi';
    const templateId = 'template_abrxt9l';
    const publicKey = 'qjWhnWz3ioYy9OuWx';
    
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
        
        // Track successful form submission
        trackFormSubmission('contact_form', true);
        
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
        
        // Track failed form submission
        trackFormSubmission('contact_form', false);
      });
  };
  
  return (
    <>
      <SEOHead 
        title="Contact Live Wood Studio - Dallas Custom Woodworking"
        description="Contact Live Wood Studio in Dallas, Texas for custom woodworking projects. Diamond setting benches, live-edge tables, and custom cabinets. Call (469)-888-1330."
        canonical="/ContactUs"
      />
      <main className="contact-page-container" role="main">
        <div className="contact-page-header">
          <h1>Contact Us</h1>
        <p>We'd love to hear from you! Please complete the form below and we'll get back to you as soon as possible.</p>
      </div>
      
      {formStatus.submitted ? (
        <div className="form-success-message" role="status" aria-live="polite">
          <h2>Thank You!</h2>
          <p>{formStatus.message}</p>
          <button 
            className="new-message-btn"
            onClick={() => {
              setFormStatus({...formStatus, submitted: false});
              trackButtonClick('send_another_message', '/ContactUs');
            }}
            aria-label="Send another message"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <div className="contact-form-container">
          {formStatus.error && (
            <div className="form-error-message" role="alert" aria-live="assertive">
              <p>{formStatus.message}</p>
            </div>
          )}
          
          <form className="contact-form" ref={form} onSubmit={handleSubmit} noValidate>
            <fieldset>
              <legend className="sr-only">Contact Information</legend>
              
              <div className="form-group">
                <label htmlFor="name">Name <span className="required" aria-label="required">*</span></label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  aria-describedby="name-error"
                  aria-invalid={formStatus.error && !formData.name}
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
                  aria-describedby="phone-help"
                />
                <div id="phone-help" className="sr-only">Optional - include area code</div>
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email <span className="required" aria-label="required">*</span></label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  aria-describedby="email-error"
                  aria-invalid={formStatus.error && !formData.email}
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
                  aria-describedby="subject-help"
                />
                <div id="subject-help" className="sr-only">Optional - brief description of your inquiry</div>
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Request <span className="required" aria-label="required">*</span></label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  aria-describedby="message-help message-error"
                  aria-invalid={formStatus.error && !formData.message}
                ></textarea>
                <div id="message-help" className="sr-only">Please describe your custom woodworking or cabinet needs</div>
              </div>
            </fieldset>
            
            <button 
              type="submit" 
              className={`submit-button ${formStatus.loading ? 'loading' : ''}`}
              disabled={formStatus.loading}
              aria-describedby={formStatus.loading ? "submit-loading" : undefined}
            >
              {formStatus.loading ? (
                <>
                  <span aria-hidden="true">Sending...</span>
                  <span id="submit-loading" className="sr-only">Please wait while we send your message</span>
                </>
              ) : (
                'Send Message'
              )}
            </button>
          </form>
        </div>
      )}
    </main>
    </>
  );
}