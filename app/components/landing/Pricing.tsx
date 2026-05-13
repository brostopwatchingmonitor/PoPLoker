'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const pricingPlans = [
  {
    size: 'M',
    name: 'Medium',
    capacity: 'Tas Ransel / Belanjaan',
    price: 2000,
    features: ['Tas ransel', 'Tas belanja', ' barang kecil'],
    popular: false,
  },
  {
    size: 'L',
    name: 'Large',
    capacity: 'Koper Kabin / Helm',
    price: 3000,
    features: ['Koper kabin', 'Helm', 'Tas gym'],
    popular: true,
  },
  {
    size: 'XL',
    name: 'Extra Large',
    capacity: 'Koper Besar / Tas Golf',
    price: 5000,
    features: ['Koper besar', 'Tas golf', 'Barang besar'],
    popular: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-secondary-50">
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            Pilihan Ukuran & Harga
          </h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Pilih yang paling pas untuk barang bawaan Anda
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.size}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                variant={plan.popular ? 'elevated' : 'outline'}
                className={`relative h-full ${plan.popular ? 'border-primary border-2' : ''}`}
                padding="lg"
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="primary" className="px-4 py-1">
                      ★ POPULER
                    </Badge>
                  </div>
                )}

                {/* Size Badge */}
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary-100 rounded-full mb-4">
                    <span className="text-2xl font-bold text-secondary-700">{plan.size}</span>
                  </div>
                  <h3 className="text-xl font-bold text-secondary-900">{plan.name}</h3>
                  <p className="text-sm text-secondary-500 mt-1">{plan.capacity}</p>
                </div>

                {/* Price */}
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold text-primary">Rp {plan.price.toLocaleString('id-ID')}</span>
                  <span className="text-secondary-500">/jam</span>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-secondary-600">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  variant={plan.popular ? 'primary' : 'outline'}
                  fullWidth
                >
                  Pilih {plan.name}
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}