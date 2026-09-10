
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Ship, Mail, Lock, ArrowRight } from "lucide-react";
import authBg from "../assets/images/auth_bg.png";
import { loginUser } from "../services/authService";
import { enrollCourse } from "../services/enrollmentService";

export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      // =========================
      // LOGIN
      // =========================

      const response = await loginUser(formData);

      console.log("LOGIN RESPONSE:", response.data);

      // =========================
      // SAVE TOKENS
      // =========================

      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);

      // =========================
      // SAVE USER
      // =========================

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      const user = response.data.user;

      alert("Login Successful");

      // =========================
      // ADMIN LOGIN
      // =========================

      if (user.role === "ADMIN") {
        navigate("/admin/dashboard");
        return;
      }

      // =========================
      // STUDENT LOGIN
      // =========================

      const pendingCourseData =
        sessionStorage.getItem("pendingCourse");

      // =========================
      // NORMAL STUDENT LOGIN
      // =========================

      if (!pendingCourseData) {
        const redirectPath =
          location.state?.from || "/student/dashboard";

        navigate(redirectPath);
        return;
      }

      // Convert stored course data
      const pendingCourse = JSON.parse(pendingCourseData);

      console.log(
        "PENDING COURSE AFTER LOGIN:",
        pendingCourse
      );

      // =========================
      // CREATE ENROLLMENT
      // =========================

      try {
        const enrollmentResponse = await enrollCourse({
          course_id: pendingCourse.id,
          course_name: pendingCourse.courseName,
          category: pendingCourse.category,
          fee: pendingCourse.feeUSD,
          duration: pendingCourse.estimatedDuration,
          certificate_type:
            pendingCourse.certificateType || "",
        });

        console.log(
          "ENROLLMENT CREATED:",
          enrollmentResponse.data
        );

        // Remove pending course
        sessionStorage.removeItem("pendingCourse");

        // =========================
        // GO TO CHECKOUT
        // =========================

        navigate("/checkout");

      } catch (error) {
        console.log(
          "ENROLL ERROR:",
          error.response?.data || error
        );

        const message =
          error.response?.data?.message ||
          error.response?.data?.detail ||
          "";

        // =========================
        // ALREADY PAID
        // =========================

        if (
          message ===
          "You have already enrolled in this course."
        ) {
          console.log(
            "Student already purchased this course."
          );

          // Remove pending course
          sessionStorage.removeItem("pendingCourse");

          // =========================
          // GO DIRECTLY TO MY COURSE
          // =========================

          navigate(
            `/my-courses/${pendingCourse.id}`
          );

          return;
        }

        // =========================
        // OTHER ENROLLMENT ERROR
        // =========================

        alert(
          message ||
          "Login successful, but course enrollment failed."
        );
      }

    } catch (error) {

      // =========================
      // LOGIN ERROR
      // =========================

      console.log(
        "LOGIN ERROR:",
        error.response?.data || error
      );

      alert(
        error.response?.data?.detail ||
        error.response?.data?.message ||
        "Invalid Email or Password"
      );
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] flex">

      {/* =========================
          LEFT SIDE - IMAGE
      ========================= */}

      <div className="hidden lg:flex w-1/2 relative bg-[var(--color-heading)] overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent mix-blend-multiply z-10"></div>

        <img
          src={authBg}
          alt="Lighthouse at sunset"
          className="w-full h-full object-cover"
        />

        <div className="absolute bottom-0 left-0 p-16 z-20 text-white">

          <h2 className="text-4xl font-bold mb-4">
            Welcome Back
          </h2>

          <p className="text-xl text-white/80 max-w-md">
            Continue your maritime journey with the industry's
            leading education platform.
          </p>

        </div>

      </div>

      {/* =========================
          RIGHT SIDE - LOGIN FORM
      ========================= */}

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24">

        <div className="w-full max-w-md">

          {/* Logo */}

          <Link
            to="/"
            className="inline-flex items-center gap-2 mb-12"
          >

            <div className="bg-primary/10 p-2 rounded-xl">

              <Ship
                className="h-6 w-6 text-[var(--color-primary)]"
              />

            </div>

            <span className="font-bold text-xl tracking-tight text-[var(--color-heading)]">
              Mariners LMS
            </span>

          </Link>

          {/* Heading */}

          <h1 className="text-3xl font-extrabold text-[var(--color-heading)] mb-2">
            Sign in to your account
          </h1>

          <p className="text-[var(--color-body)] mb-8">

            Don't have an account?{" "}

            <Link
              to="/register"
              className="text-[var(--color-primary)] hover:underline font-semibold"
            >
              Enroll now
            </Link>

          </p>

          {/* =========================
              LOGIN FORM
          ========================= */}

          <form
            className="space-y-6"
            onSubmit={handleSubmit}
          >

            {/* Email */}

            <div>

              <label className="block text-sm font-medium text-[var(--color-heading)] mb-2">
                Email Address
              </label>

              <div className="relative">

                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="captain@example.com"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-gray-50"
                  required
                />

              </div>

            </div>

            {/* Password */}

            <div>

              <label className="block text-sm font-medium text-[var(--color-heading)] mb-2">
                Password
              </label>

              <div className="relative">

                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                />

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-gray-50"
                  required
                />

              </div>

            </div>

            {/* Login Button */}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-bold text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] shadow-lg shadow-primary/30 transition-all flex items-center justify-center gap-2"
            >

              Sign In

              <ArrowRight className="h-5 w-5" />

            </button>

          </form>

          {/* Footer */}

          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-[var(--color-muted)]">

            By signing in, you agree to our Terms of Service and Privacy Policy.

          </div>

        </div>

      </div>

    </div>
  );
}
