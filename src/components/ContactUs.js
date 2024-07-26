// src/components/ContactUs.js
import React, { useState } from "react";
import axios from "axios";
import "../styles/ContactUs.css";

const ContactUs = () => {
  const [subject, setSubject] = useState("Pertanyaan");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/contact", {
        subject,
        name,
        phone,
        email,
        message,
      });

      if (response.status === 200) {
        setSuccess("Message sent successfully!");
        setSubject("Pertanyaan");
        setName("");
        setPhone("");
        setEmail("");
        setMessage("");
      }
    } catch (error) {
      setError("Error sending message: " + error.message);
    }
  };

  return (
    <div className="contact-us-container">
      <h2>Hubungi Kami</h2>
      <p>
        Pertanyaan, saran atau keluhan dapat disampaikan melalui: Customer
        service Line kami di <strong>0 000 000</strong> (berlaku tarif lokal)
        hari senin sampai minggu dari jam <strong>10:00</strong> sampai jam{" "}
        <strong>22:00</strong>
      </p>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="subject">Subject *</label>
          <select
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          >
            <option value="Pertanyaan">Pertanyaan</option>
            <option value="Saran">Saran</option>
            <option value="Keluhan">Keluhan</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone *</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message *</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ContactUs;
