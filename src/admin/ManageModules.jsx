import { useEffect, useState } from "react";
import { getModules, createModule } from "../services/moduleService";

export default function ManageModules() {

    const [courseId, setCourseId] = useState("1");

    const [modules, setModules] = useState([]);

    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");

    const [order, setOrder] = useState(1);

    const [loading, setLoading] = useState(false);


    // Get modules from Django
    const fetchModules = async () => {

        try {

            const response = await getModules(courseId);

            console.log("Modules:", response.data);

            setModules(response.data);

        } catch (error) {

            console.log("Error fetching modules:", error);

        }

    };


    useEffect(() => {

        fetchModules();

    }, [courseId]);


    // Create module
    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!title.trim()) {

            alert("Module title is required");

            return;

        }

        try {

            setLoading(true);

            const response = await createModule({

                course_id: courseId,

                title: title,

                description: description,

                order: Number(order),

            });

            console.log("Created module:", response.data);

            alert("Module created successfully");

            setTitle("");

            setDescription("");

            setOrder(order + 1);

            fetchModules();

        } catch (error) {

            console.log("Create module error:", error);

            alert("Failed to create module");

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="max-w-5xl mx-auto p-8">

            <h1 className="text-3xl font-bold mb-8">
                Manage Course Modules
            </h1>


            {/* Course ID */}

            <div className="bg-white shadow rounded-xl p-6 mb-8">

                <label className="block font-semibold mb-2">
                    Course
                </label>

                <select
                    value={courseId}
                    onChange={(e) => setCourseId(e.target.value)}
                    className="border rounded p-3 w-full"
                >

                    <option value="1">
                        OUPV/Six-Pack Captain's License
                    </option>

                    <option value="2">
                        25/50 or 100-Ton Master Captain's License
                    </option>

                    <option value="3">
                        Auxiliary Sailing Endorsement
                    </option>

                    <option value="4">
                        Mariners Skipper
                    </option>

                </select>

            </div>


            {/* Create Module */}

            <form
                onSubmit={handleSubmit}
                className="bg-white shadow rounded-xl p-6 mb-8"
            >

                <h2 className="text-xl font-bold mb-5">
                    Add Module
                </h2>


                <input
                    type="text"
                    placeholder="Module title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border rounded p-3 w-full mb-4"
                />


                <textarea
                    placeholder="Module description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border rounded p-3 w-full mb-4"
                    rows="4"
                />


                <input
                    type="number"
                    min="1"
                    value={order}
                    onChange={(e) => setOrder(e.target.value)}
                    className="border rounded p-3 w-full mb-4"
                />


                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-6 py-3 rounded"
                >

                    {loading ? "Creating..." : "Add Module"}

                </button>

            </form>


            {/* Existing Modules */}

            <div className="bg-white shadow rounded-xl p-6">

                <h2 className="text-xl font-bold mb-5">
                    Existing Modules
                </h2>


                {modules.length === 0 ? (

                    <p className="text-gray-500">
                        No modules created yet.
                    </p>

                ) : (

                    <div className="space-y-4">

                        {modules.map((module) => (

                            <div
                                key={module.id}
                                className="border rounded-lg p-4"
                            >

                                <div className="flex justify-between">

                                    <h3 className="font-bold">
                                        {module.order}. {module.title}
                                    </h3>

                                    <span className="text-gray-500">
                                        {module.course_id}
                                    </span>

                                </div>

                                <p className="text-gray-600 mt-2">
                                    {module.description}
                                </p>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>

    );
}