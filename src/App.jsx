import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from "./pages/Profile";
import StudentDashboard from "./pages/StudentDashboard";
// import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleProtectedRoute from "./components/RoleProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
// import CourseList from "./admin/course/CourseList"
import AddCourse from "./admin/course/AddCourse"
import EditCourse from "./admin/course/EditCourse"
import CourseList from "./admin/course/CourseList"
import Checkout from "./pages/Checkout";
import MyCourses from "./pages/MyCourses";
import ManageModules from "./admin/ManageModules.jsx";
import ManageLessons from "./admin/ManageLessons.jsx";
import AdminCourseContent from "./admin/AdminCourseContent.jsx";

import StudentCourse from "./pages/StudentCourse";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="courses" element={<Courses />} />
          <Route path="courses/:courseId" element={<CourseDetail />} />
          <Route path="about" element={<About />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="contact" element={<Contact />} />
          <Route path="/profile" element={<ProtectedRoute> <Profile /> </ProtectedRoute>} />
          <Route path="/student/dashboard" element={<RoleProtectedRoute role="STUDENT"> <StudentDashboard /> </RoleProtectedRoute>} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/my-courses" element={<MyCourses />} />
          <Route path="/my-courses/:courseId" element={<StudentCourse />} />
          <Route path="/student/course/:courseId" element={<StudentCourse />}/>
          {/* <Route path="/admin/dashboard" element={<RoleProtectedRoute role="ADMIN"> <AdminDashboard />   </RoleProtectedRoute>} /> */}


        </Route>
        {/* Auth routes outside of MainLayout so they don't have Navbar/Footer */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/dashboard" element={<RoleProtectedRoute role="ADMIN"><Dashboard /> </RoleProtectedRoute>} />
        <Route path="/admin/categories" element={<Categories />} />
        <Route path="/admin/courses" element={<CourseList />} />
        <Route path="/admin/courses/add" element={<AddCourse />} />
        <Route path="/admin/courses/edit/:id" element={<EditCourse />} />
        <Route path="/admin/modules" element={<ManageModules />} />
        <Route path="/admin/lessons" element={<ManageLessons />} />
        <Route path="/admin/course-content" element={<AdminCourseContent />} />

      </Routes>
    </Router>
  );
}

export default App;
