import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { aboutContent as defaultContent } from '@/data/about/aboutData';

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay },
});

export default function About({ content = defaultContent }) {
  const { heroBanner, intro, mission, differentiators, history, testimonial, cta } = content;

  return (
    <div id="about">

      <section className="relative py-28 md:py-36 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-900/80 via-slate-900/90 to-slate-900" />
        <motion.div {...fade()} className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            {heroBanner.title}
          </h1>
        </motion.div>
      </section>

      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div {...fade()} className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-5">
              {intro.title}
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed">{intro.subtitle}</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div {...fade(0.1)}>
              <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-slate-100 to-brand-50 aspect-[4/3] flex items-center justify-center border border-slate-200">
                <span className="text-sm text-slate-400 font-medium">Team photo</span>
              </div>
            </motion.div>

            <motion.div {...fade(0.2)}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-brand-50 text-brand-600 border border-brand-200 mb-5">
                {mission.badge}
              </span>
              {mission.paragraphs.map((p, i) => (
                <p key={i} className={`text-slate-${i === 0 ? '600 text-lg' : '500'} leading-relaxed mb-5`}>{p}</p>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.h2 {...fade()} className="font-display text-3xl md:text-4xl font-bold text-white text-center mb-16">
            {differentiators.title}
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {differentiators.cards.map((d, i) => (
              <motion.div key={d.title} {...fade(i * 0.12)}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col">
                <div className="w-3 h-3 rounded-full bg-brand-400 mb-6" />
                <h3 className="font-display text-lg font-bold text-white mb-4">{d.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm flex-1">{d.body}</p>
                {d.cta && (
                  <a href="#contact"
                    className="mt-6 self-start inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-white/20 text-white text-sm font-semibold hover:border-brand-400 hover:text-brand-400 transition-all">
                    Let's Talk Solutions <ArrowRight className="w-4 h-4" />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div {...fade()}>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-6">
                {history.title}
              </h2>
              <div className="space-y-5 text-slate-500 leading-relaxed">
                {history.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </motion.div>

            <motion.div {...fade(0.15)}>
              <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-brand-50 to-slate-100 aspect-[4/3] flex items-center justify-center border border-slate-200">
                <span className="text-sm text-slate-400 font-medium">Team photo</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-brand-500">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div {...fade()}>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-10">
              {testimonial.title}
            </h2>
            <blockquote className="text-white/90 text-lg leading-relaxed mb-8">
              "{testimonial.quote}"
            </blockquote>
            <cite className="not-italic">
              <p className="font-semibold text-white">{testimonial.author}</p>
              <p className="text-white/70 text-sm">{testimonial.company}</p>
            </cite>
          </motion.div>
        </div>
      </section>

      <section className="relative py-28 md:py-36 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-900/60 to-slate-900/90" />
        <motion.div {...fade()} className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
            {cta.title.split('EWORD Solutions')[0]}
            <span className="text-brand-400">EWORD Solutions</span>
          </h2>
          <p className="text-slate-400 text-lg mb-10">{cta.subtitle}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={cta.primaryCta.href}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-brand-500 text-white font-semibold text-sm hover:bg-brand-400 transition-all shadow-[0_3px_0_rgba(0,30,100,0.4)] hover:-translate-y-px active:translate-y-[2px] active:shadow-none">
              {cta.primaryCta.label} <ArrowRight className="w-4 h-4" />
            </a>
            <a href={cta.secondaryCta.href}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border-2 border-white/20 text-white font-semibold text-sm hover:border-white/50 transition-all hover:-translate-y-0.5">
              {cta.secondaryCta.label}
            </a>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
