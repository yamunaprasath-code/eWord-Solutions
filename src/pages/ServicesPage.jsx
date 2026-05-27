import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Folder, Zap, Stethoscope, Mic, ArrowRight, Check,
  ChevronDown, Star, Phone, Mail, Shield, Clock,
  Users, Award, FileText, Building2, Scale
} from 'lucide-react';
import { MainLayout } from '@/layouts/MainLayout';
import { ROUTES } from '@/constants/routes';

/* ─── animation helpers ─────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] },
});

/* ─── data ───────────────────────────────────────────── */
const services = [
  {
    id: 'records-retrieval',
    href: ROUTES.SERVICES_RECORDS,
    Icon: Folder,
    num: '01',
    tag: 'Records Retrieval',
    title: 'Full-Service Records Retrieval',
    description:
      'We manage the complete subpoena and HIPAA request process — from drafting to delivery. Our team follows up persistently until every record is in hand.',
    features: [
      'Subpoena & HIPAA request drafting',
      'Facility outreach & persistent follow-up',
      'In-person pickups & electronic delivery',
      'OCR processing & quality checks',
    ],
    stat: '48h',
    statLabel: 'Avg. retrieval start',
    color: 'from-blue-600 to-blue-800',
    lightColor: 'bg-blue-50',
    textColor: 'text-blue-600',
    borderColor: 'border-blue-100',
    iconBg: 'bg-blue-100',
  },
  {
    id: 'e-office',
    href: ROUTES.SERVICES_EWORKFLOW,
    Icon: Zap,
    num: '02',
    tag: 'E-Office Workflow',
    title: 'End-to-End Document Workflow',
    description:
      'Start with a voice recording or draft. We handle transcription, formatting, CMS upload, EAMS e-filing, and physical mail — all from a single request.',
    features: [
      'Dictation-to-document transcription',
      'Letterhead & pleading formatting',
      'EAMS e-filing with California courts',
      'Physical mail & service coordination',
    ],
    stat: '24h',
    statLabel: 'Standard turnaround',
    color: 'from-indigo-600 to-indigo-900',
    lightColor: 'bg-indigo-50',
    textColor: 'text-indigo-600',
    borderColor: 'border-indigo-100',
    iconBg: 'bg-indigo-100',
  },
  {
    id: 'medical-records',
    href: ROUTES.SERVICES_MEDICAL_REVIEW,
    Icon: Stethoscope,
    num: '03',
    tag: 'Medical Records Review',
    title: 'Organized Medical Records for Trial',
    description:
      'Our team organizes records chronologically, hyperlinks PDFs for easy navigation, and summarizes key medical information — ready for trial prep.',
    features: [
      'Chronological organization by provider',
      'Hyperlinked PDF navigation',
      'Medical summary preparation',
      'Deposition-ready record sets',
    ],
    stat: '72h',
    statLabel: 'Standard review time',
    color: 'from-sky-500 to-sky-800',
    lightColor: 'bg-sky-50',
    textColor: 'text-sky-600',
    borderColor: 'border-sky-100',
    iconBg: 'bg-sky-100',
  },
  {
    id: 'dictation',
    href: ROUTES.SERVICES_DICTATION,
    Icon: Mic,
    num: '04',
    tag: 'Dictation & Transcription',
    title: 'Fast, Accurate Transcription',
    description:
      'Submit audio via our secure mobile app or portal. We return clean, proofread transcriptions fast — delivered wherever your workflow needs them.',
    features: [
      'Secure mobile app submission',
      'HIPAA-compliant processing',
      'Professional proofreading included',
      'Available to clients nationwide',
    ],
    stat: '99%',
    statLabel: 'Accuracy rate',
    color: 'from-cyan-500 to-cyan-800',
    lightColor: 'bg-cyan-50',
    textColor: 'text-cyan-600',
    borderColor: 'border-cyan-100',
    iconBg: 'bg-cyan-100',
  },
];

