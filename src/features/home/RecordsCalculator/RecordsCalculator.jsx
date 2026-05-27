import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FileSearch, FileClock, FileCheck2, FileText,
  ChevronRight, ArrowRight, Clock, DollarSign, Send, Lock, X,
} from 'lucide-react';
import { ROUTES } from '@/constants/routes';

/* ─── Service types ──────────────────────────────────────────── */
const SERVICE_TYPES = [
  {
    id: 'standard', label: 'Standard Review', Icon: FileSearch,
    description: 'Comprehensive review of medical records for case value assessment',
    baseHours: 16, costPerPage: 0.18,
  },
  {
    id: 'rush', label: 'Rush Review', Icon: FileClock,
    description: 'Expedited review for time-sensitive depositions or hearings',
    baseHours: 8, costPerPage: 0.32,
  },
  {
    id: 'summary', label: 'Summary Only', Icon: FileText,
    description: 'Concise narrative summary of key findings without full annotation',
    baseHours: 12, costPerPage: 0.12,
  },
  {
    id: 'full', label: 'Full Annotation', Icon: FileCheck2,
    description: 'Detailed page-by-page annotation with medical chronology',
    baseHours: 24, costPerPage: 0.28,
  },
];

/* ─── Complexity levels ──────────────────────────────────────── */
const COMPLEXITY = [
  { value: 1, label: 'Simple',   timeX: 1.0, costX: 1.0 },
  { value: 2, label: 'Moderate', timeX: 1.3, costX: 1.3 },
  { value: 3, label: 'Complex',  timeX: 1.7, costX: 1.6 },
  { value: 4, label: 'High',     timeX: 2.2, costX: 2.0 },
];

/* ─── Helpers ───────────────────────────────────────────────── */
function calcTurnaround(serviceId, pages, providers, complexity) {
  const svc = SERVICE_TYPES.find(s => s.id === serviceId);
  if (!svc) return 0;
  const cx             = COMPLEXITY.find(c => c.value === complexity) || COMPLEXITY[0];
  const pageFactor     = pages / 100;
  const providerFactor = Math.max(1, Math.log2(providers + 1));
  return Math.ceil(svc.baseHours * pageFactor * cx.timeX * providerFactor);
}

function calcCost(serviceId, pages, providers, complexity) {
  const svc = SERVICE_TYPES.find(s => s.id === serviceId);
  if (!svc) return 0;
  const cx         = COMPLEXITY.find(c => c.value === complexity) || COMPLEXITY[0];
  const provFactor = 1 + (providers - 1) * 0.025;
  return Math.ceil(pages * svc.costPerPage * cx.costX * provFactor);
}

function calcScope(pages, providers) {
  if (pages <= 500  && providers <= 5)  return 'Small';
  if (pages <= 5000 && providers <= 20) return 'Medium';
  return 'Large';
}

function turnaroundLabel(hours) {
  if (hours <= 8)  return 'Very Fast';
  if (hours <= 24) return 'Standard';
  if (hours <= 48) return 'Extended';
  return 'Multi-Phase';
}

/* ─── Sub-components ────────────────────────────────────────── */
function ServiceTab({ item, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 min-w-[130px] flex flex-col items-center gap-2 px-4 py-4 rounded-xl border-2 transition-all duration-200
        ${active
          ? 'border-brand-500 bg-brand-500 shadow-md shadow-brand-200'
          : 'border-slate-200 bg-white hover:border-brand-200 hover:bg-brand-50/40'
        }`}
    >
      <item.Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-white' : 'text-slate-400'}`} />
      <span className={`text-xs font-bold leading-tight text-center ${active ? 'text-white' : 'text-slate-600'}`}>
        {item.label}
      </span>
    </button>
  );
}

function SliderInput({ label, value, displayValue, min, max, step = 1, onChange, marks }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-slate-700">{label}</span>
        <span className="text-sm font-bold text-brand-600 bg-brand-50 px-2.5 py-0.5 rounded-lg">
          {displayValue ?? value.toLocaleString()}
        </span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
        style={{ background: `linear-gradient(to right, #2563EB ${pct}%, #e2e8f0 ${pct}%)` }}
      />
      {marks && (
        <div className="flex justify-between mt-1.5">
          {marks.map((m, i) => (
            <span key={i} className="text-[10px] text-slate-400">{m}</span>
          ))}
        </div>
      )}
    </div>
  );
}

