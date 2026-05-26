import { useEffect, useRef, useState } from "react";
import defaultSteps from "@/data/home/gettingStartedSteps";

export default function GettingStarted({
  badge    = "How It Works",
  title    = "Getting Started With EWORD Solutions",
  subtitle = "Three simple steps to hand off your firm's administrative burden and get back to what matters.",
  steps    = defaultSteps,
}) {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="gs-section" id="getting-started" ref={sectionRef}>
      <div className="container">
        <div className="section-center gs-hd">
          <span className="section-badge">{badge}</span>
          <h2 className="section-title">{title}</h2>
          <p className="section-subtitle">{subtitle}</p>
        </div>

        <div className={`gs-row${visible ? " gs-on" : ""}`}>
          {steps.map((step, i) => (
            <div className="gs-step" key={step.num} style={{ "--i": i }}>
              <div className="gs-step-head">
                <div className="gs-circle">{step.num}</div>
                {i < steps.length - 1 && <div className="gs-line" />}
              </div>
              <div className="gs-step-body">
                <h4 className="gs-step-title">{step.title}</h4>
                <p className="gs-step-desc">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
