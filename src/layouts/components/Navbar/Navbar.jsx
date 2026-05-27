import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Phone, ArrowRight } from "lucide-react";
import logo from "@/assets/EWORD-logo.png";
import {
  megaServices  as defaultServices,
  resourceLinks as defaultResourceLinks,
  navLinks      as defaultNavLinks,
} from "@/data/navigation/navData";

/* ── active-class helpers ───────────────────────────────────── */

const navCls = ({ isActive }) =>
  `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
    isActive
      ? "text-brand-600 bg-brand-50 font-semibold"
      : "text-slate-600 hover:text-brand-600 hover:bg-brand-50"
  }`;

/** Text half of a split trigger — tight right padding so chevron sits close */
const triggerLabelCls = ({ isActive }) =>
  `flex items-center pl-4 pr-1 py-2 text-sm font-medium transition-all duration-200 ${
    isActive
      ? "text-brand-600 font-semibold"
      : "text-slate-600 hover:text-brand-600"
  }`;

const mobileNavCls = ({ isActive }) =>
  `px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
    isActive
      ? "text-brand-600 bg-brand-50 font-semibold"
      : "text-slate-700 hover:bg-brand-50 hover:text-brand-600"
  }`;

const mobileSubItemCls = ({ isActive }) =>
  `flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-colors ${
    isActive
      ? "text-brand-600 bg-brand-100 font-semibold"
      : "text-slate-600 hover:text-brand-600 hover:bg-brand-50"
  }`;

/* ── shared split-trigger wrapper ───────────────────────────── */
function SplitTrigger({ rootHref, label, open, onToggle, onCloseAll, isActive: active }) {
  return (
    <div className={`flex items-center rounded-lg transition-colors ${active ? "bg-brand-50" : "hover:bg-brand-50"}`}>
      <NavLink to={rootHref} end={false} onClick={onCloseAll} className={triggerLabelCls}>
        {label}
      </NavLink>
      <button
        onClick={onToggle}
        className={`flex items-center pl-0.5 pr-2.5 py-2 transition-colors ${
          active ? "text-brand-600" : "text-slate-400 hover:text-brand-600"
        }`}
        aria-label={`Toggle ${label} menu`}
      >
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
    </div>
  );
}

