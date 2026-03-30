import React from "react";
import { motion } from "framer-motion";

const Help = () => {
  const stats = [
    { value: "100+", label: "Clients Served", color: "from-blue-400 to-blue-600" },
    { value: "₦5B+", label: "Payroll Processed", color: "from-purple-400 to-purple-600" },
    { value: "500+", label: "ESOP Managed", color: "from-blue-500 to-indigo-600" },
  ];

  return (
    <section className="bg-black py-32 px-6 lg:px-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl lg:text-5xl font-bold text-white mb-8 leading-tight"
            >
              Helping startups navigating financial challenges.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 text-lg lg:text-xl leading-relaxed"
            >
              We reached this milestone through innovation and commitment to our
              clients. Experience the impact first hand with our data-driven
              solutions.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 border border-white/10 p-8 rounded-3xl text-center group hover:bg-white/10 transition-all duration-300"
              >
                <h3 className={`text-4xl font-bold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}>
                  {stat.value}
                </h3>
                <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Help;
