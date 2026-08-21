import AdminLayout from "../layouts/AdminLayout";
import { 
    Users, BookOpen, DollarSign, Layers, Plus, 
    Bell, CheckCircle, FileText, ArrowRight,
    GraduationCap, TrendingUp, AlertTriangle
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
    
    // Mock Data
    const stats = [
        { label: "Categories", value: "8", icon: Layers, color: "text-blue-600", bg: "bg-blue-50" },
        { label: "Courses", value: "52", icon: BookOpen, color: "text-indigo-600", bg: "bg-indigo-50" },
        { label: "Students", value: "1,250", icon: Users, color: "text-emerald-600", bg: "bg-emerald-50" },
        { label: "Revenue", value: "₹1,25,000", icon: DollarSign, color: "text-amber-600", bg: "bg-amber-50" },
    ];

    const courseStatus = [
        { label: "Published", count: 40, color: "bg-green-500" },
        { label: "Draft", count: 8, color: "bg-amber-500" },
        { label: "Archived", count: 4, color: "bg-gray-500" },
    ];

    const latestCourses = [
        { name: "React JS Complete Guide", category: "Web Development", price: "₹3,000", status: "Published" },
        { name: "Django for Beginners", category: "Python", price: "₹4,000", status: "Draft" },
        { name: "Advanced UI/UX", category: "Design", price: "₹2,500", status: "Published" },
        { name: "Mastering Docker", category: "DevOps", price: "₹3,500", status: "Published" },
        { name: "Python Data Science", category: "Data Science", price: "₹5,000", status: "Draft" },
    ];

    const latestStudents = [
        { name: "John Doe", email: "john@gmail.com", joined: "Today" },
        { name: "Ram Kumar", email: "ram@gmail.com", joined: "Yesterday" },
        { name: "Sarah Smith", email: "sarah@gmail.com", joined: "2 days ago" },
        { name: "Mike Johnson", email: "mike@gmail.com", joined: "3 days ago" },
    ];

    const recentPayments = [
        { student: "John Doe", course: "React JS", amount: "₹3,000", status: "Paid" },
        { student: "Ram Kumar", course: "Django", amount: "₹4,000", status: "Paid" },
        { student: "Sarah Smith", course: "Advanced UI/UX", amount: "₹2,500", status: "Pending" },
    ];

    const topSelling = [
        { name: "React JS Complete Guide", students: 250, max: 300, color: "bg-blue-500" },
        { name: "Python Data Science", students: 180, max: 300, color: "bg-indigo-500" },
        { name: "Mastering Java", students: 140, max: 300, color: "bg-emerald-500" },
    ];

    const revenueData = [
        { month: "Jan", height: "40%" },
        { month: "Feb", height: "70%" },
        { month: "Mar", height: "100%" },
        { month: "Apr", height: "50%" },
        { month: "May", height: "80%" },
        { month: "Jun", height: "65%" },
    ];

    const activities = [
        "John enrolled in React",
        "New category 'DevOps' added",
        "Python course updated",
        "Certificate generated for Ram",
        "Payment received from Sarah"
    ];

    const notifications = [
        { text: "4 courses have no thumbnail.", type: "warning" },
        { text: "2 pending payments.", type: "warning" },
        { text: "5 students haven't completed lessons.", type: "info" },
    ];

    return (
        <AdminLayout>
            <div className="space-y-6 pb-12">
                
                {/* Header Section */}
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative overflow-hidden">
                    <div className="relative z-10">
                        <h1 className="text-3xl font-bold mb-2">Hello, Admin 👋</h1>
                        <p className="text-slate-300">Here is what's happening with your academy today.</p>
                    </div>
                    <div className="relative z-10 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                        <Link to="/admin/courses/add" className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 px-4 py-2.5 rounded-xl font-medium transition-colors">
                            <Plus className="h-4 w-4" /> Add Course
                        </Link>
                        <Link to="/admin/students" className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 border border-slate-600 px-4 py-2.5 rounded-xl font-medium transition-colors">
                            <Users className="h-4 w-4" /> Students
                        </Link>
                    </div>
                    {/* Decorative background */}
                    <div className="absolute right-0 top-0 w-64 h-full bg-white opacity-5 transform skew-x-12 translate-x-20"></div>
                </div>

                {/* 1. Statistics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                    {stats.map((stat, idx) => {
                        const Icon = stat.icon;
                        return (
                            <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                                        <Icon className={`h-6 w-6 ${stat.color}`} />
                                    </div>
                                    <h3 className="font-bold text-gray-500">{stat.label}</h3>
                                </div>
                                <p className="text-3xl font-extrabold text-gray-900">{stat.value}</p>
                            </div>
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    {/* Main Content Column */}
                    <div className="xl:col-span-2 space-y-6">
                        
                        {/* 2. Course Overview & 6. Top Selling Courses */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            
                            {/* Course Status */}
                            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <BookOpen className="h-5 w-5 text-indigo-500" />
                                    Course Status
                                </h3>
                                <div className="space-y-4">
                                    {courseStatus.map((status, idx) => (
                                        <div key={idx} className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-3 h-3 rounded-full ${status.color}`}></div>
                                                <span className="font-medium text-gray-700">{status.label}</span>
                                            </div>
                                            <span className="font-bold text-gray-900">{status.count}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6 h-2 w-full bg-gray-100 rounded-full flex overflow-hidden">
                                    <div className="h-full bg-green-500 transition-all duration-1000" style={{ width: '75%' }}></div>
                                    <div className="h-full bg-amber-500 transition-all duration-1000" style={{ width: '15%' }}></div>
                                    <div className="h-full bg-gray-500 transition-all duration-1000" style={{ width: '10%' }}></div>
                                </div>
                            </div>

                            {/* Top Selling Courses */}
                            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <TrendingUp className="h-5 w-5 text-emerald-500" />
                                    Top Selling Courses
                                </h3>
                                <div className="space-y-5">
                                    {topSelling.map((course, idx) => (
                                        <div key={idx}>
                                            <div className="flex justify-between items-end mb-2">
                                                <span className="font-medium text-gray-900 truncate pr-2">{course.name}</span>
                                                <span className="text-sm font-bold text-gray-500 shrink-0">{course.students}</span>
                                            </div>
                                            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                                <div className={`h-full ${course.color} rounded-full transition-all duration-1000`} style={{ width: `${(course.students / course.max) * 100}%` }}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* 7. Monthly Revenue Chart (CSS Based) */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                    <DollarSign className="h-5 w-5 text-blue-500" />
                                    Monthly Revenue
                                </h3>
                                <select className="bg-gray-50 border border-gray-200 text-sm rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                                    <option>This Year</option>
                                    <option>Last Year</option>
                                </select>
                            </div>
                            <div className="h-64 flex items-end justify-between gap-2 px-2 sm:px-6">
                                {revenueData.map((data, idx) => (
                                    <div key={idx} className="flex flex-col items-center w-full group relative">
                                        {/* Tooltip */}
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-10 bg-slate-800 text-white text-xs font-bold py-1 px-2 rounded whitespace-nowrap z-10 pointer-events-none">
                                            ₹ {Math.floor(parseInt(data.height) * 1250)}
                                        </div>
                                        {/* Bar */}
                                        <div 
                                            className="w-full max-w-[40px] bg-blue-100 hover:bg-blue-600 rounded-t-lg transition-colors relative"
                                            style={{ height: data.height }}
                                        >
                                            <div className="absolute bottom-0 left-0 right-0 bg-blue-500 rounded-t-lg transition-all" style={{ height: '100%' }}></div>
                                        </div>
                                        <span className="mt-3 text-sm font-medium text-gray-500">{data.month}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 3. Latest Courses & 4. Latest Students */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            
                            {/* Latest Courses */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                                <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                                    <h3 className="font-bold text-gray-900">Latest Courses</h3>
                                    <Link to="/admin/courses" className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1">
                                        View All <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm">
                                        <thead className="bg-gray-50 text-gray-500 border-b border-gray-100">
                                            <tr>
                                                <th className="px-5 py-3 font-medium">Course</th>
                                                <th className="px-5 py-3 font-medium">Price</th>
                                                <th className="px-5 py-3 font-medium">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {latestCourses.slice(0,5).map((c, i) => (
                                                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                                    <td className="px-5 py-3">
                                                        <p className="font-semibold text-gray-900 line-clamp-1">{c.name}</p>
                                                        <p className="text-xs text-gray-500">{c.category}</p>
                                                    </td>
                                                    <td className="px-5 py-3 font-medium text-gray-900 whitespace-nowrap">{c.price}</td>
                                                    <td className="px-5 py-3">
                                                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider whitespace-nowrap ${c.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                                                            {c.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Latest Students */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                                <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                                    <h3 className="font-bold text-gray-900">Latest Students</h3>
                                    <Link to="/admin/students" className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1">
                                        View All <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm">
                                        <thead className="bg-gray-50 text-gray-500 border-b border-gray-100">
                                            <tr>
                                                <th className="px-5 py-3 font-medium">Student</th>
                                                <th className="px-5 py-3 font-medium text-right">Joined</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {latestStudents.map((s, i) => (
                                                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                                    <td className="px-5 py-3">
                                                        <p className="font-semibold text-gray-900">{s.name}</p>
                                                        <p className="text-xs text-gray-500">{s.email}</p>
                                                    </td>
                                                    <td className="px-5 py-3 text-right">
                                                        <span className="inline-flex items-center px-2 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-md whitespace-nowrap">
                                                            {s.joined}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            
                        </div>
                        
                        {/* 5. Recent Payments */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                    <DollarSign className="h-5 w-5 text-green-500" />
                                    Recent Payments
                                </h3>
                                <Link to="/admin/payments" className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1">
                                    View All <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-gray-50 text-gray-500 border-b border-gray-100">
                                        <tr>
                                            <th className="px-5 py-4 font-medium">Student</th>
                                            <th className="px-5 py-4 font-medium">Course</th>
                                            <th className="px-5 py-4 font-medium">Amount</th>
                                            <th className="px-5 py-4 font-medium">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {recentPayments.map((p, i) => (
                                            <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="px-5 py-4 font-medium text-gray-900">{p.student}</td>
                                                <td className="px-5 py-4 text-gray-600">{p.course}</td>
                                                <td className="px-5 py-4 font-bold text-gray-900">{p.amount}</td>
                                                <td className="px-5 py-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${p.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                                                        {p.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                    
                    {/* Sidebar Column */}
                    <div className="space-y-6">
                        
                        {/* 10. Notifications */}
                        <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100 shadow-sm">
                            <h3 className="text-lg font-bold text-amber-900 mb-4 flex items-center gap-2">
                                <AlertTriangle className="h-5 w-5" />
                                Action Needed
                            </h3>
                            <div className="space-y-3">
                                {notifications.map((notif, idx) => (
                                    <div key={idx} className="flex gap-3 bg-white p-3 rounded-xl shadow-sm border border-amber-100/50 hover:shadow-md transition-shadow">
                                        {notif.type === 'warning' ? (
                                            <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0" />
                                        ) : (
                                            <Bell className="h-5 w-5 text-blue-500 shrink-0" />
                                        )}
                                        <p className="text-sm text-gray-700 font-medium">{notif.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 9. Quick Actions */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <Link to="/admin/categories" className="flex flex-col items-center justify-center gap-2 p-4 bg-gray-50 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-colors border border-gray-100 hover:border-blue-100 text-gray-700 group">
                                    <Layers className="h-6 w-6 text-gray-400 group-hover:text-blue-600 transition-colors" />
                                    <span className="text-xs font-bold text-center">Add Category</span>
                                </Link>
                                <Link to="/admin/courses/add" className="flex flex-col items-center justify-center gap-2 p-4 bg-gray-50 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-colors border border-gray-100 hover:border-blue-100 text-gray-700 group">
                                    <BookOpen className="h-6 w-6 text-gray-400 group-hover:text-blue-600 transition-colors" />
                                    <span className="text-xs font-bold text-center">Add Course</span>
                                </Link>
                                <Link to="/admin/students" className="flex flex-col items-center justify-center gap-2 p-4 bg-gray-50 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-colors border border-gray-100 hover:border-blue-100 text-gray-700 group">
                                    <GraduationCap className="h-6 w-6 text-gray-400 group-hover:text-blue-600 transition-colors" />
                                    <span className="text-xs font-bold text-center">Add Student</span>
                                </Link>
                                <Link to="/admin/reports" className="flex flex-col items-center justify-center gap-2 p-4 bg-gray-50 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-colors border border-gray-100 hover:border-blue-100 text-gray-700 group">
                                    <FileText className="h-6 w-6 text-gray-400 group-hover:text-blue-600 transition-colors" />
                                    <span className="text-xs font-bold text-center">View Reports</span>
                                </Link>
                            </div>
                        </div>

                        {/* 8. Recent Activities */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Bell className="h-5 w-5 text-gray-500" />
                                Recent Activity
                            </h3>
                            <div className="space-y-4">
                                {activities.map((activity, idx) => (
                                    <div key={idx} className="flex gap-4">
                                        <div className="flex flex-col items-center">
                                            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                                                <CheckCircle className="h-4 w-4" />
                                            </div>
                                            {idx !== activities.length - 1 && <div className="w-px h-full bg-gray-100 my-1 min-h-[16px]"></div>}
                                        </div>
                                        <div className="pb-4 pt-1.5">
                                            <p className="text-sm font-medium text-gray-700">{activity}</p>
                                            <span className="text-xs text-gray-400 font-medium">Just now</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}