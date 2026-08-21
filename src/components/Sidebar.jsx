import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Layers, BookOpen, Users, CreditCard, Award, BarChart3, X, Anchor } from "lucide-react";
import { cn } from "../utils/cn";

export default function Sidebar({ isOpen, setIsOpen }) {

    const location = useLocation();

    const menus = [
        { title: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
        { title: "Categories", path: "/admin/categories", icon: Layers },
        { title: "Courses", path: "/admin/courses", icon: BookOpen },
        { title: "Students", path: "/admin/students", icon: Users },
        { title: "Payments", path: "/admin/payments", icon: CreditCard },
        { title: "Certificates", path: "/admin/certificates", icon: Award },
        { title: "Reports", path: "/admin/reports", icon: BarChart3 },
    ];

    return (
        <>
            {/* Mobile Sidebar Overlay */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar Content */}
            <div className={cn(
                "fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-white shadow-2xl transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 flex flex-col",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="flex items-center justify-between p-6 border-b border-slate-800/60">
                    <Link to="/admin/dashboard" className="flex items-center gap-3 text-xl font-bold text-white hover:text-blue-400 transition-colors">
                        <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-lg">
                            <Anchor className="h-6 w-6 text-white" />
                        </div>
                        <span className="tracking-wide">Mariners<span className="text-blue-400">LMS</span></span>
                    </Link>
                    <button 
                        onClick={() => setIsOpen(false)}
                        className="lg:hidden p-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto py-6 px-4 custom-scrollbar">
                    <ul className="space-y-1.5">
                        {menus.map((menu) => {
                            const isActive = location.pathname === menu.path;
                            const Icon = menu.icon;
                            
                            return (
                                <li key={menu.path}>
                                    <Link
                                        to={menu.path}
                                        onClick={() => setIsOpen(false)}
                                        className={cn(
                                            "flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all duration-200 group relative overflow-hidden",
                                            isActive 
                                                ? "bg-blue-600/10 text-blue-400" 
                                                : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
                                        )}
                                    >
                                        {isActive && (
                                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-r-full" />
                                        )}
                                        <Icon className={cn(
                                            "h-5 w-5 transition-transform duration-200", 
                                            isActive ? "text-blue-500" : "text-slate-400 group-hover:text-slate-200 group-hover:scale-110"
                                        )} />
                                        {menu.title}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                
                <div className="p-6 border-t border-slate-800/60">
                    <div className="bg-slate-800/50 rounded-xl p-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                            AD
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">Admin User</p>
                            <p className="text-xs text-slate-400 truncate">System Administrator</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}