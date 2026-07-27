import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import catalogImg from '../assets/images/catalog.png';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "Are your courses USCG approved?",
      answer: "Yes, all of our licensing courses are fully approved by the United States Coast Guard. Upon successful completion of our courses and exams, you will receive a certificate that the USCG will accept in lieu of taking the exam at a Regional Exam Center."
    },
    {
      question: "How long do I have to complete a course?",
      answer: "You have 12 months from the date of purchase to complete your course and take your final proctored examination. If you need more time, extensions can be purchased."
    },
    {
      question: "How do the online exams work?",
      answer: "Our final exams are proctored online using a secure system. You must schedule your exam slot in advance. During the exam, you will need a webcam, microphone, and a stable internet connection. The system will monitor for any unauthorized materials or switching tabs."
    },
    {
      question: "What is the OUPV or 'Six-Pack' license?",
      answer: "The Operator of Uninspected Passenger Vessels (OUPV) license allows you to carry up to six paying passengers on uninspected vessels up to 100 gross tons. It's the most popular license for fishing guides, charter boats, and tour boats."
    },
    {
      question: "Can I use a Mac or iPad for the courses?",
      answer: "Yes! Our platform is fully responsive and compatible with Windows, macOS, iOS, and Android devices. You can learn on your desktop, laptop, tablet, or smartphone."
    },
    {
      question: "What happens if I fail the final exam?",
      answer: "If you fail a module on the final exam, you are allowed up to two retakes of that specific module depending on the course. Retakes must be scheduled and proctored just like the initial exam."
    }
  ];

  return (
    <div className="bg-[var(--color-background)] min-h-screen pb-24">
      {/* Premium Hero Header */}
      <div 
        className="relative bg-[var(--color-heading)] text-white pt-32 pb-40 overflow-hidden"
        style={{
          backgroundImage: `url(${catalogImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-blue-900/70 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] to-transparent opacity-90"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg text-white">Frequently Asked Questions</h1>
          <p className="text-xl text-white max-w-2xl mx-auto drop-shadow-md font-medium">
            Find answers to common questions about our courses, licensing requirements, and exams.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl border border-[var(--color-border)] p-8 md:p-12 mb-16">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`border border-[var(--color-border)] rounded-2xl overflow-hidden transition-all duration-300 ${openIndex === index ? 'shadow-md border-[var(--color-primary)]' : 'hover:border-gray-300'}`}
              >
                <button
                  className={`w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none ${openIndex === index ? 'bg-primary/5' : 'bg-white'}`}
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                >
                  <span className="font-bold text-[var(--color-heading)] pr-8">{faq.question}</span>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-[var(--color-primary)] flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                <div 
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 py-5 opacity-100 border-t border-[var(--color-border)]/50' : 'max-h-0 py-0 opacity-0'}`}
                >
                  <p className="text-[var(--color-body)] leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <p className="text-[var(--color-body)] mb-4">Still have questions?</p>
          <a href="/contact" className="inline-flex px-6 py-3 rounded-xl font-bold text-[var(--color-primary)] bg-white border-2 border-[var(--color-primary)] hover:bg-primary/5 transition-all">
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
