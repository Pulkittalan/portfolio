import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const navbarRef = useRef(null);

  const navItems = ["Home", "About", "Projects", "Blogs"];
  const sectionIds = ["home", "about", "projects", "blogs"];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "projects", "blogs"];
      const scrollPos = window.scrollY + 150;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const { offsetTop, offsetHeight } = el;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActive(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.div
        ref={navbarRef}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 
        w-[95%] md:w-fit px-4 md:px-6 py-2 
        flex items-center justify-between md:justify-center gap-4
        rounded-full bg-white/90 backdrop-blur-lg border shadow-md"
      >
        <img
          src="/smallprofile.png"
          className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-indigo-500"
        />

        {/* Desktop */}
        <div className="hidden md:flex gap-6">
          {navItems.map((item, i) => (
            <button
              key={item}
              onClick={() => scrollTo(sectionIds[i])}
              className={`text-sm ${
                active === sectionIds[i]
                  ? "text-black font-semibold"
                  : "text-gray-500"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Mobile button */}
        <button
          className="md:hidden text-xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </motion.div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 w-[90%] bg-white shadow-xl rounded-xl flex flex-col items-center py-4 z-40 md:hidden">
          {navItems.map((item, i) => (
            <button
              key={item}
              onClick={() => {
                scrollTo(sectionIds[i]);
                setMenuOpen(false);
              }}
              className="py-3 text-gray-700"
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </>
  );
}