import { useEffect, useState } from "react";
import { getModules } from "../services/moduleService";
import {
    getLessons,
    createLesson
} from "../services/lessonService";

export default function ManageLessons() {

    const [courseId, setCourseId] = useState("c1");

    const [modules, setModules] = useState([]);

    const [moduleId, setModuleId] = useState("");

    const [lessons, setLessons] = useState([]);

    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");

    const [content, setContent] = useState("");

    const [contentType, setContentType] = useState("VIDEO");

    const [mediaUrl, setMediaUrl] = useState("");

    const [mediaFile, setMediaFile] = useState(null);

    const [duration, setDuration] = useState("");

    const [order, setOrder] = useState(1);

    const [isPreview, setIsPreview] = useState(false);

    const [loading, setLoading] = useState(false);


    // Get modules for selected course
    useEffect(() => {

        const fetchModules = async () => {

            try {

                const response = await getModules(courseId);

                setModules(response.data);

                if (response.data.length > 0) {

                    setModuleId(response.data[0].id);

                } else {

                    setModuleId("");

                }

            } catch (error) {

                console.log("Module error:", error);

            }

        };

        fetchModules();

    }, [courseId]);


    useEffect(() => {
        fetchLessons();
    }, [moduleId]);


    // Get lessons for selected module
    // useEffect(() => {

    //     if (!moduleId) {

    //         setLessons([]);

    //         return;

    //     }

    //     const fetchLessons = async () => {

    //         try {

    //             const response = await getLessons(moduleId);

    //             console.log("Lessons:", response.data);

    //             setLessons(response.data);

    //         } catch (error) {

    //             console.log("Lesson error:", error);

    //         }

    //     };

    //     fetchLessons();

    // }, [moduleId]);


    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!moduleId) {
            alert("Please select a module");
            return;
        }

        if (!title.trim()) {
            alert("Lesson title is required");
            return;
        }

        try {

            setLoading(true);

            const formData = new FormData();

            formData.append("module", Number(moduleId));
            formData.append("title", title);
            formData.append("description", description);
            formData.append("content", content);
            formData.append("content_type", contentType);
            formData.append("duration", duration);
            formData.append("order", Number(order));
            formData.append("is_preview", isPreview);

            // Add file
            if (mediaFile) {
                formData.append("resource_file", mediaFile);
            }

            const response = await createLesson(formData);

            console.log("Created lesson:", response.data);

            alert("Lesson created successfully");

            setTitle("");
            setDescription("");
            setContent("");
            setMediaFile(null);
            setDuration("");
            setIsPreview(false);
            setOrder(order + 1);

            setLessons((previous) => [
                ...previous,
                response.data
            ]);

        } catch (error) {

            console.log("Create lesson error:", error);
            console.log("Backend response:", error.response?.data);

            alert("Failed to create lesson");

        } finally {

            setLoading(false);

        }
    };

    const fetchLessons = async () => {

        if (!moduleId) {
            setLessons([]);
            return;
        }

        try {

            const response = await getLessons(moduleId);

            setLessons(response.data);

        } catch (error) {

            console.error("Failed to fetch lessons:", error);

        }

    };

    return (
        <div className="max-w-6xl mx-auto p-8">

            <h1 className="text-3xl font-bold mb-8">
                Manage Lessons
            </h1>

            {/* Course */}
            <div className="bg-white shadow rounded-xl p-6 mb-6">

                <label className="block font-semibold mb-2">
                    Course
                </label>

                <select
                    value={courseId}
                    onChange={(e) => setCourseId(e.target.value)}
                    className="border rounded p-3 w-full"
                >
                    <option value="c1">
                        OUPV/Six-Pack Captain's License
                    </option>

                    <option value="c2">
                        25/50 or 100-Ton Master Captain's License
                    </option>

                    <option value="e2">
                        Auxiliary Sailing Endorsement
                    </option>

                    <option value="rb2">
                        Mariners Skipper
                    </option>
                </select>

            </div>


            {/* Module */}
            <div className="bg-white shadow rounded-xl p-6 mb-6">

                <label className="block font-semibold mb-2">
                    Module
                </label>

                <select
                    value={moduleId}
                    onChange={(e) => setModuleId(e.target.value)}
                    className="border rounded p-3 w-full"
                >

                    <option value="">
                        Select Module
                    </option>

                    {modules.map((module) => (
                        <option
                            key={module.id}
                            value={module.id}
                        >
                            {module.order}. {module.title}
                        </option>
                    ))}

                </select>

            </div>


            {/* ========================= */}
            {/* LESSON FORM START */}
            {/* ========================= */}

            <form
                onSubmit={handleSubmit}
                className="bg-white shadow rounded-xl p-6 mb-8"
            >

                <h2 className="text-xl font-bold mb-5">
                    Add Lesson
                </h2>


                {/* Lesson title */}

                <input
                    type="text"
                    placeholder="Lesson title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border rounded p-3 w-full mb-4"
                />


                {/* Description */}

                <textarea
                    placeholder="Lesson description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border rounded p-3 w-full mb-4"
                />


                {/* Content */}

                <textarea
                    placeholder="Lesson content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="border rounded p-3 w-full mb-4"
                />


                {/* Content type */}

                <select
                    value={contentType}
                    onChange={(e) => setContentType(e.target.value)}
                    className="border rounded p-3 w-full mb-4"
                >

                    <option value="VIDEO">
                        Video
                    </option>

                    <option value="SCREEN">
                        Screen Recording
                    </option>

                    <option value="AUDIO">
                        Audio
                    </option>

                    <option value="TEXT">
                        Text
                    </option>

                </select>


                {/* Media URL */}

                {/* Media File */}

                {contentType !== "TEXT" && (
                    <div className="mb-4">

                        <label className="block font-semibold mb-2">

                            {contentType === "VIDEO" && "Upload Video"}

                            {contentType === "SCREEN" && "Upload Screen Recording"}

                            {contentType === "AUDIO" && "Upload Audio"}

                        </label>

                        <input
                            type="file"
                            accept={
                                contentType === "AUDIO"
                                    ? "audio/*"
                                    : "video/*"
                            }
                            onChange={(e) => setMediaFile(e.target.files[0])}
                            className="border rounded p-3 w-full"
                        />

                        {mediaFile && (
                            <p className="text-sm text-gray-600 mt-2">
                                Selected: {mediaFile.name}
                            </p>
                        )}

                    </div>
                )}
                {/* Duration */}

                <input
                    type="text"
                    placeholder="Duration e.g. 5 min"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="border rounded p-3 w-full mb-4"
                />


                {/* Order */}

                <input
                    type="number"
                    value={order}
                    onChange={(e) => setOrder(Number(e.target.value))}
                    className="border rounded p-3 w-full mb-4"
                />


                {/* Preview */}

                <label className="flex items-center gap-2 mb-5">

                    <input
                        type="checkbox"
                        checked={isPreview}
                        onChange={(e) => setIsPreview(e.target.checked)}
                    />

                    Allow preview

                </label>


                {/* BUTTON MUST BE INSIDE FORM */}

                <button
                    type="submit"
                    disabled={loading || !moduleId}
                    className="bg-blue-600 text-white px-6 py-3 rounded"
                >
                    {loading ? "Creating..." : "Add Lesson"}
                </button>

            </form>

            {/* ========================= */}
            {/* LESSON FORM END */}
            {/* ========================= */}

            <div className="bg-white shadow rounded-xl p-6">

                <h2 className="text-xl font-bold mb-5">
                    Lessons
                </h2>

                {lessons.length === 0 ? (

                    <p className="text-gray-500">
                        No lessons created yet.
                    </p>

                ) : (

                    <div className="space-y-4">

                        {lessons.map((lesson) => (

                            <div
                                key={lesson.id}
                                className="border rounded-lg p-4"
                            >

                                <div className="flex justify-between items-start">

                                    <div>

                                        <h3 className="text-lg font-semibold">
                                            {lesson.order}. {lesson.title}
                                        </h3>

                                        <p className="text-gray-600">
                                            {lesson.description}
                                        </p>

                                    </div>

                                    <span className="text-sm bg-gray-100 px-3 py-1 rounded">
                                        {lesson.content_type}
                                    </span>

                                </div>


                                <div className="mt-3 text-sm text-gray-600">

                                    <p>
                                        Duration: {lesson.duration || "Not specified"}
                                    </p>

                                    <p>
                                        Preview: {lesson.is_preview ? "Yes" : "No"}
                                    </p>

                                </div>


                                {lesson.resource_file && (

                                    <a
                                        href={lesson.resource_file}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-block mt-3 text-blue-600 hover:underline"
                                    >
                                        Open Resource
                                    </a>

                                )}

                            </div>

                        ))}

                    </div>

                )}

            </div>


        </div>
    );
}