/* ── SERVICES MEGA MENU (wide, 2-col grid) ──────────────────── */
function ServicesMega({ services, open, onOpen, onClose, onCloseAll, isActive }) {
  return (
    <li className="relative" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <SplitTrigger
        rootHref="/services"
        label="Services"
        open={open}
        onToggle={() => (open ? onClose() : onOpen())}
        onCloseAll={onCloseAll}
        isActive={isActive}
      />

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            onMouseEnter={onOpen}
            onMouseLeave={onClose}
            className="absolute top-full left-0 mt-2 w-[580px] bg-white rounded-2xl shadow-xl border border-slate-100 p-6"
          >
            {/* header */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Our Services
              </p>
              <Link
                to="/services"
                onClick={onCloseAll}
                className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700 transition-colors group"
              >
                View All Services
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* 2-col grid */}
            <div className="grid grid-cols-2 gap-3">
              {services.map((s) => (
                <NavLink
                  key={s.name}
                  to={s.href}
                  onClick={onCloseAll}
                  className={({ isActive }) =>
                    `flex items-start gap-3 p-3 rounded-xl transition-colors group ${
                      isActive ? "bg-brand-50" : "hover:bg-brand-50"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                        isActive
                          ? "bg-brand-100 text-brand-600"
                          : "bg-brand-50 text-brand-600 group-hover:bg-brand-100"
                      }`}>
                        <s.Icon className="w-4 h-4" />
                      </span>
                      <div>
                        <div className={`text-sm font-semibold mb-0.5 ${isActive ? "text-brand-700" : "text-slate-800"}`}>
                          {s.name}
                        </div>
                        <div className="text-xs text-slate-500 leading-relaxed">{s.desc}</div>
                      </div>
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* footer */}
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
              <Link
                to="/services"
                onClick={onCloseAll}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-sm font-medium hover:bg-slate-200 transition-colors"
              >
                All Services Overview <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/contact"
                onClick={onCloseAll}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-500 text-white text-sm font-medium hover:bg-brand-600 transition-colors"
              >
                Talk to Us <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

/* ── RESOURCES DROPDOWN (compact) ───────────────────────────── */
function ResourcesDropdown({ items, open, onOpen, onClose, onCloseAll, isActive }) {
  return (
    <li className="relative" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <SplitTrigger
        rootHref="/resources"
        label="Resources"
        open={open}
        onToggle={() => (open ? onClose() : onOpen())}
        onCloseAll={onCloseAll}
        isActive={isActive}
      />

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            onMouseEnter={onOpen}
            onMouseLeave={onClose}
            className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-3"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 px-2">
              Resources
            </p>
            <div className="flex flex-col gap-0.5">
              {items.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  end
                  onClick={onCloseAll}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors group ${
                      isActive ? "bg-brand-50" : "hover:bg-slate-50"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                        isActive
                          ? "bg-brand-100 text-brand-600"
                          : "bg-slate-100 text-slate-500 group-hover:bg-brand-50 group-hover:text-brand-600"
                      }`}>
                        <item.Icon className="w-3.5 h-3.5" />
                      </span>
                      <div>
                        <p className={`text-sm font-semibold leading-none mb-0.5 ${isActive ? "text-brand-700" : "text-slate-800"}`}>
                          {item.name}
                        </p>
                        <p className="text-xs text-slate-400 leading-tight">{item.desc}</p>
                      </div>
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

/* ── Mobile accordion ───────────────────────────────────────── */
function MobileAccordion({ label, items, isRootActive, open, onToggle, onCloseAll }) {
  return (
    <>
      <button
        className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
          isRootActive
            ? "text-brand-600 bg-brand-50 font-semibold"
            : "text-slate-700 hover:bg-brand-50 hover:text-brand-600"
        }`}
        onClick={onToggle}
      >
        {label}
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden pl-4 flex flex-col gap-1"
          >
            {items.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                end
                onClick={onCloseAll}
                className={mobileSubItemCls}
              >
                <item.Icon className="w-4 h-4" /> {item.name}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Navbar ─────────────────────────────────────────────────── */
export default function Navbar({
  services      = defaultServices,
  resourceLinks = defaultResourceLinks,
  navLinks      = defaultNavLinks,
  phone         = { display: '(866) 386-6003', href: 'tel:8663866003' },
}) {
  const [scrolled,      setScrolled]      = useState(false);
  const [menuOpen,      setMenuOpen]      = useState(false);
  const [svcOpen,       setSvcOpen]       = useState(false);
  const [resOpen,       setResOpen]       = useState(false);
  const [mobileSvcOpen, setMobileSvcOpen] = useState(false);
  const [mobileResOpen, setMobileResOpen] = useState(false);

  const svcTimer = useRef(null);
  const resTimer = useRef(null);

  const { pathname } = useLocation();
  const onServicesRoute  = pathname.startsWith("/services");
  const onResourcesRoute = pathname === "/resources" || pathname === "/blog";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { closeAll(); }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  const closeAll = () => {
    clearTimeout(svcTimer.current);
    clearTimeout(resTimer.current);
    setSvcOpen(false);
    setResOpen(false);
    setMenuOpen(false);
    setMobileSvcOpen(false);
    setMobileResOpen(false);
  };

  const openSvc  = () => { clearTimeout(svcTimer.current); setSvcOpen(true); };
  const closeSvc = () => { svcTimer.current = setTimeout(() => setSvcOpen(false), 180); };
  const openRes  = () => { clearTimeout(resTimer.current); setResOpen(true); };
  const closeRes = () => { resTimer.current = setTimeout(() => setResOpen(false), 180); };

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100" : "bg-white backdrop-blur-sm"
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-[72px] flex items-center justify-between">

        <Link to="/" className="flex items-center flex-shrink-0" onClick={closeAll}>
          <img src={logo} alt="EWORD Solutions" className="h-10 w-auto object-contain" />
        </Link>

        {/* ── Desktop nav ─────────────────────────────── */}
        <ul className="hidden lg:flex items-center gap-1 list-none">

          <ServicesMega
            services={services}
            open={svcOpen}
            onOpen={openSvc}
            onClose={closeSvc}
            onCloseAll={closeAll}
            isActive={onServicesRoute}
          />

          <ResourcesDropdown
            items={resourceLinks}
            open={resOpen}
            onOpen={openRes}
            onClose={closeRes}
            onCloseAll={closeAll}
            isActive={onResourcesRoute}
          />

          {navLinks.map(({ label, to }) => (
            <li key={label}>
              <NavLink to={to} onClick={closeAll} className={navCls}>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* ── Desktop right actions ────────────────────── */}
        <div className="hidden lg:flex items-center gap-2">
          <NavLink to="/signup" className={navCls}>Sign Up</NavLink>
          <NavLink to="/login"  className={navCls}>Login</NavLink>
          <a
            href={phone.href}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-500 text-white text-sm font-semibold hover:bg-brand-600 transition-all duration-200 shadow-[0_3px_0_rgba(0,30,100,0.4)] hover:-translate-y-px active:translate-y-[2px] active:shadow-none"
          >
            <Phone className="w-3.5 h-3.5" /> Call Now
          </a>
        </div>

        {/* ── Hamburger ───────────────────────────────── */}
        <button
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* ── Mobile menu ─────────────────────────────────── */}
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

              <MobileAccordion
                label="Services"
                items={services}
                isRootActive={onServicesRoute}
                open={mobileSvcOpen}
                onToggle={() => setMobileSvcOpen((o) => !o)}
                onCloseAll={closeAll}
              />

              <MobileAccordion
                label="Resources"
                items={resourceLinks}
                isRootActive={onResourcesRoute}
                open={mobileResOpen}
                onToggle={() => setMobileResOpen((o) => !o)}
                onCloseAll={closeAll}
              />

              {navLinks.map(({ label, to }) => (
                <NavLink key={label} to={to} onClick={closeAll} className={mobileNavCls}>
                  {label}
                </NavLink>
              ))}

              <div className="pt-3 mt-1 border-t border-slate-100 flex flex-col gap-2">
                <a
                  href={phone.href}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-500 text-white text-sm font-semibold"
                >
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
