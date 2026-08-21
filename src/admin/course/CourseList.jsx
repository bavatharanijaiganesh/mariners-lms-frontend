import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Edit, Trash2 } from "lucide-react";
import AdminLayout from "../../layouts/AdminLayout";
// import AddCourse from "./AddCourse";
import { getCourses, deleteCourse } from "../../services/courseService";

export default function CourseList() {

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {

        try {

            const response = await getCourses();

            console.log(response.data);

            setCourses(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this course?"
        );

        if (!confirmDelete) return;

        try {

            await deleteCourse(id);

            fetchCourses();

            alert("Course Deleted Successfully");

        } catch (error) {

            console.log(error);

        }

    };

    return (
        <AdminLayout>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Courses</h2>
                    <p className="text-gray-500 text-sm mt-1">Manage your course catalog.</p>
                </div>
                <Link
                    to="/admin/courses/add"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors flex items-center gap-2"
                >
                    <Plus className="h-5 w-5" />
                    Add Course
                </Link>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                            <th className="p-4 font-semibold text-gray-600">Image</th>
                            <th className="p-4 font-semibold text-gray-600">Course</th>
                            <th className="p-4 font-semibold text-gray-600">Category</th>
                            <th className="p-4 font-semibold text-gray-600">Fee</th>
                            <th className="p-4 font-semibold text-gray-600">Duration</th>
                            <th className="p-4 font-semibold text-gray-600">Status</th>
                            <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course) => (
                            <tr key={course.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                <td className="p-4">
                                    {course.thumbnail ? (
                                        <img src={course.thumbnail} alt={course.course_name} className="w-16 h-12 rounded-lg object-cover shadow-sm" />
                                    ) : (
                                        <div className="w-16 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-400">No Img</div>
                                    )}
                                </td>
                                <td className="p-4 font-medium text-gray-900">{course.course_name}</td>
                                <td className="p-4 text-gray-500">{course.category_name}</td>
                                <td className="p-4 font-medium text-green-600">${course.fee}</td>
                                <td className="p-4 text-gray-500">{course.duration}</td>
                                <td className="p-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${course.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                                        {course.is_active ? "Active" : "Inactive"}
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        {/* <Link to={`/admin/edit-course/${course.id}`} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                                            <Edit className="h-5 w-5" />
                                        </Link> */}
                                        <Link
                                            to={`/admin/courses/edit/${course.id}`}
                                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                                            <Edit className="h-5 w-4" />
                                        </Link>
                                        <button onClick={() => handleDelete(course.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                                            <Trash2 className="h-5 w-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {courses.length === 0 && (
                            <tr>
                                <td colSpan="7" className="p-8 text-center text-gray-500">No courses found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
                {courses.map((course) => (
                    <div key={course.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4">
                        <div className="flex gap-4">
                            {course.thumbnail ? (
                                <img src={course.thumbnail} alt={course.course_name} className="w-20 h-20 object-cover rounded-xl shadow-sm" />
                            ) : (
                                <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center text-xs text-gray-400">No Img</div>
                            )}
                            <div className="flex-1">
                                <h3 className="font-bold text-gray-900 line-clamp-2">{course.course_name}</h3>
                                <p className="text-xs text-gray-500 mt-1">{course.category_name}</p>
                                <div className="flex items-center gap-3 mt-2">
                                    <span className="font-bold text-green-600">${course.fee}</span>
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${course.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                                        {course.is_active ? "Active" : "Inactive"}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="text-xs text-gray-500 bg-gray-50 rounded-lg p-2 flex justify-between">
                            <span>Duration:</span>
                            <span className="font-medium text-gray-700">{course.duration}</span>
                        </div>
                        <div className="flex justify-end gap-2 pt-3 border-t border-gray-50">
                            <Link to={`/admin/edit-course/${course.id}`} className="flex-1 flex justify-center items-center gap-2 py-2 text-blue-600 bg-blue-50 rounded-lg font-medium text-sm transition-colors">
                                <Edit className="h-4 w-4" /> Edit
                            </Link>
                            <button onClick={() => handleDelete(course.id)} className="flex-1 flex justify-center items-center gap-2 py-2 text-red-600 bg-red-50 rounded-lg font-medium text-sm transition-colors">
                                <Trash2 className="h-4 w-4" /> Delete
                            </button>
                        </div>
                    </div>
                ))}
                {courses.length === 0 && (
                    <div className="bg-white p-8 rounded-2xl border border-gray-100 text-center text-gray-500">
                        No courses found.
                    </div>
                )}
            </div>
        </AdminLayout>
    );

}