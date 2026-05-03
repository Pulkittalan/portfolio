// App.jsx
import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Journey from "./components/Journey";
import Skills from "./components/Skills";

function CustomCursor() {
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const cursorX = useSpring(rawX, { stiffness: 300, damping: 28 });
  const cursorY = useSpring(rawY, { stiffness: 300, damping: 28 });

  useEffect(() => {
    const move = (e) => {
      rawX.set(e.clientX - 10);
      rawY.set(e.clientY - 10);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: cursorX,
          y: cursorY,
          width: 20,
          height: 20,
          borderRadius: "50%",
          backgroundColor: "#6366f1",
          pointerEvents: "none",
          zIndex: 99999,
          mixBlendMode: "difference",
        }}
      />
      <style>{`*, *::before, *::after { cursor: none !important; }`}</style>
    </>
  );
}

export default function App() {
  return (
    <div className="font-sans overflow-x-hidden w-full">
      <CustomCursor />
      <Navbar />

      <main className="w-full overflow-hidden">
        <section id="home" className="w-full">
          <Hero />
        </section>

        <section id="about" className="w-full">
          <About />
        </section>

        <section id="journey" className="w-full">
          <Journey />
        </section>

        <section id="skills" className="w-full">
          <Skills />
        </section>

        <section id="projects" className="w-full">
          <Projects />
        </section>

        <section id="contact" className="w-full">
          <Contact />
        </section>
      </main>

      <Footer />
    </div>
  );
}