import React from "react";

function Contact() {
  return (
    <div className="min-h-screen p-8 text-center">
      <h1 className="text-3xl font-bold">Get in Touch</h1>
      <p className="mt-4 max-w-2xl mx-auto">
        Have questions, feedback, or need assistance? Our team is here to help!
        Reach out to us, and we'll get back to you as soon as possible.
      </p>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Contact Information</h2>
        <ul className="text-left max-w-md mx-auto space-y-4 mt-4">
          <li className="flex items-center">
            <span className="mr-2">📍</span> 123 MG Road, Bengaluru, Karnataka,
            India
          </li>
          <li className="flex items-center">
            <span className="mr-2">📞</span> +91 98765 43210
          </li>
          <li className="flex items-center">
            <span className="mr-2">📧</span> support@mango.com
          </li>
          <li className="flex items-center">
            <span className="mr-2">⏰</span> Business Hours: Mon - Fri, 9 AM - 6
            PM
          </li>
        </ul>
      </div>

      <div className="mt-8 max-w-2xl mx-auto p-6">
        <h2 className="text-xl font-semibold">We'd Love to Hear from You!</h2>
        <p className="mt-2">
          Your feedback and inquiries matter to us. Whether it's a question
          about a product, a suggestion, or support, don’t hesitate to get in
          touch. We strive to provide the best customer experience possible.
        </p>
      </div>
    </div>
  );
}

export default Contact;
