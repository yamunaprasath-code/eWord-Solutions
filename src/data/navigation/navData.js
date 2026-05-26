import { Folder, Zap, Stethoscope, Mic } from 'lucide-react';

export const megaServices = [
  {
    name: 'Records Retrieval',
    href: '/services/records-retrieval',
    Icon: Folder,
    tag: 'Retrieval',
    desc: 'Full subpoena & HIPAA request management from draft to delivery.',
  },
  {
    name: 'E-Office Workflow',
    href: '/services/e-office-workflow',
    Icon: Zap,
    tag: 'Workflow',
    desc: 'Dictation to e-filing in one seamless document workflow.',
  },
  {
    name: 'Medical Records Review',
    href: '/services/medical-records-review',
    Icon: Stethoscope,
    tag: 'Review',
    desc: 'Chronologically organized, hyperlinked PDFs ready for trial.',
  },
  {
    name: 'Dictation & Transcription',
    href: '/services/dictation-transcription',
    Icon: Mic,
    tag: 'Transcription',
    desc: 'Secure mobile app submission with 99% accuracy guarantee.',
  },
];

export const navLinks = [
  { label: 'About',     to: '/about' },
  { label: 'Resources', to: '/resources' },
  { label: 'Blog',      to: '/blog' },
  { label: 'Contact',   to: '/contact' },
];
