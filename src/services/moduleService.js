import api from "./api";

// Get modules for a particular course
export const getModules = (courseId) => {
    return api.get(`courses/modules/?course_id=${courseId}`);
};

// Create a new module
export const createModule = (data) => {
    return api.post("courses/modules/", data);
};

// Update a module
export const updateModule = (id, data) => {
    return api.put(`courses/modules/${id}/`, data);
};

// Delete a module
export const deleteModule = (id) => {
    return api.delete(`courses/modules/${id}/`);
};