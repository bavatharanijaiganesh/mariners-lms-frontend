import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../services/categoryService";
import { createCourse } from "../../services/courseService";

export default function AddCourse() {

    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    const [formData, setFormData] = useState({
        category: "",
        course_name: "",
        fee: "",
        duration: "",
        description: "",
        pass_percentage: "",
        certificate_type: "",
        is_active: true,
        thumbnail: null,
    });

    useEffect(() => {

        fetchCategories();

    }, []);

    const fetchCategories = async () => {

        try {

            const response = await getCategories();

            setCategories(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const handleChange = (e) => {

        const { name, value, type, checked, files } = e.target;

        setFormData({

            ...formData,

            [name]:
                type === "checkbox"
                    ? checked
                    : type === "file"
                        ? files[0]
                        : value,

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const data = new FormData();

            Object.keys(formData).forEach((key) => {

                data.append(key, formData[key]);

            });

            const response = await createCourse(data);

            console.log(response.data);

            alert("Course Added Successfully");
            navigate("/admin/courses");

        } catch (error) {

            console.log(error.response?.data);

        }

    };

    return (

        <div className="max-w-3xl mx-auto p-6">

            <h1 className="text-3xl font-bold mb-6">

                Add Course

            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >

                {/* Course Name */}

                <div>

                    <label>Course Name</label>

                    <input

                        type="text"

                        name="course_name"

                        value={formData.course_name}

                        onChange={handleChange}

                        className="w-full border p-3 rounded"

                    />

                </div>

                {/* Category */}

                <div>

                    <label>Category</label>

                    <select

                        name="category"

                        value={formData.category}

                        onChange={handleChange}

                        className="w-full border p-3 rounded"

                    >

                        <option value="">

                            Select Category

                        </option>

                        {categories.map((category) => (

                            <option
                                key={category.id}
                                value={category.id}
                            >

                                {category.name}

                            </option>

                        ))}

                    </select>

                </div>

                {/* Fee */}

                <div>

                    <label>Fee (USD)</label>

                    <input

                        type="number"

                        name="fee"

                        value={formData.fee}

                        onChange={handleChange}

                        className="w-full border p-3 rounded"

                    />

                </div>

                {/* Duration */}

                <div>

                    <label>Estimated Duration</label>

                    <input

                        type="text"

                        name="duration"

                        value={formData.duration}

                        onChange={handleChange}

                        className="w-full border p-3 rounded"

                    />

                </div>

                {/* Description */}

                <div>

                    <label>Description</label>

                    <textarea

                        rows="5"

                        name="description"

                        value={formData.description}

                        onChange={handleChange}

                        className="w-full border p-3 rounded"

                    />

                </div>

                {/* Pass Percentage */}

                <div>

                    <label>Pass Percentage</label>

                    <input

                        type="number"

                        name="pass_percentage"

                        value={formData.pass_percentage}

                        onChange={handleChange}

                        className="w-full border p-3 rounded"

                    />

                </div>

                {/* Certificate */}

                <div>

                    {/* <label>Certificate Type</label>

                    <input

                        type="text"

                        name="certificate_type"

                        value={formData.certificate_type}

                        onChange={handleChange}

                        className="w-full border p-3 rounded"

                    /> */}
                    <select
                        name="certificate_type"
                        value={formData.certificate_type}
                        onChange={handleChange}
                        className="w-full border p-3 rounded"
                    >
                        <option value="">Select Certificate</option>

                        <option value="USCG">US Coast Guard</option>

                        <option value="FCC">FCC</option>

                        <option value="MARINERS">Mariners</option>

                        <option value="OTHER">Other</option>
                    </select>

                </div>

                {/* Thumbnail */}

                <div>

                    <label>Thumbnail</label>

                    <input

                        type="file"

                        name="thumbnail"

                        onChange={handleChange}

                        className="w-full"

                    />

                </div>

                {/* Status */}

                <div>

                    <label className="flex gap-2">

                        <input

                            type="checkbox"

                            name="is_active"

                            checked={formData.is_active}

                            onChange={handleChange}

                        />

                        Active

                    </label>

                </div>

                <button

                    type="submit"

                    className="bg-blue-600 text-white px-6 py-3 rounded"

                >

                    Save Course

                </button>

            </form>

        </div>

    );

}