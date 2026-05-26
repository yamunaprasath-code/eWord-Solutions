import { ShieldCheck, Wifi } from 'lucide-react';

export const toolsBadges = [
  { Icon: ShieldCheck, label: 'HIPAA Compliant' },
  { Icon: Wifi,        label: 'EAMS e-Filing' },
];

export const toolsContent = {
  badge: 'Technology',
  title: 'Secure Tools That Work for You and Your Firm',
  paragraphs: [
    'Our secure mobile app makes it easy to send dictation from anywhere. Your client portal lets you upload documents, check status, and communicate without extra clicks.',
    'We integrate directly with your case management system and handle EAMS e-filing — so you get completed work right where you need it.',
    'Every tool we use is encrypted and HIPAA-compliant, designed to protect sensitive medical and legal information at every step.',
  ],
  cta: { label: 'Get Started', href: '#contact' },
};
