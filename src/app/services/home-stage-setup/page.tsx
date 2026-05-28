import Link from "next/link";

export default function HomeStageSetupPage() {
  return (
    <main className="min-h-screen bg-dark-900 text-cream-200 pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-4xl">

        <Link href="/#services" className="text-gold-400 text-sm uppercase tracking-widest hover:text-gold-300 transition-colors mb-10 inline-block">
          ← Back to Services
        </Link>

        <div className="mb-12">
          <p className="text-gold-400 uppercase tracking-widest text-sm mb-3">Our Services</p>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6">
            Home Stage <span className="text-gold-400">Setup</span>
          </h1>
          <div className="w-24 h-0.5 bg-gold-500 mb-8" />
          <p className="text-cream-200/70 text-lg leading-relaxed">
            Not every celebration takes place in a grand hall. Our home stage setup service brings the same level of luxury, refinement, and artistry right to your doorstep — transforming living rooms, courtyards, and terraces into breathtaking event spaces.
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-3xl font-serif font-semibold text-gold-300 mb-6">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Compact Stage Design",
                desc: "Beautifully proportioned stages designed to fit any home space — from intimate living rooms to spacious courtyards.",
              },
              {
                title: "Themed Décor Packages",
                desc: "Choose from traditional, contemporary, rustic, or minimalist themes — each one expertly styled with coordinated elements.",
              },
              {
                title: "Floral & Fabric Styling",
                desc: "Fresh flower arrangements paired with drapes, backdrops, and table décor that elevate your home environment.",
              },
              {
                title: "Portable Lighting",
                desc: "Battery-powered fairy lights, LED candles, and uplighters that create a warm, cinematic ambience without complex wiring.",
              },
              {
                title: "Photo Corner Setup",
                desc: "A dedicated photo area with props, frames, and a backdrop — perfect for capturing memories of the celebration.",
              },
              {
                title: "Furniture & Props",
                desc: "Elegant chairs, side tables, pedestals, and decorative accents to complete the look of your home stage.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white/5 border border-white/10 rounded-sm p-6 hover:border-gold-500/50 transition-colors">
                <h3 className="text-gold-400 font-semibold mb-2">{item.title}</h3>
                <p className="text-cream-200/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12 bg-white/5 border border-white/10 rounded-sm p-8">
          <h2 className="text-3xl font-serif font-semibold text-gold-300 mb-4">Perfect For</h2>
          <ul className="space-y-3 text-cream-200/70 text-sm leading-relaxed list-disc list-inside">
            <li>Intimate engagement or ring ceremony at home.</li>
            <li>Baby showers and naming ceremonies in the comfort of your living room.</li>
            <li>Housewarming parties with a touch of elegance.</li>
            <li>Birthday celebrations for children and adults alike.</li>
            <li>Anniversary milestones celebrated with family and close friends.</li>
          </ul>
        </section>

        <div className="text-center">
          <p className="text-cream-200/60 mb-6 text-lg">Want to transform your home into a celebration venue?</p>
          <Link
            href="/contact"
            className="inline-block bg-gold-500 text-dark-900 font-semibold uppercase tracking-widest text-sm px-10 py-4 rounded-sm hover:bg-gold-400 transition-colors"
          >
            Get a Free Quote
          </Link>
        </div>
      </div>
    </main>
  );
}
