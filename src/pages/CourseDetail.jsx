
import {
  useParams,
  Link,
  useNavigate,
  useLocation
} from "react-router-dom";

import { useState, useEffect } from "react";

import {
  ArrowLeft,
  Clock,
  DollarSign,
  Shield,
  CheckCircle,
  PlayCircle,
  BookOpen,
  Award
} from "lucide-react";

import coursesData from "../data/courses.json";
import detailImg from "../assets/images/detail.png";

import { enrollCourse } from "../services/enrollmentService";
import { getModules } from "../services/moduleService";
import { getLessons } from "../services/lessonService";
import { getCourseContent } from "../services/courseContentService";

export default function CourseDetail() {

  const { courseId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // =========================
  // FIND COURSE
  // =========================

  const course = coursesData.find(
    (c) => c.id === Number(courseId)
  );

  // =========================
  // MODULES
  // =========================

  const [modules, setModules] = useState([]);
  const [loadingModules, setLoadingModules] = useState(false);
  const [expandedModule, setExpandedModule] = useState(null);

  // =========================
  // LESSONS
  // =========================

  const [lessons, setLessons] = useState({});
  const [loadingLessons, setLoadingLessons] = useState({});

  const [selectedLesson, setSelectedLesson] = useState(null);

  // =========================
  // LOAD MODULES
  // =========================

  useEffect(() => {

    if (!course?.id) {
      return;
    }

    const fetchModules = async () => {

      try {

        setLoadingModules(true);

        const response = await getModules(course.id);

        console.log(
          "Modules:",
          response.data
        );

        setModules(response.data);

      } catch (error) {

        console.error(
          "Failed to fetch modules:",
          error
        );

      } finally {

        setLoadingModules(false);

      }

    };

    fetchModules();

  }, [course?.id]);

  // =========================
  // MODULE CLICK
  // =========================

  const handleModuleClick = async (moduleId) => {

    // Close module if already open
    if (expandedModule === moduleId) {

      setExpandedModule(null);

      return;

    }

    // Open module
    setExpandedModule(moduleId);

    // Don't request lessons again
    if (lessons[moduleId]) {
      return;
    }

    try {

      setLoadingLessons((previous) => ({
        ...previous,
        [moduleId]: true
      }));

      const response = await getLessons(moduleId);

      console.log(
        `Lessons for module ${moduleId}:`,
        response.data
      );

      setLessons((previous) => ({
        ...previous,
        [moduleId]: response.data
      }));

    } catch (error) {

      console.error(
        "Failed to fetch lessons:",
        error
      );

    } finally {

      setLoadingLessons((previous) => ({
        ...previous,
        [moduleId]: false
      }));

    }

  };

  // =========================
  // ENROLL COURSE
  // =========================

  const enrollCourseNow = async (course) => {

    try {

      console.log(
        "Enrolling course:",
        course
      );

      // =========================
      // CREATE ENROLLMENT
      // =========================

      const response = await enrollCourse({

        course_id: course.id,

        course_name: course.courseName,

        category: course.category,

        fee: course.feeUSD,

        duration: course.estimatedDuration,

        certificate_type:
          course.certificateType || "",

      });

      console.log(
        "Enrollment created:",
        response.data
      );

      // =========================
      // SAVE SELECTED COURSE
      // =========================

      sessionStorage.setItem(
        "pendingCourse",
        JSON.stringify(course)
      );

      // =========================
      // GO TO CHECKOUT
      // =========================

      navigate("/checkout");

    } catch (error) {

      console.log(
        "Enrollment error:",
        error.response?.status,
        error.response?.data
      );

      const message =
        error.response?.data?.message ||
        error.response?.data?.detail ||
        "";

      // =========================
      // ALREADY ENROLLED / PAID
      // =========================

      if (
        error.response?.status === 400 &&
        message ===
          "You have already enrolled in this course."
      ) {

        console.log(
          "Student already purchased this course."
        );

        // Remove temporary course
        sessionStorage.removeItem(
          "pendingCourse"
        );

        // =========================
        // GO DIRECTLY TO MY COURSE
        // =========================

        navigate(
          `/my-courses/${course.id}`
        );

        return;
      }

      // =========================
      // OTHER ERRORS
      // =========================

      console.error(
        "Enrollment failed:",
        error
      );

      alert(
        message ||
        "Unable to enroll in this course. Please try again."
      );

    }

  };

  // =========================
  // HANDLE ENROLL
  // =========================

  const handleEnroll = () => {

    // Check login token
    const token =
      localStorage.getItem("access");

    // =========================
    // NOT LOGGED IN
    // =========================

    if (!token) {

      // Save selected course
      sessionStorage.setItem(
        "pendingCourse",
        JSON.stringify(course)
      );

      // Go to login
      navigate("/login", {
        state: {
          from: location.pathname
        }
      });

      return;
    }

    // =========================
    // LOGGED IN
    // =========================

    enrollCourseNow(course);

  };

  // =========================
  // TEST COURSE CONTENT
  // =========================

  const testCourseContent = async () => {

    try {

      const response =
        await getCourseContent(course.id);

      console.log(
        "COURSE CONTENT:",
        response.data
      );

    } catch (error) {

      console.log(
        "COURSE CONTENT ERROR:",
        error.response?.status,
        error.response?.data
      );

    }

  };

  // =========================
  // COURSE NOT FOUND
  // =========================

  if (!course) {

    return (

      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">

        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Course Not Found
        </h2>

        <button
          onClick={() => navigate("/courses")}
          className="text-blue-600 hover:underline"
        >
          Return to Course Catalog
        </button>

      </div>

    );

  }

  return (

    <div className="bg-[var(--color-background)] min-h-screen pb-24">

      {/* =========================
          PREMIUM HERO HEADER
      ========================= */}

      <div
        className="bg-[var(--color-heading)] pt-16 pb-32 text-white relative overflow-hidden"
        style={{
          backgroundImage: `url(${detailImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >

        <div className="absolute inset-0 bg-blue-900/80 mix-blend-multiply"></div>

        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-transparent"></div>

        <div className="absolute -right-40 top-0 w-96 h-96 bg-primary/30 rounded-full blur-3xl mix-blend-overlay"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <Link
            to="/courses"
            className="inline-flex items-center text-white/70 hover:text-white mb-8 transition-colors text-sm font-medium"
          >

            <ArrowLeft className="h-4 w-4 mr-2" />

            Back to Courses

          </Link>

          <div className="max-w-3xl">

            <div className="flex flex-wrap items-center gap-3 mb-6">

              <span className="px-4 py-1.5 rounded-full text-sm font-semibold bg-white/10 backdrop-blur-md border border-white/20">

                {course.category}

              </span>

              <span className="px-4 py-1.5 rounded-full text-sm font-semibold bg-green-500/20 text-green-300 border border-green-500/30 flex items-center gap-2">

                <Shield className="h-4 w-4" />

                USCG Approved

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

      {/* =========================
          MAIN CONTENT
      ========================= */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">

        <div className="grid lg:grid-cols-3 gap-8 items-start">

          {/* =========================
              MAIN CONTENT AREA
          ========================= */}

          <div className="lg:col-span-2 space-y-8">

            {/* ABOUT COURSE */}

            <div className="bg-white rounded-2xl shadow-lg border border-[var(--color-border)] p-8 md:p-10">

              <h2 className="text-2xl font-bold text-[var(--color-heading)] mb-6">

                About This Course

              </h2>

              <p className="text-[var(--color-body)] text-lg leading-relaxed mb-8">

                {course.description}

              </p>

              <h3 className="text-xl font-bold text-[var(--color-heading)] mb-6 pt-8 border-t border-gray-100">

                What You'll Learn

              </h3>

              <ul className="grid sm:grid-cols-2 gap-4">

                {[

                  "Rules of the Road",

                  "Navigation & Piloting",

                  "Deck General & Safety",

                  "Maritime Regulations"

                ].map((item, i) => (

                  <li
                    key={i}
                    className="flex items-start gap-3 text-[var(--color-body)]"
                  >

                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />

                    <span>
                      {item}
                    </span>

                  </li>

                ))}

              </ul>

            </div>

            {/* =========================
                COURSE CONTENT
            ========================= */}

            <div className="bg-white rounded-2xl shadow-lg border border-[var(--color-border)] p-8 md:p-10">

              <h2 className="text-2xl font-bold text-[var(--color-heading)] mb-6">

                Course Content

              </h2>

              {/* LOADING MODULES */}

              {loadingModules && (

                <p className="text-gray-500">
                  Loading modules...
                </p>

              )}

              {/* NO MODULES */}

              {!loadingModules &&
                modules.length === 0 && (

                  <p className="text-gray-500">
                    No modules available for this course.
                  </p>

                )}

              {/* MODULES */}

              {!loadingModules &&
                modules.length > 0 && (

                  <div className="space-y-4">

                    {modules.map((module) => (

                      <div
                        key={module.id}
                        className="border border-gray-200 rounded-xl overflow-hidden"
                      >

                        {/* MODULE HEADER */}

                        <button
                          type="button"
                          onClick={() =>
                            handleModuleClick(module.id)
                          }
                          className="w-full flex items-center justify-between p-5 text-left bg-gray-50 hover:bg-blue-50 transition-colors"
                        >

                          <div className="flex items-center gap-4">

                            <div className="p-2 bg-white rounded-lg shadow-sm">

                              <BookOpen className="h-5 w-5 text-[var(--color-primary)]" />

                            </div>

                            <div>

                              <h3 className="font-semibold text-[var(--color-heading)]">

                                Module {module.order}:{" "}

                                {module.title}

                              </h3>

                              {module.description && (

                                <p className="text-sm text-gray-500 mt-1">

                                  {module.description}

                                </p>

                              )}

                            </div>

                          </div>

                          <span className="text-xl font-bold">

                            {expandedModule === module.id
                              ? "−"
                              : "+"}

                          </span>

                        </button>

                        {/* =========================
                            LESSONS
                        ========================= */}

                        {expandedModule === module.id && (

                          <div className="p-5 border-t bg-white">

                            {loadingLessons[module.id] ? (

                              <p className="text-gray-500">

                                Loading lessons...

                              </p>

                            ) : !lessons[module.id]?.length ? (

                              <p className="text-gray-500">

                                No lessons available.

                              </p>

                            ) : (

                              <div className="space-y-3">

                                {lessons[module.id].map(
                                  (lesson) => (

                                    <button
                                      key={lesson.id}
                                      type="button"
                                      onClick={() =>
                                        setSelectedLesson(
                                          lesson
                                        )
                                      }
                                      className="w-full text-left p-4 border rounded-lg bg-white hover:bg-blue-50 hover:border-blue-300 transition"
                                    >

                                      <div className="flex justify-between items-center">

                                        <div className="flex items-center gap-3">

                                          <PlayCircle className="h-5 w-5 text-[var(--color-primary)]" />

                                          <div>

                                            <h4 className="font-semibold">

                                              {lesson.order}.{" "}

                                              {lesson.title}

                                            </h4>

                                            {lesson.description && (

                                              <p className="text-sm text-gray-500 mt-1">

                                                {lesson.description}

                                              </p>

                                            )}

                                          </div>

                                        </div>

                                        <div className="text-right">

                                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">

                                            {lesson.content_type}

                                          </span>

                                          {lesson.duration && (

                                            <p className="text-xs text-gray-500 mt-1">

                                              {lesson.duration}

                                            </p>

                                          )}

                                        </div>

                                      </div>

                                    </button>

                                  )
                                )}

                                {/* =========================
                                    SELECTED LESSON
                                ========================= */}

                                {selectedLesson && (

                                  <div className="mt-8 bg-white rounded-2xl shadow-lg border border-[var(--color-border)] p-8">

                                    <div className="flex items-center justify-between mb-6">

                                      <div>

                                        <p className="text-sm text-gray-500">

                                          Current Lesson

                                        </p>

                                        <h2 className="text-2xl font-bold text-[var(--color-heading)]">

                                          {selectedLesson.title}

                                        </h2>

                                      </div>

                                      <button
                                        type="button"
                                        onClick={() =>
                                          setSelectedLesson(
                                            null
                                          )
                                        }
                                        className="text-gray-500 hover:text-gray-900"
                                      >
                                        ✕
                                      </button>

                                    </div>

                                    {/* VIDEO / SCREEN */}

                                    {(selectedLesson.content_type ===
                                      "VIDEO" ||
                                      selectedLesson.content_type ===
                                        "SCREEN") && (

                                      <div className="bg-black rounded-xl overflow-hidden">

                                        {selectedLesson.resource_file ? (

                                          <video
                                            controls
                                            className="w-full max-h-[600px]"
                                            src={
                                              selectedLesson.resource_file
                                            }
                                          >

                                            Your browser does not support video playback.

                                          </video>

                                        ) : selectedLesson.media_url ? (

                                          <video
                                            controls
                                            className="w-full max-h-[600px]"
                                            src={
                                              selectedLesson.media_url
                                            }
                                          >

                                            Your browser does not support video playback.

                                          </video>

                                        ) : (

                                          <div className="text-white p-10 text-center">

                                            No video available for this lesson.

                                          </div>

                                        )}

                                      </div>

                                    )}

                                    {/* AUDIO */}

                                    {selectedLesson.content_type ===
                                      "AUDIO" && (

                                      <div className="p-8 bg-gray-50 rounded-xl">

                                        {selectedLesson.resource_file ? (

                                          <audio
                                            controls
                                            className="w-full"
                                            src={
                                              selectedLesson.resource_file
                                            }
                                          />

                                        ) : selectedLesson.media_url ? (

                                          <audio
                                            controls
                                            className="w-full"
                                            src={
                                              selectedLesson.media_url
                                            }
                                          />

                                        ) : (

                                          <p className="text-gray-500">

                                            No audio available for this lesson.

                                          </p>

                                        )}

                                      </div>

                                    )}

                                    {/* TEXT */}

                                    {selectedLesson.content_type ===
                                      "TEXT" && (

                                      <div className="prose max-w-none">

                                        <p className="whitespace-pre-line text-gray-700 leading-relaxed">

                                          {selectedLesson.content}

                                        </p>

                                      </div>

                                    )}

                                  </div>

                                )}

                              </div>

                            )}

                          </div>

                        )}

                      </div>

                    ))}

                  </div>

                )}

            </div>

          </div>

          {/* =========================
              SIDEBAR
          ========================= */}

          <div className="bg-white rounded-2xl shadow-2xl shadow-[var(--color-primary)]/10 border border-[var(--color-border)] p-8 sticky top-28">

            <div className="text-center pb-6 border-b border-gray-100 mb-6">

              <div className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wider">

                Course Fee

              </div>

              <div className="text-5xl font-extrabold text-[var(--color-heading)] flex items-center justify-center">

                <DollarSign className="h-10 w-10 text-[var(--color-success)] -mr-2" />

                {course.feeUSD}

              </div>

            </div>

            <div className="space-y-4 mb-8">

              <div className="flex items-center justify-between text-[var(--color-body)] p-3 rounded-lg bg-gray-50">

                <div className="flex items-center gap-3">

                  <Clock className="h-5 w-5 text-[var(--color-primary)]" />

                  <span className="font-medium">
                    Estimated Time
                  </span>

                </div>

                <span className="font-bold text-gray-900">

                  {course.estimatedDuration}

                </span>

              </div>

              <div className="flex items-center justify-between text-[var(--color-body)] p-3 rounded-lg bg-gray-50">

                <div className="flex items-center gap-3">

                  <PlayCircle className="h-5 w-5 text-[var(--color-primary)]" />

                  <span className="font-medium">
                    Format
                  </span>

                </div>

                <span className="font-bold text-gray-900">
                  100% Online
                </span>

              </div>

              <div className="flex items-center justify-between text-[var(--color-body)] p-3 rounded-lg bg-gray-50">

                <div className="flex items-center gap-3">

                  <Award className="h-5 w-5 text-[var(--color-primary)]" />

                  <span className="font-medium">
                    Certificate
                  </span>

                </div>

                <span className="font-bold text-gray-900">
                  Included
                </span>

              </div>

            </div>

            {/* =========================
                ENROLL BUTTON
            ========================= */}

            <button
              onClick={handleEnroll}
              className="w-full py-4 rounded-xl font-bold text-lg text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] shadow-xl shadow-primary/30 transition-all hover:-translate-y-1 hover:shadow-primary/40 flex items-center justify-center gap-2"
            >

              Enroll Now

            </button>

            <p className="text-center text-sm text-gray-500 mt-4">

              Secure payment via Stripe. 30-day money-back guarantee.

            </p>

          </div>

        </div>

      </div>

    </div>

  );

}
