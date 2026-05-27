import { motion } from 'framer-motion';

const cards = [
  {
    num: '01',
    title: "End-to-End Legal Support for Workers' Comp Firms",
    description:
      "Most vendors offer transcription or record retrieval. EWORD Solutions delivers a complete support system — from dictation through e-filing and document service — designed specifically for the needs and pace of California workers' compensation law firms.",
  },
  {
    num: '02',
    title: 'Human Service, Not Just Software',
    description:
      "EWORD gives law firms a real team they can trust. Clients know their contacts by name and get quick, knowledgeable responses — not generic help desks or ticket systems.",
  },
  {
    num: '03',
    title: 'Flexibility and Modularity',
    description:
      "Firms can pick one service or the full package. EWORD scales with your needs — whether you're handling a single letter or managing records across hundreds of cases.",
  },
];

export default function Differentiators({
  badge    = 'Why EWORD',
  title    = 'What Makes EWORD Solutions Special',
  subtitle = "We're not just another vendor. We're the support team your firm has been looking for.",
}) {
  return (
    <section className="py-24 md:py-32 bg-white" id="differentiators">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-brand-50 text-brand-500 border border-brand-100 mb-4">
            {badge}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            {title}
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-lg leading-relaxed">{subtitle}</p>
        </motion.div>

        <div className="flex flex-col gap-4">
          {cards.map(({ num, title: cardTitle, description }, i) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="flex items-start gap-6 bg-slate-50 rounded-2xl border border-slate-100 px-8 py-7"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-400">{num}</span>
                  <span className="h-px w-4 bg-slate-200" />
                  <h3 className="font-display text-lg font-bold text-slate-900 leading-tight">{cardTitle}</h3>
                </div>
                <p className="text-slate-500 text-[15px] leading-relaxed">{description}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
