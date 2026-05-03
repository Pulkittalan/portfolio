// Journey.jsx - Fully Responsive Timeline
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const data = [
  { title: "Class 10th", year: "2020", desc: "Completed 10th Grade", side: "left" },
  { title: "Class 12th", year: "2023", desc: "Completed 12th Grade", side: "right" },
  { title: "B.Tech in Computer Science", year: "2023 – 2027", desc: "Pursuing Bachelor's Degree", side: "left" },
  { title: "Internship – Web Developer", year: "Feb 2024 – May 2024", desc: "P.K. Builders", side: "right" },
];

export default function Journey() {
  const ref = useRef(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={ref} className="relative overflow-hidden py-12 md:py-20 bg-white">
      <div className="text-center mb-8 md:mb-12 px-4">
        <p className="text-gray-600 text-base md:text-lg font-medium tracking-wide">
          My Educational Path
        </p>
        <h2 className="text-gray-800 text-3xl md:text-5xl font-bold tracking-wider">
          My Journey.
        </h2>
      </div>

      <div className="relative max-w-7xl mx-auto mt-8 md:mt-12 z-10 px-4">
        {/* Animated Line - hidden on mobile */}
        <motion.div
          style={{ height: lineHeight }}
          className="hidden md:block absolute left-1/2 top-0 w-[3px] bg-gradient-to-b from-[#f0a500] to-[#232631] transform -translate-x-1/2 origin-top rounded-full"
        />

        {data.map((item, i) => {
          const isLeft = item.side === "left";
          const progressPoint = i / data.length;

          const dotScale = useTransform(
            scrollYProgress,
            [progressPoint - 0.15, progressPoint],
            [0.6, 1.2]
          );

          const dotOpacity = useTransform(
            scrollYProgress,
            [progressPoint - 0.15, progressPoint],
            [0.4, 1]
          );

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ margin: "-100px" }}
              className={`relative flex items-center mb-8 md:mb-12 ${
                isLeft ? "justify-start" : "justify-end"
              }`}
            >
              {/* CARD - full width on mobile */}
              <motion.div
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                className={`w-full md:w-[45%] rounded-2xl shadow-xl p-4 md:p-6 bg-[#eaeaec] border border-gray-200 ${
                  isLeft ? "md:mr-auto" : "md:ml-auto"
                }`}
              >
                <h3 className="text-[#292929] text-lg md:text-[20px] font-bold tracking-[1px] md:tracking-[2px]">
                  {item.title}
                </h3>
                <p className="text-[#6b6b6b] text-xs md:text-[14px] font-semibold tracking-[1px] mt-1">
                  {item.year}
                </p>
                <p className="mt-2 text-[#292929] text-sm md:text-[14px]">
                  {item.desc}
                </p>
              </motion.div>

              {/* DOT NODE - hidden on mobile */}
              <motion.div
                style={{ scale: dotScale, opacity: dotOpacity }}
                className="hidden md:block absolute left-1/2 transform -translate-x-1/2"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    boxShadow: [
                      "0 0 0px rgba(240,165,0,0.3)",
                      "0 0 20px rgba(240,165,0,0.8)",
                      "0 0 0px rgba(240,165,0,0.3)",
                    ],
                  }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-10 h-10 bg-[#f0a500] rounded-full flex items-center justify-center"
                >
                  <span className="text-white text-sm font-bold">🎓</span>
                </motion.div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}