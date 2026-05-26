import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, animate } from "framer-motion";
import { Check, ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import servicesData from "@/data/services/servicesData";

function AnimatedCounter({ target, suffix, trigger }) {
  const ref = useRef(null);

  useEffect(() => {
    const num = parseFloat(target);
    const ctrl = animate(0, num, {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(v) {
        if (ref.current) ref.current.textContent = Math.round(v) + suffix;
      },
    });
    return () => ctrl.stop();
  }, [target, suffix, trigger]);

  return <span ref={ref} className="tabular-nums">0{suffix}</span>;
}

const contentVariants = {
  initial: { opacity: 0, y: 20, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0,  filter: "blur(0px)" },
  exit:    { opacity: 0, y: -12, filter: "blur(4px)" },
};

export default function Services({
  badge    = "What We Do",
  title    = "Legal Support Built for Your Workflow",
  subtitle = "From records retrieval to e-filing, EWORD handles the admin so your team can focus on clients and cases.",
  services = servicesData,
}) {
  const [active, setActive]         = useState(0);
  const wrapperRef                  = useRef(null);
  const activeRef                   = useRef(0);
  const cooldownRef                 = useRef(false);
  const touchStartYRef              = useRef(0);
  const touchPinnedRef              = useRef(false);

  const svc = services[active];

  useEffect(() => { activeRef.current = active; }, [active]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const isPinned = () => {
      const r = wrapper.getBoundingClientRect();
      return r.top <= 1 && r.bottom >= window.innerHeight - 1;
    };

    const advance = (dir) => {
      if (cooldownRef.current) return;

      if (dir > 0) {
        if (activeRef.current < services.length - 1) {
          cooldownRef.current = true;
          setTimeout(() => { cooldownRef.current = false; }, 700);
          setActive((p) => p + 1);
        } else {
          cooldownRef.current = true;
          setTimeout(() => { cooldownRef.current = false; }, 1400);
          window.scrollTo({ top: wrapper.offsetTop + wrapper.offsetHeight, behavior: "smooth" });
        }
      } else {
        if (activeRef.current > 0) {
          cooldownRef.current = true;
          setTimeout(() => { cooldownRef.current = false; }, 700);
          setActive((p) => p - 1);
        } else {
          cooldownRef.current = true;
          setTimeout(() => { cooldownRef.current = false; }, 1400);
          window.scrollTo({ top: Math.max(0, wrapper.offsetTop - 1), behavior: "smooth" });
        }
      }
    };

    const handleWheel = (e) => {
      if (!isPinned()) return;
      e.preventDefault();
      advance(e.deltaY >= 0 ? 1 : -1);
    };

    const handleTouchStart = (e) => {
      touchStartYRef.current = e.touches[0].clientY;
      touchPinnedRef.current = isPinned();
    };

    const handleTouchMove = (e) => {
      if (touchPinnedRef.current) e.preventDefault();
    };

    const handleTouchEnd = (e) => {
      if (!touchPinnedRef.current) return;
      const delta = touchStartYRef.current - e.changedTouches[0].clientY;
      if (Math.abs(delta) < 40) return;
      advance(delta > 0 ? 1 : -1);
    };

    const handleKeyDown = (e) => {
      if (!isPinned()) return;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") { e.preventDefault(); advance(1); }
      if (e.key === "ArrowUp"   || e.key === "ArrowLeft")  { e.preventDefault(); advance(-1); }
    };

    window.addEventListener("wheel",      handleWheel,      { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true  });
    window.addEventListener("touchmove",  handleTouchMove,  { passive: false });
    window.addEventListener("touchend",   handleTouchEnd,   { passive: true  });
    window.addEventListener("keydown",    handleKeyDown);

    return () => {
      window.removeEventListener("wheel",      handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove",  handleTouchMove);
      window.removeEventListener("touchend",   handleTouchEnd);
      window.removeEventListener("keydown",    handleKeyDown);
    };
  }, [services.length]);

  return (
    <div ref={wrapperRef} id="services" style={{ height: "200vh" }} className="relative">
      <section className="sticky top-0 h-screen overflow-hidden bg-white flex flex-col justify-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">

          <div className="text-center mb-5 md:mb-7">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-brand-50 text-brand-600 border border-brand-200 mb-3">
              {badge}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-2">
              {title}
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-base md:text-lg leading-relaxed">{subtitle}</p>
          </div>

          <div className="flex justify-center mb-3">
            <div className="inline-flex items-center bg-slate-100 rounded-2xl p-1.5 gap-1 flex-wrap justify-center">
              {services.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setActive(i)}
                  className="relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                >
                  {active === i && (
                    <motion.span
                      layoutId="svc-tab-pill"
                      className="absolute inset-0 rounded-xl bg-brand-500"
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    />
                  )}
                  <span className={`relative z-10 flex items-center gap-2 transition-colors duration-150 ${
                    active === i ? "text-white" : "text-slate-500 hover:text-slate-800"
                  }`}>
                    <s.Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="hidden sm:inline whitespace-nowrap">{s.tab}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-center mb-4">
            <div className="flex items-center gap-2">
              {services.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`rounded-full transition-all duration-300 ${
                    active === i
                      ? "w-6 h-2 bg-brand-500"
                      : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              variants={contentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="grid lg:grid-cols-[1fr_300px] gap-5 items-stretch"
            >
              <div className="bg-gradient-to-br from-slate-50 to-blue-50/60 rounded-2xl border border-slate-100 p-6 md:p-8 flex flex-col">
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-brand-500/10 flex items-center justify-center flex-shrink-0">
                      <svc.Icon className="w-5 h-5 text-brand-600" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-brand-500 mb-0.5">{svc.tab}</p>
                      <p className="text-xs text-slate-400">{svc.tagline}</p>
                    </div>
                  </div>
                  <span className="text-4xl font-display font-bold text-slate-200 leading-none select-none">{svc.num}</span>
                </div>

                <h3 className="font-display text-xl md:text-2xl font-bold text-slate-900 mb-2 leading-tight">{svc.title}</h3>
                <p className="text-slate-500 leading-relaxed mb-5 text-sm md:text-[15px]">{svc.description}</p>

                <ul className="space-y-2 mb-6 flex-1">
                  {svc.features.map((f, i) => (
                    <motion.li
                      key={f}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 + 0.1, duration: 0.3 }}
                      className="flex items-center gap-3"
                    >
                      <span className="w-5 h-5 rounded-full bg-brand-500 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-white stroke-[2.5]" />
                      </span>
                      <span className="text-sm text-slate-700 font-medium">{f}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="flex items-center gap-4 flex-wrap">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-500 text-white text-sm font-semibold hover:bg-brand-600 transition-all duration-150 shadow-[0_3px_0_rgba(0,30,100,0.4)] hover:-translate-y-px active:translate-y-[2px] active:shadow-none"
                  >
                    Get Started <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to={`/services/${svc.id}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors group"
                  >
                    Learn more
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>

              <div className={`hidden md:flex flex-col rounded-2xl bg-gradient-to-br ${svc.color} p-7 text-white min-h-[280px] overflow-hidden relative`}>
                <div
                  className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-20 blur-3xl pointer-events-none"
                  style={{ background: svc.accent }}
                />

                <div className="flex items-center gap-3 mb-7 relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <svc.Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest mb-0.5">Service metric</p>
                    <p className="text-sm font-semibold text-white/75">{svc.tab}</p>
                  </div>
                </div>

                <div className="mb-4 relative z-10">
                  <div className="text-6xl font-display font-bold leading-none mb-1">
                    <AnimatedCounter target={svc.stat.val} suffix={svc.stat.suffix} trigger={active} />
                  </div>
                  <p className="text-xs text-white/50 uppercase tracking-widest">{svc.stat.lbl}</p>
                </div>

                <div className="mb-6 relative z-10">
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${svc.stat.pct}%` }}
                      transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full rounded-full"
                      style={{ background: svc.accent }}
                    />
                  </div>
                </div>

                <div className="space-y-2.5 flex-1 relative z-10">
                  {svc.features.slice(0, 3).map((f, i) => (
                    <motion.div
                      key={f}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.09 + 0.25, duration: 0.3 }}
                      className="flex items-start gap-2.5"
                    >
                      <Check className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: svc.accent }} />
                      <span className="text-xs text-white/65 leading-relaxed">{f}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-5 pt-4 border-t border-white/10 relative z-10">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">
                    California Workers' Comp Focused
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute bottom-5 left-0 right-0 flex justify-center pointer-events-none">
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1 text-slate-300"
          >
            <span className="text-[10px] tracking-widest uppercase">
              {active < services.length - 1 ? `${services.length - 1 - active} more · scroll` : "scroll to continue"}
            </span>
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
