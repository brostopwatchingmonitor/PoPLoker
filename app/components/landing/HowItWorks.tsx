'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Search, Box, CreditCard, CheckCircle, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/container';

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Cari Lokasi',
    description: 'Temukan titik loker terdekat melalui aplikasi atau web kami.',
  },
  {
    number: '02',
    icon: Box,
    title: 'Pilih Ukuran',
    description: 'Pilih ukuran loker (M, L, XL) sesuai kebutuhan barang Anda.',
  },
  {
    number: '03',
    icon: CreditCard,
    title: 'Bayar Instan',
    description: 'Lakukan pembayaran melalui QRIS atau E-Wallet pilihan Anda.',
  },
  {
    number: '04',
    icon: CheckCircle,
    title: 'Simpan Barang',
    description: 'Loker terbuka otomatis, masukkan barang, dan tutup kembali.',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            Cara Kerja
          </h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Hanya 4 langkah mudah untuk menggunakan layanan loker kami
          </p>
        </motion.div>

        {/* Steps - Desktop */}
        <div className="hidden lg:block">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative"
          >
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-secondary-200 -translate-y-1/2" />

            <div className="grid grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <motion.div key={index} variants={item} className="relative">
                  {/* Step Number Circle */}
                  <div className="relative z-10 w-16 h-16 mx-auto mb-6 bg-primary rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                    <span className="text-lg font-bold text-white">{step.number}</span>
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <div className="w-14 h-14 mx-auto mb-4 bg-primary-50 rounded-xl flex items-center justify-center">
                      <step.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-secondary-600 text-sm">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Steps - Mobile */}
        <div className="lg:hidden space-y-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-4"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                {step.number}
              </div>
              <div className="flex-1">
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-3">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-1">
                  {step.title}
                </h3>
                <p className="text-secondary-600 text-sm">
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className="absolute left-6 bottom-0 w-0.5 h-6 bg-secondary-200" />
              )}
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}