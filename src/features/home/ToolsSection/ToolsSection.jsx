import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import defaultImg from "@/assets/tools-photo.webp";
import { toolsBadges as defaultBadges, toolsContent as defaultContent } from "@/data/home/toolsData";

export default function ToolsSection({
  content = defaultContent,
  badges  = defaultBadges,
  image   = defaultImg,
}) {
  return (
    <section className="py-24 md:py-32 bg-white" id="tools">
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
            <div className="flex flex-wrap gap-3 mb-8">
              {badges.map(({ Icon, label }) => (
                <span key={label} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-brand-50 text-brand-700 text-xs font-semibold">
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </span>
              ))}
            </div>
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
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] border border-slate-200 shadow-lg">
              <img src={image} alt={content.title} className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