function SummaryRow({ label, value, accent }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-slate-100 last:border-0">
      <span className="text-sm text-slate-500">{label}</span>
      <span className={`text-sm font-bold ${accent ? 'text-brand-600' : 'text-slate-800'}`}>{value}</span>
    </div>
  );
}

/* ─── Email gate overlay ────────────────────────────────────── */
function EmailGate({ onSubmit, onClose }) {
  const [email,   setEmail]   = useState('');
  const [touched, setTouched] = useState(false);
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <motion.div
      key="gate"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.25 }}
      className="absolute inset-0 flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm rounded-2xl px-8 z-10"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
      >
        <X className="w-4 h-4" />
      </button>
      <div className="w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center mb-4">
        <Lock className="w-5 h-5 text-brand-600" />
      </div>
      <h3 className="font-display text-lg font-bold text-slate-900 text-center mb-1">
        Unlock Full Estimate
      </h3>
      <p className="text-slate-500 text-sm text-center mb-6 max-w-xs">
        Enter your email to reveal the cost breakdown and receive a detailed turnaround report.
      </p>
      <div className="w-full max-w-xs space-y-3">
        <input
          type="email" placeholder="you@lawfirm.com" value={email}
          onChange={e => setEmail(e.target.value)}
          onBlur={() => setTouched(true)}
          className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 transition
            ${touched && !valid ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50'}`}
        />
        {touched && !valid && <p className="text-xs text-red-500">Please enter a valid email address.</p>}
        <button
          onClick={() => valid ? onSubmit(email) : setTouched(true)}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-brand-500 text-white text-sm font-semibold hover:bg-brand-600 transition shadow-[0_3px_0_rgba(0,30,100,0.35)]"
        >
          <Send className="w-4 h-4" /> Send My Estimate
        </button>
      </div>
    </motion.div>
  );
}

function ThanksCard() {
  return (
    <motion.div
      key="thanks"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute inset-0 flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm rounded-2xl px-8 z-10"
    >
      <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mb-4">
        <FileCheck2 className="w-6 h-6 text-green-600" />
      </div>
      <h3 className="font-display text-lg font-bold text-slate-900 text-center mb-2">You're all set!</h3>
      <p className="text-slate-500 text-sm text-center max-w-xs mb-6">
        We'll send your detailed medical records review estimate within 1 business day.
      </p>
      <Link
        to={ROUTES.CONTACT}
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-500 text-white text-sm font-semibold hover:bg-brand-600 transition shadow-[0_3px_0_rgba(0,30,100,0.35)]"
      >
        Talk to our team <ArrowRight className="w-4 h-4" />
      </Link>
    </motion.div>
  );
}

