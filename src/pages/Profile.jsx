import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    User,
    Mail,
    Phone,
    Shield,
    Award,
    BookOpen,
    Edit3,
    Save,
    Camera,
    Key,
    CheckCircle2,
    Clock,
    Compass,
    Anchor,
    Briefcase,
    MapPin,
    Calendar,
    Lock,
    Eye,
    EyeOff,
    Sparkles,
    X,
    LogOut,
    ChevronRight,
    AlertCircle,
    Sliders,
    Globe,
    Smartphone,
    LayoutDashboard
} from "lucide-react";
import { getProfile } from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState("overview");
    const [isEditing, setIsEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState(null);

    // Editable form state
    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        phone_number: "",
        role: "STUDENT",
        rank: "Cadet Officer",
        department: "Nautical Science",
        location: "Mumbai, India",
        bio: "Aspiring Master Mariner passionate about celestial navigation, vessel management, and maritime safety standards.",
        emergency_contact: "+91 98765 43210",
        cdc_number: "IND-2024-8891X"
    });

    // Password security state
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false
    });
    const [twoFactor, setTwoFactor] = useState(false);

    // Notification preferences state
    const [preferences, setPreferences] = useState({
        emailAlerts: true,
        courseUpdates: true,
        examReminders: true,
        promotionalEmails: false,
        publicProfile: true
    });

    // Custom avatar state simulation
    const [avatarUrl, setAvatarUrl] = useState(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            setLoading(true);
            try {
                const response = await getProfile();
                const profileData = response.data?.data || response.data;
                if (profileData) {
                    setUser(profileData);
                    setFormData((prev) => ({
                        ...prev,
                        full_name: profileData.full_name || profileData.name || "Captain Mariner",
                        email: profileData.email || "mariner@marinerslms.com",
                        phone_number: profileData.phone_number || profileData.phone || "+91 91234 56789",
                        role: profileData.role || "STUDENT",
                    }));
                }
            } catch (error) {
                console.log("Could not load API profile, loading local context:", error);
                // Fallback to local storage user or default preview user
                const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
                const fallbackData = {
                    full_name: storedUser.full_name || storedUser.name || "Captain Alex Vance",
                    email: storedUser.email || "alex.vance@marinerslms.com",
                    phone_number: storedUser.phone_number || "+91 98765 12345",
                    role: storedUser.role || "STUDENT"
                };
                setUser(fallbackData);
                setFormData((prev) => ({
                    ...prev,
                    ...fallbackData
                }));
            } finally {
                setTimeout(() => setLoading(false), 400); // smooth initial shimmer transition
            }
        };

        fetchProfileData();
    }, []);

    const showToastMessage = (message, type = "success") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3500);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveProfile = (e) => {
        e.preventDefault();
        setSaving(true);
        setTimeout(() => {
            setUser((prev) => ({ ...prev, ...formData }));
            setIsEditing(false);
            setSaving(false);
            showToastMessage("Profile details updated successfully!");
        }, 800);
    };

    const handlePasswordChange = (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            showToastMessage("New passwords do not match!", "error");
            return;
        }
        if (passwordData.newPassword.length < 6) {
            showToastMessage("Password must be at least 6 characters long.", "error");
            return;
        }
        setSaving(true);
        setTimeout(() => {
            setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
            setSaving(false);
            showToastMessage("Password changed successfully!");
        }, 1000);
    };

    const handleAvatarUpload = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setAvatarUrl(url);
            showToastMessage("Profile avatar updated!");
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    // Calculate completion percentage
    const calculateCompleteness = () => {
        let score = 40; // Base user logged in
        if (formData.full_name) score += 15;
        if (formData.email) score += 15;
        if (formData.phone_number) score += 10;
        if (formData.bio) score += 10;
        if (formData.cdc_number) score += 10;
        return Math.min(score, 100);
    };

    const completenessScore = calculateCompleteness();

    // Mock stats & badges
    const stats = [
        { label: "Enrolled Courses", value: "6", icon: BookOpen, color: "from-blue-500 to-cyan-500" },
        { label: "Certificates Earned", value: "4", icon: Award, color: "from-amber-500 to-orange-500" },
        { label: "Learning Hours", value: "48 hrs", icon: Clock, color: "from-emerald-500 to-teal-500" },
        { label: "Exam Score Avg", value: "94%", icon: CheckCircle2, color: "from-indigo-500 to-purple-500" }
    ];

    const badges = [
        { name: "STCW Certified", desc: "Basic Safety Training Completed", icon: Shield, bg: "bg-blue-50 text-blue-600 border-blue-200" },
        { name: "Master Navigator", desc: "Top score in Maritime ECDIS", icon: Compass, bg: "bg-purple-50 text-purple-600 border-purple-200" },
        { name: "Safety Officer", desc: "Advanced Fire Fighting", icon: Anchor, bg: "bg-emerald-50 text-emerald-600 border-emerald-200" },
        { name: "Star Student", desc: "100% Course Attendance", icon: Sparkles, bg: "bg-amber-50 text-amber-600 border-amber-200" }
    ];

    const enrolledCourses = [
        { name: "STCW Basic Safety Training (BST)", progress: 100, status: "Completed", category: "Safety", code: "STCW-101" },
        { name: "ECDIS Navigation & Vessel Tracking", progress: 80, status: "In Progress", category: "Nautical", code: "NAV-204" },
        { name: "GMDSS Radio Operator Certification", progress: 45, status: "In Progress", category: "Communication", code: "COM-302" }
    ];

    if (loading) {
        return (
            <div className="min-h-[85vh] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Skeleton Header */}
                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm animate-pulse space-y-6">
                    <div className="h-40 bg-slate-200 rounded-2xl w-full"></div>
                    <div className="flex flex-col sm:flex-row items-center gap-6 -mt-16 sm:px-6">
                        <div className="w-28 h-28 bg-slate-300 rounded-full border-4 border-white"></div>
                        <div className="space-y-3 text-center sm:text-left flex-1">
                            <div className="h-8 bg-slate-200 rounded-lg w-48 mx-auto sm:mx-0"></div>
                            <div className="h-4 bg-slate-200 rounded-lg w-32 mx-auto sm:mx-0"></div>
                        </div>
                    </div>
                </div>

                {/* Skeleton Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div className="h-64 bg-slate-100 rounded-3xl animate-pulse"></div>
                    <div className="md:col-span-2 h-64 bg-slate-100 rounded-3xl animate-pulse"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50/60 pb-16 font-sans text-slate-800">

            {/* Toast Notification Floating Banner */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: -40, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl backdrop-blur-md text-white font-medium border ${toast.type === "error"
                            ? "bg-red-600/90 border-red-500 shadow-red-500/20"
                            : "bg-emerald-600/90 border-emerald-500 shadow-emerald-500/20"
                            }`}
                    >
                        {toast.type === "error" ? <AlertCircle className="w-5 h-5 shrink-0" /> : <CheckCircle2 className="w-5 h-5 shrink-0" />}
                        <span>{toast.message}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">

                {/* HERO COVER BANNER & PROFILE CARD */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden"
                >
                    {/* Cover Gradient Background */}
                    <div className="h-48 sm:h-60 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-950 relative overflow-hidden">
                        {/* Decorative background shapes & wave circles */}
                        <div className="absolute -right-16 -top-16 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
                        <div className="absolute left-1/3 bottom-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>

                        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>

                        {/* Top Action Controls */}
                        <div className="absolute top-4 right-4 flex items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 backdrop-blur-md text-white border border-white/20">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                                Active Cadet
                            </span>
                        </div>
                    </div>

                    {/* Header Info Content Layer */}
                    <div className="px-6 sm:px-10 pb-8 pt-0 relative">
                        <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 -mt-16 sm:-mt-20">

                            {/* Avatar & User Core Details */}
                            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">
                                <div className="relative group">
                                    <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-600 p-1 shadow-2xl shadow-blue-900/30">
                                        <div className="w-full h-full rounded-[22px] bg-slate-800 flex items-center justify-center overflow-hidden relative">
                                            {avatarUrl ? (
                                                <img src={avatarUrl} alt="User Avatar" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-blue-700 to-indigo-900 flex items-center justify-center text-white text-3xl sm:text-4xl font-extrabold tracking-wider">
                                                    {formData.full_name ? formData.full_name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) : "MV"}
                                                </div>
                                            )}
                                            {/* Hover Upload Overlay */}
                                            <label className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer">
                                                <Camera className="w-6 h-6 mb-1" />
                                                <span className="text-[11px] font-medium">Change Photo</span>
                                                <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
                                            </label>
                                        </div>
                                    </div>
                                    <span className="absolute bottom-2 right-2 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full shadow-md" title="Online Status"></span>
                                </div>

                                <div className="space-y-1.5 pb-2">
                                    <div className="flex items-center justify-center sm:justify-start gap-2.5 flex-wrap">
                                        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                                            {user?.full_name || formData.full_name}
                                        </h1>
                                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1">
                                            <Shield className="w-3.5 h-3.5" />
                                            {formData.role || "STUDENT"}
                                        </span>
                                    </div>

                                    <p className="text-sm font-medium text-slate-500 flex items-center justify-center sm:justify-start gap-2">
                                        <span>{formData.rank}</span>
                                        <span>•</span>
                                        <span className="text-blue-600 font-semibold">{formData.department}</span>
                                    </p>

                                    <div className="flex items-center justify-center sm:justify-start gap-4 text-xs text-slate-400 pt-1">
                                        <span className="flex items-center gap-1">
                                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                                            {formData.location}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                            Member since 2024
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Actions & Profile Completeness */}
                            <div className="flex flex-col items-center md:items-end gap-3 w-full md:w-auto">
                                <div className="flex items-center gap-3 w-full sm:w-auto">
                                    {isEditing ? (
                                        <>
                                            <button
                                                type="button"
                                                onClick={() => setIsEditing(false)}
                                                className="px-4 py-2.5 rounded-xl font-semibold text-sm text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center gap-2"
                                            >
                                                <X className="w-4 h-4" /> Cancel
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleSaveProfile}
                                                disabled={saving}
                                                className="px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2"
                                            >
                                                {saving ? (
                                                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                                ) : (
                                                    <Save className="w-4 h-4" />
                                                )}
                                                Save Changes
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                type="button"
                                                onClick={() => navigate(user?.role === "ADMIN" ? "/admin/dashboard" : "/student/dashboard")}
                                                className="w-full sm:w-auto px-4 py-2.5 rounded-xl font-semibold text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-md transition-all flex items-center justify-center gap-2"
                                            >
                                                <LayoutDashboard className="w-4 h-4" />
                                                Dashboard
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setIsEditing(true)}
                                                className="w-full sm:w-auto px-4 py-2.5 rounded-xl font-semibold text-sm text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all flex items-center justify-center gap-2 group"
                                            >
                                                <Edit3 className="w-4 h-4 text-blue-600 group-hover:rotate-12 transition-transform" />
                                                Edit Profile
                                            </button>
                                        </>
                                    )}

                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="px-3.5 py-2.5 rounded-xl font-medium text-sm text-red-600 bg-red-50 hover:bg-red-100 transition-colors flex items-center gap-1.5"
                                        title="Sign Out"
                                    >
                                        <LogOut className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* Profile Completeness Bar */}
                                <div className="w-full sm:w-64 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                                    <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
                                        <span className="text-slate-600 flex items-center gap-1">
                                            <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Profile Strength
                                        </span>
                                        <span className="text-blue-600">{completenessScore}%</span>
                                    </div>
                                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                                        <motion.div
                                            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${completenessScore}%` }}
                                            transition={{ duration: 1, delay: 0.2 }}
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* ANIMATED NAVIGATION TABS */}
                    <div className="border-t border-slate-100 px-6 sm:px-10 bg-slate-50/50 flex overflow-x-auto no-scrollbar gap-2 sm:gap-6">
                        {[
                            { id: "overview", label: "Overview", icon: User },
                            { id: "learning", label: "Learning & Badges", icon: BookOpen },
                            { id: "security", label: "Security & Passwords", icon: Lock },
                            { id: "preferences", label: "Preferences", icon: Sliders }
                        ].map((tab) => {
                            const TabIcon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`relative py-4 px-3 sm:px-4 text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${isActive ? "text-blue-600" : "text-slate-500 hover:text-slate-900"
                                        }`}
                                >
                                    <TabIcon className={`w-4 h-4 ${isActive ? "text-blue-600" : "text-slate-400"}`} />
                                    {tab.label}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-md"
                                            transition={{ type: "spring", stiffness: 500, damping: 35 }}
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </motion.div>

                {/* TAB CONTENT SECTIONS WITH FRAMER MOTION ANIMATION */}
                <AnimatePresence mode="wait">

                    {/* TAB 1: OVERVIEW & PERSONAL INFORMATION */}
                    {activeTab === "overview" && (
                        <motion.div
                            key="overview"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                        >
                            {/* Left Column: Personal Form / Info (2 cols) */}
                            <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-md space-y-6">
                                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                                    <div>
                                        <h2 className="text-xl font-bold text-slate-900">Personal Details</h2>
                                        <p className="text-xs text-slate-400 mt-0.5">Manage your public information and mariner profile details.</p>
                                    </div>
                                    {!isEditing && (
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                                        >
                                            <Edit3 className="w-3.5 h-3.5" /> Edit Info
                                        </button>
                                    )}
                                </div>

                                {isEditing ? (
                                    <form onSubmit={handleSaveProfile} className="space-y-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <div>
                                                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">Full Name</label>
                                                <div className="relative">
                                                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                                                    <input
                                                        type="text"
                                                        name="full_name"
                                                        value={formData.full_name}
                                                        onChange={handleFormChange}
                                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm font-medium transition-all"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">Email Address</label>
                                                <div className="relative">
                                                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleFormChange}
                                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm font-medium transition-all"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">Phone Number</label>
                                                <div className="relative">
                                                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                                                    <input
                                                        type="text"
                                                        name="phone_number"
                                                        value={formData.phone_number}
                                                        onChange={handleFormChange}
                                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm font-medium transition-all"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">CDC / Seaman Book No.</label>
                                                <div className="relative">
                                                    <Anchor className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                                                    <input
                                                        type="text"
                                                        name="cdc_number"
                                                        value={formData.cdc_number}
                                                        onChange={handleFormChange}
                                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm font-medium transition-all"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">Department</label>
                                                <select
                                                    name="department"
                                                    value={formData.department}
                                                    onChange={handleFormChange}
                                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm font-medium transition-all bg-white"
                                                >
                                                    <option>Nautical Science</option>
                                                    <option>Marine Engineering</option>
                                                    <option>Naval Architecture</option>
                                                    <option>Maritime Logistics</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">Rank / Level</label>
                                                <input
                                                    type="text"
                                                    name="rank"
                                                    value={formData.rank}
                                                    onChange={handleFormChange}
                                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm font-medium transition-all"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">Professional Summary / Bio</label>
                                            <textarea
                                                name="bio"
                                                rows="3"
                                                value={formData.bio}
                                                onChange={handleFormChange}
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm font-medium transition-all resize-none"
                                            ></textarea>
                                        </div>

                                        <div className="flex justify-end gap-3 pt-2">
                                            <button
                                                type="button"
                                                onClick={() => setIsEditing(false)}
                                                className="px-5 py-2.5 rounded-xl font-bold text-sm text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={saving}
                                                className="px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/30 transition-all flex items-center gap-2"
                                            >
                                                {saving ? "Saving..." : "Save Profile"}
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                                        <div className="space-y-4 bg-slate-50/70 p-5 rounded-2xl border border-slate-100">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2.5 bg-blue-100 text-blue-700 rounded-xl">
                                                    <Mail className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <span className="text-xs font-bold text-slate-400 block uppercase">Email Address</span>
                                                    <span className="text-sm font-semibold text-slate-900">{formData.email}</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <div className="p-2.5 bg-indigo-100 text-indigo-700 rounded-xl">
                                                    <Phone className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <span className="text-xs font-bold text-slate-400 block uppercase">Phone Number</span>
                                                    <span className="text-sm font-semibold text-slate-900">{formData.phone_number}</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <div className="p-2.5 bg-cyan-100 text-cyan-700 rounded-xl">
                                                    <Anchor className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <span className="text-xs font-bold text-slate-400 block uppercase">CDC Number</span>
                                                    <span className="text-sm font-semibold text-slate-900">{formData.cdc_number}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4 bg-slate-50/70 p-5 rounded-2xl border border-slate-100">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-xl">
                                                    <Briefcase className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <span className="text-xs font-bold text-slate-400 block uppercase">Department & Rank</span>
                                                    <span className="text-sm font-semibold text-slate-900">{formData.department} ({formData.rank})</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <div className="p-2.5 bg-amber-100 text-amber-700 rounded-xl">
                                                    <MapPin className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <span className="text-xs font-bold text-slate-400 block uppercase">Location</span>
                                                    <span className="text-sm font-semibold text-slate-900">{formData.location}</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <div className="p-2.5 bg-rose-100 text-rose-700 rounded-xl">
                                                    <Phone className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <span className="text-xs font-bold text-slate-400 block uppercase">Emergency Contact</span>
                                                    <span className="text-sm font-semibold text-slate-900">{formData.emergency_contact}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="md:col-span-2 bg-slate-50/70 p-5 rounded-2xl border border-slate-100">
                                            <span className="text-xs font-bold text-slate-400 block uppercase mb-1">About / Biography</span>
                                            <p className="text-sm font-medium text-slate-700 leading-relaxed">{formData.bio}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Right Column: Quick Stats & Security Snippet */}
                            <div className="space-y-6">
                                {/* Quick Stats Panel */}
                                <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-3xl p-6 text-white shadow-xl space-y-6 relative overflow-hidden">
                                    <div className="flex justify-between items-center border-b border-white/10 pb-4">
                                        <h3 className="font-bold text-base flex items-center gap-2">
                                            <Compass className="w-5 h-5 text-blue-400" /> Maritime Metrics
                                        </h3>
                                        <span className="text-xs font-semibold text-blue-300 bg-blue-900/50 px-2.5 py-1 rounded-full border border-blue-700/50">2024 Semester</span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                                            <span className="text-2xl font-extrabold text-white block">6</span>
                                            <span className="text-xs text-slate-400">Courses Enrolled</span>
                                        </div>
                                        <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                                            <span className="text-2xl font-extrabold text-amber-400 block">4</span>
                                            <span className="text-xs text-slate-400">Certificates</span>
                                        </div>
                                        <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                                            <span className="text-2xl font-extrabold text-emerald-400 block">48h</span>
                                            <span className="text-xs text-slate-400">Training Time</span>
                                        </div>
                                        <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                                            <span className="text-2xl font-extrabold text-cyan-400 block">94%</span>
                                            <span className="text-xs text-slate-400">Grade Average</span>
                                        </div>
                                    </div>

                                    <div className="pt-2">
                                        <button
                                            onClick={() => setActiveTab("learning")}
                                            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-xs uppercase tracking-wider text-white transition-colors flex items-center justify-center gap-2"
                                        >
                                            View Learning Portal <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* System Verification Status */}
                                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-md space-y-4">
                                    <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                                        <Shield className="w-4 h-4 text-emerald-600" /> Account Verification
                                    </h3>
                                    <div className="space-y-3 text-xs font-semibold">
                                        <div className="flex items-center justify-between p-3 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-100">
                                            <span className="flex items-center gap-2">
                                                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Identity Verified
                                            </span>
                                            <span className="text-[10px] bg-emerald-200 px-2 py-0.5 rounded font-bold">PASSED</span>
                                        </div>
                                        <div className="flex items-center justify-between p-3 bg-blue-50 text-blue-800 rounded-xl border border-blue-100">
                                            <span className="flex items-center gap-2">
                                                <CheckCircle2 className="w-4 h-4 text-blue-600" /> Seaman Medical Cert
                                            </span>
                                            <span className="text-[10px] bg-blue-200 px-2 py-0.5 rounded font-bold">VALID</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* TAB 2: LEARNING & BADGES */}
                    {activeTab === "learning" && (
                        <motion.div
                            key="learning"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-8"
                        >
                            {/* Key Stats Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                                {stats.map((item, idx) => {
                                    const StatIcon = item.icon;
                                    return (
                                        <motion.div
                                            key={idx}
                                            whileHover={{ y: -4 }}
                                            className="bg-white rounded-3xl p-6 border border-slate-100 shadow-md flex items-center gap-4"
                                        >
                                            <div className={`p-3.5 rounded-2xl bg-gradient-to-tr ${item.color} text-white shadow-lg`}>
                                                <StatIcon className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <p className="text-2xl font-extrabold text-slate-900">{item.value}</p>
                                                <p className="text-xs font-semibold text-slate-500">{item.label}</p>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {/* Enrolled Courses Progress */}
                            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-md space-y-6">
                                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                                    <div>
                                        <h2 className="text-xl font-bold text-slate-900">Enrolled Maritime Courses</h2>
                                        <p className="text-xs text-slate-400 mt-0.5">Track your ongoing course module progress.</p>
                                    </div>
                                    <button
                                        onClick={() => navigate("/my-courses")}
                                        className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                                    >
                                        My Courses <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {enrolledCourses.map((course, idx) => (
                                        <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-colors space-y-3">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                                <div>
                                                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-100 px-2 py-0.5 rounded">
                                                        {course.code} • {course.category}
                                                    </span>
                                                    <h3 className="font-bold text-slate-900 text-sm mt-1">{course.name}</h3>
                                                </div>
                                                <span className={`self-start sm:self-center px-3 py-1 rounded-full text-xs font-bold ${course.status === "Completed" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                                                    }`}>
                                                    {course.status}
                                                </span>
                                            </div>

                                            <div className="space-y-1">
                                                <div className="flex justify-between text-xs font-semibold text-slate-500">
                                                    <span>Completion</span>
                                                    <span>{course.progress}%</span>
                                                </div>
                                                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full transition-all duration-1000 ${course.progress === 100 ? "bg-emerald-500" : "bg-blue-600"
                                                            }`}
                                                        style={{ width: `${course.progress}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Maritime Badges Grid */}
                            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-md space-y-6">
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">Earned Badges & Qualifications</h2>
                                    <p className="text-xs text-slate-400 mt-0.5">Specialized endorsements achieved during training.</p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                                    {badges.map((badge, idx) => {
                                        const BadgeIcon = badge.icon;
                                        return (
                                            <div key={idx} className={`p-5 rounded-2xl border ${badge.bg} flex flex-col items-center text-center space-y-3`}>
                                                <div className="p-3 rounded-xl bg-white shadow-sm">
                                                    <BadgeIcon className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-sm text-slate-900">{badge.name}</h3>
                                                    <p className="text-xs font-medium text-slate-500 mt-0.5">{badge.desc}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* TAB 3: SECURITY & PASSWORDS */}
                    {activeTab === "security" && (
                        <motion.div
                            key="security"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                        >
                            {/* Password Change Form */}
                            <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-md space-y-6">
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">Password & Security</h2>
                                    <p className="text-xs text-slate-400 mt-0.5">Update your password and enhance account safety.</p>
                                </div>

                                <form onSubmit={handlePasswordChange} className="space-y-5">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">Current Password</label>
                                        <div className="relative">
                                            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                                            <input
                                                type={showPassword.current ? "text" : "password"}
                                                value={passwordData.currentPassword}
                                                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                                placeholder="••••••••"
                                                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm font-medium"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword({ ...showPassword, current: !showPassword.current })}
                                                className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
                                            >
                                                {showPassword.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">New Password</label>
                                        <div className="relative">
                                            <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                                            <input
                                                type={showPassword.new ? "text" : "password"}
                                                value={passwordData.newPassword}
                                                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                                placeholder="Enter new password"
                                                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm font-medium"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword({ ...showPassword, new: !showPassword.new })}
                                                className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
                                            >
                                                {showPassword.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">Confirm New Password</label>
                                        <div className="relative">
                                            <CheckCircle2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                                            <input
                                                type={showPassword.confirm ? "text" : "password"}
                                                value={passwordData.confirmPassword}
                                                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                                placeholder="Confirm new password"
                                                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm font-medium"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword({ ...showPassword, confirm: !showPassword.confirm })}
                                                className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
                                            >
                                                {showPassword.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Password Strength Bar */}
                                    {passwordData.newPassword && (
                                        <div className="space-y-1.5 pt-1">
                                            <div className="flex justify-between text-xs font-semibold">
                                                <span className="text-slate-500">Password Strength</span>
                                                <span className={passwordData.newPassword.length > 8 ? "text-emerald-600" : "text-amber-600"}>
                                                    {passwordData.newPassword.length > 8 ? "Strong" : "Medium"}
                                                </span>
                                            </div>
                                            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full transition-all ${passwordData.newPassword.length > 8 ? "bg-emerald-500 w-full" : "bg-amber-500 w-1/2"
                                                        }`}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="w-full py-3 rounded-xl font-bold text-sm text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-md flex items-center justify-center gap-2"
                                    >
                                        {saving ? "Updating Password..." : "Update Password"}
                                    </button>
                                </form>
                            </div>

                            {/* 2FA & Session Controls */}
                            <div className="space-y-6">
                                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-md space-y-4">
                                    <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                                        <Smartphone className="w-4 h-4 text-blue-600" /> Two-Factor Authentication
                                    </h3>
                                    <p className="text-xs text-slate-500">Add an extra layer of security to your mariner LMS login.</p>

                                    <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                                        <span className="text-xs font-bold text-slate-700">Enable 2FA via SMS/App</span>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setTwoFactor(!twoFactor);
                                                showToastMessage(!twoFactor ? "2FA Enabled!" : "2FA Disabled");
                                            }}
                                            className={`w-12 h-6 rounded-full transition-colors relative p-1 ${twoFactor ? "bg-blue-600" : "bg-slate-300"
                                                }`}
                                        >
                                            <div
                                                className={`w-4 h-4 rounded-full bg-white transition-transform ${twoFactor ? "translate-x-6" : "translate-x-0"
                                                    }`}
                                            />
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-md space-y-4">
                                    <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                                        <Globe className="w-4 h-4 text-purple-600" /> Active Logged In Sessions
                                    </h3>

                                    <div className="space-y-3 text-xs">
                                        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                                            <div>
                                                <p className="font-bold text-slate-800">Chrome on Windows 11</p>
                                                <p className="text-[11px] text-slate-400">Current Session • Mumbai, IN</p>
                                            </div>
                                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                        </div>

                                        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                                            <div>
                                                <p className="font-bold text-slate-800">Safari on iPhone 15</p>
                                                <p className="text-[11px] text-slate-400">Active 2 hrs ago</p>
                                            </div>
                                            <button className="text-[10px] font-bold text-red-600 hover:underline">Revoke</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* TAB 4: PREFERENCES */}
                    {activeTab === "preferences" && (
                        <motion.div
                            key="preferences"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-md space-y-6 max-w-3xl"
                        >
                            <div>
                                <h2 className="text-xl font-bold text-slate-900">Notification & System Preferences</h2>
                                <p className="text-xs text-slate-400 mt-0.5">Customize how Mariners LMS communicates with you.</p>
                            </div>

                            <div className="space-y-4 divide-y divide-slate-100">
                                {[
                                    { key: "emailAlerts", title: "Email Notifications", desc: "Receive email updates regarding course progress and announcements." },
                                    { key: "courseUpdates", title: "New Course Alerts", desc: "Get notified when new maritime certification courses are published." },
                                    { key: "examReminders", title: "Exam & Quiz Reminders", desc: "Automated reminders 24 hours prior to scheduled assessments." },
                                    { key: "promotionalEmails", title: "Offers & Partner News", desc: "Receive news regarding maritime events and discounts." },
                                    { key: "publicProfile", title: "Public Directory Profile", desc: "Allow maritime recruiters and instructors to view your profile." }
                                ].map((item) => (
                                    <div key={item.key} className="pt-4 flex items-center justify-between gap-4">
                                        <div>
                                            <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                                            <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setPreferences({ ...preferences, [item.key]: !preferences[item.key] });
                                                showToastMessage("Preferences updated!");
                                            }}
                                            className={`w-12 h-6 rounded-full transition-colors relative p-1 shrink-0 ${preferences[item.key] ? "bg-blue-600" : "bg-slate-300"
                                                }`}
                                        >
                                            <div
                                                className={`w-4 h-4 rounded-full bg-white transition-transform ${preferences[item.key] ? "translate-x-6" : "translate-x-0"
                                                    }`}
                                            />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>

            </div>
        </div>
    );
}