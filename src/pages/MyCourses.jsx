import { useEffect, useState } from "react";
import { getMyCourses } from "../services/enrollmentService";
import { useNavigate } from "react-router-dom";
export default function MyCourses() {

    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {

        fetchCourses();

    }, []);

    const fetchCourses = async () => {

        try {

            const response = await getMyCourses();

            setCourses(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const startLearning = (course) => {

    console.log("Selected course:", course);
    console.log("Course ID:", course.course_id);

    navigate(`/student/course/${course.course_id}`);
};

    return (

        <div className="max-w-7xl mx-auto p-8">

            <h1 className="text-4xl font-bold mb-8">

                My Courses

            </h1>

            {
                courses.length === 0 ?

                    <div className="bg-white rounded-xl shadow p-6">

                        You haven't purchased any courses yet.

                    </div>

                    :

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {
                            courses.map((course) => (

                                <div
                                    key={course.id}
                                    className="bg-white rounded-xl shadow p-6"
                                >

                                    <h2 className="text-xl font-bold">

                                        {course.course_name}

                                    </h2>

                                    <p className="mt-2">

                                        Category : {course.category}

                                    </p>

                                    <p>

                                        Duration : {course.duration}

                                    </p>

                                    <p>

                                        Amount : ${course.fee}

                                    </p>

                        <button
    onClick={() => startLearning(course)}
    className="mt-4 bg-blue-600 text-white px-5 py-2 rounded"
>
    Start Learning
</button>

                                </div>

                            ))
                        }

                    </div>
            }

        </div>

    );

}