import { Mail, Phone, MapPin, Send } from 'lucide-react';
import contactHero from '../assets/images/contact_hero.png';

export default function Contact() {
  return (
    <div className="bg-[var(--color-background)] min-h-screen pb-24">
      {/* Premium Hero Header */}
      <div 
        className="relative bg-[var(--color-heading)] text-white pt-32 pb-40 overflow-hidden"
        style={{
          backgroundImage: `url(${contactHero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-blue-900/70 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] to-transparent opacity-90"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg text-white">Contact Us</h1>
          <p className="text-xl text-white max-w-2xl mx-auto drop-shadow-md font-medium">
            Have questions about our courses or your certification path? Our team of maritime experts is here to help.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[var(--color-primary)] rounded-3xl p-8 text-white shadow-xl shadow-primary/20">
              <h3 className="text-2xl font-bold mb-8">Get in Touch</h3>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/10 rounded-xl">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Office Location</h4>
                    <p className="text-white/80">123 Marina Blvd, Suite 200<br/>Coastal City, ST 12345</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/10 rounded-xl">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Phone Number</h4>
                    <p className="text-white/80">1-800-CAPTAIN<br/>(1-800-227-8246)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/10 rounded-xl">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Email Address</h4>
                    <p className="text-white/80">support@marinerslearning.com<br/>info@marinerslearning.com</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-3xl p-8 border border-[var(--color-border)] shadow-sm">
               <h4 className="font-bold text-[var(--color-heading)] mb-2">Office Hours</h4>
               <p className="text-[var(--color-body)] text-sm mb-1">Monday - Friday: 8:00 AM - 6:00 PM EST</p>
               <p className="text-[var(--color-body)] text-sm">Saturday - Sunday: Closed</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl border border-[var(--color-border)] p-8 md:p-12 h-full">
              <h2 className="text-2xl font-bold text-[var(--color-heading)] mb-6">Send us a Message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-heading)] mb-2">Your Name</label>
                    <input type="text" placeholder="John Doe" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-primary/20 outline-none bg-gray-50 transition-all" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-heading)] mb-2">Email Address</label>
                    <input type="email" placeholder="john@example.com" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-primary/20 outline-none bg-gray-50 transition-all" required />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[var(--color-heading)] mb-2">Subject</label>
                  <input type="text" placeholder="How can we help you?" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-primary/20 outline-none bg-gray-50 transition-all" required />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--color-heading)] mb-2">Message</label>
                  <textarea rows="5" placeholder="Write your message here..." className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-primary/20 outline-none bg-gray-50 resize-none transition-all" required></textarea>
                </div>

                <button 
                  type="submit"
                  className="px-8 py-4 rounded-xl font-bold text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] shadow-lg shadow-primary/30 transition-all flex items-center justify-center gap-2"
                >
                  Send Message
                  <Send className="h-5 w-5" />
                </button>
              </form>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
