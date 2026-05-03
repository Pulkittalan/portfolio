import React, { useState } from 'react';
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

export default function About() {
  const [hoveredSocial, setHoveredSocial] = useState(null);

  const handleDownloadCV = () => {
    const blob = new Blob(["Demo CV"], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Resume.txt';
    link.click();
  };

  const socialLinks = [
    { name: 'LinkedIn', url: '#', icon: <FaLinkedin />, color: '#0077b5' },
    { name: 'GitHub', url: '#', icon: <FaGithub />, color: '#767676' },
    { name: 'LeetCode', url: '#', icon: <SiLeetcode />, color: '#f89f1b' }
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f8fafc',
        padding: 'clamp(20px, 5vw, 48px) clamp(16px, 4vw, 32px)',
        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif'
      }}
    >
      {/* CONTAINER */}
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        {/* CARD */}
        <div
          style={{
            background: 'white',
            borderRadius: '24px',
            padding: 'clamp(20px, 4vw, 48px)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            border: '1px solid #eef2f6'
          }}
        >

          {/* HEADER */}
          <div style={{ marginBottom: '24px' }}>
            <h1 style={{
              fontSize: 'clamp(24px, 5vw, 32px)',
              fontWeight: '600',
              color: '#111827'
            }}>
              About Me
            </h1>

            <p style={{
              fontSize: 'clamp(12px, 2.5vw, 14px)',
              color: '#6b7280',
              marginBottom: '16px'
            }}>
              My Introduction
            </p>

            <h2 style={{
              fontSize: 'clamp(18px, 4vw, 24px)',
              fontWeight: '600',
              color: '#111827'
            }}>
              Pulkit Kumar Talan
            </h2>
          </div>

          {/* EXPERIENCE */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            marginBottom: '20px'
          }}>
            <span style={{
              fontSize: 'clamp(36px, 10vw, 48px)',
              fontWeight: '700',
              color: '#4f46e5'
            }}>6</span>

            <span style={{ fontSize: 'clamp(16px, 4vw, 20px)' }}>months</span>
            <span style={{ fontSize: '14px', color: '#6b7280' }}>of</span>
            <span style={{ fontSize: 'clamp(16px, 4vw, 20px)', fontWeight: '600' }}>
              Experience
            </span>
          </div>

          {/* DESCRIPTION */}
          <p style={{
            fontSize: 'clamp(14px, 3vw, 15px)',
            lineHeight: '1.6',
            color: '#4b5563',
            marginBottom: '28px',
            maxWidth: '600px'
          }}>
            I am a passionate full-stack developer with expertise in web development and started learning mobile app development.
            I love solving complex problems and creating meaningful solutions through coding.
          </p>

          {/* STATS */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '28px'
          }}>
            {[
              { num: "5", label: "Projects", sub: "Completed" },
              { num: "2", label: "Happy", sub: "Clients" },
              { num: "25–30 hr/week", label: "Hours of", sub: "Coding" }
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  flex: '1 1 140px',
                  textAlign: 'center',
                  background: '#f9fafb',
                  padding: '16px',
                  borderRadius: '16px'
                }}
              >
                <div style={{ fontSize: '24px', fontWeight: '700', color: '#4f46e5' }}>
                  {item.num}
                </div>
                <div style={{ fontSize: '14px', marginTop: '6px' }}>
                  {item.label}
                </div>
                <div style={{ fontSize: '12px', color: '#9ca3af' }}>
                  {item.sub}
                </div>
              </div>
            ))}
          </div>

          {/* SOCIAL */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            marginBottom: '28px'
          }}>
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                onMouseEnter={() => setHoveredSocial(social.name)}
                onMouseLeave={() => setHoveredSocial(null)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  transform: hoveredSocial === social.name ? 'translateY(-6px) scale(1.05)' : 'none'
                }}
              >
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: hoveredSocial === social.name ? social.color : '#f3f4f6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px'
                }}>
                  {social.icon}
                </div>

                <span style={{ fontSize: '11px' }}>{social.name}</span>
              </a>
            ))}
          </div>

          {/* BUTTON */}
          <button
            onClick={handleDownloadCV}
            style={{
              width: '100%',
              maxWidth: '240px',
              background: '#4f46e5',
              color: 'white',
              padding: '12px 20px',
              borderRadius: '40px',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            Download CV ↓
          </button>

        </div>
      </div>
    </div>
  );
}