import { motion } from 'framer-motion';
import logo from '@/assets/EWORD-logo.png';
import {
  quickLinks  as defaultQuickLinks,
  serviceLinks as defaultServiceLinks,
  contactInfo as defaultContactInfo,
  brand       as defaultBrand,
  legalLinks  as defaultLegalLinks,
} from '@/data/shared/footerData';

export default function Footer({
  brand       = defaultBrand,
  quickLinks  = defaultQuickLinks,
  services    = defaultServiceLinks,
  contactInfo = defaultContactInfo,
  legalLinks  = defaultLegalLinks,
}) {
  return (
    <footer className="bg-[#0b1e31] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12"
        >
          <div className="lg:col-span-1">
            <a href="#home" className="inline-flex mb-4">
              <img src={logo} alt="EWORD Solutions" className="h-9 w-auto object-contain brightness-0 invert" />
            </a>
            <p className="text-sm text-slate-400 leading-relaxed">{brand.description}</p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map(l => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-slate-300 hover:text-brand-400 transition-colors">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Services</h4>
            <ul className="space-y-2.5">
              {services.map(s => (
                <li key={s.label}>
                  <a href={s.href} className="text-sm text-slate-300 hover:text-brand-400 transition-colors">{s.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Contact Us</h4>
            <div className="space-y-3">
              {contactInfo.map(({ Icon, href, text }) => (
                <div key={text} className="flex items-start gap-3">
                  <Icon className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
                  {href
                    ? <a href={href} className="text-sm text-slate-300 hover:text-brand-400 transition-colors">{text}</a>
                    : <p className="text-sm text-slate-400 whitespace-pre-line">{text}</p>
                  }
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">{brand.copyright}</p>
          <div className="flex items-center gap-6">
            {legalLinks.map(l => (
              <a key={l.label} href={l.href} className="text-xs text-slate-500 hover:text-brand-400 transition-colors">{l.label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
