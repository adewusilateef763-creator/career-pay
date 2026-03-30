import React from "react";
import { Search, Book, Shield, Users, CreditCard, LifeBuoy } from "lucide-react";

const HelpCenter = () => {
  const categories = [
    {
      title: "Getting Started",
      description: "Learn how to set up your account and start managing your compensation.",
      icon: <Book size={32} className="text-blue-600" />
    },
    {
      title: "Account Security",
      description: "Manage your password, 2FA, and secure your financial data.",
      icon: <Shield size={32} className="text-green-600" />
    },
    {
      title: "Payroll Management",
      description: "Everything you need to know about processing payroll and managing taxes.",
      icon: <CreditCard size={32} className="text-purple-600" />
    },
    {
      title: "ESOP Administration",
      description: "Guide to managing employee stock ownership plans and vesting schedules.",
      icon: <Users size={32} className="text-orange-600" />
    },
    {
      title: "Talent Credit Financing",
      description: "Understanding how early compensation access works for your employees.",
      icon: <LifeBuoy size={32} className="text-red-600" />
    }
  ];

  return (
    <section className="bg-gray-50 dark:bg-gray-900 pt-32 pb-16 px-6 lg:px-16 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-8">
            Help Center
          </h1>
          <div className="max-w-2xl mx-auto relative group">
            <input 
              type="text" 
              className="w-full px-6 py-5 rounded-2xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white shadow-lg focus:ring-4 focus:ring-blue-500/20 outline-none pl-16 text-lg transition-all duration-300 group-hover:shadow-xl"
              placeholder="Search for articles, guides, or questions..."
            />
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-blue-600 transition-colors" size={24} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {categories.map((category, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 cursor-pointer transform hover:-translate-y-2"
            >
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-2xl w-fit mb-6">
                {category.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {category.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {category.description}
              </p>
              <button className="mt-6 text-blue-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all duration-200">
                Learn more <span>→</span>
              </button>
            </div>
          ))}
        </div>

        <div className="bg-blue-600 rounded-3xl p-12 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-6">Can't find what you're looking for?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Our dedicated support team is available 24/7 to help you with any questions or issues you might have.
            </p>
            <button className="bg-white text-blue-600 px-10 py-4 rounded-2xl font-bold hover:bg-gray-100 transition-colors shadow-lg">
              Talk to a Specialist
            </button>
          </div>
          {/* Decorative element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>
        </div>
      </div>
    </section>
  );
};

export default HelpCenter;
