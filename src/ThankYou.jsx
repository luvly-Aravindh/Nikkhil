import { useEffect, useState } from "react";
import { CONTACT } from "./data.js";

export default function ThankYou() {
  const [waLink, setWaLink] = useState(`https://wa.me/${CONTACT.whatsapp}`);
  const [userName, setUserName] = useState("");

  useEffect(() => {

  }, []);

  useEffect(() => {
    // 2. Parse URL parameters
    if (typeof window !== "undefined" && window.location.search) {
      const params = new URLSearchParams(window.location.search);
      const waParam = params.get("wa");
      const nameParam = params.get("name");

      if (nameParam) {
        setUserName(nameParam);
      }

      if (waParam) {
        setWaLink(waParam);
      } else if (nameParam) {
        const defaultMsg = `Hi Nikhil, I have submitted my property details on your website. Name: ${nameParam}`;
        setWaLink(`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(defaultMsg)}`);
      } else {
        const defaultMsg = "Hi Nikhil, I would like to list my property.";
        setWaLink(`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(defaultMsg)}`);
      }
    } else {
      const defaultMsg = "Hi Nikhil, I would like to list my property.";
      setWaLink(`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(defaultMsg)}`);
    }
  }, []);

  return (
    <div className="ty-wrapper">
      <div className="ty-shell">
        <section className="ty-card" id="thankCard">
          <div className="ty-content">
            <div className="ty-eyebrow">
              <span className="ty-pulse"></span> List With Nikhil
            </div>

            <h1 className="ty-h1">Thank you{userName ? `, ${userName}` : ""}</h1>
            <p className="ty-tagline">Your property details are ready for Nikhil.</p>

            <p className="ty-body">
              Your property details are ready for Nikhil. Send them across and he will call you personally.
            </p>

            <div className="ty-actions">
              <a
                href={waLink}
                className="ty-btn ty-btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Send details on WhatsApp</span>
                <span className="ty-arw">&#8594;</span>
              </a>

              <a href="/" className="ty-btn ty-btn-secondary">
                &#8592; Back to Home
              </a>
            </div>

            <p className="ty-micro">
              Nikhil Bora &middot; Private Residential Advisory, Mumbai
            </p>
          </div>

          <div className="ty-visual">
            <div className="ty-ring">
              <div className="ty-inner">
                <img
                  src="/img/img-18.png"
                  alt="Nikhil Bora Realtor"
                  className="ty-side-logo"
                />
              </div>
              <div className="ty-check-badge">&#10003;</div>
            </div>
          </div>
        </section>
      </div>

      <style>{`
        .ty-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          font-family: 'Jost', 'Plus Jakarta Sans', sans-serif;
          background: linear-gradient(135deg, #121312 0%, #1a1917 50%, #23201a 100%);
          color: #ece7de;
          box-sizing: border-box;
        }

        .ty-shell {
          width: min(100%, 1050px);
          margin: 0 auto;
        }

        .ty-card {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          background: rgba(26, 25, 23, 0.95);
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(192, 162, 120, 0.18);
          border: 1px solid rgba(255, 255, 255, 0.08);
          animation: tyFadeUp 0.8s ease forwards;
        }

        .ty-content {
          padding: 60px 52px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .ty-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 16px;
          border-radius: 999px;
          background: rgba(192, 162, 120, 0.12);
          border: 1px solid rgba(192, 162, 120, 0.35);
          color: #ddc18b;
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          margin-bottom: 22px;
          width: fit-content;
        }

        .ty-pulse {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #c0a278;
          box-shadow: 0 0 0 rgba(192, 162, 120, 0.6);
          animation: tyPulse 1.8s infinite;
        }

        @keyframes tyPulse {
          70% {
            box-shadow: 0 0 0 10px rgba(192, 162, 120, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(192, 162, 120, 0);
          }
        }

        .ty-h1 {
          font-size: clamp(2.4rem, 4.8vw, 3.8rem);
          line-height: 1.08;
          margin-bottom: 12px;
          font-weight: 600;
          letter-spacing: -0.01em;
          color: #FAF7F1;
        }

        .ty-tagline {
          font-size: 1.18rem;
          color: #ddc18b;
          font-weight: 500;
          margin-bottom: 18px;
          letter-spacing: 0.01em;
        }

        .ty-body {
          font-family: 'Jost', 'DM Sans', sans-serif;
          color: #b7b0a3;
          font-size: 1.05rem;
          line-height: 1.75;
          max-width: 520px;
          margin-bottom: 32px;
          font-weight: 300;
        }

        .ty-actions {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: 24px;
        }

        .ty-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 16px 28px;
          border-radius: 14px;
          font-family: 'Jost', sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-decoration: none;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
          white-space: nowrap;
        }

        .ty-btn-primary {
          background: linear-gradient(135deg, #ddc18b 0%, #c0a278 100%);
          color: #171817;
          border: 1px solid #cbaa70;
          box-shadow: 0 12px 28px -8px rgba(192, 162, 120, 0.45);
        }

        .ty-btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 18px 36px -8px rgba(192, 162, 120, 0.7);
          background: linear-gradient(135deg, #e8cf9c 0%, #ccae79 100%);
        }

        .ty-btn-secondary {
          background: rgba(255, 255, 255, 0.05);
          color: #ece7de;
          border: 1px solid rgba(236, 228, 215, 0.25);
        }

        .ty-btn-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: #c0a278;
          color: #c0a278;
          transform: translateY(-3px);
        }

        .ty-arw {
          transition: transform 0.3s ease;
        }

        .ty-btn-primary:hover .ty-arw {
          transform: translateX(4px);
        }

        .ty-micro {
          color: #8c8577;
          font-size: 0.88rem;
          letter-spacing: 0.05em;
        }

        .ty-visual {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px;
          background: radial-gradient(circle at center, #2b2821 0%, #171817 75%);
          border-left: 1px solid rgba(255, 255, 255, 0.05);
        }

        .ty-ring {
          position: relative;
          width: 220px;
          height: 220px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ddc18b, #8c6f43);
          display: grid;
          place-items: center;
          box-shadow: 0 25px 60px rgba(192, 162, 120, 0.25);
          animation: tyFloat 5s ease-in-out infinite;
        }

        .ty-inner {
          width: 172px;
          height: 172px;
          border-radius: 50%;
          background: #171817;
          display: grid;
          place-items: center;
          padding: 24px;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .ty-side-logo {
          max-width: 90%;
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.4));
          animation: tyLogoFloat 4s ease-in-out infinite;
        }

        .ty-check-badge {
          position: absolute;
          bottom: 10px;
          right: 10px;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #25d366;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          font-weight: 700;
          box-shadow: 0 8px 20px rgba(37, 211, 102, 0.45);
          border: 3px solid #171817;
        }

        @keyframes tyLogoFloat {
          50% {
            transform: translateY(-6px) scale(1.02);
          }
        }

        @keyframes tyFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
        }

        @keyframes tyFadeUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 900px) {
          .ty-card {
            grid-template-columns: 1fr;
          }
          .ty-visual {
            padding: 38px 24px 20px;
            border-left: none;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          }
          .ty-content {
            padding: 36px 26px;
            text-align: center;
            align-items: center;
          }
          .ty-eyebrow {
            margin-left: auto;
            margin-right: auto;
          }
          .ty-body {
            margin-left: auto;
            margin-right: auto;
          }
          .ty-actions {
            justify-content: center;
            width: 100%;
          }
          .ty-btn {
            width: 100%;
          }
          .ty-ring {
            width: 180px;
            height: 180px;
          }
          .ty-inner {
            width: 140px;
            height: 140px;
          }
        }
      `}</style>
    </div>
  );
}
