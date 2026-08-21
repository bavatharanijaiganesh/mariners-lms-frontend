import { useEffect, useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import AdminLayout from "../layouts/AdminLayout";

import { getCategories } from "../services/categoryService";
import { deleteCategory } from "../services/categoryService";
import CategoryForm from "../admin/category/CategoryForm";

export default function Categories() {

    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);

    useEffect(() => {

        loadCategories();

    }, []);

    const loadCategories = async () => {

        try {

            const response = await getCategories();

            setCategories(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Delete this category?"
        );

        if (!confirmDelete) return;

        try {

            await deleteCategory(id);

            alert("Category Deleted");

            loadCategories();

        } catch (error) {

            console.log(error);

        }

    };

    return (
        <AdminLayout>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Categories</h2>
                    <p className="text-gray-500 text-sm mt-1">Manage your course categories.</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors flex items-center gap-2"
                >
                    <Plus className="h-5 w-5" />
                    Add Category
                </button>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                            <th className="p-4 font-semibold text-gray-600">ID</th>
                            <th className="p-4 font-semibold text-gray-600">Image</th>
                            <th className="p-4 font-semibold text-gray-600">Name</th>
                            <th className="p-4 font-semibold text-gray-600">Status</th>
                            <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category) => (
                            <tr key={category.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                <td className="p-4 text-gray-500">#{category.id}</td>
                                <td className="p-4">
                                    {category.image ? (
                                        <img src={category.image} alt={category.name} className="w-12 h-12 object-cover rounded-lg shadow-sm" />
                                    ) : (
                                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-400">No Img</div>
                                    )}
                                </td>
                                <td className="p-4 font-medium text-gray-900">{category.name}</td>
                                <td className="p-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${category.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                                        {category.is_active ? "Active" : "Inactive"}
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button onClick={() => { setEditingCategory(category); setShowModal(true); }} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                                            <Edit className="h-5 w-5" />
                                        </button>
                                        <button onClick={() => handleDelete(category.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {categories.length === 0 && (
                            <tr>
                                <td colSpan="5" className="p-8 text-center text-gray-500">No categories found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
                {categories.map((category) => (
                    <div key={category.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            {category.image ? (
                                <img src={category.image} alt={category.name} className="w-16 h-16 object-cover rounded-xl shadow-sm" />
                            ) : (
                                <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center text-xs text-gray-400">No Img</div>
                            )}
                            <div className="flex-1">
                                <h3 className="font-bold text-gray-900">{category.name}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs text-gray-400">#{category.id}</span>
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${category.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                                        {category.is_active ? "Active" : "Inactive"}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 pt-3 border-t border-gray-50">
                            <button onClick={() => { setEditingCategory(category); setShowModal(true); }} className="flex-1 flex justify-center items-center gap-2 py-2 text-blue-600 bg-blue-50 rounded-lg font-medium text-sm transition-colors">
                                <Edit className="h-4 w-4" /> Edit
                            </button>
                            <button onClick={() => handleDelete(category.id)} className="flex-1 flex justify-center items-center gap-2 py-2 text-red-600 bg-red-50 rounded-lg font-medium text-sm transition-colors">
                                <Trash2 className="h-4 w-4" /> Delete
                            </button>
                        </div>
                    </div>
                ))}
                {categories.length === 0 && (
                    <div className="bg-white p-8 rounded-2xl border border-gray-100 text-center text-gray-500">
                        No categories found.
                    </div>
                )}
            </div>

            {
                showModal && (
                    <CategoryForm
                        onClose={() => {
                            setShowModal(false);
                            setEditingCategory(null);
                        }}
                        loadCategories={loadCategories}
                        category={editingCategory}
                    />
                )
            }
        </AdminLayout>
    );

}