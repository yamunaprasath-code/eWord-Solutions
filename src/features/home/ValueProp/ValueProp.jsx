import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import defaultBg from "@/assets/bg-cta.jpg";
import { valuePropContent as defaultContent } from "@/data/home/valuePropData";

export default function ValueProp({
  content = defaultContent,
  bgImage = defaultBg,
}) {
  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-brand-900/70" />
      <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight mb-5 leading-tight">
            {content.title}
          </h2>
          <p className="text-brand-100 text-lg leading-relaxed mb-8">{content.body}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={content.primaryCta.href}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-brand-600 font-semibold text-sm hover:bg-brand-50 transition-all duration-200 shadow-lg hover:-translate-y-0.5"
            >
              {content.primaryCta.label} <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={content.secondaryCta.href}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-white/30 text-white font-semibold text-sm hover:border-white/60 transition-all duration-200"
            >
              {content.secondaryCta.label}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
