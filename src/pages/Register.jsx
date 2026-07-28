import { useState } from "react";
import { Link } from 'react-router-dom';
// import { Ship, Mail, Lock, User, Phone, Globe, Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Ship, Mail, Lock, User, Phone, ArrowRight } from 'lucide-react';
import authBg from '../assets/images/auth_bg.png';
import { registerUser } from "../services/authService.js"

export default function Register() {

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await registerUser(formData);

      console.log(response.data);

    } catch (error) {

      console.log(error.response.data);

    }
  };
  return (
    <div className="min-h-screen bg-[var(--color-background)] flex">
      {/* Left side - Image */}
      <div className="hidden lg:flex w-1/2 relative bg-[var(--color-heading)] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent mix-blend-multiply z-10"></div>
        <img
          src={authBg}
          alt="Lighthouse at sunset"
          className="w-full h-full object-cover transform scale-105"
        />
        <div className="absolute bottom-0 left-0 p-16 z-20 text-white">
          <h2 className="text-4xl font-bold mb-4">Start Your Journey</h2>
          <p className="text-xl text-white/80 max-w-md">Join thousands of successful mariners who have earned their credentials with us.</p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-16 h-screen overflow-y-auto">
        <div className="w-full max-w-xl py-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-10">
            <div className="bg-primary/10 p-2 rounded-xl">
              <Ship className="h-6 w-6 text-[var(--color-primary)]" />
            </div>
            <span className="font-bold text-xl tracking-tight text-[var(--color-heading)]">
              Mariners LMS
            </span>
          </Link>

          <h1 className="text-3xl font-extrabold text-[var(--color-heading)] mb-2">Create an account</h1>
          <p className="text-[var(--color-body)] mb-8">Already have an account? <Link to="/login" className="text-[var(--color-primary)] hover:underline font-semibold">Sign in here</Link></p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-[var(--color-heading)] mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input type="text" name="full_name" placeholder="Full Name" value={formData.full_name} onChange={handleChange} className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-primary/20 outline-none bg-gray-50" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-heading)] mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input type="email" name="email" placeholder="captain@example.com" value={formData.email} onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-primary/20 outline-none bg-gray-50" required />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-[var(--color-heading)] mb-2">Mobile Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input type="tel" name="phone_number" placeholder="+1 (555) 000-0000" value={formData.phone_number} onChange={handleChange} className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-primary/20 outline-none bg-gray-50" required />
                </div>
              </div>
              {/* <div>
                <label className="block text-sm font-medium text-[var(--color-heading)] mb-2">Nationality</label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input type="text" placeholder="United States" className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-primary/20 outline-none bg-gray-50" required />
                </div>
              </div> */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* <div>
                <label className="block text-sm font-medium text-[var(--color-heading)] mb-2">Date of Birth</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input type="date" className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-primary/20 outline-none bg-gray-50 text-gray-600" required />
                </div>
              </div> */}
              <div>
                <label className="block text-sm font-medium text-[var(--color-heading)] mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input type="password" name="password" placeholder="••••••••" value={formData.password} onChange={handleChange} className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-primary/20 outline-none bg-gray-50" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Confirm Password
                </label>

                <input
                  type="password"
                  name="confirm_password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  placeholder="********"
                  className="w-full pl-4 pr-4 py-3 rounded-xl border border-gray-200"
                  required
                />
              </div>
            </div>

            {/* <div>
              <label className="block text-sm font-medium text-[var(--color-heading)] mb-2">Full Address</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
                <textarea rows="2" placeholder="123 Marina Blvd, Coastal City, ST 12345" className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-primary/20 outline-none bg-gray-50 resize-none" required></textarea>
              </div>
            </div> */}

            <button
              type="submit"
              className="w-full py-4 mt-4 rounded-xl font-bold text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] shadow-lg shadow-primary/30 transition-all flex items-center justify-center gap-2"
            >
              Create Account
              <ArrowRight className="h-5 w-5" />
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
