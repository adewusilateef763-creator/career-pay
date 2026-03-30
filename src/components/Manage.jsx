import React from "react";
import { BsBuildingsFill } from "react-icons/bs";
import { FaPeopleGroup } from "react-icons/fa6";
import { RiUserCommunityFill } from "react-icons/ri";
import { motion } from "framer-motion";

const Manage = () => {
  const features = [
    {
      icon: <FaPeopleGroup className="text-3xl text-blue-500" />,
      title: "Early stage companies and startups",
      description: "They often face cash flow constraints but need to attract and retain skilled employees",
    },
    {
      icon: <BsBuildingsFill className="text-3xl text-blue-500" />,
      title: "Small & medium-scale enterprise (SME)",
      description: "This companies requires robust tools for managing payroll and equity as they scale.",
    },
    {
      icon: <RiUserCommunityFill className="text-3xl text-blue-500" />,
      title: "Large Scale Cooperations",
      description: "These companies require payroll management for their outsourced employees",
    },
  ];

  return (
    <section className="bg-black py-32 px-6 lg:px-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-blue-500 text-sm font-semibold tracking-[0.2em] uppercase mb-4 block"
          >
            Target Audience
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl lg:text-5xl font-bold text-white max-w-3xl mx-auto leading-tight"
          >
            Manage your future compensation in one space
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 border border-white/10 p-10 rounded-3xl hover:bg-white/10 transition-all duration-300 group cursor-default"
            >
              <div className="bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 leading-tight">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Manage;
