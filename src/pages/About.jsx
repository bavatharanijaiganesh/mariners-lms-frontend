import { Link } from 'react-router-dom';
import { Target, Compass, Anchor, ArrowRight } from 'lucide-react';
import aboutHero from '../assets/images/about_hero.png';

export default function About() {
  return (
    <div className="bg-[var(--color-background)] min-h-screen pb-24">
      {/* Premium Hero Header */}
      <div 
        className="relative bg-[var(--color-heading)] text-white pt-32 pb-40 overflow-hidden"
        style={{
          backgroundImage: `url(${aboutHero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-blue-900/70 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] to-transparent opacity-90"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg text-white">About Mariners LMS</h1>
          <p className="text-xl text-white max-w-2xl mx-auto drop-shadow-md font-medium">
            Empowering mariners worldwide with state-of-the-art online education, certification, and career advancement tools.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl border border-[var(--color-border)] p-8 md:p-16 mb-16">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-[var(--color-heading)] mb-6">Our Story</h2>
            <p className="text-lg text-[var(--color-body)] leading-relaxed">
              Founded by veteran sea captains and maritime educators, Mariners Learning System was built on a simple premise: maritime education should be accessible, engaging, and highly effective. We recognized the need for a modern, digital approach to traditional maritime training. Today, we are proud to be the premier provider of USCG approved online courses, helping thousands of mariners earn their credentials every year.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                <Target className="h-8 w-8 text-[var(--color-primary)]" />
              </div>
              <h3 className="text-xl font-bold text-[var(--color-heading)] mb-3">Our Mission</h3>
              <p className="text-[var(--color-body)]">To provide the most comprehensive and technologically advanced maritime education, ensuring our students are safe, competent, and confident on the water.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                <Compass className="h-8 w-8 text-[var(--color-primary)]" />
              </div>
              <h3 className="text-xl font-bold text-[var(--color-heading)] mb-3">Our Vision</h3>
              <p className="text-[var(--color-body)]">To become the global standard for maritime certification, continuously innovating how maritime knowledge is delivered and assessed.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                <Anchor className="h-8 w-8 text-[var(--color-primary)]" />
              </div>
              <h3 className="text-xl font-bold text-[var(--color-heading)] mb-3">Our Values</h3>
              <p className="text-[var(--color-body)]">Integrity, Safety, Innovation, and Excellence. We hold ourselves to the highest standards because the sea demands nothing less.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[var(--color-primary)] rounded-3xl p-12 text-center text-white shadow-2xl shadow-primary/20">
          <h2 className="text-3xl font-bold mb-6">Ready to advance your maritime career?</h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of successful captains and maritime professionals who trust Mariners LMS.
          </p>
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-[var(--color-primary)] bg-white hover:bg-gray-50 transition-all hover:-translate-y-1"
          >
            Explore Our Courses
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
