import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Zap, ArrowRight, CheckCircle, ArrowLeft } from 'lucide-react';
import { MainLayout } from '@/layouts/MainLayout';
import { ROUTES } from '@/constants/routes';

const highlights = [
  'Dictation intake via secure mobile app',
  "Document formatting to your firm's standards",
  'E-filing with the court or board',
  'Document upload to your case management system',
  'Service of process handled end to end',
];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

export default function EOfficeWorkflowPage() {
  return (
    <MainLayout>
      <section className="relative pt-36 pb-24 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-900/80 via-slate-900/90 to-slate-900" />
        <motion.div {...fade()} className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <Link to={ROUTES.SERVICES} className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> All Services
          </Link>
          <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-500/20 text-brand-400 mx-auto mb-6">
            <Zap className="w-7 h-7" />
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
            E-Office Workflow
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Dictation to e-filing in one seamless workflow. Formatting, uploading,
            and serving — all handled by our team.
          </p>
        </motion.div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-start">
          <motion.div {...fade()}>
            <h2 className="font-display text-3xl font-bold text-slate-900 mb-5">
              One Pipeline, Zero Handoffs
            </h2>
            <p className="text-slate-500 leading-relaxed mb-5">
              Most firms treat dictation, formatting, and filing as three separate
              tasks handled by three separate people. That means three places for
              delays, mistakes, and dropped balls.
            </p>
            <p className="text-slate-500 leading-relaxed mb-8">
              EWORD's e-office workflow connects every step. You dictate; we handle
              everything else — formatting to your firm's standards, e-filing with
              the board or court, uploading to your case management system, and
              serving documents as needed.
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
