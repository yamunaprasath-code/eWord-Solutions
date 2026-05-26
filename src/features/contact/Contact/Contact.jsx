import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, CheckCircle, Loader2, RotateCcw,
  User, Mail, Phone, MessageSquare, Check, Sparkles,
} from 'lucide-react';
import {
  serviceOptions as defaultServiceOptions,
  trust         as defaultTrust,
  contactInfo   as defaultContactInfo,
} from '@/data/shared/contactData';

function validate(form) {
  const e = {};
  if (!form.firstName.trim()) e.firstName = 'First name is required';
  if (!form.email.trim())     e.email     = 'Email address is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address';
  if (!form.message.trim())   e.message   = 'Please describe how we can help';
  return e;
}

function FieldError({ show, msg }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.p
          initial={{ opacity: 0, y: -4, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: -4, height: 0 }}
          transition={{ duration: 0.18 }}
          className="text-xs text-red-500 mt-1.5 font-medium"
        >
          {msg}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

export default function Contact({
  badge          = 'Get In Touch',
  title          = 'Start a Conversation',
  subtitle       = "Tell us about your workflow and we'll put together the right support plan for your firm.",
  panelTitle     = "Let's talk about your workflow.",
  panelSubtitle  = "Describe what your firm handles and we'll build the right support plan around it.",
  serviceOptions = defaultServiceOptions,
  trust          = defaultTrust,
  contactInfo    = defaultContactInfo,
}) {
  const [form, setForm]             = useState({ firstName: '', lastName: '', email: '', phone: '', message: '' });
  const [services, setServices]     = useState([]);
  const [touched, setTouched]       = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus]         = useState(null);

  const errors    = validate(form);
  const hasErrors = Object.keys(errors).length > 0;

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleBlur   = e => setTouched(t => ({ ...t, [e.target.name]: true }));
  const toggleSvc    = id => setServices(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  const handleSubmit = async e => {
    e.preventDefault();
    setTouched({ firstName: true, email: true, message: true });
    if (hasErrors) return;
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1400));
    setSubmitting(false);
    setStatus('success');
  };

  const resetForm = () => {
    setStatus(null);
    setForm({ firstName: '', lastName: '', email: '', phone: '', message: '' });
    setServices([]);
    setTouched({});
  };

  const fieldCls = (field) => {
    const base = 'w-full pl-10 pr-10 py-3 rounded-xl border text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 transition-all duration-200 bg-white resize-none';
    if (touched[field] && errors[field])  return `${base} border-red-300   focus:ring-red-100     bg-red-50/30`;
    if (touched[field] && !errors[field]) return `${base} border-emerald-300 focus:ring-emerald-100`;
    return `${base} border-slate-200 focus:ring-brand-100 focus:border-brand-400`;
  };

  const iconCls = (field) => {
    if (touched[field] && errors[field])  return 'text-red-400';
    if (touched[field] && !errors[field]) return 'text-emerald-400';
    return 'text-slate-300 group-focus-within:text-brand-400';
  };

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5, delay },
  });

  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-slate-50 to-white" id="contact">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">

        <motion.div {...fadeUp()} className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-brand-50 text-brand-600 border border-brand-200 mb-4">
            {badge}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">{title}</h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto leading-relaxed">{subtitle}</p>
        </motion.div>

        <div className="grid lg:grid-cols-[360px_1fr] gap-8 items-start">

          <motion.div
            {...fadeUp(0.1)}
            className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-brand-900 p-8 text-white relative overflow-hidden"
          >
            <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-brand-500/20 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-brand-700/20 blur-2xl pointer-events-none" />
            <div className="absolute top-1/2 -left-10 w-24 h-24 rounded-full bg-slate-700/30 blur-2xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white/70 text-xs font-bold uppercase tracking-widest">
                  EWORD Solutions
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online
                </span>
              </div>

              <h3 className="font-display text-2xl font-bold text-white mb-2 leading-snug">{panelTitle}</h3>
              <p className="text-white/55 text-sm leading-relaxed mb-8">{panelSubtitle}</p>

              <div className="space-y-3 mb-8">
                {trust.map(({ Icon, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-brand-500/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-brand-300" />
                    </div>
                    <span className="text-sm text-white/65">{text}</span>
                  </div>
                ))}
              </div>

              <div className="h-px bg-white/10 mb-6" />

              <div className="space-y-5">
                {contactInfo.map(({ Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-3.5 h-3.5 text-white/50" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-0.5">{label}</p>
                      {href
                        ? <a href={href} className="text-sm text-white/75 hover:text-white transition-colors whitespace-pre-line">{value}</a>
                        : <p className="text-sm text-white/75 whitespace-pre-line">{value}</p>
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            {...fadeUp(0.15)}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
          >
            <AnimatePresence mode="wait">

              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center justify-center text-center py-20 px-10 gap-5"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 280, damping: 18, delay: 0.1 }}
                    className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center"
                  >
                    <CheckCircle className="w-10 h-10 text-emerald-500 stroke-[1.5]" />
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                    <h3 className="font-display text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                    <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
                      Thanks for reaching out. We'll review your message and get back to you within 2 business hours.
                    </p>
                  </motion.div>
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    onClick={resetForm}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors mt-2"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Send another message
                  </motion.button>
                </motion.div>

              ) : (

                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <div className="px-8 md:px-10 py-5 border-b border-slate-100 flex items-center justify-between gap-4">
                    <div>
                      <h3 className="font-display text-lg font-bold text-slate-900 leading-tight">Send us a message</h3>
                      <p className="text-xs text-slate-400 mt-0.5">We respond within 2 business hours</p>
                    </div>
                    <AnimatePresence>
                      {services.length > 0 && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-50 text-brand-600 text-xs font-bold border border-brand-200 whitespace-nowrap flex-shrink-0"
                        >
                          <Sparkles className="w-3 h-3" />
                          {services.length} selected
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="p-8 md:p-10 space-y-7">

                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">What can we help with?</p>
                      <p className="text-xs text-slate-400 mb-3.5">Select all that apply</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {serviceOptions.map(({ id, Icon, label }) => {
                          const sel = services.includes(id);
                          return (
                            <button
                              type="button"
                              key={id}
                              onClick={() => toggleSvc(id)}
                              className={`relative flex flex-col items-center gap-2 p-4 rounded-2xl border text-xs font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400
                                ${sel
                                  ? 'bg-brand-500 border-brand-500 text-white shadow-lg shadow-brand-500/20 -translate-y-px'
                                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-brand-50 hover:border-brand-200 hover:text-brand-700'
                                }`}
                            >
                              <Icon className={`w-5 h-5 flex-shrink-0 transition-colors ${sel ? 'text-white' : 'text-slate-400 group-hover:text-brand-400'}`} />
                              <span className="leading-tight text-center">{label}</span>
                              <AnimatePresence>
                                {sel && (
                                  <motion.span
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                                    className="absolute top-2 right-2 w-4 h-4 rounded-full bg-white/25 flex items-center justify-center"
                                  >
                                    <Check className="w-2.5 h-2.5 text-white" />
                                  </motion.span>
                                )}
                              </AnimatePresence>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="h-px bg-slate-100 flex-1" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 select-none">Your Details</span>
                      <div className="h-px bg-slate-100 flex-1" />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                          First Name <span className="text-brand-500 normal-case tracking-normal font-semibold">*</span>
                        </label>
                        <div className="relative group">
                          <User className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none transition-colors ${iconCls('firstName')}`} />
                          <input
                            name="firstName" type="text" placeholder="Jane"
                            value={form.firstName} onChange={handleChange} onBlur={handleBlur}
                            className={fieldCls('firstName')}
                          />
                          {touched.firstName && !errors.firstName && (
                            <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400 pointer-events-none" />
                          )}
                        </div>
                        <FieldError show={!!(touched.firstName && errors.firstName)} msg={errors.firstName} />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Last Name</label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 pointer-events-none" />
                          <input
                            name="lastName" type="text" placeholder="Smith"
                            value={form.lastName} onChange={handleChange}
                            className={fieldCls('lastName')}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                          Email Address <span className="text-brand-500 normal-case tracking-normal font-semibold">*</span>
                        </label>
                        <div className="relative group">
                          <Mail className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none transition-colors ${iconCls('email')}`} />
                          <input
                            name="email" type="email" placeholder="jane@lawfirm.com"
                            value={form.email} onChange={handleChange} onBlur={handleBlur}
                            className={fieldCls('email')}
                          />
                          {touched.email && !errors.email && (
                            <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400 pointer-events-none" />
                          )}
                        </div>
                        <FieldError show={!!(touched.email && errors.email)} msg={errors.email} />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Phone Number</label>
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 pointer-events-none" />
                          <input
                            name="phone" type="tel" placeholder="(555) 000-0000"
                            value={form.phone} onChange={handleChange}
                            className={fieldCls('phone')}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          Message <span className="text-brand-500 normal-case tracking-normal font-semibold">*</span>
                        </label>
                        <span className={`text-xs tabular-nums font-medium transition-colors ${
                          form.message.length > 550 ? 'text-amber-500' : 'text-slate-300'
                        }`}>
                          {form.message.length}/600
                        </span>
                      </div>
                      <div className="relative group">
                        <MessageSquare className={`absolute left-3.5 top-3.5 w-4 h-4 pointer-events-none transition-colors ${iconCls('message')}`} />
                        <textarea
                          name="message" rows={4} maxLength={600}
                          placeholder="Tell us about your firm — caseload, current workflow, and what you need help with..."
                          value={form.message} onChange={handleChange} onBlur={handleBlur}
                          className={`${fieldCls('message')} leading-relaxed`}
                        />
                      </div>
                      <FieldError show={!!(touched.message && errors.message)} msg={errors.message} />
                    </div>

                    <div className="space-y-3 pt-1">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 text-white font-bold text-sm hover:from-brand-700 hover:to-brand-600 transition-all duration-200 shadow-[0_4px_0_rgba(0,30,100,0.4)] hover:-translate-y-px active:translate-y-[2px] active:shadow-none disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none"
                      >
                        {submitting
                          ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</>
                          : <>Send Message <ArrowRight className="w-4 h-4" /></>
                        }
                      </button>

                      <p className="text-center text-xs text-slate-400 leading-relaxed">
                        By submitting, you agree to our{' '}
                        <button type="button" className="underline underline-offset-2 hover:text-slate-600 transition-colors">
                          privacy policy
                        </button>
                        . We never share your data.
                      </p>
                    </div>

                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