/* ─── Main Component ─────────────────────────────────────────── */
export default function RecordsCalculator() {
  const [serviceId,  setServiceId]  = useState('standard');
  const [pages,      setPages]      = useState(200);
  const [providers,  setProviders]  = useState(3);
  const [complexity, setComplexity] = useState(1);
  const [gateOpen,   setGateOpen]   = useState(false);
  const [submitted,  setSubmitted]  = useState(false);
  const [revealed,   setRevealed]   = useState(false);

  const turnaround  = calcTurnaround(serviceId, pages, providers, complexity);
  const cost        = calcCost(serviceId, pages, providers, complexity);
  const complexityLabel = COMPLEXITY.find(c => c.value === complexity)?.label ?? '';
  const scope       = calcScope(pages, providers);
  const speed       = turnaroundLabel(turnaround);
  const activeService = SERVICE_TYPES.find(s => s.id === serviceId);

  return (
    <section className="py-24 md:py-32 bg-slate-50" id="calculator">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-brand-50 text-brand-500 border border-brand-100 mb-4">
            Estimate Tool
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            Medical Records Review Calculator
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-lg leading-relaxed">
            Get a quick estimate of turnaround time and cost for your workers' comp case.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">

          {/* ── Left: Controls ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Review Type</p>
            <div className="flex flex-wrap gap-3 mb-8">
              {SERVICE_TYPES.map(svc => (
                <ServiceTab key={svc.id} item={svc} active={serviceId === svc.id} onClick={() => setServiceId(svc.id)} />
              ))}
            </div>

            {/* Description */}
            <AnimatePresence mode="wait">
              <motion.p
                key={serviceId}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="text-sm text-slate-500 leading-relaxed bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 mb-8"
              >
                <span className="font-semibold text-slate-700">{activeService?.label}: </span>
                {activeService?.description}
              </motion.p>
            </AnimatePresence>

            <div className="space-y-8">
              <SliderInput
                label="Number of Pages"
                value={pages}
                displayValue={pages.toLocaleString() + ' pgs'}
                min={50} max={50000} step={50}
                onChange={setPages}
                marks={['50', '10,000', '25,000', '50,000']}
              />
              <SliderInput
                label="Number of Providers / Facilities"
                value={providers}
                min={1} max={50} step={1}
                onChange={setProviders}
                marks={['1', '10', '25', '50']}
              />
              <SliderInput
                label="Case Complexity"
                value={complexity}
                displayValue={complexityLabel}
                min={1} max={4} step={1}
                onChange={setComplexity}
                marks={['Simple', 'Moderate', 'Complex', 'High']}
              />
            </div>
          </motion.div>

          {/* ── Right: Summary card ─────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="sticky top-24"
          >
            <div className="relative bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

              {/* Overlay states */}
              <AnimatePresence>
                {submitted ? <ThanksCard key="thanks" /> : gateOpen ? (
                  <EmailGate
                    key="gate"
                    onClose={() => setGateOpen(false)}
                    onSubmit={email => {
                      console.log('Email captured:', email);
                      setGateOpen(false);
                      setSubmitted(true);
                      setRevealed(true);
                    }}
                  />
                ) : null}
              </AnimatePresence>

              {/* Summary content */}
              <div className="px-7 pt-7 pb-4">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-5">Your Estimate</p>

                {/* Turnaround */}
                <div className="flex items-end gap-3 mb-6">
                  <div>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={turnaround}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                        className="font-display text-5xl font-bold text-brand-600 leading-none"
                      >
                        {turnaround}
                      </motion.div>
                    </AnimatePresence>
                    <span className="text-sm text-slate-500 mt-1 block">hours</span>
                  </div>
                  <div className="mb-1">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide
                      ${speed === 'Very Fast'   ? 'bg-green-100 text-green-700'  :
                        speed === 'Standard'    ? 'bg-blue-100 text-blue-700'    :
                        speed === 'Extended'    ? 'bg-amber-100 text-amber-700'  :
                                                  'bg-red-100 text-red-700'}`}>
                      <Clock className="w-3 h-3" /> {speed}
                    </span>
                  </div>
                </div>

                {/* Rows */}
                <SummaryRow label="Review Type"             value={activeService?.label} />
                <SummaryRow label="Total Pages"            value={`${pages.toLocaleString()} pgs`} />
                <SummaryRow label="Providers / Facilities" value={providers} />
                <SummaryRow label="Case Complexity"        value={complexityLabel} />
                <SummaryRow label="Case Scope"             value={scope} accent />
                <SummaryRow label="Est. Turnaround"        value={`~${turnaround} hours`} accent />

                {/* Cost row — masked until revealed */}
                <div className="flex items-center justify-between py-2.5 border-b border-slate-100">
                  <span className="text-sm text-slate-500 flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5" /> Est. Cost
                  </span>
                  <div className="flex items-center gap-2">
                    {revealed ? (
                      <motion.span
                        key="revealed"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-sm font-bold text-brand-600"
                      >
                        ${cost.toLocaleString()}
                      </motion.span>
                    ) : (
                      <span className="text-sm font-bold text-slate-300 tracking-widest select-none">
                        $•••••
                      </span>
                    )}
                    {!revealed && <Lock className="w-3 h-3 text-slate-400" />}
                  </div>
                </div>
              </div>

              {/* Lock hint */}
              {!revealed && (
                <div className="px-7 pb-2">
                  <p className="flex items-center gap-1.5 text-xs text-slate-400 py-2 border-t border-slate-100">
                    <Lock className="w-3.5 h-3.5 flex-shrink-0" />
                    Submit your email to unlock the full cost breakdown.
                  </p>
                </div>
              )}

              {/* CTAs */}
              <div className="px-7 pb-7 pt-3 space-y-3">
                {!revealed && (
                  <button
                    onClick={() => setGateOpen(true)}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-500 text-white text-sm font-semibold hover:bg-brand-600 transition shadow-[0_3px_0_rgba(0,30,100,0.35)]"
                  >
                    <Send className="w-4 h-4" /> Get Full Estimate by Email
                  </button>
                )}
                <Link
                  to={ROUTES.CONTACT}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition"
                >
                  Talk to Our Team <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

            </div>

            <p className="text-center text-xs text-slate-400 mt-4 leading-relaxed">
              Estimates are approximate. Final scope depends on record complexity.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
