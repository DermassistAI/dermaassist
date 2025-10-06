import React from "react";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-6 py-24 max-w-3xl">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy (Demo)</h1>
        <p className="mb-4">
          This demo stores information only for demonstration purposes. No personal data is
          processed for production use. Do not submit sensitive personal information.
        </p>
        <section className="prose text-sm">
          <h2>Data we collect</h2>
          <p>
            For the demo we may store contact information (email, phone) and any images
            you upload for analysis strictly for demo functionality and debugging.
          </p>
          <h2>How we use data</h2>
          <p>
            Data is used to power the demo flows only. No live clinical decisions are made
            and the data may be removed periodically.
          </p>
          <h2>Contact</h2>
          <p>
            For questions about this demo privacy policy contact <strong>info@dermassistai.com</strong>.
          </p>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
