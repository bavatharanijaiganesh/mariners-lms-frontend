import api from "./api";

// Get Logged-in Student Enrollments
export const getEnrollments = () => {
    return api.get("lms/enrollments/");
};

// Get One Enrollment
export const getEnrollment = (id) => {
    return api.get(`lms/enrollments/${id}/`);
};

// Create Enrollment
export const enrollCourse = (data) => {
    return api.post("lms/enrollments/", data);
};

// Update Enrollment
export const updateEnrollment = (id, data) => {
    return api.put(`lms/enrollments/${id}/`, data);
};

// Delete Enrollment
export const deleteEnrollment = (id) => {
    return api.delete(`lms/enrollments/${id}/`);
};

// export const getMyEnrollments = () => {

//     return api.get("/lms/enrollments/");

// };

export const getMyCourses = () => {

    return api.get("lms/my-courses/");

};