const stats = [
  { value: '48h', label: 'Avg. retrieval start', icon: Clock },
  { value: '99%', label: 'Transcription accuracy', icon: Award },
  { value: '500+', label: 'Firms served', icon: Building2 },
  { value: '24/7', label: 'Secure portal access', icon: Shield },
];

const steps = [
  {
    num: '01',
    title: 'Reach Out',
    desc: "Tell us what you need — we don't check boxes. Our team listens to every request carefully so we understand the services that'll fit best.",
  },
  {
    num: '02',
    title: 'First Request',
    desc: "Use our mobile app to send your first task or dictation. Don't face it alone — we guide you through onboarding step by step.",
  },
  {
    num: '03',
    title: 'Review & Repeat',
    desc: "You'll get a completed, accurate deliverable ready to file, serve, or send. Once you see the quality, the rest is easy.",
  },
];

const testimonials = [
  {
    quote:
      "EWORD completely transformed how our firm handles records retrieval. What used to take weeks now comes back organized and hyperlinked within days. Every expectation is exceeded.",
    author: 'Sarah Chen',
    role: 'Managing Partner',
    firm: 'Chen & Associates',
    stars: 5,
  },
  {
    quote:
      "The dictation transcription service alone saves my team hours every week. Accurate, fast, and HIPAA-compliant — exactly what a California workers' comp firm needs.",
    author: 'Marcus Rivera',
    role: 'Senior Attorney',
    firm: 'Rivera Law Group',
    stars: 5,
  },
  {
    quote:
      "From e-filing to medical records review, EWORD handles every admin task that used to bog us down. I can't imagine running our practice without them now.",
    author: 'Linda Patel',
    role: 'Office Manager',
    firm: 'Pacific Workers Legal',
    stars: 5,
  },
];

const faqs = [
  {
    q: 'What types of transcription services do you offer?',
    a: "We handle legal dictation, medical reports, deposition summaries, and general correspondence. All are proofread and formatted to your firm's standards.",
  },
  {
    q: "How does E-Office Workflow work for California workers' comp firms?",
    a: 'We take your dictation or draft, format it on your letterhead, upload to your case management system, e-file through EAMS, and coordinate physical mail — one request covers it all.',
  },
  {
    q: "What's included in your records retrieval service?",
    a: 'Subpoena drafting, HIPAA authorization management, provider outreach, persistent follow-up, in-person or electronic pickup, OCR processing, and indexed delivery.',
  },
  {
    q: 'Can you summarize and organize medical records for trial?',
    a: 'Yes. We chronologically organize records by provider, create hyperlinked PDFs for fast navigation, and can prepare medical summaries for trial or settlement.',
  },
  {
    q: 'Do I have to use all of your services, or can I start small?',
    a: "Start with just one service and expand as your needs grow. Most clients begin with records retrieval or transcription, then add e-office workflow over time.",
  },
  {
    q: 'Are your services secure and compliant with confidentiality requirements?',
    a: 'All services are HIPAA-compliant. We use encrypted transmission, secure portals, and BAA agreements. Your client data never moves outside our protected environment.',
  },
  {
    q: 'How fast is your turnaround time?',
    a: 'Transcription: 24–72 hours. Records retrieval: initiated within 48 hours. Medical records review: typically 72 hours. Rush options are available.',
  },
  {
    q: 'How do I get started with EWORD Solutions?',
    a: "Reach out via our contact form or call us. We'll schedule a brief call, learn your workflow, and have you set up in our secure portal within 24 hours.",
  },
];

