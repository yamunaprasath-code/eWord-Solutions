import { useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { ArrowRight, Clock, FileCheck, Shield, TrendingUp, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const TOTAL_HOURS = 40;
const ADMIN_HOURS = 12;

function AnimatedCounter({ to, suffix = '' }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(0, to, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(v) {
        if (ref.current) ref.current.textContent = Math.round(v) + suffix;
      },
    });
    return () => ctrl.stop();
  }, [inView, to, suffix]);

  return <span ref={ref} className="tabular-nums">0{suffix}</span>;
}

function TimeGrid() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="grid grid-cols-8 gap-1.5 w-full">
      {Array.from({ length: TOTAL_HOURS }, (_, i) => {
        const isAdmin = i < ADMIN_HOURS;
        return (
          <motion.div
            key={i}
            className="aspect-square"
            initial={{ opacity: 0, scale: 0.4 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.04 + i * 0.018, type: 'spring', stiffness: 300, damping: 22 }}
          >
            <motion.div
              className="w-full h-full rounded-[5px]"
              initial={{
                backgroundColor: isAdmin ? 'rgba(239,68,68,0.28)' : 'rgba(21,100,232,0.12)',
                border: isAdmin ? '1px solid rgba(239,68,68,0.22)' : '1px solid rgba(21,100,232,0.12)',
              }}
              animate={inView && isAdmin ? {
                backgroundColor: ['rgba(239,68,68,0.28)', 'rgba(239,68,68,0.38)', 'rgba(34,197,94,0.28)'],
                border: ['1px solid rgba(239,68,68,0.22)', '1px solid rgba(239,68,68,0.30)', '1px solid rgba(34,197,94,0.25)'],
              } : {}}
              transition={{ delay: isAdmin ? 1.4 + i * 0.06 : 0, duration: 0.5, times: [0, 0.35, 1] }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

const metrics = [
  { value: 12,  suffix: 'h',  label: 'Saved per week',    Icon: Clock,      color: 'text-brand-400',   bg: 'bg-brand-50',   border: 'border-brand-100'   },
  { value: 99,  suffix: '%',  label: 'Document accuracy', Icon: FileCheck,  color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
  { value: 48,  suffix: 'h',  label: 'Record turnaround', Icon: TrendingUp, color: 'text-violet-600',  bg: 'bg-violet-50',  border: 'border-violet-100'  },
  { value: 100, suffix: '%',  label: 'HIPAA compliant',   Icon: Shield,     color: 'text-amber-600',   bg: 'bg-amber-50',   border: 'border-amber-100'   },
];

export default function EmotionalAppeal() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="bg-slate-50 py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-[1fr_420px] gap-14 xl:gap-20 items-center">

          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-brand-50 text-brand-500 border border-brand-100">
                Why It Matters
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.07 }}
              className="font-display text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-6"
            >
              Stop Losing Your{' '}
              <span className="text-brand-400">Best Hours</span>
              <br />
              to Paperwork
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="text-slate-500 text-lg leading-relaxed mb-10 max-w-[460px]"
            >
              You didn't go to law school to chase records and format pleadings
              at midnight. EWORD handles every piece of admin — so you close
              cases, not spreadsheets.
            </motion.p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
              {metrics.map(({ value, suffix, label, Icon, color, bg, border }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.22 + i * 0.07, duration: 0.4 }}
                  className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className={`w-8 h-8 rounded-xl ${bg} border ${border} flex items-center justify-center mb-3`}>
                    <Icon className={`w-4 h-4 ${color}`} />
                  </div>
                  <div className={`text-2xl font-display font-bold ${color} leading-tight`}>
                    <AnimatedCounter to={value} suffix={suffix} />
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5 font-medium leading-tight">{label}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.44, duration: 0.4 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3"
            >
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-brand-500 text-white font-semibold text-sm hover:bg-brand-600 transition-all shadow-[0_3px_0_rgba(0,30,100,0.35)] hover:-translate-y-px active:translate-y-[2px] active:shadow-none"
              >
                Let's Talk Solutions <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm hover:border-slate-300 hover:text-slate-800 transition-all"
              >
                About EWORD
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="bg-white rounded-3xl border border-slate-200 shadow-[0_4px_32px_rgba(0,0,0,0.07)] p-7">
              <div className="flex items-start justify-between mb-5">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-1">
                    Weekly Time Audit
                  </p>
                  <h3 className="text-base font-bold text-slate-900 leading-tight">Your 40-Hour Work Week</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Workers' Comp Attorney · California</p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-brand-400" />
                </div>
              </div>

              <div className="mb-4">
                <TimeGrid />
              </div>

              <div className="flex flex-wrap items-center gap-4 mb-5">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-[3px] bg-red-300" />
                  <span className="text-xs text-slate-400">Admin time (before)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-[3px] bg-emerald-400" />
                  <span className="text-xs text-slate-400">Reclaimed with EWORD</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-[3px] bg-brand-200" />
                  <span className="text-xs text-slate-400">Billable hours</span>
                </div>
              </div>

              <div className="h-px bg-slate-100 mb-5" />

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="rounded-2xl p-4 bg-red-50 border border-red-100">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-red-400 mb-1">Before EWORD</p>
                  <p className="text-2xl font-display font-bold text-red-500 leading-none">28h</p>
                  <p className="text-xs text-slate-400 mt-1">billable / week</p>
                </div>
                <div className="rounded-2xl p-4 bg-emerald-50 border border-emerald-100">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 mb-1">With EWORD</p>
                  <p className="text-2xl font-display font-bold text-emerald-600 leading-none">40h</p>
                  <p className="text-xs text-slate-400 mt-1">billable / week</p>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 2.8, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-3 rounded-xl px-4 py-3 bg-emerald-50 border border-emerald-100"
              >
                <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-emerald-700">12 hours reclaimed this week</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">That's 624 hours — 26 full days — back each year</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
