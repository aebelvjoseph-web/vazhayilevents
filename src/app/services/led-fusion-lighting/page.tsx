import Link from "next/link";

export default function LedFusionLightingPage() {
  return (
    <main className="min-h-screen bg-dark-900 text-cream-200 pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-4xl">

        <Link href="/#services" className="text-gold-400 text-sm uppercase tracking-widest hover:text-gold-300 transition-colors mb-10 inline-block">
          ← Back to Services
        </Link>

        <div className="mb-12">
          <p className="text-gold-400 uppercase tracking-widest text-sm mb-3">Our Services</p>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6">
            LED & Fusion <span className="text-gold-400">Lighting</span>
          </h1>
          <div className="w-24 h-0.5 bg-gold-500 mb-8" />
          <p className="text-cream-200/70 text-lg leading-relaxed">
            Lighting is the soul of every event. It sets the mood, highlights décor, and creates a cinematic atmosphere that photographs and videos cannot resist. Our LED & Fusion Lighting service combines cutting-edge technology with artistic vision to bathe your venue in unforgettable light.
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-3xl font-serif font-semibold text-gold-300 mb-6">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Stage Spotlighting",
                desc: "Precision LED spotlights and wash lights that draw attention to the stage with warm, dramatic hues — adjustable in real time.",
              },
              {
                title: "Ambient Uplighting",
                desc: "Floor-mounted LED uplighters in customisable colours that transform walls, pillars, and ceilings into glowing canvases.",
              },
              {
                title: "Fairy & String Lights",
                desc: "Cascading warm-white fairy lights and Edison bulb strings that add a dreamy, romantic feel to any indoor or outdoor space.",
              },
              {
                title: "Chandelier Installations",
                desc: "Temporary crystal and modern chandeliers rigged overhead to inject opulence into banquet halls and marquees.",
              },
              {
                title: "Dynamic Colour Wash",
                desc: "Programmable RGB and RGBW fixtures that shift colours throughout the evening to match different phases of the event.",
              },
              {
                title: "Pathway & Entrance Lights",
                desc: "LED lanterns, candle-style ground lights, and gobo projectors that guide guests along a beautifully lit walkway.",
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
          <h2 className="text-3xl font-serif font-semibold text-gold-300 mb-4">Why Our Lighting Stands Out</h2>
          <ul className="space-y-3 text-cream-200/70 text-sm leading-relaxed list-disc list-inside">
            <li>Professional-grade fixtures used in film and television — not consumer string lights.</li>
            <li>On-site lighting designer who programs cues for key moments (entrance, cake cutting, first dance).</li>
            <li>Silent, energy-efficient LED units — no heat, no hum, no hazards.</li>
            <li>Full rigging crew with safety-certified truss and power distribution.</li>
            <li>Seamless integration with sound, décor, and photography teams.</li>
          </ul>
        </section>

        <div className="text-center">
          <p className="text-cream-200/60 mb-6 text-lg">Let us light up your next celebration.</p>
          <Link
            href="/contact"
            className="inline-block bg-gold-500 text-dark-900 font-semibold uppercase tracking-widest text-sm px-10 py-4 rounded-sm hover:bg-gold-400 transition-colors"
          >
            Enquire About Lighting
          </Link>
        </div>
      </div>
    </main>
  );
}
