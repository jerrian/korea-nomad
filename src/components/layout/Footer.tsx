import Link from 'next/link';
import { Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';
import { footerSections } from '@/data/cities';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-16">
        {/* Top Section */}
        <div className="mb-12">
          <Link href="/" className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🇰🇷</span>
            <span className="text-xl font-bold text-white">KoreaNomad</span>
          </Link>
          <p className="text-gray-400 max-w-md">
            대한민국 어디서든 일하고 살 수 있는 자유
          </p>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-4 mb-8">
          <span className="text-sm text-gray-400">소셜 미디어:</span>
          <div className="flex gap-3">
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © 2026 KoreaNomad. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                개인정보 처리방침
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                이용약관
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                쿠키 정책
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                사이트맵
              </Link>
            </div>
          </div>
          <p className="text-center mt-4 text-sm text-gray-500">
            Made with ❤️ in Seoul, Korea
          </p>
        </div>
      </div>
    </footer>
  );
}
