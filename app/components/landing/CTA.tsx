'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

export function CTA() {
  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
      </div>

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center relative z-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Sudah Siap Membebaskan Tangan Anda?
          </h2>
          <p className="text-lg text-primary-100 max-w-2xl mx-auto mb-8">
            Temukan loker di sekitar Anda dan mulai titip sekarang juga.
          </p>
          <Button
            size="lg"
            className="bg-white text-primary hover:bg-secondary-50 text-lg px-10 py-4 shadow-xl"
          >
            Mulai Sewa Sekarang
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}