import React from "react";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";

const Partners = () => {
  const partners = [
    { src: "/image8.png", alt: "Spectranet" },
    { src: "/image9.png", alt: "Partner 2" },
    { src: "/image10.png", alt: "CreditPRO" },
    { src: "/image11.png", alt: "Dega" },
    { src: "/image13.png", alt: "Uridium Technologies" },
    { src: "/image14.png", alt: "Partner 6" },
  ];

  return (
    <section className="bg-black py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <p className="text-gray-500 uppercase tracking-[0.2em] text-sm font-semibold">
          Trusted by Industry Leaders
        </p>
      </div>

      <div className="relative">
        {/* Gradient overlays for smooth fading */}
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        <Marquee speed={40} gradient={false} pauseOnHover={true}>
          {partners.map((partner, index) => (
            <div key={index} className="mx-12 lg:mx-20 opacity-40 hover:opacity-100 transition-opacity duration-300">
              <img
                src={partner.src}
                alt={partner.alt}
                className="h-10 lg:h-12 w-auto grayscale brightness-200"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default Partners;
