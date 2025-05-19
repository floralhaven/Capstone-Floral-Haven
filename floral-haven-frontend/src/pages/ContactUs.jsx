import React from 'react';
import '../style/Main.css';

const ContactPage = () => {
    return (
        <div className="contact-form">
            <h2>Contact Us</h2>
            <p>Have a question? Send us a email!</p>
            <form
                id="contact-form"
                action="https://formspree.io/f/movaagnl"
                method="POST"
            >
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="_replyto" required />

                <label htmlFor="subject">Subject</label>
                <input type="text" name="subject" id="subject" required />

                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="5" required />

                <button type="submit">Send Email</button>
            </form>
        </div>
    );
};

export default ContactPage;