/* ─── FAQ Accordion ──────────────────────────────────── */
function FAQItem({ q, a, index }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      {...fadeUp(index * 0.04)}
      className="border-b border-slate-200 last:border-0"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
      >
        <span className="font-semibold text-slate-800 text-[15px] group-hover:text-brand-600 transition-colors leading-snug">
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0 w-7 h-7 rounded-full bg-slate-100 group-hover:bg-brand-50 flex items-center justify-center transition-colors"
        >
          <ChevronDown className="w-4 h-4 text-slate-500 group-hover:text-brand-600 transition-colors" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-slate-500 leading-relaxed text-sm pr-10">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Service Card ───────────────────────────────────── */
function ServiceCard({ svc, index }) {
  return (
    <motion.div
      {...fadeUp(index * 0.08)}
      className="group relative bg-white rounded-3xl border border-slate-200 hover:border-brand-200 hover:shadow-2xl hover:shadow-brand-500/10 transition-all duration-400 overflow-hidden flex flex-col"
    >
      {/* Top accent bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${svc.color}`} />

      <div className="p-7 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div className={`w-12 h-12 rounded-2xl ${svc.iconBg} flex items-center justify-center`}>
            <svc.Icon className={`w-5 h-5 ${svc.textColor}`} />
          </div>
          <span className="text-5xl font-bold text-slate-100 leading-none select-none group-hover:text-slate-200 transition-colors">
            {svc.num}
          </span>
        </div>

        {/* Tag + Title */}
        <p className={`text-xs font-bold uppercase tracking-widest ${svc.textColor} mb-2`}>
          {svc.tag}
        </p>
        <h3 className="font-display text-xl font-bold text-slate-900 mb-3 leading-tight">
          {svc.title}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1">{svc.description}</p>

        {/* Features */}
        <ul className="space-y-2.5 mb-7">
          {svc.features.map((f) => (
            <li key={f} className="flex items-center gap-2.5">
              <span className={`w-5 h-5 rounded-full bg-gradient-to-br ${svc.color} flex items-center justify-center flex-shrink-0`}>
                <Check className="w-3 h-3 text-white stroke-[2.5]" />
              </span>
              <span className="text-sm text-slate-700">{f}</span>
            </li>
          ))}
        </ul>

        {/* Stat pill */}
        <div className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl ${svc.lightColor} ${svc.borderColor} border mb-6 self-start`}>
          <Clock className={`w-3.5 h-3.5 ${svc.textColor}`} />
          <span className={`text-xs font-bold ${svc.textColor}`}>{svc.stat}</span>
          <span className="text-xs text-slate-500">{svc.statLabel}</span>
        </div>

        {/* CTA */}
        <Link
          to={svc.href}
          className={`mt-auto inline-flex items-center gap-2 text-sm font-semibold ${svc.textColor} hover:gap-3 transition-all duration-200 group/link`}
        >
          Learn more
          <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5" />
        </Link>
      </div>
    </motion.div>
  );
}

/* ─── Main Page ──────────────────────────────────────── */
export default function ServicesPage() {
  const formRef = useRef(null);

  return (
    <MainLayout>

      {/* ── 1. HERO ───────────────────────────────────── */}
      <section className="relative pt-36 pb-28 bg-slate-900 overflow-hidden">
        {/* background layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-900/90 via-slate-900 to-slate-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.15),transparent_60%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500/30 to-transparent" />

        {/* floating dots decoration */}
        <div className="absolute top-16 right-10 w-72 h-72 opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(circle, #60a5fa 1px, transparent 1px)', backgroundSize: '24px 24px' }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div {...fadeUp(0)}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-white/10 text-blue-300 border border-white/15 mb-6">
              <Scale className="w-3.5 h-3.5" /> Legal Support Services
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.08)}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
          >
            Our Services
          </motion.h1>

          <motion.p
            {...fadeUp(0.15)}
            className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10"
          >
            EWORD Solutions helps legal teams reduce admin overload by offering
            multiple support services for law firms — so you can focus on winning cases.
          </motion.p>

          <motion.div {...fadeUp(0.22)} className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to={ROUTES.CONTACT}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-brand-500 text-white font-semibold text-sm hover:bg-brand-600 transition-all shadow-[0_3px_0_rgba(0,30,100,0.45)] hover:-translate-y-px active:translate-y-[2px] active:shadow-none"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:8663866003"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white/10 text-white font-semibold text-sm hover:bg-white/20 transition-all border border-white/20"
            >
              <Phone className="w-4 h-4" /> (866) 386-6003
            </a>
          </motion.div>
        </div>

        {/* Hero stats bar */}
        <motion.div
          {...fadeUp(0.3)}
          className="relative z-10 max-w-4xl mx-auto px-6 mt-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10">
            {stats.map((s, i) => (
              <div key={i} className="bg-slate-900/60 backdrop-blur-sm px-6 py-5 text-center">
                <s.icon className="w-5 h-5 text-brand-400 mx-auto mb-2" />
                <div className="text-2xl font-display font-bold text-white">{s.value}</div>
                <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── 2. TAGLINE SPLIT ─────────────────────────── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* left – image + badge */}
            <motion.div {...fadeUp(0)} className="relative">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 shadow-2xl shadow-slate-300/50">
                <img
                  src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80"
                  alt="Legal professional at work"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
              </div>
              {/* floating card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -bottom-6 -right-4 md:-right-8 bg-white rounded-2xl shadow-xl border border-slate-100 px-5 py-4 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-green-600 stroke-[2.5]" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Comprehensive</p>
                  <p className="text-sm font-bold text-slate-900">Legal Support</p>
                </div>
              </motion.div>
            </motion.div>

            {/* right – text */}
            <motion.div {...fadeUp(0.12)}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-brand-50 text-brand-600 border border-brand-200 mb-5">
                About Us
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-5">
                Solutions for the Work{' '}
                <span className="text-brand-600">You Don't Have Time For</span>
              </h2>
              <p className="text-slate-500 leading-relaxed mb-5 text-base md:text-lg">
                EWORD Solutions helps legal teams reduce admin overload by offering
                multiple support services for law firms — including workers'
                compensation cases in California. Whether you're a para, supporting
                staff, or a solo attorney, we keep you focused on client outcomes.
              </p>
              <p className="text-slate-500 leading-relaxed mb-8">
                We follow up on every record, transcribe every dictation, and e-file
                every document with the same precision a top-tier firm expects —
                without the overhead of in-house staff.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to={ROUTES.CONTACT}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-500 text-white font-semibold text-sm hover:bg-brand-600 transition-all shadow-[0_3px_0_rgba(0,30,100,0.4)] hover:-translate-y-px"
                >
                  Get Started <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="#services"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-100 text-slate-700 font-semibold text-sm hover:bg-slate-200 transition-all"
                >
                  View Services
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 3. WHO WE HELP strip ─────────────────────── */}
      <section className="py-14 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...fadeUp(0)} className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-500 mb-2">Who We Help</p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900">
              Built for California Workers' Comp Firms
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Scale, label: 'Workers\' Comp Attorneys' },
              { icon: Users, label: 'Legal Support Staff' },
              { icon: FileText, label: 'Paralegals & Law Clerks' },
              { icon: Building2, label: 'Solo & Group Practices' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                {...fadeUp(i * 0.07)}
                className="flex flex-col items-center gap-3 bg-white rounded-2xl border border-slate-200 p-6 text-center hover:border-brand-200 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-brand-600" />
                </div>
                <p className="text-sm font-semibold text-slate-800 leading-tight">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. SERVICES GRID ─────────────────────────── */}
      <section id="services" className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...fadeUp(0)} className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-brand-50 text-brand-600 border border-brand-200 mb-4">
              What We Do
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Legal Support Built for Your Workflow
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
              From records retrieval to e-filing, EWORD handles the admin so your
              team can focus on clients and cases.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((svc, i) => (
              <ServiceCard key={svc.id} svc={svc} index={i} />
            ))}
          </div>

          <motion.div {...fadeUp(0.3)} className="mt-10 text-center">
            <Link
              to={ROUTES.CONTACT}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-brand-500 text-white font-semibold text-sm hover:bg-brand-600 transition-all shadow-[0_3px_0_rgba(0,30,100,0.4)] hover:-translate-y-px active:translate-y-[2px] active:shadow-none"
            >
              Start with Any Service <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── 5. HOW IT WORKS ──────────────────────────── */}
      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <motion.div {...fadeUp(0)} className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-brand-50 text-brand-600 border border-brand-200 mb-4">
              Getting Started
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Here's How We Keep Your Caseload Moving
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-base leading-relaxed">
              We don't just check boxes. Three simple steps to get your firm's admin
              fully covered by our dedicated team.
            </p>
          </motion.div>

          <div className="relative">
            {/* connector line */}
            <div className="absolute top-10 left-[calc(16.66%+1rem)] right-[calc(16.66%+1rem)] hidden md:block">
              <div className="h-px w-full bg-gradient-to-r from-brand-200 via-brand-400 to-brand-200" />
              <div className="absolute left-0 top-0 w-full h-px bg-gradient-to-r from-transparent via-white/60 to-transparent translate-y-[1px]" />
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative z-10">
              {steps.map((step, i) => (
                <motion.div key={step.num} {...fadeUp(i * 0.1)} className="text-center flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-white border-2 border-brand-500 flex items-center justify-center mb-6 shadow-lg shadow-brand-100 relative">
                    <span className="text-xl font-display font-bold text-brand-600">{step.num}</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. CTA BANNER ────────────────────────────── */}
      <section className="relative py-24 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(255,255,255,0.08),transparent_60%)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* grid decoration */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(to right,#fff 1px,transparent 1px)', backgroundSize: '40px 40px' }}
        />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <motion.div {...fadeUp(0)}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-white/15 text-white border border-white/20 mb-6">
              All in One Place
            </span>
          </motion.div>
          <motion.h2 {...fadeUp(0.08)} className="font-display text-3xl md:text-5xl font-bold text-white leading-tight mb-5">
            Get Transcription, Filing, Records
            Retrieval, and More — All in One Place
          </motion.h2>
          <motion.p {...fadeUp(0.15)} className="text-white/75 text-lg leading-relaxed mb-10">
            Whether you need help with one task or want a long-time support
            partner, we're ready when you are.
          </motion.p>
          <motion.div {...fadeUp(0.2)} className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to={ROUTES.CONTACT}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-brand-700 font-bold text-sm hover:bg-brand-50 transition-all shadow-[0_4px_0_rgba(0,20,80,0.35)] hover:-translate-y-px active:translate-y-[3px] active:shadow-none"
            >
              Let's Talk <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:8663866003"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/10 text-white font-semibold text-sm hover:bg-white/20 transition-all border border-white/25"
            >
              <Phone className="w-4 h-4" /> (866) 386-6003
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── 7. TESTIMONIALS ──────────────────────────── */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...fadeUp(0)} className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-brand-50 text-brand-600 border border-brand-200 mb-4">
              Client Stories
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900">
              What Clients Are Saying
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.1)}
                className="bg-slate-50 rounded-3xl border border-slate-200 p-7 flex flex-col hover:border-brand-200 hover:shadow-xl hover:shadow-brand-500/5 transition-all duration-300"
              >
                <div className="flex items-center gap-1 mb-5">
                  {Array.from({ length: t.stars }).map((_, si) => (
                    <Star key={si} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <blockquote className="text-slate-700 leading-relaxed text-sm flex-1 mb-6 italic">
                  "{t.quote}"
                </blockquote>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">{t.author[0]}</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{t.author}</p>
                    <p className="text-xs text-slate-500">{t.role} · {t.firm}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. FAQ ───────────────────────────────────── */}
      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div {...fadeUp(0)} className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-brand-50 text-brand-600 border border-brand-200 mb-4">
              FAQs
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              Common Questions
            </h2>
            <p className="text-slate-500">
              Here are the answers to the questions we get the most.
            </p>
          </motion.div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm px-6 md:px-8 divide-y divide-slate-100">
            {faqs.map((item, i) => (
              <FAQItem key={i} q={item.q} a={item.a} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. CONTACT FORM ──────────────────────────── */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
            {/* left – copy */}
            <motion.div {...fadeUp(0)}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-brand-50 text-brand-600 border border-brand-200 mb-5">
                Start a Conversation
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-5 leading-tight">
                Get Started and Get Real Solutions
              </h2>
              <p className="text-slate-500 leading-relaxed mb-8 text-base">
                We'll learn about your workflow, talk through your goals, and give you
                support that fits. No long-term commitment required to get started.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  { icon: Phone, label: '(866) 386-6003', sub: 'Mon – Fri, 8am – 6pm PT', href: 'tel:8663866003' },
                  { icon: Mail, label: 'info@ewordsolutions.com', sub: 'We reply within 24 hours', href: 'mailto:info@ewordsolutions.com' },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-4 p-4 rounded-2xl border border-slate-200 hover:border-brand-200 hover:shadow-md transition-all group"
                  >
                    <div className="w-11 h-11 rounded-xl bg-brand-50 group-hover:bg-brand-100 flex items-center justify-center flex-shrink-0 transition-colors">
                      <item.icon className="w-5 h-5 text-brand-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{item.label}</p>
                      <p className="text-xs text-slate-500">{item.sub}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brand-500 ml-auto opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5" />
                  </a>
                ))}
              </div>

              {/* trust badges */}
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: Shield, text: 'HIPAA Compliant' },
                  { icon: Lock_, text: 'Encrypted Portal' },
                  { icon: Award, text: 'CA Workers\' Comp Focused' },
                ].map((b) => (
                  <span key={b.text} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-semibold">
                    <b.icon className="w-3.5 h-3.5" /> {b.text}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* right – form */}
            <motion.div {...fadeUp(0.12)}>
              <form
                ref={formRef}
                className="bg-slate-50 rounded-3xl border border-slate-200 p-7 md:p-9 space-y-5"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                      First Name
                    </label>
                    <input
                      type="text"
                      placeholder="Jane"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-200 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                      Last Name
                    </label>
                    <input
                      type="text"
                      placeholder="Smith"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-200 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                    Firm / Company
                  </label>
                  <input
                    type="text"
                    placeholder="Smith & Associates Law"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-200 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="jane@smithlaw.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-200 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="(555) 000-0000"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-200 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                    Services Interested In
                  </label>
                  <select className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-200 transition-all appearance-none">
                    <option value="">Select a service…</option>
                    <option value="records">Records Retrieval</option>
                    <option value="eworkflow">E-Office Workflow</option>
                    <option value="medical">Medical Records Review</option>
                    <option value="dictation">Dictation & Transcription</option>
                    <option value="all">All Services</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                    Message (optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your firm's needs…"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-200 transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-brand-500 text-white font-semibold text-sm hover:bg-brand-600 transition-all shadow-[0_3px_0_rgba(0,30,100,0.4)] hover:-translate-y-px active:translate-y-[2px] active:shadow-none flex items-center justify-center gap-2"
                >
                  Send Message <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-center text-xs text-slate-400">
                  We'll get back to you within 24 hours.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 10. FINAL CTA ────────────────────────────── */}
      <section className="relative py-24 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-brand-900/40 to-slate-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.12),transparent_70%)]" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <motion.div {...fadeUp(0)}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-white/10 text-blue-300 border border-white/15 mb-6">
              <Clock className="w-3.5 h-3.5" /> Reclaim Your Time
            </span>
          </motion.div>
          <motion.h2 {...fadeUp(0.08)} className="font-display text-3xl md:text-5xl font-bold text-white leading-tight mb-5">
            Put Time Back on Your Calendar{' '}
            <span className="text-brand-400">with EWORD</span>
          </motion.h2>
          <motion.p {...fadeUp(0.15)} className="text-slate-400 text-lg leading-relaxed mb-10">
            Let our team handle the filings, records, and transcription. You focus
            on your clients and the work that matters most.
          </motion.p>
          <motion.div {...fadeUp(0.22)} className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to={ROUTES.CONTACT}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-brand-500 text-white font-bold text-sm hover:bg-brand-600 transition-all shadow-[0_3px_0_rgba(0,30,100,0.45)] hover:-translate-y-px"
            >
              Contact Us <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to={ROUTES.ABOUT}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/10 text-white font-semibold text-sm hover:bg-white/20 transition-all border border-white/20"
            >
              About Us
            </Link>
          </motion.div>
        </div>
      </section>

    </MainLayout>
  );
}

/* Alias so we can use it inline without importing */
const Lock_ = Shield;
