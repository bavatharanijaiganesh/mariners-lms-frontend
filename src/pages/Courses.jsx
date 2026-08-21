import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock, DollarSign, Filter, BookOpen } from 'lucide-react';
import coursesData from '../data/courses.json';
import { cn } from '../utils/cn';

import catalogImg from '../assets/images/catalog.png';

export default function Courses() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(coursesData.map(c => c.category))];

  const filteredCourses = coursesData.filter(course => {
    const matchesSearch = course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-[var(--color-background)] min-h-screen pb-24">
      {/* Header */}
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
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg text-white">Course Catalog</h1>
          <p className="text-xl text-white max-w-2xl mx-auto drop-shadow-md font-medium">
            Discover our comprehensive range of USCG approved and FCC maritime courses tailored for your success.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">

        {/* Filters and Search Bar */}
        <div className="bg-white rounded-2xl shadow-lg border border-[var(--color-border)] p-4 md:p-6 mb-12 flex flex-col md:flex-row gap-4 justify-between items-center relative z-10">
          <div className="relative w-full md:w-96 flex-shrink-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-primary/20 transition-all outline-none text-[var(--color-heading)] bg-gray-50"
            />
          </div>

          <div className="w-full md:w-auto flex items-center gap-3 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            <Filter className="h-5 w-5 text-gray-400 hidden md:block flex-shrink-0" />
            <div className="flex gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 border",
                    selectedCategory === cat
                      ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-md"
                      : "bg-white text-[var(--color-body)] border-gray-200 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Course Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-2xl border border-[var(--color-border)] overflow-hidden hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 flex flex-col group">
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                      {course.category}
                    </span>
                    {course.popular && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-orange-50 text-orange-600 border border-orange-100">
                        Popular
                      </span>
                    )}
                  </div>

                  <Link to={`/courses/${course.id}`} className="group-hover:text-[var(--color-primary)] transition-colors">
                    <h3 className="text-xl font-bold text-[var(--color-heading)] mb-3 leading-tight line-clamp-2">
                      {course.courseName}
                    </h3>
                  </Link>

                  <p className="text-[var(--color-body)] text-sm mb-6 flex-grow line-clamp-3">
                    {course.description}
                  </p>

                  <div className="flex flex-col gap-3 mt-auto pt-6 border-t border-gray-100 text-sm text-[var(--color-body)]">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-[var(--color-primary)] opacity-70" />
                      <span>{course.estimatedDuration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-[var(--color-primary)] opacity-70" />
                      <span>Self-paced Online</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gray-50 flex items-center justify-between border-t border-[var(--color-border)]">
                  <div className="flex items-center text-2xl font-bold text-[var(--color-heading)]">
                    <DollarSign className="h-6 w-6 text-green-600 -mr-1" />
                    {course.feeUSD}
                  </div>
                  <Link
                    to={`/courses/${course.id}`}
                    className="px-5 py-2.5 rounded-xl font-semibold text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] transition-colors text-sm shadow-md"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-2xl border border-[var(--color-border)]">
            <h3 className="text-2xl font-bold text-[var(--color-heading)] mb-2">No courses found</h3>
            <p className="text-[var(--color-body)]">Try adjusting your search or category filter.</p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
              className="mt-6 px-6 py-2 rounded-lg font-medium text-[var(--color-primary)] bg-primary/10 hover:bg-primary/20 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
