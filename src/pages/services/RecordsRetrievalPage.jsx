import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Folder, ArrowRight, CheckCircle, ArrowLeft } from 'lucide-react';
import { MainLayout } from '@/layouts/MainLayout';
import { ROUTES } from '@/constants/routes';

const highlights = [
  'Subpoena drafting and service',
  'HIPAA-compliant authorization management',
  'Provider follow-up and deadline tracking',
  'Organized, indexed record packages',
  'Delivery in your preferred format',
];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

export default function RecordsRetrievalPage() {
  return (
    <MainLayout>
      <section className="relative pt-36 pb-24 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-900/80 via-slate-900/90 to-slate-900" />
        <motion.div {...fade()} className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <Link to={ROUTES.SERVICES} className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> All Services
          </Link>
          <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-500/20 text-brand-400 mx-auto mb-6">
            <Folder className="w-7 h-7" />
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
            Records Retrieval
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Full subpoena and HIPAA request management — from draft to delivery.
            We handle every provider interaction so your team doesn't have to.
          </p>
        </motion.div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-start">
          <motion.div {...fade()}>
            <h2 className="font-display text-3xl font-bold text-slate-900 mb-5">
              End-to-End Retrieval, Every Time
            </h2>
            <p className="text-slate-500 leading-relaxed mb-5">
              Records retrieval is one of the most time-consuming tasks in workers'
              comp litigation. Between drafting subpoenas, serving providers, and
              following up on delays, your team can spend dozens of hours per case
              on logistics alone.
            </p>
            <p className="text-slate-500 leading-relaxed mb-8">
              EWORD takes that entirely off your plate. Our retrieval team manages
              every step from request to receipt, so you receive an organized,
              indexed package ready to review or send directly to your medical reviewer.
            </p>
            <Link to={ROUTES.CONTACT}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-brand-500 text-white font-semibold text-sm hover:bg-brand-600 transition-all shadow-[0_3px_0_rgba(0,30,100,0.4)] hover:-translate-y-px active:translate-y-[2px] active:shadow-none">
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div {...fade(0.15)}>
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8">
              <h3 className="font-display text-lg font-bold text-slate-900 mb-6">
                What's Included
              </h3>
              <ul className="space-y-4">
                {highlights.map(h => (
                  <li key={h} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-brand-500 flex-shrink-0" />
                    <span className="text-slate-700 text-sm font-medium">{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
}
