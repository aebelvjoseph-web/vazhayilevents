export default function TermsOfService() {
  return (
    <section className="min-h-screen bg-dark-800 text-cream-200 py-12">
      <div className="container mx-auto px-6 max-w-3xl">
        <h1 className="text-4xl font-serif font-bold text-gold-400 mb-8">
          Terms of Service
        </h1>
        <p className="mb-4">
          Welcome to Vazhayil Events. By accessing or using our website, you agree to be bound by these Terms of Service. Please read them carefully.
        </p>
        <h2 className="text-2xl font-semibold text-gold-300 mt-6 mb-2">Use of Site</h2>
        <ul className="list-disc list-inside mb-4">
          <li>You may browse the site for personal, non‑commercial purposes.</li>
          <li>Any commercial use, scraping, or data extraction is prohibited without prior consent.</li>
        </ul>
        <h2 className="text-2xl font-semibold text-gold-300 mt-6 mb-2">Intellectual Property</h2>
        <p className="mb-4">
          All content, images, designs, and trademarks displayed on the site are the property of Vazhayil Events unless otherwise noted. Unauthorized reproduction is prohibited.
        </p>
        <h2 className="text-2xl font-semibold text-gold-300 mt-6 mb-2">Limitation of Liability</h2>
        <p className="mb-4">
          To the maximum extent permitted by law, Vazhayil Events shall not be liable for any indirect, incidental, or consequential damages arising from the use of the site.
        </p>
        <h2 className="text-2xl font-semibold text-gold-300 mt-6 mb-2">Changes to Terms</h2>
        <p className="mb-4">
          We may update these terms from time to time. Continued use of the site constitutes acceptance of any changes.
        </p>
        <p className="mt-8 text-sm text-cream-200/70">
          © {new Date().getFullYear()} Vazhayil Events. All rights reserved.
        </p>
      </div>
    </section>
  );
}
