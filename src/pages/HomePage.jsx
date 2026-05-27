import { MainLayout } from '@/layouts/MainLayout';
import {
  Hero,
  EmotionalAppeal,
  Services,
  ValueProp,
  Differentiators,
  RecordsCalculator,
  TargetAudience,
  GettingStarted,
  ToolsSection,
  TeamSection,
} from '@/features/home';
import { FAQ } from '@/features/shared';
import { Contact } from '@/features/contact';

export default function HomePage() {
  return (
    <MainLayout>
      <Hero />
      <EmotionalAppeal />
      <Services />
      <RecordsCalculator />
      <ValueProp />
      <Differentiators />
      <TargetAudience />
      <GettingStarted />
      <ToolsSection />
      <TeamSection />
      <FAQ />
      <Contact />
    </MainLayout>
  );
}
