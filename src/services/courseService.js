import api from "./api";

// =======================
// Category APIs
// =======================

// Get all categories
export const getCategories = () => {
    return api.get("courses/categories/");
};

// Get one category
export const getCategory = (id) => {
    return api.get(`courses/categories/${id}/`);
};

// Create category
export const createCategory = (data) => {
    return api.post("courses/categories/", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

// Update category
export const updateCategory = (id, data) => {
    return api.put(`courses/categories/${id}/`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

// Delete category
export const deleteCategory = (id) => {
    return api.delete(`courses/categories/${id}/`);
};

// =======================
// Course APIs
// =======================

// Get all courses
export const getCourses = () => {
    return api.get("courses/");
};

// Get one course
export const getCourse = (id) => {
    return api.get(`courses/${id}/`);
};

// Create course
export const createCourse = (data) => {
    return api.post("courses/", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

// Update course
export const updateCourse = (id, data) => {
    return api.put(`courses/${id}/`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

// Delete course
export const deleteCourse = (id) => {
    return api.delete(`courses/${id}/`);
};