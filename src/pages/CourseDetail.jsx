import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, DollarSign, Shield, CheckCircle, PlayCircle, BookOpen, Award } from 'lucide-react';
import coursesData from '../data/courses.json';
import detailImg from '../assets/images/detail.png';

export default function CourseDetail() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  
  const course = coursesData.find(c => c.id === courseId);

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Course Not Found</h2>
        <button onClick={() => navigate('/courses')} className="text-blue-600 hover:underline">
          Return to Course Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[var(--color-background)] min-h-screen pb-24">
      {/* Premium Hero Header */}
      <div 
        className="bg-[var(--color-heading)] pt-16 pb-32 text-white relative overflow-hidden"
        style={{
          backgroundImage: `url(${detailImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-blue-900/80 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-transparent"></div>
        <div className="absolute -right-40 top-0 w-96 h-96 bg-primary/30 rounded-full blur-3xl mix-blend-overlay"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link to="/courses" className="inline-flex items-center text-white/70 hover:text-white mb-8 transition-colors text-sm font-medium">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Courses
          </Link>
          
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-4 py-1.5 rounded-full text-sm font-semibold bg-white/10 backdrop-blur-md border border-white/20">
                {course.category}
              </span>
              <span className="px-4 py-1.5 rounded-full text-sm font-semibold bg-green-500/20 text-green-300 border border-green-500/30 flex items-center gap-2">
                <Shield className="h-4 w-4" /> USCG Approved
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              {course.courseName}
            </h1>
            
            <p className="text-xl text-white/80 leading-relaxed mb-8">
              Prepare for your maritime future with the industry's most comprehensive and engaging online curriculum.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl shadow-lg border border-[var(--color-border)] p-8 md:p-10">
              <h2 className="text-2xl font-bold text-[var(--color-heading)] mb-6">About This Course</h2>
              <p className="text-[var(--color-body)] text-lg leading-relaxed mb-8">
                {course.description}
              </p>
              
              <h3 className="text-xl font-bold text-[var(--color-heading)] mb-6 pt-8 border-t border-gray-100">What You'll Learn</h3>
              <ul className="grid sm:grid-cols-2 gap-4">
                {[
                  "Rules of the Road",
                  "Navigation & Piloting",
                  "Deck General & Safety",
                  "Maritime Regulations"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[var(--color-body)]">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Course Content Preview */}
            <div className="bg-white rounded-2xl shadow-lg border border-[var(--color-border)] p-8 md:p-10">
               <h2 className="text-2xl font-bold text-[var(--color-heading)] mb-6">Course Content Structure</h2>
               <div className="space-y-4">
                 {[
                   { title: "Module 1: Introduction & Regulations", icon: BookOpen },
                   { title: "Module 2: Navigation Basics", icon: PlayCircle },
                   { title: "Module 3: Advanced Piloting", icon: PlayCircle },
                   { title: "Module 4: Safety & Emergency Protocols", icon: Shield },
                   { title: "Final Examination", icon: Award }
                 ].map((mod, i) => (
                   <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-blue-50 hover:border-blue-100 transition-colors cursor-pointer group">
                     <div className="flex items-center gap-4">
                       <div className="p-2 bg-white rounded-lg shadow-sm text-gray-500 group-hover:text-[var(--color-primary)] transition-colors">
                         <mod.icon className="h-5 w-5" />
                       </div>
                       <span className="font-medium text-[var(--color-heading)]">{mod.title}</span>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>

          {/* Sidebar / Enrollment Card */}
          <div className="bg-white rounded-2xl shadow-2xl shadow-[var(--color-primary)]/10 border border-[var(--color-border)] p-8 sticky top-28">
            <div className="text-center pb-6 border-b border-gray-100 mb-6">
              <div className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wider">Course Fee</div>
              <div className="text-5xl font-extrabold text-[var(--color-heading)] flex items-center justify-center">
                <DollarSign className="h-10 w-10 text-[var(--color-success)] -mr-2" />
                {course.feeUSD}
              </div>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between text-[var(--color-body)] p-3 rounded-lg bg-gray-50">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-[var(--color-primary)]" />
                  <span className="font-medium">Estimated Time</span>
                </div>
                <span className="font-bold text-gray-900">{course.estimatedDuration}</span>
              </div>
              <div className="flex items-center justify-between text-[var(--color-body)] p-3 rounded-lg bg-gray-50">
                <div className="flex items-center gap-3">
                  <PlayCircle className="h-5 w-5 text-[var(--color-primary)]" />
                  <span className="font-medium">Format</span>
                </div>
                <span className="font-bold text-gray-900">100% Online</span>
              </div>
              <div className="flex items-center justify-between text-[var(--color-body)] p-3 rounded-lg bg-gray-50">
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5 text-[var(--color-primary)]" />
                  <span className="font-medium">Certificate</span>
                </div>
                <span className="font-bold text-gray-900">Included</span>
              </div>
            </div>
            
            <Link
              to="/register"
              className="w-full py-4 rounded-xl font-bold text-lg text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] shadow-xl shadow-primary/30 transition-all hover:-translate-y-1 hover:shadow-primary/40 flex items-center justify-center gap-2"
            >
              Enroll Now
            </Link>
            
            <p className="text-center text-sm text-gray-500 mt-4">
              Secure payment via Stripe. 30-day money-back guarantee.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
