'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Shield, Smartphone, MapPin, Clock, CreditCard, Headphones } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Card } from '@/components/ui/card';

const features = [
  {
    icon: Shield,
    title: 'Aman & Terpantau',
    description: 'Dilengkapi CCTV 24 jam dan enkripsi kode unik untuk setiap akses.',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: Smartphone,
    title: 'Digital & Cashless',
    description: 'Pembayaran instan melalui Midtrans (Gopay, QRIS, VA). Tanpa kunci fisik.',
    color: 'bg-primary-100 text-primary',
  },
  {
    icon: MapPin,
    title: 'Lokasi Strategis',
    description: 'Tersedia di Stasiun, Mall, Bandara, dan Pusat Perbelanjaan.',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    icon: Clock,
    title: 'Siap 24 Jam',
    description: 'Akses loker kapan saja tanpa batasan waktu operasional.',
    color: 'bg-orange-100 text-orange-600',
  },
  {
    icon: CreditCard,
    title: 'Harga Transparan',
    description: 'Biaya jelas per jam tanpa biaya tersembunyi.',
    color: 'bg-green-100 text-green-600',
  },
  {
    icon: Headphones,
    title: 'Support 24/7',
    description: 'Tim dukungan siap membantu kapan saja via chat atau telepon.',
    color: 'bg-pink-100 text-pink-600',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function Features() {
  return (
    <section id="features" className="py-20 bg-secondary-50">
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            Mengapa Memilih LokerPintar?
          </h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
           솔usi penitipan barang modern yang memberikan keamanan dan kemudahan
            untuk aktivitas sehari-hari Anda.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={item}>
              <Card hover className="h-full group">
                <div className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-secondary-600">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}