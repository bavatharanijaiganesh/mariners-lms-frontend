import { Link } from "react-router-dom";

export default function StudentDashboard() {

    return (

        <div className="max-w-7xl mx-auto p-8">

            <h1 className="text-4xl font-bold mb-8">

                Welcome Student

            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                <Link
                    to="/my-courses"
                    className="p-6 bg-white rounded-xl shadow"
                >
                    📚 My Courses
                </Link>

                <Link
                    to="/profile"
                    className="p-6 bg-white rounded-xl shadow"
                >
                    👤 Profile
                </Link>

                <Link
                    to="/certificates"
                    className="p-6 bg-white rounded-xl shadow"
                >
                    🏆 Certificates
                </Link>

                <Link
                    to="/exam-history"
                    className="p-6 bg-white rounded-xl shadow"
                >
                    📝 Exams
                </Link>

                <Link
                    to="/payments"
                    className="p-6 bg-white rounded-xl shadow"
                >
                    💳 Payments
                </Link>

            </div>

        </div>

    );

}