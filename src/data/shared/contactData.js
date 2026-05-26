import { Folder, Zap, Stethoscope, Mic, HelpCircle, Clock, Shield, Handshake, MapPin, Phone, Mail } from 'lucide-react';

export const serviceOptions = [
  { id: 'records',   Icon: Folder,      label: 'Records Retrieval' },
  { id: 'e-office',  Icon: Zap,         label: 'E-Office Workflow' },
  { id: 'medical',   Icon: Stethoscope, label: 'Medical Records' },
  { id: 'dictation', Icon: Mic,         label: 'Dictation & Transcription' },
  { id: 'other',     Icon: HelpCircle,  label: 'Not sure yet' },
];

export const trust = [
  { Icon: Clock,     text: 'Typically responds within 2 hours' },
  { Icon: Shield,    text: 'HIPAA-compliant & fully encrypted' },
  { Icon: Handshake, text: 'No long-term contract required' },
];

export const contactInfo = [
  { Icon: MapPin, label: 'Address', value: '601 E Glenoaks Blvd Ste 105\nGlendale, CA 91207', href: null },
  { Icon: Phone,  label: 'Phone',   value: '(866) 386-6003',            href: 'tel:8663866003' },
  { Icon: Mail,   label: 'Email',   value: 'sales@ewordsolutions.com',  href: 'mailto:sales@ewordsolutions.com' },
];
