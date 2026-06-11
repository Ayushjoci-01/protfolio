import React, { useState } from 'react';
import { Mail, User, BookOpen, MessageSquare, Send, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: null });

    const payload = {
      ...formData,
      access_key: 'e0784380-0f3a-4086-a06b-38dab4306974',
      subject: `Portfolio Contact: ${formData.subject}`,
      from_name: formData.name,
      replyto: formData.email,
    };

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        setStatus({ submitting: false, success: true, error: null });
        setFormData({ name: '', email: '', subject: '', message: '' });
        
        // Trigger celebratory confetti!
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#66FCF1', '#45A29E', '#833AB4'],
        });
      } else {
        setStatus({
          submitting: false,
          success: false,
          error: result.message || 'Something went wrong. Please try again.',
        });
      }
    } catch (err) {
      setStatus({
        submitting: false,
        success: false,
        error: 'Network error. Please check your connection and try again.',
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="contact-container"
    >
      <header>
        <h2 className="h2 article-title">Contact Me</h2>
      </header>

      {status.success ? (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="contact-success-card"
        >
          <CheckCircle size={64} className="success-icon" />
          <h3>Message Sent Successfully!</h3>
          <p>Thank you for reaching out, Ayush will get back to you shortly.</p>
          <button 
            className="form-submit-btn" 
            onClick={() => setStatus((prev) => ({ ...prev, success: false }))}
            style={{ width: 'auto', marginTop: '20px' }}
          >
            Send Another Message
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="contact-form">
          <p className="contact-form-intro">
            Feel free to contact me for collaborations, inquiries, or just to say hello!
          </p>

          <div className="input-row">
            <div className="input-group">
              <label htmlFor="name">Name</label>
              <div className="input-wrapper">
                <User size={18} className="input-icon" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <Mail size={18} className="input-icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="subject">Subject</label>
            <div className="input-wrapper">
              <BookOpen size={18} className="input-icon" />
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What is this about?"
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="message">Message</label>
            <div className="input-wrapper text-area-wrapper">
              <MessageSquare size={18} className="input-icon text-area-icon" />
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                rows="6"
                required
              />
            </div>
          </div>

          {status.error && (
            <div className="form-error-message">
              {status.error}
            </div>
          )}

          <button
            type="submit"
            className="form-submit-btn"
            disabled={status.submitting}
          >
            {status.submitting ? (
              <span>Sending...</span>
            ) : (
              <>
                <span>Send Message</span>
                <Send size={16} />
              </>
            )}
          </button>
        </form>
      )}
    </motion.div>
  );
}
