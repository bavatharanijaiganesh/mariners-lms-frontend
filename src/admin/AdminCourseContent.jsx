import { useEffect, useState } from "react";
import { getModules, createModule } from "../services/moduleService";
import { getLessons, createLesson } from "../services/lessonService";

export default function AdminCourseContent() {

    const courseId = "c1";

    const [modules, setModules] = useState([]);
    const [selectedModule, setSelectedModule] = useState(null);
    const [lessons, setLessons] = useState([]);

    const [moduleTitle, setModuleTitle] = useState("");
    const [moduleDescription, setModuleDescription] = useState("");

    const [lessonTitle, setLessonTitle] = useState("");
    const [lessonDescription, setLessonDescription] = useState("");
    const [lessonContent, setLessonContent] = useState("");
    const [contentType, setContentType] = useState("VIDEO");
    const [mediaUrl, setMediaUrl] = useState("");
    const [duration, setDuration] = useState("");
    const [isPreview, setIsPreview] = useState(false);

    useEffect(() => {
        loadModules();
    }, []);

    const loadModules = async () => {

        try {

            const response = await getModules(courseId);

            setModules(response.data);

        } catch (error) {

            console.error("Error loading modules:", error);

        }

    };

    const handleCreateModule = async (e) => {

        e.preventDefault();

        try {

            await createModule({
                course_id: courseId,
                title: moduleTitle,
                description: moduleDescription,
                order: modules.length + 1
            });

            setModuleTitle("");
            setModuleDescription("");

            loadModules();

        } catch (error) {

            console.error("Error creating module:", error);

        }

    };

    const handleSelectModule = async (module) => {

        setSelectedModule(module);

        try {

            const response = await getLessons(module.id);

            setLessons(response.data);

        } catch (error) {

            console.error("Error loading lessons:", error);

        }

    };

    const handleCreateLesson = async (e) => {

        e.preventDefault();

        if (!selectedModule) {
            alert("Please select a module first.");
            return;
        }

        try {

            await createLesson({

                module: selectedModule.id,

                title: lessonTitle,

                description: lessonDescription,

                content: lessonContent,

                content_type: contentType,

                media_url: mediaUrl || null,

                duration: duration,

                order: lessons.length + 1,

                is_preview: isPreview,

                is_active: true

            });

            setLessonTitle("");
            setLessonDescription("");
            setLessonContent("");
            setContentType("VIDEO");
            setMediaUrl("");
            setDuration("");
            setIsPreview(false);

            handleSelectModule(selectedModule);

        } catch (error) {

            console.error("Error creating lesson:", error);

        }

    };

    return (

        <div className="max-w-7xl mx-auto p-8">

            <h1 className="text-3xl font-bold mb-8">
                Course Content
            </h1>

            {/* COURSE */}

            <div className="bg-white shadow rounded-xl p-6 mb-8">

                <h2 className="text-xl font-bold">
                    Course ID: {courseId}
                </h2>

            </div>


            {/* MODULE SECTION */}

            <div className="grid md:grid-cols-2 gap-8">

                <div className="bg-white shadow rounded-xl p-6">

                    <h2 className="text-xl font-bold mb-4">
                        Modules
                    </h2>

                    <form onSubmit={handleCreateModule}>

                        <input
                            type="text"
                            placeholder="Module title"
                            value={moduleTitle}
                            onChange={(e) =>
                                setModuleTitle(e.target.value)
                            }
                            className="border p-3 rounded w-full mb-3"
                            required
                        />

                        <textarea
                            placeholder="Module description"
                            value={moduleDescription}
                            onChange={(e) =>
                                setModuleDescription(e.target.value)
                            }
                            className="border p-3 rounded w-full mb-3"
                        />

                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-5 py-2 rounded"
                        >
                            Add Module
                        </button>

                    </form>

                    <div className="mt-6 space-y-3">

                        {modules.map((module) => (

                            <button
                                key={module.id}
                                onClick={() =>
                                    handleSelectModule(module)
                                }
                                className={`block w-full text-left p-4 rounded border ${selectedModule?.id === module.id
                                        ? "bg-blue-100 border-blue-500"
                                        : "bg-gray-50"
                                    }`}
                            >

                                <div className="font-semibold">
                                    {module.title}
                                </div>

                                <div className="text-sm text-gray-500">
                                    Module {module.order}
                                </div>

                            </button>

                        ))}

                    </div>

                </div>


                {/* LESSON SECTION */}

                <div className="bg-white shadow rounded-xl p-6">

                    <h2 className="text-xl font-bold mb-4">
                        Lessons
                    </h2>

                    {!selectedModule ? (

                        <p className="text-gray-500">
                            Select a module to manage lessons.
                        </p>

                    ) : (

                        <>

                            <h3 className="font-semibold mb-4">
                                {selectedModule.title}
                            </h3>

                            <form onSubmit={handleCreateLesson}>

                                <input
                                    type="text"
                                    placeholder="Lesson title"
                                    value={lessonTitle}
                                    onChange={(e) =>
                                        setLessonTitle(e.target.value)
                                    }
                                    className="border p-3 rounded w-full mb-3"
                                    required
                                />

                                <textarea
                                    placeholder="Lesson description"
                                    value={lessonDescription}
                                    onChange={(e) =>
                                        setLessonDescription(e.target.value)
                                    }
                                    className="border p-3 rounded w-full mb-3"
                                />

                                <select
                                    value={contentType}
                                    onChange={(e) =>
                                        setContentType(e.target.value)
                                    }
                                    className="border p-3 rounded w-full mb-3"
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


                                {contentType !== "TEXT" && (

                                    <input
                                        type="url"
                                        placeholder="Video / Audio URL"
                                        value={mediaUrl}
                                        onChange={(e) =>
                                            setMediaUrl(e.target.value)
                                        }
                                        className="border p-3 rounded w-full mb-3"
                                    />

                                )}


                                <textarea
                                    placeholder="Lesson content"
                                    value={lessonContent}
                                    onChange={(e) =>
                                        setLessonContent(e.target.value)
                                    }
                                    className="border p-3 rounded w-full mb-3"
                                />


                                <input
                                    type="text"
                                    placeholder="Duration e.g. 30 minutes"
                                    value={duration}
                                    onChange={(e) =>
                                        setDuration(e.target.value)
                                    }
                                    className="border p-3 rounded w-full mb-3"
                                />


                                <label className="flex gap-2 mb-4">

                                    <input
                                        type="checkbox"
                                        checked={isPreview}
                                        onChange={(e) =>
                                            setIsPreview(e.target.checked)
                                        }
                                    />

                                    Preview lesson

                                </label>


                                <button
                                    type="submit"
                                    className="bg-green-600 text-white px-5 py-2 rounded"
                                >
                                    Add Lesson
                                </button>

                            </form>


                            <div className="mt-6">

                                {lessons.map((lesson) => (

                                    <div
                                        key={lesson.id}
                                        className="border rounded p-4 mb-3"
                                    >

                                        <div className="font-semibold">
                                            {lesson.title}
                                        </div>

                                        <div className="text-sm text-gray-500">
                                            {lesson.content_type}
                                        </div>

                                    </div>

                                ))}

                            </div>

                        </>

                    )}

                </div>

            </div>

        </div>

    );
}