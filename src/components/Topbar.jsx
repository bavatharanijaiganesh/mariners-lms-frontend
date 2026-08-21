import { useNavigate } from "react-router-dom";
import { LogOut, Bell, Menu, Search } from "lucide-react";

export default function Topbar({ onMenuClick }) {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
            <div className="flex items-center justify-between px-4 sm:px-6 h-16 lg:h-20">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={onMenuClick}
                        className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                    
                    <div className="hidden sm:flex items-center relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Search..." 
                            className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all w-64"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-6">
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors relative">
                        <Bell className="h-5 w-5" />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>

                    <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>

                    <div className="flex items-center gap-3">
                        <div className="hidden md:block text-right">
                            <p className="text-sm font-semibold text-gray-900 leading-none mb-1">
                                {user?.full_name || 'Admin'}
                            </p>
                            <p className="text-xs text-gray-500 leading-none">
                                {user?.role || 'Administrator'}
                            </p>
                        </div>
                        
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center border border-blue-200 shadow-sm">
                            <span className="text-blue-700 font-bold text-sm">
                                {user?.full_name ? user.full_name.charAt(0) : 'A'}
                            </span>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="ml-2 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Logout"
                        >
                            <LogOut className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}