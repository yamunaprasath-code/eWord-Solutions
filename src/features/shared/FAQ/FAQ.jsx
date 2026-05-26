import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ArrowRight, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { faqCategories, faqItems } from '@/data/shared/faq';

export default function FAQ({
  badge      = 'FAQs',
  title      = "You've Got Questions, We Have Answers",
  subtitle   = 'Everything you need to know before getting started with EWORD Solutions.',
  categories = faqCategories,
  faqs       = faqItems,
  ctaBanner  = {
    title:    'Still have questions?',
    subtitle: 'Our team typically responds within a few hours.',
    cta:      { label: 'Contact Us', to: '/contact' },
  },
}) {
  const [activeCat, setActiveCat] = useState('All');
  const [open, setOpen] = useState(null);

  const filtered = activeCat === 'All' ? faqs : faqs.filter(f => f.cat === activeCat);

  const handleCat = (cat) => {
    setActiveCat(cat);
    setOpen(null);
  };

  return (
    <section className="py-24 md:py-32 bg-slate-50" id="faq">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-brand-50 text-brand-600 border border-brand-200 mb-4">
            {badge}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            {title}
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed">{subtitle}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex justify-center mb-10"
        >
          <div className="inline-flex items-center bg-white border border-slate-200 rounded-2xl p-1.5 gap-1 flex-wrap justify-center shadow-sm">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => handleCat(cat)}
                className="relative px-4 py-2 rounded-xl text-sm font-semibold transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                {activeCat === cat && (
                  <motion.span
                    layoutId="faq-tab-pill"
                    className="absolute inset-0 rounded-xl bg-brand-500"
                    style={{ boxShadow: '0 3px 0 rgba(0,30,100,0.4), 0 4px 14px rgba(0,54,134,0.2)' }}
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  />
                )}
                <span className={`relative z-10 transition-colors duration-150 whitespace-nowrap ${
                  activeCat === cat ? 'text-white' : 'text-slate-500 hover:text-slate-800'
                }`}>
                  {cat}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCat}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="space-y-2.5"
          >
            {filtered.map((item, i) => {
              const isOpen = open === i;
              return (
                <motion.div
                  key={item.q}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className={`relative rounded-2xl border bg-white transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'border-brand-200 shadow-md shadow-brand-500/8'
                      : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
                  }`}
                >
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        exit={{ scaleY: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 inset-y-0 w-[3px] bg-brand-500 origin-top"
                      />
                    )}
                  </AnimatePresence>

                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left group"
                  >
                    <div className="flex items-start gap-3.5 min-w-0">
                      <span className={`text-xs font-bold tabular-nums mt-0.5 flex-shrink-0 transition-colors ${
                        isOpen ? 'text-brand-500' : 'text-slate-300 group-hover:text-slate-400'
                      }`}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className={`text-sm font-semibold leading-relaxed transition-colors ${
                        isOpen ? 'text-brand-600' : 'text-slate-800 group-hover:text-slate-900'
                      }`}>
                        {item.q}
                      </span>
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-200 ${
                        isOpen ? 'bg-brand-500 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'
                      }`}
                    >
                      <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 pl-[3.75rem]">
                          <div className="h-px bg-slate-100 mb-4" />
                          <p className="text-sm text-slate-500 leading-relaxed">{item.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6"
          style={{ boxShadow: '0 4px 0 rgba(0,20,80,0.45), 0 12px 40px rgba(0,54,134,0.3)' }}
        >
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-display font-bold text-white text-lg leading-tight">{ctaBanner.title}</p>
              <p className="text-white/70 text-sm mt-0.5">{ctaBanner.subtitle}</p>
            </div>
          </div>
          <Link
            to={ctaBanner.cta.to}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-brand-600 text-sm font-bold hover:bg-brand-50 transition-all duration-150 shadow-[0_3px_0_rgba(0,20,80,0.25)] hover:-translate-y-px active:translate-y-[2px] active:shadow-none flex-shrink-0"
          >
            {ctaBanner.cta.label} <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
