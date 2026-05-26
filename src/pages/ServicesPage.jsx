import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Folder, Zap, Stethoscope, Mic, ArrowRight } from 'lucide-react';
import { MainLayout } from '@/layouts/MainLayout';
import { ROUTES } from '@/constants/routes';

const services = [
  {
    Icon: Folder,
    tag: 'Retrieval',
    name: 'Records Retrieval',
    href: ROUTES.SERVICES_RECORDS,
    desc: 'Full subpoena & HIPAA request management from draft to delivery. We handle every step so your team stays focused on the case.',
  },
  {
    Icon: Zap,
    tag: 'Workflow',
    name: 'E-Office Workflow',
    href: ROUTES.SERVICES_EWORKFLOW,
    desc: 'Dictation to e-filing in one seamless document workflow. Formatting, uploading, and serving — handled end to end.',
  },
  {
    Icon: Stethoscope,
    tag: 'Review',
    name: 'Medical Records Review',
    href: ROUTES.SERVICES_MEDICAL_REVIEW,
    desc: 'Chronologically organized, hyperlinked PDFs ready for trial. Get clean, court-ready records packages fast.',
  },
  {
    Icon: Mic,
    tag: 'Transcription',
    name: 'Dictation & Transcription',
    href: ROUTES.SERVICES_DICTATION,
    desc: 'Secure mobile app submission with 99% accuracy guarantee. Receive clean, proofread documents within your turnaround window.',
  },
];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

export default function ServicesPage() {
  return (
    <MainLayout>
      <section className="relative pt-36 pb-24 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-900/80 via-slate-900/90 to-slate-900" />
        <motion.div {...fade()} className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-white/10 text-white border border-white/20 mb-6">
            What We Do
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
            Our Services
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Legal support built for California workers' comp firms — from dictation
            to record delivery, we handle the behind-the-scenes work.
          </p>
        </motion.div>
      </section>

      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((s, i) => (
              <motion.div key={s.name} {...fade(i * 0.1)}>
                <Link to={s.href}
                  className="group flex flex-col h-full p-8 rounded-2xl border border-slate-200 hover:border-brand-300 hover:shadow-lg hover:shadow-brand-500/10 transition-all duration-300">
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-50 text-brand-600 group-hover:bg-brand-100 transition-colors mb-6">
                    <s.Icon className="w-6 h-6" />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-500 mb-2">
                    {s.tag}
                  </span>
                  <h2 className="font-display text-xl font-bold text-slate-900 mb-3">
                    {s.name}
                  </h2>
                  <p className="text-slate-500 leading-relaxed flex-1">{s.desc}</p>
                  <div className="mt-6 flex items-center gap-1.5 text-sm font-semibold text-brand-600 group-hover:gap-3 transition-all">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-brand-500">
        <motion.div {...fade()} className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-4">
            Not sure which service you need?
          </h2>
          <p className="text-white/80 mb-8">
            Talk to our team and we'll help you figure out the best fit for your firm.
          </p>
          <Link to={ROUTES.CONTACT}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-brand-600 font-semibold text-sm hover:bg-brand-50 transition-all shadow-lg">
            Contact Us <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>
    </MainLayout>
  );
}
