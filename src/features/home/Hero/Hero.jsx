import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import HeroCanvas from "@/features/home/HeroCanvas/HeroCanvas";
import {
  heroContent    as defaultContent,
  mockupNavItems as defaultNavItems,
  mockupTableRows as defaultTableRows,
} from "@/data/home/heroData";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] },
});

export default function Hero({
  content   = defaultContent,
  navItems  = defaultNavItems,
  tableRows = defaultTableRows,
}) {
  return (
    <section className="hero relative overflow-hidden bg-[#d9ecff8a] pt-[72px]" id="home">
      <HeroCanvas />
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-12 pb-0">
        <motion.div {...fade(0)} className="flex justify-center mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-white/10 text-white/85 border border-white/20 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-300 animate-pulse" />
            {content.badge}
          </span>
        </motion.div>

        <motion.h1
          {...fade(0.1)}
          className="font-display text-center text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] mb-6 max-w-4xl mx-auto"
        >
          {content.headline[0]}{" "}
          <span className="bg-gradient-to-r from-brand-300 to-brand-200 bg-clip-text text-transparent">
            {content.headline[1]}
          </span>{" "}
          {content.headline[2]}
        </motion.h1>

        <motion.p
          {...fade(0.2)}
          className="text-center text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {content.subtitle}
        </motion.p>

        <motion.div {...fade(0.3)} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href={content.primaryCta.href}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-brand-500 text-white font-semibold hover:bg-brand-600 transition-all duration-200 shadow-[0_3px_0_rgba(0,30,100,0.4)] hover:-translate-y-px active:translate-y-[2px] active:shadow-none text-sm"
          >
            {content.primaryCta.label} <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href={content.secondaryCta.href}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border-2 border-white/25 text-white/85 font-semibold hover:border-white/55 hover:text-white transition-all duration-200 text-sm"
          >
            {content.secondaryCta.label}
          </a>
        </motion.div>

        <motion.p {...fade(0.4)} className="text-center text-xs text-white/40 tracking-wide mb-12">
          {content.trustLine}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="hero-mockup"
        >
          <div className="hero-mockup-glow" />
          <div className="hero-tablet">
            <div className="ht-body">
              <div className="ht-sidebar">
                <div className="ht-brand">eWord</div>
                {navItems.map((item) => (
                  <div key={item.label} className={`ht-nav${item.active ? " active" : ""}`}>
                    <i className={`fa-solid ${item.icon}`} />
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
              <div className="ht-main">
                <div className="ht-header-label">Today</div>
                <div className="ht-metric-row">
                  <div className="ht-metric-val">142 Active Cases</div>
                  <div className="ht-metric-badge">↑ 98% On-Time</div>
                </div>
                <div className="ht-chart">
                  <svg viewBox="0 0 400 80" preserveAspectRatio="none" className="ht-chart-svg">
                    <defs>
                      <linearGradient id="chtGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00bcd4" stopOpacity="0.28" />
                        <stop offset="100%" stopColor="#00bcd4" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M0,62 C30,55 55,48 85,38 C112,29 135,34 162,23 C186,14 212,19 238,13 C265,7 305,9 355,5 L400,5 L400,80 L0,80 Z" fill="url(#chtGrad)" />
                    <path d="M0,62 C30,55 55,48 85,38 C112,29 135,34 162,23 C186,14 212,19 238,13 C265,7 305,9 355,5 L400,5" fill="none" stroke="#00bcd4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M0,70 C30,66 55,60 85,54 C112,49 135,52 162,48 C186,44 212,47 238,44 C265,40 305,39 355,36 L400,35" fill="none" stroke="#00bcd4" strokeWidth="1.5" strokeDasharray="5 4" strokeOpacity="0.4" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="ht-tagline">{content.trustLine}</div>
                <div className="ht-table-wrap">
                  <div className="ht-table">
                    <div className="ht-table-head">
                      <span>Method</span><span>Amount</span><span>Status</span><span>Description</span>
                    </div>
                    {tableRows.map((r, i) => (
                      <div key={r.type + i} className="ht-table-row">
                        <span className={`ht-type-badge ${r.tc}`}>{r.type}</span>
                        <span className="ht-cell-amt">{r.amt}</span>
                        <span className="ht-status done">⊙ Done</span>
                        <span className="ht-cell-desc">{r.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
