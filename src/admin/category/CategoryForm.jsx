import { useState } from "react";
import { createCategory } from "../../services/categoryService";
import { updateCategory } from "../../services/categoryService";

export default function CategoryForm({ onClose, loadCategories, category, }) {

   const [formData, setFormData] = useState({
    name: category?.name || "",
    description: category?.description || "",
    image: null,
    is_active: category?.is_active ?? true,
});

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

    // const handleSubmit = async (e) => {

    //     e.preventDefault();

    //     try {

    //         const data = new FormData();

    //         data.append("name", formData.name);
    //         data.append("description", formData.description);
    //         data.append("is_active", formData.is_active);

    //         if (formData.image) {
    //             data.append("image", formData.image);
    //         }

    //         await createCategory(data);

    //         alert("Category Added Successfully");

    //         loadCategories();

    //         onClose();

    //     } catch (error) {

    //         console.log(error.response?.data);

    //         alert("Unable to create category.");

    //     }

    // };

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const data = new FormData();
        data.append("name", formData.name);
        data.append("description", formData.description);
        data.append("is_active", formData.is_active);
        if (formData.image) {
            data.append("image", formData.image);
        }
        if (category) {
            await updateCategory(category.id, data);
            alert("Category Updated");
        } else {
            await createCategory(data);
            alert("Category Added");
        }
        loadCategories();
        onClose();
    } catch (error) {
        console.log(error.response?.data);
    }
};

    return (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white rounded-lg p-6 w-[500px]">

               <h2 className="text-2xl font-bold mb-5">

    {category ? "Edit Category" : "Add Category"}

</h2>

                <form onSubmit={handleSubmit}>

                    <div className="mb-4">

                        <label>Name</label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            required
                        />

                    </div>

                    <div className="mb-4">

                        <label>Description</label>

                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />

                    </div>

                    <div className="mb-4">

                        <label>Category Image</label>

                        <input
                            type="file"
                            name="image"
                            onChange={handleChange}
                            className="w-full"
                        />

                    </div>

                    <div className="mb-5">

                        <label className="flex items-center gap-2">

                            <input
                                type="checkbox"
                                name="is_active"
                                checked={formData.is_active}
                                onChange={handleChange}
                            />

                            Active

                        </label>

                    </div>

                    <div className="flex justify-end gap-3">

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2 border rounded"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-5 py-2 bg-blue-600 text-white rounded"
                        >
                            {category ? "Update" : "Save"}
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}