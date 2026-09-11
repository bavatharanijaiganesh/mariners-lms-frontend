import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getStudentCourseLessons } from "../services/studentLessonService";

export default function StudentCourse() {

    const { courseId } = useParams();
    const navigate = useNavigate();

    const [modules, setModules] = useState([]);
    const [selectedLesson, setSelectedLesson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchLessons();
    }, [courseId]);

    const fetchLessons = async () => {

        try {

            setLoading(true);
            setError("");

            console.log("Student Course ID:", courseId);

            const response = await getStudentCourseLessons(courseId);

            console.log("Student course lessons:", response.data);

            setModules(response.data);

        } catch (error) {

            console.log("Student course lessons error:", error);

            if (error.response?.status === 403) {
                setError("Please purchase this course to access the lessons.");
            } else if (error.response?.status === 404) {
                setError("Course lessons not found.");
            } else {
                setError("Failed to load course lessons.");
            }

        } finally {

            setLoading(false);

        }
    };

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto p-8">
                <h1 className="text-3xl font-bold">
                    Loading course...
                </h1>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-7xl mx-auto p-8">

                <div className="bg-red-100 text-red-700 p-6 rounded-xl">
                    {error}
                </div>

                <button
                    onClick={() => navigate("/my-courses")}
                    className="mt-4 bg-blue-600 text-white px-5 py-2 rounded"
                >
                    Back to My Courses
                </button>

            </div>
        );
    }

    return (

        <div className="max-w-7xl mx-auto p-8">

            <h1 className="text-4xl font-bold mb-8">
                My Course
            </h1>

            {modules.length === 0 ? (

                <div className="bg-white rounded-xl shadow p-6">
                    <h2 className="text-xl font-bold">
                        No lessons available
                    </h2>

                    <p className="mt-2 text-gray-600">
                        This course does not have any lessons yet.
                    </p>
                </div>

            ) : (

                <div className="grid md:grid-cols-3 gap-6">

                    {/* MODULES */}

                    <div className="md:col-span-1">

                        <div className="bg-white rounded-xl shadow p-5">

                            <h2 className="text-2xl font-bold mb-4">
                                Course Content
                            </h2>

                            {modules.map((module) => (

                                <div
                                    key={module.id}
                                    className="mb-4"
                                >

                                    <h3 className="font-bold text-lg mb-2">
                                        {module.order}. {module.title}
                                    </h3>

                                    {module.lessons?.map((lesson) => (

                                        <button
                                            key={lesson.id}
                                            onClick={() => setSelectedLesson(lesson)}
                                            className="block w-full text-left p-3 mb-2 bg-gray-100 hover:bg-blue-100 rounded"
                                        >
                                            {lesson.order}. {lesson.title}
                                        </button>

                                    ))}

                                </div>

                            ))}

                        </div>

                    </div>

                    {/* LESSON CONTENT */}

                    <div className="md:col-span-2">

                        <div className="bg-white rounded-xl shadow p-6">

                            {!selectedLesson ? (

                                <div>

                                    <h2 className="text-2xl font-bold">
                                        Select a lesson
                                    </h2>

                                    <p className="mt-2 text-gray-600">
                                        Select a lesson from the course content
                                        to start learning.
                                    </p>

                                </div>

                            ) : (

                                <div>

                                    <h2 className="text-3xl font-bold">
                                        {selectedLesson.title}
                                    </h2>

                                    {selectedLesson.description && (
                                        <p className="mt-3 text-gray-600">
                                            {selectedLesson.description}
                                        </p>
                                    )}

                                    {/* VIDEO */}
{selectedLesson.content_type === "VIDEO" &&
    (selectedLesson.media_file || selectedLesson.media_url) && (
        <div className="mt-6">
            <video
                controls
                className="w-full rounded-lg"
                src={selectedLesson.media_file || selectedLesson.media_url}
            >
                Your browser does not support video playback.
            </video>
        </div>
    )}

                                    {/* SCREEN RECORDING */}

                                    {selectedLesson.content_type === "SCREEN" &&
    (selectedLesson.media_file || selectedLesson.media_url) && (
        <div className="mt-6">
            <video
                controls
                className="w-full rounded-lg"
                src={selectedLesson.media_file || selectedLesson.media_url}
            >
                Your browser does not support video playback.
            </video>
        </div>
    )}

                                    {/* TEXT */}

                                    {selectedLesson.content_type === "TEXT" && (

                                        <div className="mt-6 whitespace-pre-line">
                                            {selectedLesson.content}
                                        </div>

                                    )}

                                    {/* AUDIO */}

                                    {selectedLesson.content_type === "AUDIO" &&
                                        selectedLesson.media_url && (

                                            <div className="mt-6">

                                                <audio
                                                    controls
                                                    className="w-full"
                                                    src={selectedLesson.media_url}
                                                />

                                            </div>
                                        )}

                                    {/* RESOURCE FILE */}

                                    {selectedLesson.resource_file && (

                                        <div className="mt-6">

                                            <a
                                                href={selectedLesson.resource_file}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="bg-green-600 text-white px-5 py-2 rounded inline-block"
                                            >
                                                Open Resource
                                            </a>

                                        </div>

                                    )}

                                </div>

                            )}

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}