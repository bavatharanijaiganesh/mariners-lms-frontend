import { Navigate } from "react-router-dom";

export default function RoleProtectedRoute({

    children,

    role

}) {

    const token = localStorage.getItem("access");

    const user = JSON.parse(localStorage.getItem("user"));

    if (!token) {

        return <Navigate to="/login" replace />;

    }

    if (user.role !== role) {

        return <Navigate to="/" replace />;

    }

    return children;

}