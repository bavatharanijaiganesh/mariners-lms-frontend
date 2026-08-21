import api from "./api";

export const getStudentCourseLessons = (courseId) => {
    return api.get(
        `lms/student/courses/${courseId}/lessons/`
    );
};