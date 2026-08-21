import api from "./api";

// Get All Categories
export const getCategories = () => {
    return api.get("categories/");
    // return api.get("courses/categories/");
};

// Create Category
export const createCategory = (data) => {
    return api.post("categories/", data);
};

// Get Single Category
export const getCategory = (id) => {
    return api.get(`categories/${id}/`);
};

// Update Category
export const updateCategory = (id, data) => {
    return api.put(`categories/${id}/`, data);
};

// Delete Category
export const deleteCategory = (id) => {
    return api.delete(`categories/${id}/`);
};