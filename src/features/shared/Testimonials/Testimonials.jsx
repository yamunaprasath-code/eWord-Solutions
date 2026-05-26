import { motion } from "framer-motion";
import { ArrowRight, Briefcase } from "lucide-react";
import { testimonialsContent as defaultContent } from "@/data/shared/testimonialsData";

export default function Testimonials({ content = defaultContent }) {
  return (
    <section className="py-24 md:py-32 bg-[#d9ecff8a]" id="testimonials">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-brand-50 text-brand-600 border border-brand-200 mb-5">
              {content.badge}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-5 leading-tight">
              {content.title}
            </h2>
            {content.paragraphs.map((p, i) => (
              <p key={i} className="text-slate-500 leading-relaxed mb-4">{p}</p>
            ))}
            <a
              href={content.cta.href}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-500 text-white font-semibold text-sm hover:bg-brand-600 transition-all shadow-[0_3px_0_rgba(0,30,100,0.4)] hover:-translate-y-px active:translate-y-[2px] active:shadow-none"
            >
              {content.cta.label} <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-brand-50 to-slate-100 aspect-[4/3] flex items-center justify-center border border-slate-200">
              <div className="text-center">
                <div className="w-20 h-20 rounded-2xl bg-brand-500/10 flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-10 h-10 text-brand-600" />
                </div>
                <p className="text-sm font-medium text-slate-500">Trusted by Law Firms</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
