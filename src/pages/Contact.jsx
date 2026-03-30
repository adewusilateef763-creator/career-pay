import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simulate success or error
    const isSuccess = Math.random() > 0.2;
    if (isSuccess) {
      setStatus("Message sent successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: "General Inquiry",
        message: "",
      });
    } else {
      setStatus("Failed to send message. Please try again.");
    }
  };
  return (
    <section className="bg-white dark:bg-gray-900 pt-32 pb-16 px-6 lg:px-16 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have questions about CareerPay? Our team is here to help you navigate your financial journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center lg:text-left">
                Contact Information
              </h2>
              <div className="space-y-8">
                <div className="flex items-start p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 transition-transform hover:scale-105">
                  <div className="bg-blue-600 p-4 rounded-xl text-white mr-6">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Email Us</h3>
                    <p className="text-gray-600 dark:text-gray-400">info@careersverified.net</p>
                    
                  </div>
                </div>

                <div className="flex items-start p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 transition-transform hover:scale-105">
                  <div className="bg-blue-600 p-4 rounded-xl text-white mr-6">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Call Us</h3>
                    <p className="text-gray-600 dark:text-gray-400">+234 9132925167</p>
                    <p className="text-gray-600 dark:text-gray-400">+234 9058771713</p>
                    <p className="text-gray-600 dark:text-gray-400">Mon-Fri: 9am - 6pm EST</p>
                  </div>
                </div>

                <div className="flex items-start p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 transition-transform hover:scale-105">
                  <div className="bg-blue-600 p-4 rounded-xl text-white mr-6">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Our Office</h3>
                    <p className="text-gray-600 dark:text-gray-400"></p>
                    <p className="text-gray-600 dark:text-gray-400"></p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Send us a Message</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">First Name</label>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Last Name</label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                <select name="subject" value={formData.subject} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none">
                  <option>General Inquiry</option>
                  <option>Sales Inquiry</option>
                  <option>Technical Support</option>
                  <option>Billing Question</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                <textarea name="message" value={formData.message} onChange={handleChange} rows="4" className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" placeholder="How can we help you?" required></textarea>
              </div>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2">
                {status === "Sending..." ? "Sending..." : "Send Message"} <Send size={20} />
              </button>
              {status && <p className={`text-center mt-4 ${status.includes("Failed") ? "text-red-500" : "text-green-500"}`}>{status}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
