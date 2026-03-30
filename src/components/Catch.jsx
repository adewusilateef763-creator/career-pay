import React from "react";
import { motion } from "framer-motion";

const Catch = () => {
  return (
    <section className="bg-black py-20 px-6 lg:px-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto bg-gradient-to-br from-blue-600 to-blue-800 rounded-[3rem] p-12 lg:p-24 relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/20 blur-2xl rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-8 leading-tight">
              Access borderless financial management in one digital space
            </h2>
            <p className="text-blue-100 text-lg lg:text-xl font-medium leading-relaxed opacity-90">
              Break free from traditional compensation limitations. Career Pay
              eliminates the barriers between ambition and achievement, creating
              seamless pathways for businesses to reward talent.
            </p>
          </div>
          <div className="flex justify-center lg:justify-end">
            <img
              src="/bounds.svg"
              alt="Borderless Finance"
              className="w-full max-w-md h-auto object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Catch;
