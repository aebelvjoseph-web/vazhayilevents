export default function PrivacyPolicy() {
  return (
    <section className="min-h-screen bg-dark-800 text-cream-200 py-12">
      <div className="container mx-auto px-6 max-w-3xl">
        <h1 className="text-4xl font-serif font-bold text-gold-400 mb-8">
          Privacy Policy
        </h1>
        <p className="mb-4">
          At Vazhayil Events, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
        </p>
        <h2 className="text-2xl font-semibold text-gold-300 mt-6 mb-2">Information We Collect</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Contact details you provide via forms (name, email, phone, event details).</li>
          <li>Technical data such as IP address, browser type, and usage analytics.</li>
          <li>Cookies and similar technologies to improve user experience.</li>
        </ul>
        <h2 className="text-2xl font-semibold text-gold-300 mt-6 mb-2">How We Use Your Information</h2>
        <ul className="list-disc list-inside mb-4">
          <li>To respond to inquiries and provide event services.</li>
          <li>To send transactional or promotional communications, if you have opted in.</li>
          <li>To improve our website and marketing efforts.</li>
        </ul>
        <h2 className="text-2xl font-semibold text-gold-300 mt-6 mb-2">Data Sharing & Retention</h2>
        <p className="mb-4">
          We do not sell your data. We may share information with trusted service providers necessary to operate the website and fulfill services. Data is retained only as long as needed for these purposes.
        </p>
        <h2 className="text-2xl font-semibold text-gold-300 mt-6 mb-2">Your Rights</h2>
        <p className="mb-4">
          You have the right to access, correct, or delete your personal information. To exercise these rights, please contact us at <a href="mailto:info@vazhayilevents.com" className="text-gold-400 underline">info@vazhayilevents.com</a>.
        </p>
        <h2 className="text-2xl font-semibold text-gold-300 mt-6 mb-2">Security</h2>
        <p className="mb-4">
          We implement reasonable technical and organizational measures to protect your data against unauthorized access, alteration, or loss.
        </p>
        <p className="mt-8 text-sm text-cream-200/70">
          © {new Date().getFullYear()} Vazhayil Events. All rights reserved.
        </p>
      </div>
    </section>
  );
}
