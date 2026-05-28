import Link from "next/link";

export default function ReceptionDecorPage() {
  return (
    <main className="min-h-screen bg-dark-900 text-cream-200 pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-4xl">

        <Link href="/#services" className="text-gold-400 text-sm uppercase tracking-widest hover:text-gold-300 transition-colors mb-10 inline-block">
          ← Back to Services
        </Link>

        <div className="mb-12">
          <p className="text-gold-400 uppercase tracking-widest text-sm mb-3">Our Services</p>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6">
            Reception <span className="text-gold-400">Decor</span>
          </h1>
          <div className="w-24 h-0.5 bg-gold-500 mb-8" />
          <p className="text-cream-200/70 text-lg leading-relaxed">
            The reception is where the celebration truly comes alive — guests mingle, toasts are raised, and memories are made. Our reception decor service creates an atmosphere of refined grandeur that leaves every guest in awe from the moment they walk in.
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-3xl font-serif font-semibold text-gold-300 mb-6">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Grand Entrance Design",
                desc: "Welcoming arches, floral pillars, and illuminated pathways that set the tone the moment guests arrive at the venue.",
              },
              {
                title: "Banquet Hall Transformation",
                desc: "Full-scale venue styling including ceiling draping, wall treatments, table centrepieces, and chair décor.",
              },
              {
                title: "Themed Table Settings",
                desc: "Elegant table layouts with premium cutlery, glassware, charger plates, and coordinated linen in your chosen palette.",
              },
              {
                title: "Stage & Backdrop",
                desc: "A stunning reception stage with artistic backdrops, fresh flowers, and ambient lighting for the couple's spotlight.",
              },
              {
                title: "Buffet & Bar Styling",
                desc: "Decorative food display setups, cocktail station décor, and dessert table arrangements that look as good as they taste.",
              },
              {
                title: "Photo & Video Zones",
                desc: "Curated selfie corners, photo booths, and dedicated video zones with branded props and elegant framing.",
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
          <h2 className="text-3xl font-serif font-semibold text-gold-300 mb-4">Our Approach</h2>
          <ul className="space-y-3 text-cream-200/70 text-sm leading-relaxed list-disc list-inside">
            <li>Venue walkthrough and measurements before design finalization.</li>
            <li>3D mood boards and concept sketches shared for your approval.</li>
            <li>Coordination with caterers, photographers, and venue managers for seamless execution.</li>
            <li>Day-of setup team arrives 6 hours early to ensure flawless presentation.</li>
            <li>Post-event teardown and cleanup included in every package.</li>
          </ul>
        </section>

        <div className="text-center">
          <p className="text-cream-200/60 mb-6 text-lg">Ready to host an unforgettable reception?</p>
          <Link
            href="/contact"
            className="inline-block bg-gold-500 text-dark-900 font-semibold uppercase tracking-widest text-sm px-10 py-4 rounded-sm hover:bg-gold-400 transition-colors"
          >
            Plan Your Reception
          </Link>
        </div>
      </div>
    </main>
  );
}
