'use client';

import * as React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter, Lock } from 'lucide-react';
import { Container } from '@/components/ui/container';

const footerLinks = {
  product: [
    { label: 'Beranda', href: '#home' },
    { label: 'Cara Kerja', href: '#how-it-works' },
    { label: 'Lokasi', href: '#locations' },
    { label: 'Harga', href: '#pricing' },
  ],
  company: [
    { label: 'Tentang Kami', href: '#' },
    { label: 'Karir', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Press', href: '#' },
  ],
  support: [
    { label: 'Pusat Bantuan', href: '#' },
    { label: 'FAQ', href: '#' },
    { label: 'Hubungi Kami', href: '#' },
    { label: 'Status Layanan', href: '#' },
  ],
  legal: [
    { label: 'Syarat & Ketentuan', href: '#' },
    { label: 'Kebijakan Privasi', href: '#' },
    { label: 'Kebijakan Cookie', href: '#' },
  ],
};

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
];

export function Footer() {
  return (
    <footer className="bg-secondary-900 text-secondary-300 py-16">
      <Container>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Lock className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">LokerPintar</span>
            </Link>
            <p className="text-secondary-400 mb-6 max-w-sm">
              Solusi penitipan barang modern yang memberikan keamanan dan kemudahan
              untuk aktivitas sehari-hari Anda.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Jakarta, Indonesia</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-primary" />
                <span>support@lokerpintar.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-primary" />
                <span>0812-xxxx-xxxx</span>
              </div>
            </div>
          </div>

          {/* Links - Product */}
          <div>
            <h3 className="text-white font-semibold mb-4">Produk</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-sm hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links - Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Dukungan</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-sm hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links - Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-sm hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-secondary-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-secondary-400">
              © 2026 LokerPintar. Hak Cipta Dilindungi.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-secondary-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}