import { useEffect, useState } from "react";
import { getMyCourses } from "../services/enrollmentService";

export default function MyCourses() {

    const [courses, setCourses] = useState([]);

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