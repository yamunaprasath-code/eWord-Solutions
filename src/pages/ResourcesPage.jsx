import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, BookOpen, Download } from 'lucide-react';
import { MainLayout } from '@/layouts/MainLayout';
import { ROUTES } from '@/constants/routes';

const resources = [
  {
    Icon: FileText,
    type: 'Guide',
    title: 'Records Retrieval Checklist',
    desc: 'A step-by-step checklist for managing subpoenas and HIPAA requests from start to finish.',
    href: '#',
  },
  {
    Icon: BookOpen,
    type: 'Guide',
    title: "Workers' Comp Document Workflow Guide",
    desc: 'Learn how to structure your dictation-to-filing pipeline to cut turnaround time and reduce errors.',
    href: '#',
  },
  {
    Icon: Download,
    type: 'Template',
    title: 'Medical Records Organization Template',
    desc: 'Our recommended format for organizing and indexing medical records packages for trial.',
    href: '#',
  },
];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

export default function ResourcesPage() {
  return (
    <MainLayout>
      <section className="relative pt-36 pb-24 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-900/80 via-slate-900/90 to-slate-900" />
        <motion.div {...fade()} className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-white/10 text-white border border-white/20 mb-6">
            Resources
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
            Resources for Legal Professionals
          </h1>
          <p className="text-slate-400 text-lg">
            Free guides, templates, and checklists to help your firm run more efficiently.
          </p>
        </motion.div>
      </section>

      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-3 gap-8">
            {resources.map((r, i) => (
              <motion.div key={r.title} {...fade(i * 0.1)}>
                <a href={r.href}
                  className="group flex flex-col h-full p-8 rounded-2xl border border-slate-200 hover:border-brand-300 hover:shadow-lg hover:shadow-brand-500/10 transition-all duration-300">
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-50 text-brand-600 group-hover:bg-brand-100 transition-colors mb-6">
                    <r.Icon className="w-6 h-6" />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-500 mb-2">
                    {r.type}
                  </span>
                  <h2 className="font-display text-lg font-bold text-slate-900 mb-3">
                    {r.title}
                  </h2>
                  <p className="text-slate-500 leading-relaxed text-sm flex-1">{r.desc}</p>
                  <div className="mt-6 flex items-center gap-1.5 text-sm font-semibold text-brand-600 group-hover:gap-3 transition-all">
                    Download <ArrowRight className="w-4 h-4" />
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <motion.div {...fade()} className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-4">
            Looking for articles and how-to guides?
          </h2>
          <p className="text-slate-500 mb-8">
            Our blog covers practical topics for California workers' comp legal professionals.
          </p>
          <Link to={ROUTES.BLOG}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-brand-500 text-white font-semibold text-sm hover:bg-brand-600 transition-all shadow-[0_3px_0_rgba(0,30,100,0.4)]">
            Visit the Blog <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>
    </MainLayout>
  );
}
