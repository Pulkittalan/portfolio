import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  {
    title: "UI/UX DESIGN",
    items: ["User Research", "Wireframes", "Prototyping"]
  },
  {
    title: "GRAPHIC DESIGN",
    items: ["Posters", "Brand Design", "Social Media"]
  },
  {
    title: "WEB DESIGN",
    items: [
      "Responsive Design",
      "Landing Pages",
      "Webflow Development",
      "Maintenance"
    ]
  },
  {
    title: "BRANDING",
    items: ["Logo", "Identity", "Guidelines"]
  }
];

export default function Services() {
  const [open, setOpen] = useState(2);

  return (
    <div className="px-16 py-20">
      {services.map((s, i) => (
        <div key={i} className="border-b py-6">

          <div
            className="flex justify-between cursor-pointer"
            onClick={() => setOpen(i)}
          >
            <h2 className="text-3xl font-semibold">
              {i + 1}. {s.title}
            </h2>
            <span>+</span>
          </div>

          <AnimatePresence>
            {open === i && (
              <motion.ul
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                className="overflow-hidden mt-4 space-y-2"
              >
                {s.items.map((item, idx) => (
                  <li key={idx} className="text-gray-600">
                    ✔ {item}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>

        </div>
      ))}
    </div>
  );
}