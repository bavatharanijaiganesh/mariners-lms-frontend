import { Users, BookOpen, DollarSign, TrendingUp } from "lucide-react";

export default function AdminDashboard() {

    const stats = [
        { label: "Total Students", value: "1,234", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
        { label: "Active Courses", value: "42", icon: BookOpen, color: "text-indigo-600", bg: "bg-indigo-50" },
        { label: "Total Revenue", value: "$45,678", icon: DollarSign, color: "text-green-600", bg: "bg-green-50" },
        { label: "Growth", value: "+12.5%", icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-50" },
    ];

    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2">Welcome back, Admin! 👋</h1>
                    <p className="text-blue-100 max-w-xl">Here's what's happening with your learning platform today. Review your latest statistics and manage your courses effectively.</p>
                </div>
                <div className="absolute right-0 top-0 w-64 h-full bg-white opacity-10 transform skew-x-12 translate-x-20"></div>
                <div className="absolute right-20 top-0 w-32 h-full bg-white opacity-5 transform skew-x-12 translate-x-10"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                        <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                                    <Icon className={`h-6 w-6 ${stat.color}`} />
                                </div>
                                <span className="text-xs font-semibold text-gray-400 bg-gray-50 px-2 py-1 rounded-md">Today</span>
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                                <p className="text-gray-500 font-medium text-sm">{stat.label}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mt-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
                <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                    <p>Activity charts and tables will appear here.</p>
                </div>
            </div>
        </div>
    );
}