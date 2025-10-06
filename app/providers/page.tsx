import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ProvidersPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">Healthcare Providers</h1>
          <p className="text-xl text-muted-foreground">
            Information for healthcare providers coming soon.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
