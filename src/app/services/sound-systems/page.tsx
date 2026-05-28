import Link from "next/link";

export default function SoundSystemsPage() {
  return (
    <main className="min-h-screen bg-dark-900 text-cream-200 pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-4xl">

        <Link href="/#services" className="text-gold-400 text-sm uppercase tracking-widest hover:text-gold-300 transition-colors mb-10 inline-block">
          ← Back to Services
        </Link>

        <div className="mb-12">
          <p className="text-gold-400 uppercase tracking-widest text-sm mb-3">Our Services</p>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6">
            Sound <span className="text-gold-400">Systems</span>
          </h1>
          <div className="w-24 h-0.5 bg-gold-500 mb-8" />
          <p className="text-cream-200/70 text-lg leading-relaxed">
            Crystal clear audio is the pulse of any great event. Whether it's the gentle strum of a harp during a ceremony, the emotional resonance of a wedding speech, or the thumping bass of a reception dance floor, our premium sound system setups ensure every note is heard perfectly.
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-3xl font-serif font-semibold text-gold-300 mb-6">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Live Band Audio Setup",
                desc: "Full PA systems, mixing consoles, stage monitors, and backline gear specifically tailored for live bands and musicians.",
              },
              {
                title: "DJ Sound Packages",
                desc: "High-output subwoofers, active top speakers, and DJ booth monitors designed for high-energy dance floors.",
              },
              {
                title: "Speech & Ceremony Audio",
                desc: "Discreet column speakers, wireless lapel mics, and handheld microphones optimized for vocal clarity during vows and speeches.",
              },
              {
                title: "Background Ambience Systems",
                desc: "Distributed audio networks that provide even, low-volume background music across large venues without overpowering conversation.",
              },
              {
                title: "Outdoor Sound Solutions",
                desc: "Weather-resistant speakers and powerful line arrays capable of projecting clear sound across expansive outdoor environments.",
              },
              {
                title: "Acoustic Treatment",
                desc: "Strategic placement of speakers and temporary acoustic draping to minimize echo and reverb in difficult, cavernous venues.",
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
          <h2 className="text-3xl font-serif font-semibold text-gold-300 mb-4">The Technical Edge</h2>
          <ul className="space-y-3 text-cream-200/70 text-sm leading-relaxed list-disc list-inside">
            <li>Top-tier equipment from brands like L-Acoustics, d&b audiotechnik, and Shure.</li>
            <li>Dedicated audio engineers mixing live throughout your event to prevent feedback.</li>
            <li>Redundant wireless microphone systems to guarantee zero dropouts.</li>
            <li>Customized acoustic modelling done prior to setup for optimal speaker placement.</li>
            <li>Clean, cable-free aesthetics that don't detract from your luxury décor.</li>
          </ul>
        </section>

        <div className="text-center">
          <p className="text-cream-200/60 mb-6 text-lg">Ensure your event sounds as good as it looks.</p>
          <Link
            href="/contact"
            className="inline-block bg-gold-500 text-dark-900 font-semibold uppercase tracking-widest text-sm px-10 py-4 rounded-sm hover:bg-gold-400 transition-colors"
          >
            Request Audio Consultation
          </Link>
        </div>
      </div>
    </main>
  );
}
