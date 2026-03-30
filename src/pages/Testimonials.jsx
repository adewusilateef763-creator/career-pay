import React from "react";

const Testimonials = () => {
  const reviews = [
    {
      name: "John Smith",
      role: "HR Director, TechCorp",
      review: "CareerPay has completely transformed our payroll and ESOP management. The talent credit financing has also been a game-changer for our employees.",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      name: "Sarah Johnson",
      role: "CEO, Innovate Solutions",
      review: "The ease of use and the transparency of the CareerPay platform is unparalleled. Our team is more motivated than ever.",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
      name: "Michael Brown",
      role: "CFO, Global Ventures",
      review: "Managing complex compensation structures is now a breeze with CareerPay. Their support team is also top-notch.",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg"
    },
    {
      name: "Emily Davis",
      role: "Talent Acquisition Manager, FastGrow",
      review: "CareerPay has given us a competitive edge in attracting and retaining top talent with their innovative financial solutions.",
      avatar: "https://randomuser.me/api/portraits/women/4.jpg"
    },
    {
      name: "David Wilson",
      role: "Founder, Startup Hub",
      review: "For any startup looking to scale, CareerPay's ESOP management is a must-have tool. It's simplified our growth tremendously.",
      avatar: "https://randomuser.me/api/portraits/men/5.jpg"
    }
  ];

  return (
    <section className="bg-gray-50 dark:bg-gray-900 pt-32 pb-16 px-6 lg:px-16 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Clients Say
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            See how CareerPay is making a difference for organizations and their employees around the world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center mb-6">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-14 h-14 rounded-full mr-4 border-2 border-blue-500"
                />
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{testimonial.name}</h3>
                  <p className="text-sm text-blue-600 font-medium">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic leading-relaxed">
                "{testimonial.review}"
              </p>
              <div className="mt-6 flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-xl">★</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-blue-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-6">Ready to Join Them?</h2>
          <p className="text-xl mb-8 opacity-90">Experience the power of modern compensation management today.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors">
              Get Started Now
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-colors">
              Talk to Sales
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
