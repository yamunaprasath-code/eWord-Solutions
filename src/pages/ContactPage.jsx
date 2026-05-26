import { MainLayout } from '@/layouts/MainLayout';
import { Contact } from '@/features/contact';

export default function ContactPage() {
  return (
    <MainLayout>
      <div className="pt-[72px]">
        <Contact />
      </div>
    </MainLayout>
  );
}
