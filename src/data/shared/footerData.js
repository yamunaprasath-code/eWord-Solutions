import { Phone, Mail, MapPin } from 'lucide-react';

export const quickLinks = [
  { label: 'Home',     href: '#home' },
  { label: 'About',   href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Blogs',   href: '#blogs' },
  { label: 'Contact', href: '#contact' },
];

export const serviceLinks = [
  { label: 'Records Retrieval',         href: '#records-retrieval' },
  { label: 'Dictation & Transcription', href: '#dictation' },
  { label: 'Medical Records Review',    href: '#medical-records' },
  { label: 'E-Office Workflow',         href: '#e-office' },
];

export const contactInfo = [
  { Icon: Phone,  href: 'tel:8663866003',                   text: '(866) 386-6003' },
  { Icon: Mail,   href: 'mailto:sales@ewordsolutions.com',  text: 'sales@ewordsolutions.com' },
  { Icon: MapPin, href: null,                               text: '601 E Glenoaks Blvd Ste 105\nGlendale, CA 91207' },
];

export const brand = {
  description: "Legal support services for California workers' compensation law firms. We handle the paperwork so you can focus on your clients.",
  copyright: '2026 © eWord Solutions. All rights reserved.',
};

export const legalLinks = [
  { label: 'Privacy Policy',  href: '#privacy' },
  { label: 'Terms of Service', href: '#terms' },
];
