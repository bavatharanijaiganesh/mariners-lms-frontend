import { Link } from 'react-router-dom';
import { ArrowRight, Anchor, ShieldCheck, Clock, BookOpen, Star } from 'lucide-react';

import heroImg from '../assets/images/hero.png';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-48 overflow-hidden bg-[var(--color-background)]">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/5 to-[var(--color-secondary)]/5 z-0"></div>
        
        {/* Abstract decorative elements */}
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 z-0"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 z-0"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Text Content */}
            <div className="text-left animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-medium text-sm mb-8">
                <span className="flex h-2 w-2 rounded-full bg-blue-500"></span>
                USCG Approved Courses Online
              </div>
              
              <h1 className="text-5xl md:text-6xl font-extrabold text-[var(--color-heading)] tracking-tight mb-8 leading-tight">
                Navigate Your Future <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]">
                   on the Water
                </span>
              </h1>
              
              <p className="text-xl text-[var(--color-body)] mb-10 leading-relaxed max-w-xl">
                The smartest way to earn your Captain's License and FCC credentials. Learn at your own pace with our comprehensive, state-of-the-art online platform.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <Link
                  to="/courses"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] shadow-xl shadow-primary/30 transition-all hover:-translate-y-1 hover:shadow-primary/40 flex items-center justify-center gap-2"
                >
                  Explore Courses
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  to="/about"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-[var(--color-heading)] bg-white border-2 border-[var(--color-border)] hover:border-[var(--color-primary)] transition-all hover:-translate-y-1 text-center"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Image Content */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-primary/20 border-4 border-white transform transition-transform hover:scale-[1.02] duration-500">
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
              <img 
                src={heroImg} 
                alt="Captain at the helm" 
                className="w-full h-full object-cover min-h-[400px] lg:min-h-[600px]"
              />
            </div>
            
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white relative z-20 -mt-10 rounded-t-[3rem] shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[var(--color-heading)]">Why Choose Mariners Learning System?</h2>
            <p className="mt-4 text-[var(--color-body)] max-w-2xl mx-auto">We provide the most effective and engaging way to prepare for your maritime career.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: ShieldCheck, title: "USCG Approved", desc: "Our courses are fully recognized and approved by the United States Coast Guard." },
              { icon: Clock, title: "Self-Paced Learning", desc: "Study whenever and wherever you want. Our platform is available 24/7 on all devices." },
              { icon: BookOpen, title: "Comprehensive Material", desc: "Access high-quality videos, interactive modules, and practice tests designed for success." }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-2xl bg-[var(--color-background)] border border-[var(--color-border)] hover:border-primary/30 hover:shadow-lg transition-all group">
                <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                  <feature.icon className="h-7 w-7 text-[var(--color-primary)]" />
                </div>
                <h3 className="text-xl font-bold text-[var(--color-heading)] mb-3">{feature.title}</h3>
                <p className="text-[var(--color-body)] leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-24 bg-[var(--color-background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-[var(--color-heading)]">Explore Course Categories</h2>
              <p className="mt-4 text-[var(--color-body)]">Find the right certification path for your maritime goals.</p>
            </div>
            <Link to="/courses" className="hidden sm:flex items-center gap-2 text-[var(--color-primary)] font-semibold hover:text-[var(--color-primary-hover)] transition-colors">
              View all courses <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Captain's Licenses", count: "3 Courses", color: "bg-blue-100 text-blue-700" },
              { name: "Recreational Boating", count: "9 Courses", color: "bg-emerald-100 text-emerald-700" },
              { name: "FCC Licenses", count: "6 Courses", color: "bg-purple-100 text-purple-700" },
              { name: "Endorsements", count: "4 Courses", color: "bg-orange-100 text-orange-700" }
            ].map((cat, i) => (
              <Link key={i} to="/courses" className="block p-6 rounded-2xl bg-white border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:shadow-md transition-all group">
                <div className="flex justify-between items-start mb-12">
                  <div className={`p-3 rounded-lg ${cat.color}`}>
                    <Anchor className="h-6 w-6" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-300 group-hover:text-[var(--color-primary)] group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="font-bold text-lg text-[var(--color-heading)] mb-1">{cat.name}</h3>
                <p className="text-sm text-[var(--color-muted)]">{cat.count}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-24 bg-[var(--color-primary)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-8">
            <div className="flex gap-1 text-yellow-400">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-6 w-6 fill-current" />)}
            </div>
          </div>
          <blockquote className="text-3xl md:text-4xl font-medium leading-tight max-w-4xl mx-auto mb-10">
             "The OUPV course was incredibly well-structured. The interactive modules made learning complex navigation rules straightforward. I passed my exam on the first try!"
          </blockquote>
          <div className="flex items-center justify-center gap-4">
             <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center font-bold text-xl">
               JD
             </div>
             <div className="text-left">
               <div className="font-bold text-lg">John Doe</div>
               <div className="text-white/70">OUPV Captain, Florida</div>
             </div>
          </div>
        </div>
      </section>
      
    </div>
  );
}
