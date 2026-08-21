import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStudentCourseLessons } from "../services/studentLessonService";

export default function StudentCourse() {

    const { courseId } = useParams();

    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const loadCourseLessons = async () => {

            try {

                setLoading(true);

                const response = await getStudentCourseLessons(courseId);

                console.log("Student course lessons:", response.data);

                setModules(response.data);

            } catch (error) {

                console.log("Course lessons error:", error);

                if (error.response?.status === 403) {

                    setError(
                        "You have not purchased this course."
                    );

                } else {

                    setError(
                        "Unable to load course lessons."
                    );

                }

            } finally {

                setLoading(false);

            }
        };

        loadCourseLessons();

    }, [courseId]);


    if (loading) {
        return <p className="p-8">Loading course...</p>;
    }


    if (error) {

        return (
            <div className="p-8">

                <h2 className="text-2xl font-bold text-red-600">
                    Access Denied
                </h2>

                <p className="mt-2">
                    {error}
                </p>

            </div>
        );

    }


    return (

        <div className="max-w-6xl mx-auto p-8">

            <h1 className="text-3xl font-bold mb-8">
                My Course
            </h1>

            {modules.map((module) => (

                <div
                    key={module.id}
                    className="bg-white shadow rounded-xl p-6 mb-6"
                >

                    <h2 className="text-xl font-bold">
                        {module.order}. {module.title}
                    </h2>

                    <p className="text-gray-600 mt-2 mb-5">
                        {module.description}
                    </p>


                    <div className="space-y-3">

                        {module.lessons.map((lesson) => (

                            <div
                                key={lesson.id}
                                className="border rounded-lg p-4"
                            >

                                <h3 className="font-semibold">
                                    {lesson.order}. {lesson.title}
                                </h3>

                                <p className="text-sm text-gray-600">
                                    {lesson.description}
                                </p>

                                <span className="text-sm text-blue-600">
                                    {lesson.content_type}
                                </span>

                            </div>

                        ))}

                    </div>

                </div>

            ))}

        </div>

    );
}