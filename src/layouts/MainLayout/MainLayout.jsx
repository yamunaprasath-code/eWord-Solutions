import { Navbar } from '@/layouts/components/Navbar';
import { Footer } from '@/layouts/components/Footer';

export function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
