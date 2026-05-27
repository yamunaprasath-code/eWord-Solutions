import { Folder, Zap, Stethoscope, Mic, FileText, BookOpen } from 'lucide-react';

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

export const resourceLinks = [
  {
    name: 'Guidelines',
    href: '/resources',
    Icon: FileText,
    desc: 'Free guides, templates, and checklists for legal professionals.',
  },
  {
    name: 'Blog',
    href: '/blog',
    Icon: BookOpen,
    desc: "Insights and how-to articles for California workers' comp firms.",
  },
];

// Only links that are NOT dropdowns
export const navLinks = [
  { label: 'About',   to: '/about'   },
  { label: 'Contact', to: '/contact' },
];
