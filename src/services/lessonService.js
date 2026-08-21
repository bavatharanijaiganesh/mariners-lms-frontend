import api from "./api";

// Get all lessons
export const getLessons = (moduleId) => {
    return api.get(`courses/lessons/?module=${moduleId}`);
};

// Create lesson
export const createLesson = (data) => {
    return api.post("courses/lessons/", data);
};

// Update lesson
export const updateLesson = (id, data) => {
    return api.put(`courses/lessons/${id}/`, data);
};

// Delete lesson
export const deleteLesson = (id) => {
    return api.delete(`courses/lessons/${id}/`);
};