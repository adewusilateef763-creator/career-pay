import React from "react";
import Partners from "./Partners";
import { motion } from "framer-motion";

const OurPartners = () => {
  return (
    <section className="bg-black px-6 lg:px-20 py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl lg:text-5xl font-bold text-white mb-6"
        >
          Our Partners
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-gray-400 text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed"
        >
          We’ve proferred solutions to market leading providers in the variety
          of clients providing efficient solutions specifically for the digital
          economy.
        </motion.p>
      </div>
      <div className="relative">
        <Partners />
      </div>
    </section>
  );
};

export default OurPartners;
