import React from "react";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-6 py-24 max-w-3xl">
        <h1 className="text-3xl font-bold mb-4">Terms of Service (Demo)</h1>
        <p className="mb-4">
          This demo application is provided for demonstration purposes only. By using the demo
          you acknowledge that data you enter may be stored for demo/testing and should not be
          considered secure for production use.
        </p>
        <section className="prose text-sm">
          <h2>Usage</h2>
          <p>
            You may use the demo to explore features. Any content submitted may be retained for
            demo or debugging purposes.
          </p>
          <h2>Disclaimer</h2>
          <p>
            The demo is not a medical device. It is not intended to be used for clinical
            diagnosis or treatment. Always consult a qualified healthcare professional for
            medical concerns.
          </p>
          <h2>Contact</h2>
          <p>
            Questions? Email <strong>info@dermassistai.com</strong>.
          </p>
        </section>
      </div>
      <Footer />
    </div>
  );
}
