import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, Phone, ArrowRight } from "lucide-react";
import logo from "@/assets/EWORD-logo.png";
import { megaServices as defaultServices, navLinks as defaultNavLinks } from "@/data/navigation/navData";

export default function Navbar({
  services = defaultServices,
  navLinks = defaultNavLinks,
  phone    = { display: '(866) 386-6003', href: 'tel:8663866003' },
}) {
  const [scrolled, setScrolled]           = useState(false);
  const [menuOpen, setMenuOpen]           = useState(false);
  const [megaOpen, setMegaOpen]           = useState(false);
  const [mobileSvcOpen, setMobileSvcOpen] = useState(false);
  const hideTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openMega  = () => { clearTimeout(hideTimer.current); setMegaOpen(true); };
  const closeMega = () => { hideTimer.current = setTimeout(() => setMegaOpen(false), 180); };
  const close     = () => { clearTimeout(hideTimer.current); setMenuOpen(false); setMegaOpen(false); setMobileSvcOpen(false); };

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100" : "bg-white backdrop-blur-sm"}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-[72px] flex items-center justify-between">

        <Link to="/" className="flex items-center flex-shrink-0" onClick={close}>
          <img src={logo} alt="EWORD Solutions" className="h-10 w-auto object-contain" />
        </Link>

        <ul className="hidden lg:flex items-center gap-1 list-none">
          <li className="relative" onMouseEnter={openMega} onMouseLeave={closeMega}>
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-brand-600 hover:bg-brand-50 transition-all duration-200">
              Services
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${megaOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {megaOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  transition={{ duration: 0.18 }}
                  onMouseEnter={openMega}
                  onMouseLeave={closeMega}
                  className="absolute top-full left-0 mt-2 w-[580px] bg-white rounded-2xl shadow-xl border border-slate-100 p-6"
                >
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Our Services</p>
                  <div className="grid grid-cols-2 gap-3">
                    {services.map((s) => (
                      <Link key={s.name} to={s.href} onClick={close}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-brand-50 transition-colors group">
                        <span className="flex-shrink-0 w-9 h-9 rounded-lg bg-brand-50 flex items-center justify-center text-brand-600 group-hover:bg-brand-100 transition-colors">
                          <s.Icon className="w-4 h-4" />
                        </span>
                        <div>
                          <div className="text-sm font-semibold text-slate-800 mb-0.5">{s.name}</div>
                          <div className="text-xs text-slate-500 leading-relaxed">{s.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-sm text-slate-500">California workers' comp legal support</span>
                    <Link to="/contact" onClick={close}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-500 text-white text-sm font-medium hover:bg-brand-600 transition-colors">
                      Talk to Us <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          {navLinks.map(({ label, to }) => (
            <li key={label}>
              <Link to={to} onClick={close}
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-brand-600 hover:bg-brand-50 transition-all duration-200">
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-2">
          <Link to="/signup" className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors">Sign Up</Link>
          <Link to="/login"  className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors">Login</Link>
          <a href={phone.href}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-500 text-white text-sm font-semibold hover:bg-brand-600 transition-all duration-200 shadow-[0_3px_0_rgba(0,30,100,0.4)] hover:-translate-y-px active:translate-y-[2px] active:shadow-none">
            <Phone className="w-3.5 h-3.5" /> Call Now
          </a>
        </div>

        <button className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
          onClick={() => setMenuOpen((o) => !o)} aria-label="Toggle menu">
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden bg-white border-t border-slate-100"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              <button
                className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-600 transition-colors"
                onClick={() => setMobileSvcOpen((o) => !o)}
              >
                Services
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileSvcOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {mobileSvcOpen && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden pl-4 flex flex-col gap-1">
                    {services.map((s) => (
                      <Link key={s.name} to={s.href} onClick={close}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-slate-600 hover:text-brand-600 hover:bg-brand-50 transition-colors">
                        <s.Icon className="w-4 h-4" /> {s.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
              {navLinks.map(({ label, to }) => (
                <Link key={label} to={to} onClick={close}
                  className="px-4 py-3 rounded-xl text-sm font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-600 transition-colors">
                  {label}
                </Link>
              ))}
              <div className="pt-3 mt-1 border-t border-slate-100 flex flex-col gap-2">
                <a href={phone.href}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-500 text-white text-sm font-semibold">
                  <Phone className="w-4 h-4" /> {phone.display}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
