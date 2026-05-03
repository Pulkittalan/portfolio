import { useRef, useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";

export default function Hero() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const shadowRef = useRef(null);
  const rafRef = useRef(null);
  const currentProgressRef = useRef(0);
  const [badgeState, setBadgeState] = useState("hi");
  const badgeRef = useRef(null);
  
  // Track window width for responsive animation logic
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  useEffect(() => {
    function updateTransform() {
      if (!containerRef.current) return;

      let targetProgress = scrollYProgress.get();
      currentProgressRef.current += (targetProgress - currentProgressRef.current) * 0.05;
      const clampedProgress = Math.min(1, Math.max(0, currentProgressRef.current));
      const eased = Math.pow(clampedProgress, 1.5);

      // Animation values
      const rotateY = eased * 180;
      const rotateZ = -eased * 5;
      const rotateX = -eased * 4;

      // ✅ FIX: Keep moveX at 0 for mobile to prevent image movement[cite: 4]
      const moveX = isMobile ? 0 : eased * 400;
      const moveY = eased * 500;
      const depth = eased * 100;

      containerRef.current.style.transform = isMobile
        ? "none"
        : `
    translate(${moveX}px, ${moveY}px)
    rotateY(${rotateY}deg)
    rotateZ(${rotateZ}deg)
    rotateX(${rotateX}deg)
    translateZ(${depth}px)
  `;

      if (shadowRef.current) {
        shadowRef.current.style.transform = `
          translate(${moveX * 0.8}px, ${moveY * 0.8}px)
          translateZ(-80px)
          scale(${1 + eased * 0.25})
        `;
        shadowRef.current.style.opacity = String(0.2 + eased * 0.4);
      }

      if (badgeRef.current) {
        badgeRef.current.style.transform = `
          translate(${moveX}px, ${moveY}px)
          translateZ(${depth}px)
        `;
        badgeRef.current.style.opacity = clampedProgress > 0.6 ? "0" : "1";
      }

      rafRef.current = requestAnimationFrame(updateTransform);
    }

    rafRef.current = requestAnimationFrame(updateTransform);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [scrollYProgress, isMobile]);

  useEffect(() => {
    const loop = () => {
      setBadgeState("hi");
      setTimeout(() => setBadgeState("wave"), 3000);
      setTimeout(() => setBadgeState("hi"), 5000);
    };
    loop();
    const interval = setInterval(loop, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={sectionRef} style={{ height: "85vh", position: "relative", marginTop: isMobile ? "0px" : "-180px" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "visible",
          padding: "0 24px",
          perspective: "1400px",
          perspectiveOrigin: "center center",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "1280px",
            right: "3%",
            display: "grid",
            // Stacks vertically on mobile, 3-columns on desktop[cite: 4, 7]
            gridTemplateColumns: isMobile ? "1fr" : "1fr 420px 1fr",
            alignItems: "center",
            gap: isMobile ? "20px" : "0px",
          }}
        >
          {/* LEFT - SOFTWARE */}
          <div style={{ textAlign: isMobile ? "center" : "left", zIndex: 10 }}>
            <motion.p
              className="tracking-widest text-gray-500"
              style={{ fontSize: "clamp(10px, 1vw, 13px)", marginBottom: "8px" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Pulkit Kumar TALAN
            </motion.p>
            <motion.h1
              className="font-oswald font-bold leading-none"
              style={{ fontSize: "clamp(40px, 8vw, 90px)", lineHeight: "0.9" }}
            >
              SOFTWARE
            </motion.h1>
          </div>

          {/* CENTER - Image Container */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              minHeight: isMobile ? "320px" : "500px",
              zIndex: 5,
            }}
          >
            <div
              ref={shadowRef}
              style={{
                position: "absolute",
                width: isMobile ? "220px" : "320px",
                height: isMobile ? "300px" : "430px",
                background: "rgba(255, 255, 255, 0.4)",
                filter: "blur(40px)",
                borderRadius: "20px",
                opacity: 0.2,
                pointerEvents: "none",
              }}
            />

            <div
              ref={containerRef}
              style={{
                width: isMobile ? "220px" : "320px",
                height: isMobile ? "300px" : "430px",
                position: "relative",
                transformStyle: "preserve-3d",
                // Keep image centered on mobile[cite: 4]
                marginLeft: isMobile ? "0" : "30px", 
                marginBottom: isMobile ? "0" : "-120px",
              }}
            >
              {/* Floating Badge */}
              <motion.div
                ref={badgeRef}
                style={{
                  position: "absolute",
                  width: isMobile ? "60px" : "80px",
                  height: isMobile ? "60px" : "80px",
                  borderRadius: "50%",
                  background: "rgb(106,113,223)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  zIndex: 10,
                  left: isMobile ? "-20px" : "calc(50% - 120px)",
                  top: isMobile ? "20px" : "calc(50% + 80px)",
                }}
              >
                {badgeState === "hi" ? (
                  <span style={{ fontSize: isMobile ? "20px" : "28px" }}>Hi</span>
                ) : (
                  <motion.img
                    src="/hand.svg"
                    alt="wave"
                    animate={{ rotate: [0, 20, -10, 20, 0] }}
                    style={{ width: "60%", height: "60%" }}
                  />
                )}
              </motion.div>

              {/* Images[cite: 4] */}
              <div style={{ position: "absolute", inset: 0, borderRadius: "20px", overflow: "hidden", zIndex: 1, boxShadow: "0 20px 50px rgba(0,0,0,0.2)" }}>
                <img src="/background-image.png" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ position: "absolute", inset: 0, borderRadius: "20px", backfaceVisibility: "hidden", zIndex: 2 }}>
                <img src="/test5.png" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "20px" }} />
              </div>
              <div style={{ position: "absolute", inset: 0, borderRadius: "20px", backfaceVisibility: "hidden", transform: "rotateY(180deg)", zIndex: 2 }}>
                <img src="/test2.png" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "20px" }} />
              </div>
            </div>
          </div>

          {/* RIGHT - DEVELOPER */}
          <div style={{ textAlign: isMobile ? "center" : "right", zIndex: 10 }}>
            <motion.h1
              className="font-oswald font-bold leading-none"
              style={{ fontSize: "clamp(40px, 8vw, 90px)", lineHeight: "0.9" }}
            >
              DEVELOPER
            </motion.h1>
            <motion.p
              style={{
                marginTop: "10px",
                fontSize: "14px",
                maxWidth: isMobile ? "100%" : "340px",
                marginLeft: "auto",
                lineHeight: "1.5",
                color: "#4b5563"
              }}
            >
              Detail-oriented developer creating user-friendly digital experiences.
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  );
}