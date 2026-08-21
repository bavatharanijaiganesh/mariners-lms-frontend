import api from "./api";

export const getCourseContent = (courseId) => {
    return api.get(`lms/student/course/${courseId}/content/`);
};