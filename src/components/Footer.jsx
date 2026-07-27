import { Link } from 'react-router-dom';
import { Ship, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[var(--color-heading)] text-white/80 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand & Description */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-white/10 p-2 rounded-xl">
                <Ship className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">
                Mariners Learning System
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-white/70">
              The premier provider of USCG approved Captain's License and FCC courses. Learn at your own pace, anytime, anywhere.
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-[var(--color-primary)] transition-colors text-sm font-semibold">FB</a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-[var(--color-primary)] transition-colors text-sm font-semibold">TW</a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[var(--color-primary)] transition-colors text-sm font-semibold">IG</a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-[var(--color-primary)] transition-colors text-sm font-semibold">IN</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/courses" className="hover:text-white transition-colors">Course Catalog</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQs</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Maritime Blog</Link></li>
            </ul>
          </div>

          {/* Top Courses */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6">Top Courses</h4>
            <ul className="space-y-3">
              <li><Link to="/courses" className="hover:text-white transition-colors">OUPV/Six-Pack Captain's License</Link></li>
              <li><Link to="/courses" className="hover:text-white transition-colors">25/50 or 100-Ton Master License</Link></li>
              <li><Link to="/courses" className="hover:text-white transition-colors">Assistance Towing Endorsement</Link></li>
              <li><Link to="/courses" className="hover:text-white transition-colors">FCC Marine Radio Operator</Link></li>
              <li><Link to="/courses" className="hover:text-white transition-colors">Mariners Master Skipper</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin className="h-5 w-5 text-[var(--color-primary)] flex-shrink-0" />
                <span className="text-sm">123 Marina Blvd, Suite 200<br/>Coastal City, ST 12345</span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="h-5 w-5 text-[var(--color-primary)] flex-shrink-0" />
                <span className="text-sm">1-800-CAPTAIN</span>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="h-5 w-5 text-[var(--color-primary)] flex-shrink-0" />
                <span className="text-sm">support@marinerslearning.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
          <p>&copy; {new Date().getFullYear()} Mariners Learning System. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
