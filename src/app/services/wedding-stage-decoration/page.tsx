import Link from "next/link";

export default function WeddingStagePage() {
  return (
    <main className="min-h-screen bg-dark-900 text-cream-200 pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-4xl">

        {/* Back link */}
        <Link href="/#services" className="text-gold-400 text-sm uppercase tracking-widest hover:text-gold-300 transition-colors mb-10 inline-block">
          ← Back to Services
        </Link>

        {/* Header */}
        <div className="mb-12">
          <p className="text-gold-400 uppercase tracking-widest text-sm mb-3">Our Services</p>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6">
            Wedding Stage <span className="text-gold-400">Decoration</span>
          </h1>
          <div className="w-24 h-0.5 bg-gold-500 mb-8" />
          <p className="text-cream-200/70 text-lg leading-relaxed">
            Your wedding stage is the centrepiece of your most cherished day — and at Vazhayil Events, we treat it as a work of art. Our wedding stage decoration service blends timeless elegance with modern luxury to create a backdrop that tells your love story.
          </p>
        </div>

        {/* What We Offer */}
        <section className="mb-12">
          <h2 className="text-3xl font-serif font-semibold text-gold-300 mb-6">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Custom Floral Arches",
                desc: "Handcrafted arches adorned with fresh blooms, foliage, and cascading drapes — tailored to your chosen colour palette.",
              },
              {
                title: "Luxury Draping & Fabric",
                desc: "Layers of silk, tulle, and velvet fabric transform a plain stage into a cinematic scene of elegance.",
              },
              {
                title: "Throne & Seating Setup",
                desc: "Premium bride and groom thrones paired with matching décor accents for a royal seating experience.",
              },
              {
                title: "Mood Lighting Integration",
                desc: "Warm, golden-hued uplighting and spotlights perfectly complement every decoration element.",
              },
              {
                title: "Backdrop Walls",
                desc: "Ornate panel walls, floral walls, or contemporary geometric backdrops customised to your vision.",
              },
              {
                title: "Entrance Runway",
                desc: "Grand aisles with flower petals, candle lamps, and lanterns creating a memorable walk to the stage.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white/5 border border-white/10 rounded-sm p-6 hover:border-gold-500/50 transition-colors">
                <h3 className="text-gold-400 font-semibold mb-2">{item.title}</h3>
                <p className="text-cream-200/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-12 bg-white/5 border border-white/10 rounded-sm p-8">
          <h2 className="text-3xl font-serif font-semibold text-gold-300 mb-4">Why Choose Vazhayil Events?</h2>
          <ul className="space-y-3 text-cream-200/70 text-sm leading-relaxed list-disc list-inside">
            <li>Over 200+ successful wedding stage setups across Kerala.</li>
            <li>In-house design team that crafts bespoke concepts for every couple.</li>
            <li>Premium-quality flowers, fabrics, and props sourced fresh for every event.</li>
            <li>End-to-end setup, styling, and strike — you relax while we work.</li>
            <li>Flexible packages for intimate ceremonies to grand celebrations.</li>
          </ul>
        </section>

        {/* CTA */}
        <div className="text-center">
          <p className="text-cream-200/60 mb-6 text-lg">Ready to design your dream wedding stage?</p>
          <Link
            href="/contact"
            className="inline-block bg-gold-500 text-dark-900 font-semibold uppercase tracking-widest text-sm px-10 py-4 rounded-sm hover:bg-gold-400 transition-colors"
          >
            Book a Consultation
          </Link>
        </div>
      </div>
    </main>
  );
}
