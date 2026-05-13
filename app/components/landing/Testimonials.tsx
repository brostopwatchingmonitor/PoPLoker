'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Card } from '@/components/ui/card';

const testimonials = [
  {
    name: 'Andini',
    role: 'Traveller',
    avatar: 'A',
    rating: 5,
    quote: 'Sangat membantu saat transit di stasiun. Tidak perlu repot bawa koper berat saat jalan-jalan sebentar. Proses bayarnya juga gampang banget pakai QRIS!',
  },
  {
    name: 'Budi',
    role: 'Pebisnis',
    avatar: 'B',
    rating: 5,
    quote: 'Cocok untuk saya yang sering keluar kota. Loker-nya aman dan lokasinya strategis. Sudah gunakan beberapa kali dan tidak pernah kecewa.',
  },
  {
    name: 'Siti',
    role: 'Mahasiswa',
    avatar: 'S',
    rating: 4,
    quote: '性价比很好，便利店就在地铁站附近。操作简单易懂，客服响应也很快。',
  },
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <section className="py-20 bg-white">
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            Kata Mereka
          </h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Testimoni dari pengguna yang telah mencoba layanan kami
          </p>
        </motion.div>

        {/* Testimonial Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Card variant="elevated" className="relative">
            <Quote className="absolute top-6 left-6 w-12 h-12 text-primary/20" />

            <div className="pt-8 pb-6">
              {/* Rating */}
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < testimonials[activeIndex].rating
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-secondary-200'
                    }`}
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-lg md:text-xl text-secondary-700 text-center mb-8 leading-relaxed">
                "{testimonials[activeIndex].quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                  {testimonials[activeIndex].avatar}
                </div>
                <div className="text-left">
                  <div className="font-semibold text-secondary-900">
                    {testimonials[activeIndex].name}
                  </div>
                  <div className="text-sm text-secondary-500">
                    {testimonials[activeIndex].role}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === activeIndex
                    ? 'w-8 bg-primary'
                    : 'bg-secondary-200 hover:bg-secondary-300'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}