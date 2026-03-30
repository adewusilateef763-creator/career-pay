import React, { useState } from "react";
import { Briefcase, Globe, Zap, Heart, Upload } from "lucide-react";

const Careers = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setUploadStatus(`File "${file.name}" selected`);
    } else {
      setSelectedFile(null);
      setUploadStatus("");
    }
  };
  const jobs = [
    {
      title: "Senior Full Stack Engineer",
      department: "Engineering",
      location: "Remote / New York",
      type: "Full-time"
    },
    {
      title: "Product Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time"
    },
    {
      title: "Financial Analyst",
      department: "Finance",
      location: "New York",
      type: "Full-time"
    },
    {
      title: "Customer Success Manager",
      department: "Operations",
      location: "Remote / London",
      type: "Full-time"
    }
  ];

  return (
    <section className="bg-white dark:bg-gray-900 pt-32 pb-16 px-6 lg:px-16 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Build the Future of <span className="text-blue-600">FinTech</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Join a mission-driven team dedicated to revolutionizing compensation and financial empowerment for employees worldwide.
          </p>
        </div>

        {/* Culture Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          <div className="p-8 bg-gray-50 dark:bg-gray-800 rounded-3xl text-center">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-2xl w-fit mx-auto mb-6">
              <Globe className="text-blue-600" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Remote First</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Work from anywhere in the world with our distributed team.</p>
          </div>
          <div className="p-8 bg-gray-50 dark:bg-gray-800 rounded-3xl text-center">
            <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-2xl w-fit mx-auto mb-6">
              <Zap className="text-green-600" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Fast Growth</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Join a high-growth startup and make a real impact daily.</p>
          </div>
          <div className="p-8 bg-gray-50 dark:bg-gray-800 rounded-3xl text-center">
            <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-2xl w-fit mx-auto mb-6">
              <Briefcase className="text-purple-600" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Ownership</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Every employee gets equity through our ESOP platform.</p>
          </div>
          <div className="p-8 bg-gray-50 dark:bg-gray-800 rounded-3xl text-center">
            <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-2xl w-fit mx-auto mb-6">
              <Heart className="text-red-600" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Wellness</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Comprehensive health benefits and unlimited PTO.</p>
          </div>
        </div>

        {/* Job Listings */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Open Positions</h2>
            <span className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-bold">
              {jobs.length} Openings
            </span>
          </div>

          <div className="space-y-6">
            {jobs.map((job, index) => (
              <div 
                key={index} 
                className="group p-8 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Briefcase size={16} /> {job.department}
                    </span>
                    <span className="flex items-center gap-1">
                      <Globe size={16} /> {job.location}
                    </span>
                    <span className="text-blue-600 font-medium">{job.type}</span>
                  </div>
                </div>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors whitespace-nowrap">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-32 bg-gray-900 dark:bg-blue-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-6">Don't see a perfect fit?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
          </p>
          <div className="relative inline-block">
            <button className="bg-white text-blue-600 px-10 py-4 rounded-2xl font-bold hover:bg-gray-100 transition-colors shadow-lg flex items-center gap-2">
              <Upload size={20} />
              {selectedFile ? "Resubmit Application" : "Send General Application"}
            </button>
            <input 
              type="file" 
              className="opacity-0 w-full h-full absolute inset-0 cursor-pointer" 
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
            />
          </div>
          {uploadStatus && <p className="mt-4 text-green-400">{uploadStatus}</p>}
        </div>
      </div>
    </section>
  );
};

export default Careers;
