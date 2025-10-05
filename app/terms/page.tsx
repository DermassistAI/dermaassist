import Footer from "@/components/Footer";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-6 py-24 max-w-3xl">
        <h1 className="text-3xl font-bold mb-4">Terms of Service (Demo)</h1>
        <p className="mb-4">
          This is a demonstration application. By using this demo, you agree that any data
          submitted is for testing purposes only.
        </p>
        <section className="prose text-sm">
          <h2>Acceptance of Terms</h2>
          <p>
            By accessing and using this demo, you accept and agree to be bound by these
            demonstration terms.
          </p>
          <h2>Use Restrictions</h2>
          <p>
            This demo is for evaluation purposes only. Do not submit real patient data or
            use this demo for actual medical decisions.
          </p>
          <h2>Contact</h2>
          <p>
            For questions contact <strong>info@dermassistai.com</strong>.
          </p>
        </section>
      </div>
      <Footer />
    </div>
  );
}
