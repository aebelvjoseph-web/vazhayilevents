"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { Quote } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const testimonials = [
  {
    name: "Anjali & Rajesh",
    event: "Wedding Celebration",
    quote: "The wedding stage felt like a divine cinematic experience. Every detail, from the floral arrangements to the soft lighting, was perfectly orchestrated.",
  },
  {
    name: "Dr. Sarah Thomas",
    event: "Reception",
    quote: "Vazhayil Events transformed our vision into reality. The elegance and luxury of the setup exceeded our wildest expectations.",
  },
  {
    name: "The Kapoor Family",
    event: "Anniversary Gala",
    quote: "Impeccable service and breathtaking decorations. The fusion lighting created an ambience that our guests are still talking about.",
  }
];

export function Testimonials() {
  return (
    <section className="py-32 bg-dark-900 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-gold-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] bg-gold-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-12 h-[1px] bg-gold-500" />
            <span className="text-gold-400 uppercase tracking-widest text-xs font-semibold">Client Love</span>
            <div className="w-12 h-[1px] bg-gold-500" />
          </div>

          <Swiper
            modules={[Autoplay, Pagination, EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true, el: '.custom-pagination' }}
            className="pb-16"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col items-center">
                  <Quote className="text-gold-500/20 w-20 h-20 mb-8" />
                  <p className="text-2xl md:text-3xl font-serif text-white font-light leading-relaxed mb-10 max-w-3xl">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex flex-col items-center gap-2">
                    <h4 className="text-gold-400 font-serif text-xl">{testimonial.name}</h4>
                    <span className="text-cream-200/50 uppercase tracking-widest text-xs">{testimonial.event}</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Custom Pagination */}
          <div className="custom-pagination flex justify-center gap-2 mt-4" />

        </div>
      </div>
    </section>
  );
}
