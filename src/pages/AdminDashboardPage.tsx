import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  User, 
  BellRing, 
  Users, 
  Calendar, 
  Newspaper, 
  FileText, 
  Image as ImageIcon, 
  CheckCircle2, 
  Trash2, 
  Edit3, 
  Plus, 
  ExternalLink, 
  LogOut, 
  Eye, 
  Heart, 
  Sparkles, 
  ToggleLeft, 
  ToggleRight, 
  Save, 
  Search,
  Bot,
  Filter,
  Check,
  X,
  MapPin,
  Clock,
  Phone,
  Mail,
  Upload,
  Briefcase,
  GraduationCap,
  Download,
  TrendingUp,
  Activity,
  BarChart3,
  Globe,
  Radio,
  Building2,
  SlidersHorizontal,
  ChevronRight,
  Stethoscope,
  BookOpen
} from 'lucide-react';
import { useDatabase } from '../context/DatabaseContext';
import { 
  CouncilMember, 
  EventItem, 
  PressItem, 
  NewsletterItem, 
  GalleryItem, 
  JobApplicationRecord, 
  Hospital, 
  ExamApplicationRecord,
  AdminRole 
} from '../types';
import { ImageUploadField } from '../components/common/ImageUploadField';
import { ADMIN_ACCOUNTS } from '../data/adminAccountsData';

interface AdminDashboardPageProps {
  navigate: (route: string) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ navigate }) => {
  const { 
    isAdminLoggedIn, 
    adminUser, 
    loginAdmin, 
    logoutAdmin,
    switchAdminRole,
    promoPopup,
    updatePromoPopup,
    togglePromoPopup,
    wishesBanner,
    updateWishesBanner,
    toggleWishesBanner,
    hospitalsList,
    updateHospitalUnit,
    examApplications,
    updateExamApplicationStatus,
    deleteExamApplication,
    trustees,
    steeringCouncil,
    leadershipCouncil,
    updateCouncilMember,
    addCouncilMember,
    deleteCouncilMember,
    eventsList,
    addEvent,
    updateEvent,
    deleteEvent,
    newsList,
    addNews,
    updateNews,
    deleteNews,
    newslettersList,
    addNewsletter,
    deleteNewsletter,
    galleryList,
    addGalleryItem,
    deleteGalleryItem,
    appointments,
    donations,
    verifyAndDispatchDonationReceipt,
    deleteDonation,
    razorpayConfig,
    updateRazorpayConfig,
    jobApplications,
    updateJobApplicationStatus,
    deleteJobApplication,
    popupRegistrations,
    activityLogs,
    adminAccountsList,
    createAdminAccount,
    updateAdminAccount,
    deleteAdminAccount,
    showToast
  } = useDatabase();

  const [verifyingDonationId, setVerifyingDonationId] = useState<string | null>(null);

  // Login form state (Blank - user enters credentials)
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Super Admin New User Creation State
  const [newUserEmpId, setNewUserEmpId] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<AdminRole>('finance');
  const [newUserDepartment, setNewUserDepartment] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserPhone, setNewUserPhone] = useState('+91 80 6903 8900');
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [editingUserPasscodeEmail, setEditingUserPasscodeEmail] = useState<string | null>(null);
  const [newPasscodeDraft, setNewPasscodeDraft] = useState('');

  // Razorpay Settings State (Super Admin configurable)
  const [rzpKeyId, setRzpKeyId] = useState(razorpayConfig.keyId);
  const [rzpKeySecret, setRzpKeySecret] = useState(razorpayConfig.keySecret);
  const [rzpIsLive, setRzpIsLive] = useState(razorpayConfig.isLive);
  const [rzpMerchantName, setRzpMerchantName] = useState(razorpayConfig.merchantName);
  const [rzpShowSecret, setRzpShowSecret] = useState(false);

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<
    | 'analytics' 
    | 'users'
    | 'wishes' 
    | 'hospitals' 
    | 'exams' 
    | 'applications' 
    | 'council' 
    | 'events' 
    | 'news' 
    | 'newsletters' 
    | 'gallery' 
    | 'popup' 
    | 'appointments' 
    | 'donations'
  >('analytics');

  // Council Sub-tab & Form State
  const [councilCategory, setCouncilCategory] = useState<'trustees' | 'steering' | 'leadership'>('leadership');
  const [isAddCouncilModalOpen, setIsAddCouncilModalOpen] = useState(false);
  const [councilDraft, setCouncilDraft] = useState({
    name: '',
    role: '',
    designation: '',
    category: 'leadership' as 'trustees' | 'steering' | 'leadership',
    image: '',
    bio: '',
    city: 'Bangalore',
    order: 10
  });

  // Wishes Banner Draft State
  const [wishesDraft, setWishesDraft] = useState({ ...wishesBanner });

  // Hospital Unit Edit State
  const [selectedHospitalId, setSelectedHospitalId] = useState<string>(hospitalsList[0]?.id || 'bangalore');
  const selectedHospital = hospitalsList.find(h => h.id === selectedHospitalId) || hospitalsList[0];
  const [hospitalDraft, setHospitalDraft] = useState<Hospital>({ ...selectedHospital });

  // When selected hospital changes
  const handleSelectHospital = (hId: string) => {
    setSelectedHospitalId(hId);
    const found = hospitalsList.find(h => h.id === hId);
    if (found) setHospitalDraft({ ...found });
  };

  // Exam Applications Search & Filter
  const [examSearchText, setExamSearchText] = useState('');
  const [examCourseFilter, setExamCourseFilter] = useState('All');
  const [selectedExamForModal, setSelectedExamForModal] = useState<ExamApplicationRecord | null>(null);
  const [examNoteDraft, setExamNoteDraft] = useState('');
  const [examScoreDraft, setExamScoreDraft] = useState<number>(85);

  // HR Applications Search & Filter
  const [selectedAppForModal, setSelectedAppForModal] = useState<JobApplicationRecord | null>(null);
  const [appSearchText, setAppSearchText] = useState('');
  const [appUnitFilter, setAppUnitFilter] = useState('All');
  const [appStatusFilter, setAppStatusFilter] = useState('All');
  const [hrNoteDraft, setHrNoteDraft] = useState('');

  // Gallery Add State
  const [isAddGalleryModalOpen, setIsAddGalleryModalOpen] = useState(false);
  const [galleryDraft, setGalleryDraft] = useState({
    title: '',
    category: 'Hospitals' as 'Hospitals' | 'Rural Camps' | 'Laser Tech' | 'Events & Awards',
    imageUrl: '',
    date: 'August 2026',
    caption: ''
  });

  // News Add State
  const [isAddNewsModalOpen, setIsAddNewsModalOpen] = useState(false);
  const [newsDraft, setNewsDraft] = useState({
    title: '',
    source: 'National Press / Sankara Media',
    date: 'August 2026',
    category: 'Technology & Clinical',
    summary: '',
    image: '',
    url: ''
  });

  // Events Add State
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const [eventDraft, setEventDraft] = useState({
    title: '',
    date: 'October 15, 2026',
    time: '9:00 AM - 5:00 PM',
    location: 'Sankara Eye Hospital, Bangalore',
    category: 'CME & Clinical Conferences',
    description: '',
    isFreeCamp: false,
    contactNumber: '080-69038900',
    bannerImage: ''
  });

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await loginAdmin(loginPassword, loginEmail);
  };

  const isSuperAdmin = adminUser?.role === 'super_admin' || 
    adminUser?.email === 'saravanan@sankaraeye.com' || 
    adminUser?.email === 'prabhanjan@sankaraeye.com';

  // Determine allowed tabs based on role
  const userRole: AdminRole = adminUser?.role || 'admin';

  const isTabVisible = (tab: typeof activeTab) => {
    if (tab === 'users') return isSuperAdmin;
    if (isSuperAdmin || userRole === 'admin') return true;
    if (userRole === 'finance') {
      return ['donations', 'analytics'].includes(tab);
    }
    if (userRole === 'management') {
      return ['analytics', 'hospitals', 'council', 'donations', 'appointments'].includes(tab);
    }
    if (userRole === 'marketing') {
      return ['wishes', 'events', 'news', 'newsletters', 'gallery', 'popup'].includes(tab);
    }
    if (userRole === 'hr') {
      return ['exams', 'applications'].includes(tab);
    }
    if (userRole === 'administration') {
      return ['hospitals', 'appointments', 'donations'].includes(tab);
    }
    return true;
  };

  // Filtered Exam Applications
  const filteredExams = examApplications.filter(app => {
    const matchesSearch = app.candidateName.toLowerCase().includes(examSearchText.toLowerCase()) ||
      app.rollNumber.toLowerCase().includes(examSearchText.toLowerCase()) ||
      app.email.toLowerCase().includes(examSearchText.toLowerCase());
    const matchesCourse = examCourseFilter === 'All' || app.courseType === examCourseFilter;
    return matchesSearch && matchesCourse;
  });

  // Filtered HR Applications
  const filteredApplications = jobApplications.filter(app => {
    const name = app.candidateName || app.applicantName || '';
    const role = app.departmentRole || '';
    const matchesSearch = name.toLowerCase().includes(appSearchText.toLowerCase()) ||
      role.toLowerCase().includes(appSearchText.toLowerCase()) ||
      app.email.toLowerCase().includes(appSearchText.toLowerCase());
    const matchesUnit = appUnitFilter === 'All' || app.preferredUnit === appUnitFilter;
    const matchesStatus = appStatusFilter === 'All' || app.status === appStatusFilter;
    return matchesSearch && matchesUnit && matchesStatus;
  });

  // ----------------------------------------------------
  // LOGIN SCREEN (If not authenticated)
  // ----------------------------------------------------
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 sm:p-6 font-sans">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-white text-center">
          
          <div className="w-14 h-14 bg-orange-600 rounded-2xl flex items-center justify-center mx-auto text-white shadow-lg shadow-orange-600/30">
            <Lock className="w-7 h-7" />
          </div>

          <div className="space-y-1.5">
            <h2 className="text-xl font-black text-white">Sankara CMS & Administration</h2>
            <p className="text-xs text-slate-400">
              Enterprise Role-Based Access for Executive Management, Marketing, HR, and Administration.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Account Email</label>
              <input
                type="email"
                required
                placeholder="name@sankaraeye.com"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-hidden focus:border-orange-500 placeholder:text-slate-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Passcode / Password</label>
              <input
                type="password"
                required
                placeholder="Enter your security passcode"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-hidden focus:border-orange-500 font-mono placeholder:text-slate-500"
              />
            </div>

            <button
              type="submit"
              className="btn-primary w-full !py-3 text-xs font-black shadow-lg flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Sign In to Staff Workspace →</span>
            </button>
          </form>

          <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Sri Kanchi Kamakoti Medical Trust</span>
            <button onClick={() => navigate('/')} className="text-orange-400 hover:underline">
              ← Return Home
            </button>
          </div>

        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // AUTHENTICATED ADMIN DASHBOARD
  // ----------------------------------------------------
  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 pb-20">
      
      {/* 🔴 Top Admin Navigation Bar */}
      <div className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-600 flex items-center justify-center text-white font-black shadow-md shadow-orange-600/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-white tracking-wide uppercase">Sankara Control Central</span>
                <span className="px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 text-[10px] font-black uppercase font-mono">
                  {adminUser?.roleLabel || 'Super Admin'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 truncate max-w-xs sm:max-w-md">
                {adminUser?.name} • {adminUser?.department}
              </p>
            </div>
          </div>

          {/* Role Quick-Switch Dropdown & Logout */}
          <div className="flex items-center gap-2.5">
            {isSuperAdmin && (
              <div className="hidden md:flex items-center gap-1 bg-slate-800 p-1 rounded-xl text-xs border border-slate-700">
                <span className="text-[10px] text-slate-400 font-bold px-2">ROLE:</span>
                {(['admin', 'finance', 'management', 'marketing', 'hr', 'administration'] as AdminRole[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      switchAdminRole(r);
                      if (r === 'finance') setActiveTab('donations');
                      else if (r === 'marketing') setActiveTab('wishes');
                      else if (r === 'hr') setActiveTab('exams');
                      else if (r === 'administration') setActiveTab('hospitals');
                      else setActiveTab('analytics');
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase transition-colors ${
                      adminUser?.role === r
                        ? 'bg-orange-600 text-white shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            )}

            <button
              onClick={() => navigate('/')}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors"
            >
              Public Site ↗
            </button>

            <button
              onClick={logoutAdmin}
              className="px-3 py-1.5 rounded-xl bg-red-950/70 border border-red-800/80 text-red-300 hover:bg-red-900 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>

        </div>
      </div>

      {/* 🗂️ Dynamic Tab Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-14 z-20 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto py-2.5 scrollbar-none">
          
          {isTabVisible('analytics') && (
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 whitespace-nowrap transition-all ${
                activeTab === 'analytics'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              <span>📈 Analytics & Live Traffic</span>
            </button>
          )}

          {isTabVisible('users') && (
            <button
              onClick={() => setActiveTab('users')}
              className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 whitespace-nowrap transition-all ${
                activeTab === 'users'
                  ? 'bg-orange-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-white" />
              <span>🔐 Users & Access Control ({adminAccountsList.length})</span>
            </button>
          )}

          {isTabVisible('wishes') && (
            <button
              onClick={() => setActiveTab('wishes')}
              className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 whitespace-nowrap transition-all ${
                activeTab === 'wishes'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>🪔 Wishes Header Banner</span>
            </button>
          )}

          {isTabVisible('hospitals') && (
            <button
              onClick={() => setActiveTab('hospitals')}
              className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 whitespace-nowrap transition-all ${
                activeTab === 'hospitals'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-blue-500" />
              <span>🏥 Hospital Units Staffing</span>
            </button>
          )}

          {isTabVisible('exams') && (
            <button
              onClick={() => setActiveTab('exams')}
              className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 whitespace-nowrap transition-all ${
                activeTab === 'exams'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5 text-purple-500" />
              <span>🎓 DNB & Exam Applications ({examApplications.length})</span>
            </button>
          )}

          {isTabVisible('applications') && (
            <button
              onClick={() => setActiveTab('applications')}
              className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 whitespace-nowrap transition-all ${
                activeTab === 'applications'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5 text-orange-500" />
              <span>💼 HR Talent Pool ({jobApplications.length})</span>
            </button>
          )}

          {isTabVisible('council') && (
            <button
              onClick={() => setActiveTab('council')}
              className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 whitespace-nowrap transition-all ${
                activeTab === 'council'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-orange-500" />
              <span>🏛️ Council (1:1 Uploads)</span>
            </button>
          )}

          {isTabVisible('gallery') && (
            <button
              onClick={() => setActiveTab('gallery')}
              className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 whitespace-nowrap transition-all ${
                activeTab === 'gallery'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5 text-indigo-500" />
              <span>🖼️ Gallery</span>
            </button>
          )}

          {isTabVisible('events') && (
            <button
              onClick={() => setActiveTab('events')}
              className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 whitespace-nowrap transition-all ${
                activeTab === 'events'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-rose-500" />
              <span>📅 Events</span>
            </button>
          )}

          {isTabVisible('news') && (
            <button
              onClick={() => setActiveTab('news')}
              className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 whitespace-nowrap transition-all ${
                activeTab === 'news'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Newspaper className="w-3.5 h-3.5 text-blue-500" />
              <span>📰 News</span>
            </button>
          )}

          {isTabVisible('newsletters') && (
            <button
              onClick={() => setActiveTab('newsletters')}
              className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 whitespace-nowrap transition-all ${
                activeTab === 'newsletters'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-teal-500" />
              <span>📄 Bulletins & Reader</span>
            </button>
          )}

          {isTabVisible('popup') && (
            <button
              onClick={() => setActiveTab('popup')}
              className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 whitespace-nowrap transition-all ${
                activeTab === 'popup'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <BellRing className="w-3.5 h-3.5 text-orange-500" />
              <span>📢 Promo Modal</span>
            </button>
          )}

          {isTabVisible('appointments') && (
            <button
              onClick={() => setActiveTab('appointments')}
              className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 whitespace-nowrap transition-all ${
                activeTab === 'appointments'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-cyan-500" />
              <span>📋 Appointments ({appointments.length})</span>
            </button>
          )}

          {isTabVisible('donations') && (
            <button
              onClick={() => setActiveTab('donations')}
              className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 whitespace-nowrap transition-all ${
                activeTab === 'donations'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Heart className="w-3.5 h-3.5 text-rose-500" />
              <span>❤️ Donations ({donations.length})</span>
            </button>
          )}

        </div>
      </div>

      {/* Main Workspace Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">

        {/* ========================================================================= */}
        {/* 🔐 TAB 1b: USERS & ROLE-BASED ACCESS CONTROL (SUPER ADMIN ONLY)            */}
        {/* ========================================================================= */}
        {activeTab === 'users' && isSuperAdmin && (
          <div className="space-y-6">
            
            {/* Header & Quick Action */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold shadow-inner">
                  <ShieldCheck className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <span>Organization Users & Role-Based Access Control</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800 text-[10px] font-black uppercase font-mono">
                      Super Admin Authority
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Authorized Super Admins: <strong>Saravanan D (CTO/000038)</strong> & <strong>Prabhanjan (Information Systems/010177)</strong>.
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setNewUserEmpId('');
                  setNewUserName('');
                  setNewUserEmail('');
                  setNewUserRole('finance');
                  setNewUserDepartment('');
                  setNewUserPassword('');
                  setNewUserPhone('+91 80 6903 8900');
                  setIsAddUserModalOpen(true);
                }}
                className="btn-primary !py-2.5 px-5 text-xs font-black shadow-md flex items-center gap-2 self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Create New User</span>
              </button>
            </div>

            {/* User Statistics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                <div className="text-[11px] font-bold text-slate-400">Total Registered Staff</div>
                <div className="text-2xl font-black text-slate-900 mt-1">{adminAccountsList.length}</div>
                <div className="text-[10px] text-slate-500 mt-0.5 font-medium">Active CMS Accounts</div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                <div className="text-[11px] font-bold text-orange-600">Super Admins</div>
                <div className="text-2xl font-black text-orange-600 mt-1">
                  {adminAccountsList.filter(a => a.role === 'super_admin').length}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5 font-medium">Root Access Authority</div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                <div className="text-[11px] font-bold text-emerald-600">Finance & Verification</div>
                <div className="text-2xl font-black text-emerald-600 mt-1">
                  {adminAccountsList.filter(a => a.role === 'finance').length}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5 font-medium">80G Tax Exemption Desk</div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                <div className="text-[11px] font-bold text-purple-600">HR & Academics</div>
                <div className="text-2xl font-black text-purple-600 mt-1">
                  {adminAccountsList.filter(a => a.role === 'hr').length}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5 font-medium">Talent & DNB Admissions</div>
              </div>
            </div>

            {/* Users Directory Table */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h4 className="text-sm font-black text-slate-900">
                    Internal User Accounts Directory ({adminAccountsList.length})
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Role-specific accounts authenticated for internal institutional network & IP access.
                  </p>
                </div>
                <span className="text-xs text-orange-600 font-mono font-bold">
                  {adminAccountsList.length} Active Accounts
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3.5">Emp ID</th>
                      <th className="p-3.5">Staff Member & Email</th>
                      <th className="p-3.5">Assigned Role</th>
                      <th className="p-3.5">Department / Unit</th>
                      <th className="p-3.5">Security Password</th>
                      <th className="p-3.5">Created By</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    {adminAccountsList.map((user) => {
                      const isRootAdmin = user.email === 'saravanan@sankaraeye.com' || user.email === 'prabhanjan@sankaraeye.com';
                      return (
                        <tr key={user.email} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-3.5">
                            <span className="font-mono font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-md border border-orange-200 text-[11px]">
                              #{user.empId || 'N/A'}
                            </span>
                          </td>
                          <td className="p-3.5">
                            <div className="font-bold text-slate-900 flex items-center gap-1.5">
                              <span>{user.name}</span>
                              {isRootAdmin && (
                                <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full font-black">
                                  ROOT
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-500 font-mono">{user.email}</div>
                          </td>
                          <td className="p-3.5">
                            <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wide inline-flex items-center gap-1 ${
                              user.role === 'super_admin'
                                ? 'bg-orange-100 text-orange-800 border border-orange-200'
                                : user.role === 'finance'
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                : user.role === 'hr'
                                ? 'bg-purple-100 text-purple-800 border border-purple-200'
                                : user.role === 'marketing'
                                ? 'bg-amber-100 text-amber-800 border border-amber-200'
                                : user.role === 'management'
                                ? 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                                : 'bg-slate-100 text-slate-800 border border-slate-200'
                            }`}>
                              {user.roleLabel || user.role}
                            </span>
                          </td>
                          <td className="p-3.5 text-slate-600 font-medium">
                            {user.department}
                          </td>
                          <td className="p-3.5">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-slate-700 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                                {user.passcode || '••••••••'}
                              </span>
                              <button
                                onClick={() => {
                                  setEditingUserPasscodeEmail(user.email);
                                  setNewPasscodeDraft(user.passcode || '');
                                }}
                                className="text-[10px] text-orange-600 font-bold hover:underline"
                              >
                                Reset
                              </button>
                            </div>
                          </td>
                          <td className="p-3.5 text-[11px] text-slate-400">
                            {user.createdBy || 'System'}
                          </td>
                          <td className="p-3.5 text-right">
                            {isRootAdmin ? (
                              <span className="text-[10px] text-slate-400 font-mono bg-slate-100 px-2 py-1 rounded-md">
                                Protected
                              </span>
                            ) : (
                              <button
                                onClick={() => {
                                  if (window.confirm(`⚠️ SUPER ADMIN CONFIRMATION:\n\nRevoke all CMS and database access for staff user "${user.name}" (${user.email} - Emp ID: #${user.empId})?`)) {
                                    deleteAdminAccount(user.email);
                                  }
                                }}
                                className="px-2.5 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 font-bold text-[11px] inline-flex items-center gap-1 border border-red-200 transition-colors"
                              >
                                <Trash2 className="w-3 h-3" />
                                <span>Revoke</span>
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* 📈 TAB 1: REAL-TIME ANALYTICS & LIVE ACTIVITY STREAM                      */}
        {/* ========================================================================= */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            
            {/* Top Stat Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              
              <div className="p-4 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-1">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    Live Online Visitors
                  </span>
                  <Radio className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900">428</div>
                <p className="text-[10px] text-slate-500">Active browsing sessions right now</p>
              </div>

              <div className="p-4 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-1">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                    Today Pageviews
                  </span>
                  <BarChart3 className="w-4 h-4 text-blue-500" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900">14,892</div>
                <p className="text-[10px] text-emerald-600 font-bold">↑ +18.4% vs last Wednesday</p>
              </div>

              <div className="p-4 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-1">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-orange-600">
                    Conversion Actions
                  </span>
                  <TrendingUp className="w-4 h-4 text-orange-500" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900">186</div>
                <p className="text-[10px] text-slate-500">Bookings, Pledges & Donations today</p>
              </div>

              <div className="p-4 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-1">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600">
                    Total Admissions / Exams
                  </span>
                  <GraduationCap className="w-4 h-4 text-purple-500" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900">{examApplications.length + 32}</div>
                <p className="text-[10px] text-slate-500">DNB & Optometry applications</p>
              </div>

            </div>

            {/* Middle Section: Popular Pages + Live Activity Stream */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Popular Sections Breakdown (7 cols) */}
              <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-base font-black text-slate-900">Most Visited Clinical Specialties & Pages</h3>
                    <p className="text-xs text-slate-500">Traffic distribution across medical departments</p>
                  </div>
                  <span className="text-xs font-bold text-slate-400">Past 24 Hours</span>
                </div>

                <div className="space-y-3.5 text-xs">
                  <div>
                    <div className="flex justify-between font-bold text-slate-800 mb-1">
                      <span>1. LASIK & SMILE Pro Laser Suites (Bangalore & Coimbatore)</span>
                      <span className="text-orange-600">4,320 views (29%)</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-orange-500 rounded-full" style={{ width: '29%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-bold text-slate-800 mb-1">
                      <span>2. Cataract Surgery (FLACS Robotic Laser Precision)</span>
                      <span className="text-blue-600">3,710 views (25%)</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '25%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-bold text-slate-800 mb-1">
                      <span>3. Hospitals Network (Varanasi, Guntur, Shimoga, Jaipur)</span>
                      <span className="text-emerald-600">2,840 views (19%)</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '19%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-bold text-slate-800 mb-1">
                      <span>4. DNB Ophthalmology & Fellowship Admissions (Education)</span>
                      <span className="text-purple-600">2,110 views (14%)</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: '14%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-bold text-slate-800 mb-1">
                      <span>5. Gift of Vision (80G Tax Exempt Giving & Pledges)</span>
                      <span className="text-rose-600">1,912 views (13%)</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-rose-500 rounded-full" style={{ width: '13%' }} />
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Top Traffic Sources: Google Organic (68%), Direct (21%), WhatsApp Shares (11%)</span>
                </div>
              </div>

              {/* Right Column: Live User Activity Stream (5 cols) */}
              <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <h3 className="text-base font-black text-slate-900">Live Activity Stream</h3>
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold">Real-Time Events</span>
                </div>

                <div className="space-y-3 overflow-y-auto max-h-[380px] pr-1">
                  {activityLogs.map((log) => (
                    <div 
                      key={log.id} 
                      className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1 hover:border-slate-300 transition-colors text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 flex items-center gap-1.5">
                          {log.category === 'appointment' && <Clock className="w-3.5 h-3.5 text-blue-600" />}
                          {log.category === 'donation' && <Heart className="w-3.5 h-3.5 text-rose-600" />}
                          {log.category === 'pledge' && <Eye className="w-3.5 h-3.5 text-orange-600" />}
                          {log.category === 'career' && <Briefcase className="w-3.5 h-3.5 text-amber-600" />}
                          {log.category === 'exam' && <GraduationCap className="w-3.5 h-3.5 text-purple-600" />}
                          {log.category === 'admin' && <ShieldCheck className="w-3.5 h-3.5 text-slate-600" />}
                          <span>{log.action}</span>
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-snug">{log.details}</p>
                      {log.location && (
                        <div className="text-[10px] text-slate-400 font-medium flex items-center gap-1 pt-0.5">
                          <MapPin className="w-3 h-3 text-slate-300" />
                          <span>{log.location}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* 🪔 TAB 2: OCCASION & FESTIVAL WISHES HEADER BANNER                         */}
        {/* ========================================================================= */}
        {activeTab === 'wishes' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-500" />
                    <span>Occasion & Festival Wishes Header Banner</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Display a slim, festive celebration bar across the top of the entire website during festivals and milestones.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const next = !wishesBanner.isEnabled;
                      toggleWishesBanner(next);
                      setWishesDraft(prev => ({ ...prev, isEnabled: next }));
                    }}
                    className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
                      wishesBanner.isEnabled
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-xs'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${wishesBanner.isEnabled ? 'bg-emerald-600 animate-pulse' : 'bg-slate-400'}`} />
                    <span>{wishesBanner.isEnabled ? 'BANNER IS ACTIVE LIVE' : 'BANNER IS DISABLED'}</span>
                  </button>
                </div>
              </div>

              {/* Interactive Live Preview Box */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Live Preview in Website Header:</span>
                <div className={`p-2.5 rounded-2xl text-xs text-center border font-medium shadow-inner ${
                  wishesDraft.theme === 'royal-gold' ? 'bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-800 text-white' :
                  wishesDraft.theme === 'emerald-glow' ? 'bg-gradient-to-r from-emerald-800 via-teal-700 to-emerald-900 text-white' :
                  wishesDraft.theme === 'patriotic-tricolor' ? 'bg-gradient-to-r from-orange-600 via-amber-700 to-emerald-700 text-white' :
                  wishesDraft.theme === 'deep-navy' ? 'bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 text-white' :
                  'bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white'
                }`}>
                  <div className="flex items-center justify-center gap-2 flex-wrap text-center">
                    <span className="font-black text-amber-100">{wishesDraft.occasionTitle}</span>
                    <span className="opacity-40">|</span>
                    <span className="text-[11px] opacity-95">{wishesDraft.greetingMessage}</span>
                    {wishesDraft.actionText && (
                      <span className="underline font-bold text-[11px] text-amber-200 cursor-pointer">
                        {wishesDraft.actionText}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Edit Form */}
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  updateWishesBanner(wishesDraft);
                }} 
                className="space-y-4 pt-2 text-xs"
              >
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Occasion Title (e.g. Diwali, Independence Day, Eye Donation Fortnight)</label>
                  <input
                    type="text"
                    required
                    value={wishesDraft.occasionTitle}
                    onChange={(e) => setWishesDraft({ ...wishesDraft, occasionTitle: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-xs focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Heartfelt Greeting Message from Sri Kanchi Kamakoti Medical Trust</label>
                  <textarea
                    rows={2}
                    required
                    value={wishesDraft.greetingMessage}
                    onChange={(e) => setWishesDraft({ ...wishesDraft, greetingMessage: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-xs focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Banner Visual Theme</label>
                    <select
                      value={wishesDraft.theme}
                      onChange={(e) => setWishesDraft({ ...wishesDraft, theme: e.target.value as any })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-xs focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                    >
                      <option value="saffron-festive">Saffron Festive (Diwali / Traditional)</option>
                      <option value="royal-gold">Royal Gold & Amber (Golden Jubilee)</option>
                      <option value="emerald-glow">Emerald Glow (Health & Vision Fortnight)</option>
                      <option value="patriotic-tricolor">Patriotic Tricolor (Independence / Republic Day)</option>
                      <option value="deep-navy">Deep Navy (Clinical Milestones & New Year)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Call-to-Action Link Text (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Sponsor Sight This Festive Season →"
                      value={wishesDraft.actionText || ''}
                      onChange={(e) => setWishesDraft({ ...wishesDraft, actionText: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-xs focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    className="btn-primary w-full !py-3 text-xs font-black shadow-md flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save & Publish Wishes Banner Live</span>
                  </button>
                </div>
              </form>

            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 🏥 TAB 3: HOSPITAL UNITS & STAFFING CMS                                   */}
        {/* ========================================================================= */}
        {activeTab === 'hospitals' && (
          <div className="space-y-6">
            
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Hospital Units Staffing & Doctor Management</h3>
                  <p className="text-xs text-slate-500">
                    Update Chief Medical Officers, Hospital Administrators, timings, and beds across all 14 hospital units.
                  </p>
                </div>

                {/* Unit Selector Dropdown */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500">Select Unit:</span>
                  <select
                    value={selectedHospitalId}
                    onChange={(e) => handleSelectHospital(e.target.value)}
                    className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-black text-slate-800 focus:outline-hidden"
                  >
                    {hospitalsList.map(h => (
                      <option key={h.id} value={h.id}>{h.name} ({h.state})</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Hospital Edit Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updateHospitalUnit(hospitalDraft.id, hospitalDraft);
                }}
                className="space-y-4 border-t border-slate-100 pt-4 text-xs"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Chief Medical Officer / Head Doctor *</label>
                    <input
                      type="text"
                      required
                      value={hospitalDraft.headDoctor}
                      onChange={(e) => setHospitalDraft({ ...hospitalDraft, headDoctor: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-xs focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Doctor Specialty Role / Designation</label>
                    <input
                      type="text"
                      value={hospitalDraft.headDoctorRole || ''}
                      onChange={(e) => setHospitalDraft({ ...hospitalDraft, headDoctorRole: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-xs focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Hospital Administrator / General Manager Name</label>
                    <input
                      type="text"
                      value={hospitalDraft.administratorName || ''}
                      onChange={(e) => setHospitalDraft({ ...hospitalDraft, administratorName: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-xs focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Administrator Role / Contact</label>
                    <input
                      type="text"
                      value={hospitalDraft.administratorRole || ''}
                      onChange={(e) => setHospitalDraft({ ...hospitalDraft, administratorRole: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-xs focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Total Bed Capacity</label>
                    <input
                      type="number"
                      value={hospitalDraft.beds || 200}
                      onChange={(e) => setHospitalDraft({ ...hospitalDraft, beds: Number(e.target.value) })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-xs focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">General Telephone</label>
                    <input
                      type="text"
                      value={hospitalDraft.phone}
                      onChange={(e) => setHospitalDraft({ ...hospitalDraft, phone: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-xs focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Emergency 24/7 Hotline</label>
                    <input
                      type="text"
                      value={hospitalDraft.emergencyPhone || ''}
                      onChange={(e) => setHospitalDraft({ ...hospitalDraft, emergencyPhone: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-xs focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* 1:1 or Facility Image Upload */}
                <ImageUploadField
                  label="Hospital Facility Image"
                  value={hospitalDraft.image}
                  onChange={(img) => setHospitalDraft({ ...hospitalDraft, image: img })}
                  aspectRatio="16:9"
                  helpText="Upload a high-res photo of the hospital exterior or surgical laser suite."
                />

                <div className="pt-2">
                  <button
                    type="submit"
                    className="btn-primary !py-3 px-6 text-xs font-black shadow-md flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes for {hospitalDraft.name}</span>
                  </button>
                </div>
              </form>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* 🎓 TAB 4: DNB & FELLOWSHIP EXAM APPLICATIONS                              */}
        {/* ========================================================================= */}
        {activeTab === 'exams' && (
          <div className="space-y-6">
            
            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
              
              <div className="relative flex-1 min-w-[240px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search applicants by Name, Roll No (#EXAM2026...), or Email..."
                  value={examSearchText}
                  onChange={(e) => setExamSearchText(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500">Course:</span>
                <select
                  value={examCourseFilter}
                  onChange={(e) => setExamCourseFilter(e.target.value)}
                  className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-hidden"
                >
                  <option value="All">All Academic Courses ({examApplications.length})</option>
                  <option value="DNB Ophthalmology">DNB Ophthalmology</option>
                  <option value="Fellowship in Cornea & Refractive">Cornea & Refractive Fellowship</option>
                  <option value="Fellowship in Vitreo-Retina">Vitreo-Retina Fellowship</option>
                  <option value="B.Sc Optometry Entrance">B.Sc Optometry Entrance</option>
                  <option value="M.Sc Clinical Optometry">M.Sc Clinical Optometry</option>
                </select>
              </div>

            </div>

            {/* Applicants Table */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200">
                    <tr>
                      <th className="p-4">Roll Number</th>
                      <th className="p-4">Candidate Name</th>
                      <th className="p-4">Applied Course</th>
                      <th className="p-4">Preferred Center</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Score</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredExams.map((app) => (
                      <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-4 font-mono font-black text-orange-600">{app.rollNumber}</td>
                        <td className="p-4">
                          <div className="font-bold text-slate-900">{app.candidateName}</div>
                          <div className="text-[11px] text-slate-500">{app.email} • {app.phone}</div>
                        </td>
                        <td className="p-4 font-semibold text-slate-800">{app.courseType}</td>
                        <td className="p-4 text-slate-600">{app.preferredExamCenter?.split('-')[1]?.trim() || app.preferredExamCenter}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-black border ${
                            app.status === 'Selected' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                            app.status === 'Interview Shortlisted' ? 'bg-purple-50 text-purple-800 border-purple-200' :
                            app.status === 'Admit Card Issued' ? 'bg-blue-50 text-blue-800 border-blue-200' :
                            app.status === 'Waitlisted' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                            'bg-slate-100 text-slate-700 border-slate-200'
                          }`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="p-4 font-bold text-slate-900">{app.score ? `${app.score}%` : 'Pending Exam'}</td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => {
                              setSelectedExamForModal(app);
                              setExamNoteDraft(app.interviewNotes || '');
                              setExamScoreDraft(app.score || 85);
                            }}
                            className="px-3 py-1.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-700 font-bold text-xs transition-colors"
                          >
                            Review
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* 🏛️ TAB 6: COUNCIL MEMBERS (WITH 1:1 LOCAL IMAGE UPLOAD)                   */}
        {/* ========================================================================= */}
        {activeTab === 'council' && (
          <div className="space-y-6">
            
            <div className="flex flex-wrap items-center justify-between gap-4">
              
              {/* Category Pills */}
              <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-xs">
                {(['trustees', 'steering', 'leadership'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCouncilCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition-colors ${
                      councilCategory === cat
                        ? 'bg-slate-900 text-white'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {cat === 'trustees' ? 'Trustees & Founders' : cat === 'steering' ? 'Steering Committee' : 'Leadership Council'}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setIsAddCouncilModalOpen(true)}
                className="btn-primary !py-2 !px-4 text-xs font-black flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Member (1:1 Image)</span>
              </button>

            </div>

            {/* Member Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {(councilCategory === 'trustees' ? trustees : councilCategory === 'steering' ? steeringCouncil : leadershipCouncil).map((m) => (
                <div
                  key={m.id}
                  className="bg-white rounded-3xl border border-slate-200 shadow-xs p-5 space-y-4 hover:border-orange-300 transition-colors flex flex-col justify-between"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0">
                      {m.image ? (
                        <img src={m.image} alt={m.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400 font-black text-sm">
                          {m.name.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-900 leading-snug">{m.name}</h4>
                      <p className="text-xs text-orange-600 font-bold">{m.role}</p>
                      <p className="text-[11px] text-slate-500">{m.designation}</p>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-600 leading-relaxed line-clamp-3">
                    {m.bio}
                  </p>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400 text-[10px]">Rank #{m.order || 1}</span>
                    <button
                      onClick={() => deleteCouncilMember(councilCategory, m.id)}
                      className="text-red-600 hover:text-red-700 font-bold text-xs flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* 💼 TAB 5: HR TALENT POOL                                                  */}
        {/* ========================================================================= */}
        {activeTab === 'applications' && (
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
              <div className="relative flex-1 min-w-[240px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search candidates by name, role, email..."
                  value={appSearchText}
                  onChange={(e) => setAppSearchText(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-hidden"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500">Unit:</span>
                <select
                  value={appUnitFilter}
                  onChange={(e) => setAppUnitFilter(e.target.value)}
                  className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                >
                  <option value="All">All 14 Units</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Coimbatore">Coimbatore</option>
                  <option value="Varanasi">Varanasi</option>
                  <option value="Guntur">Guntur</option>
                  <option value="Shimoga">Shimoga</option>
                </select>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200">
                    <tr>
                      <th className="p-4">Candidate</th>
                      <th className="p-4">Applied Department & Role</th>
                      <th className="p-4">Preferred Unit</th>
                      <th className="p-4">Qualification</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredApplications.map((app) => (
                      <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-4">
                          <div className="font-bold text-slate-900">{app.candidateName || app.applicantName}</div>
                          <div className="text-[11px] text-slate-500">{app.email} • {app.phone}</div>
                        </td>
                        <td className="p-4 font-semibold text-slate-800">{app.departmentRole}</td>
                        <td className="p-4 font-medium text-orange-600">{app.preferredUnit}</td>
                        <td className="p-4 text-slate-600">{app.qualification} ({app.experienceYears})</td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-orange-50 text-orange-800 border border-orange-200">
                            {app.status || 'New'}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => {
                              setSelectedAppForModal(app);
                              setHrNoteDraft(app.hrNotes || '');
                            }}
                            className="px-3 py-1.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-700 font-bold text-xs"
                          >
                            Review CV
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 🖼️ TAB 7: PHOTO GALLERY                                                   */}
        {/* ========================================================================= */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-slate-900">Media & Photographic Gallery</h3>
                <p className="text-xs text-slate-500">Manage high-resolution images for rural camps, laser suites, and hospital events.</p>
              </div>
              <button
                onClick={() => setIsAddGalleryModalOpen(true)}
                className="btn-primary !py-2 !px-4 text-xs font-black flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Upload Photo</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {galleryList.map((g) => (
                <div key={g.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs space-y-3 p-4">
                  <div className="h-44 w-full rounded-2xl overflow-hidden bg-slate-100">
                    <img src={g.imageUrl} alt={g.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-orange-600 uppercase font-mono">{g.category}</span>
                    <h4 className="text-sm font-black text-slate-900 leading-snug">{g.title}</h4>
                    <p className="text-xs text-slate-500">{g.caption}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400 text-[10px]">{g.date}</span>
                    <button onClick={() => deleteGalleryItem(g.id)} className="text-red-600 font-bold hover:underline">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 📅 TAB 8: EVENTS & CONFERENCES                                            */}
        {/* ========================================================================= */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-slate-900">Clinical Conferences & Outreach Events</h3>
                <p className="text-xs text-slate-500">Live events scheduled on events.sankaraeye.in.</p>
              </div>
              <button
                onClick={() => setIsAddEventModalOpen(true)}
                className="btn-primary !py-2 !px-4 text-xs font-black flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Event</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {eventsList.map((ev) => (
                <div key={ev.id} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-orange-600 font-mono bg-orange-50 px-2 py-0.5 rounded">
                        {ev.category}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">{ev.date}</span>
                    </div>
                    <h4 className="text-sm font-black text-slate-900">{ev.title}</h4>
                    <p className="text-xs text-slate-600">{ev.description}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{ev.location}</span>
                    </span>
                    <button onClick={() => deleteEvent(ev.id)} className="text-red-600 font-bold hover:underline">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 📰 TAB 9: NEWS & PRESS                                                    */}
        {/* ========================================================================= */}
        {activeTab === 'news' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-slate-900">News & Press Releases</h3>
                <p className="text-xs text-slate-500">Official press statements and humanitarian milestones.</p>
              </div>
              <button
                onClick={() => setIsAddNewsModalOpen(true)}
                className="btn-primary !py-2 !px-4 text-xs font-black flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Publish News</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {newsList.map((n) => (
                <div key={n.id} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-blue-600 font-mono bg-blue-50 px-2 py-0.5 rounded">
                      {n.category}
                    </span>
                    <h4 className="text-sm font-black text-slate-900">{n.title}</h4>
                    <p className="text-xs text-slate-600 line-clamp-2">{n.summary}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400">{n.source} • {n.date}</span>
                    <button onClick={() => deleteNews(n.id)} className="text-red-600 font-bold hover:underline">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 📄 TAB 10: NEWSLETTERS & BULLETINS                                        */}
        {/* ========================================================================= */}
        {activeTab === 'newsletters' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-slate-900">Quarterly Vision Bulletins & Interactive Reader</h3>
                <p className="text-xs text-slate-500">Published newsletters available in the website magazine reader.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {newslettersList.map((nl) => (
                <div key={nl.id} className="bg-white rounded-3xl border border-slate-200 p-5 space-y-3 shadow-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-16 bg-slate-100 rounded-xl overflow-hidden p-2 flex items-center justify-center">
                      <img src={nl.coverImage} alt={nl.title} className="max-h-full max-w-full object-contain" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-orange-600 font-mono">{nl.edition}</span>
                      <h4 className="text-xs font-black text-slate-900 leading-snug">{nl.title}</h4>
                      <p className="text-[10px] text-slate-400">{nl.date} • {nl.fileSize}</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2">{nl.description}</p>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[10px] text-emerald-700 font-bold">{nl.pages?.length || 1} Reader Pages Configured</span>
                    <button onClick={() => deleteNewsletter(nl.id)} className="text-red-600 font-bold hover:underline">
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 📢 TAB 11: PROMO MODAL CONFIGURATION                                      */}
        {/* ========================================================================= */}
        {activeTab === 'popup' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Homepage Promo Announcement Card</h3>
                  <p className="text-xs text-slate-500">Configure the 100% pure white Golden Jubilee / special announcement card.</p>
                </div>
                <button
                  onClick={() => togglePromoPopup(!promoPopup.isEnabled)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                    promoPopup.isEnabled ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {promoPopup.isEnabled ? 'Active Live' : 'Disabled'}
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Headline Title</label>
                  <input
                    type="text"
                    value={promoPopup.title}
                    onChange={(e) => updatePromoPopup({ title: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={promoPopup.description}
                    onChange={(e) => updatePromoPopup({ description: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                  />
                </div>

                <ImageUploadField
                  label="Emblem / Promotional Logo"
                  value={promoPopup.imageUrl}
                  onChange={(img) => updatePromoPopup({ imageUrl: img })}
                  aspectRatio="1:1"
                />
              </div>

            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 📋 TAB 12: OUTPATIENT APPOINTMENTS                                        */}
        {/* ========================================================================= */}
        {activeTab === 'appointments' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200">
                    <tr>
                      <th className="p-4">Ref ID</th>
                      <th className="p-4">Patient Name</th>
                      <th className="p-4">Hospital Location</th>
                      <th className="p-4">Specialty</th>
                      <th className="p-4">Slot</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {appointments.map((apt) => (
                      <tr key={apt.id} className="hover:bg-slate-50/80">
                        <td className="p-4 font-mono font-bold text-orange-600">{apt.bookingRef}</td>
                        <td className="p-4 font-bold text-slate-900">{apt.patientName} ({apt.phone})</td>
                        <td className="p-4 text-slate-700 font-medium">{apt.hospitalLocation}</td>
                        <td className="p-4 text-slate-600">{apt.clinicalSpecialty}</td>
                        <td className="p-4 text-slate-500">{apt.preferredDate} ({apt.preferredSlot})</td>
                        <td className="p-4 font-bold text-emerald-700">{apt.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* ❤️ TAB 13: DONATIONS & RAZORPAY GATEWAY                                    */}
        {/* ========================================================================= */}
        {activeTab === 'donations' && (
          <div className="space-y-8">
            
            {/* 💳 Super Admin Only: Razorpay Credentials & NVIDIA NIM Nemotron AI Cards */}
            {(adminUser?.role === 'super_admin' || adminUser?.email === 'prabhanjan@sankaraeye.com') && (
              <>
                {/* 💳 Super Admin Razorpay Credentials Manager */}
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                        💳
                      </div>
                      <div>
                        <h3 className="text-base font-black text-slate-900">
                          Razorpay Payment Gateway Credentials
                        </h3>
                        <p className="text-xs text-slate-500">
                          Configure your official Razorpay API keys for online 80G tax-exempt donations.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1.5 ${
                        rzpIsLive 
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                          : 'bg-amber-100 text-amber-800 border border-amber-300'
                      }`}>
                        <span className={`w-2 h-2 rounded-full ${rzpIsLive ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                        <span>{rzpIsLive ? 'Live Mode Active' : 'Test Mode (Sandbox)'}</span>
                      </span>
                    </div>
                  </div>

                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      updateRazorpayConfig({
                        keyId: rzpKeyId.trim(),
                        keySecret: rzpKeySecret.trim(),
                        isLive: rzpIsLive,
                        merchantName: rzpMerchantName.trim()
                      });
                    }}
                    className="space-y-4 text-xs"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          Razorpay Key ID <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. rzp_test_SlgNbXAEE5rBdc or rzp_live_..."
                          value={rzpKeyId}
                          onChange={(e) => setRzpKeyId(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-orange-500"
                        />
                        <span className="text-[10px] text-slate-400 mt-1 block">
                          Public Key exposed to client checkout modal.
                        </span>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="block font-bold text-slate-700">
                            Razorpay Key Secret <span className="text-red-500">*</span>
                          </label>
                          <button
                            type="button"
                            onClick={() => setRzpShowSecret(!rzpShowSecret)}
                            className="text-[10px] text-orange-600 hover:underline font-bold"
                          >
                            {rzpShowSecret ? 'Hide Secret' : 'Show Secret'}
                          </button>
                        </div>
                        <input
                          type={rzpShowSecret ? 'text' : 'password'}
                          required
                          placeholder="e.g. uyKxr4J1QCHDlBb9FBoMn3pd"
                          value={rzpKeySecret}
                          onChange={(e) => setRzpKeySecret(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-orange-500"
                        />
                        <span className="text-[10px] text-slate-400 mt-1 block">
                          Used for backend signature verification and webhook authentication.
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          Merchant Brand Display Name
                        </label>
                        <input
                          type="text"
                          value={rzpMerchantName}
                          onChange={(e) => setRzpMerchantName(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-orange-500"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          Gateway Environment
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setRzpIsLive(false)}
                            className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                              !rzpIsLive
                                ? 'bg-amber-50 border-amber-500 text-amber-900 ring-2 ring-amber-400/20'
                                : 'bg-slate-50 border-slate-200 text-slate-600'
                            }`}
                          >
                            🧪 Test Sandbox
                          </button>
                          <button
                            type="button"
                            onClick={() => setRzpIsLive(true)}
                            className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                              rzpIsLive
                                ? 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-400/20'
                                : 'bg-slate-50 border-slate-200 text-slate-600'
                            }`}
                          >
                            🚀 Live Production
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                      <div className="text-[11px] text-slate-500">
                        Active Test Key: <code className="bg-slate-100 px-1 py-0.5 rounded font-mono font-bold">rzp_test_SlgNbXAEE5rBdc</code>
                      </div>
                      <button
                        type="submit"
                        className="btn-primary !py-2.5 px-6 text-xs font-black shadow-md flex items-center gap-2"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Save Razorpay Credentials</span>
                      </button>
                    </div>
                  </form>
                </div>
              </>
            )}

            {/* 📜 80G Donation Transactions Table */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-sm font-black text-slate-900">
                    All Donation Transactions ({donations.length})
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Click the HR Verification tick icon to generate Form 10BD-compliant 80G tax receipt & dispatch PDF via Zoho SMTP.
                  </p>
                </div>
                <span className="text-xs text-orange-600 font-black">
                  Total Raised: ₹{donations.reduce((a, b) => a + b.amount, 0).toLocaleString('en-IN')}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200">
                    <tr>
                      <th className="p-4">Receipt Ref</th>
                      <th className="p-4">Donor Name</th>
                      <th className="p-4">Contact</th>
                      <th className="p-4">Amount</th>
                      <th className="p-4">Payment Ref</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-center w-16">Verify</th>
                      <th className="p-4">Date</th>
                      <th className="p-4 text-right">Super Admin</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {donations.map((don) => {
                      const isVerified = don.paymentVerified || don.status === 'Verified' || don.status === 'Success';
                      const canVerify = (adminUser?.role === 'super_admin' || adminUser?.role === 'admin' || adminUser?.role === 'finance' || adminUser?.role === 'hr' || adminUser?.email === 'prabhanjan@sankaraeye.com' || adminUser?.department?.toLowerCase().includes('finance') || adminUser?.department?.toLowerCase().includes('accounts') || adminUser?.department?.toLowerCase().includes('hr'));

                      return (
                        <tr key={don.id} className="hover:bg-slate-50/80">
                          <td className="p-4 font-mono font-bold text-orange-600">
                            {don.receiptNumber}
                          </td>
                          <td className="p-4 font-bold text-slate-900">
                            <div>{don.donorName}</div>
                            {don.panNumber && (
                              <span className="text-[10px] text-slate-400 font-mono">PAN: {don.panNumber}</span>
                            )}
                          </td>
                          <td className="p-4 text-slate-600">
                            <div>{don.email}</div>
                            <div className="text-[11px] text-slate-400">{don.phone}</div>
                          </td>
                          <td className="p-4 font-black text-slate-900">₹{don.amount.toLocaleString('en-IN')}</td>
                          <td className="p-4 font-mono text-[11px] text-slate-500">
                            {don.paymentId || 'pay_direct_seed'}
                          </td>
                          <td className="p-4">
                            {isVerified ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                <span>Verified (80G Sent)</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                                <Clock className="w-3 h-3 text-amber-600 animate-pulse" />
                                <span>Pending Verification</span>
                              </span>
                            )}
                          </td>
                          
                          {/* HR & Finance Verification Column (Strictly Icon Only) */}
                          <td className="p-4 text-center">
                            {canVerify ? (
                              isVerified ? (
                                <div 
                                  className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-300 flex items-center justify-center mx-auto" 
                                  title={don.verifiedBy ? `Payment Verified by ${don.verifiedBy} on ${don.verifiedAt ? new Date(don.verifiedAt).toLocaleDateString() : 'Record'}` : 'Payment Verified (80G PDF Emailed)'}
                                >
                                  <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                                </div>
                              ) : (
                                <button
                                  disabled={verifyingDonationId === don.id}
                                  onClick={async () => {
                                    setVerifyingDonationId(don.id);
                                    try {
                                      await verifyAndDispatchDonationReceipt(don.id, adminUser?.name || (adminUser?.role === 'finance' ? 'Finance Admin' : 'HR Admin'));
                                    } finally {
                                      setVerifyingDonationId(null);
                                    }
                                  }}
                                  className="w-8 h-8 rounded-lg bg-emerald-50 hover:bg-emerald-600 text-emerald-600 hover:text-white border border-emerald-500 flex items-center justify-center mx-auto transition-all shadow-xs hover:shadow-md cursor-pointer active:scale-90"
                                  title="Click to Verify Payment & Dispatch 80G Tax Receipt PDF"
                                >
                                  {verifyingDonationId === don.id ? (
                                    <Clock className="w-4 h-4 text-emerald-700 animate-spin" />
                                  ) : (
                                    <Check className="w-4 h-4 stroke-[3]" />
                                  )}
                                </button>
                              )
                            ) : (
                              <div 
                                className="w-8 h-8 rounded-lg bg-slate-100 text-slate-400 border border-slate-200 flex items-center justify-center mx-auto" 
                                title="Restricted to Finance, HR & Super Admin"
                              >
                                <Lock className="w-3.5 h-3.5" />
                              </div>
                            )}
                          </td>

                          <td className="p-4 text-slate-400">{new Date(don.date).toLocaleDateString()}</td>
                          <td className="p-4 text-right">
                            {(adminUser?.role === 'super_admin' || adminUser?.email === 'prabhanjan@sankaraeye.com') ? (
                              <button
                                onClick={() => {
                                  if (window.confirm(`⚠️ SUPER ADMIN CONFIRMATION:\n\nPermanently delete donation record #${don.receiptNumber} for "${don.donorName}" (₹${don.amount.toLocaleString('en-IN')})?\n\nThis action cannot be undone.`)) {
                                    deleteDonation(don.id);
                                  }
                                }}
                                className="px-2.5 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 font-bold text-[11px] inline-flex items-center gap-1.5 border border-red-200 transition-colors"
                                title="Super Admin Only Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Delete</span>
                              </button>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[10px] text-slate-400 font-mono bg-slate-100 px-2 py-1 rounded-md">
                                <Lock className="w-3 h-3 text-slate-400" />
                                <span>Restricted</span>
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* 🔍 MODALS (EXAM REVIEW, COUNCIL ADD, HR REVIEW)                            */}
      {/* ========================================================================= */}

      {/* 1. Exam Applicant Review Modal */}
      {selectedExamForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="font-mono text-orange-600 font-bold">#{selectedExamForModal.rollNumber}</span>
                <h3 className="text-base font-black text-slate-900">{selectedExamForModal.candidateName}</h3>
              </div>
              <button onClick={() => setSelectedExamForModal(null)} className="w-7 h-7 bg-slate-100 rounded-full">✕</button>
            </div>

            <div className="space-y-2">
              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <div><span className="text-slate-400">Course:</span> <strong>{selectedExamForModal.courseType}</strong></div>
                <div><span className="text-slate-400">Qualifications:</span> {selectedExamForModal.qualifications}</div>
                <div><span className="text-slate-400">Current Institution:</span> {selectedExamForModal.currentInstitution}</div>
                <div><span className="text-slate-400">Contact:</span> {selectedExamForModal.phone} • {selectedExamForModal.email}</div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Update Application / Admission Status</label>
                <select
                  value={selectedExamForModal.status}
                  onChange={(e) => updateExamApplicationStatus(selectedExamForModal.id, e.target.value as any, examNoteDraft, examScoreDraft)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                >
                  <option value="Application Received">Application Received</option>
                  <option value="Admit Card Issued">Admit Card Issued</option>
                  <option value="Interview Shortlisted">Interview Shortlisted</option>
                  <option value="Selected">Selected for Admission</option>
                  <option value="Waitlisted">Waitlisted</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Examiner Interview / Clinical Notes</label>
                <textarea
                  rows={3}
                  value={examNoteDraft}
                  onChange={(e) => setExamNoteDraft(e.target.value)}
                  placeholder="Enter examiner comments, surgical aptitude notes..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  updateExamApplicationStatus(selectedExamForModal.id, selectedExamForModal.status, examNoteDraft, examScoreDraft);
                  setSelectedExamForModal(null);
                }}
                className="btn-primary !py-2 px-4 text-xs font-bold"
              >
                Save Applicant Evaluation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Council Add Member Modal (1:1 Photo Upload) */}
      {isAddCouncilModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">Add Council Member (1:1 Aspect Ratio)</h3>
              <button onClick={() => setIsAddCouncilModalOpen(false)} className="w-7 h-7 bg-slate-100 rounded-full">✕</button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                addCouncilMember(councilCategory, {
                  name: councilDraft.name,
                  role: councilDraft.role,
                  designation: councilDraft.designation,
                  category: councilCategory,
                  image: councilDraft.image,
                  bio: councilDraft.bio,
                  city: councilDraft.city,
                  order: councilDraft.order
                });
                setIsAddCouncilModalOpen(false);
                setCouncilDraft({
                  name: '',
                  role: '',
                  designation: '',
                  category: 'leadership',
                  image: '',
                  bio: '',
                  city: 'Bangalore',
                  order: 10
                });
              }}
              className="space-y-3"
            >
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Rajesh Sundaram"
                  value={councilDraft.name}
                  onChange={(e) => setCouncilDraft({ ...councilDraft, name: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Council Role *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Managing Trustee"
                    value={councilDraft.role}
                    onChange={(e) => setCouncilDraft({ ...councilDraft, role: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Designation</label>
                  <input
                    type="text"
                    placeholder="e.g. Senior Vitreo-Retina Surgeon"
                    value={councilDraft.designation}
                    onChange={(e) => setCouncilDraft({ ...councilDraft, designation: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              {/* 1:1 Image Upload Component */}
              <ImageUploadField
                label="Council Member Portrait (1:1 Square)"
                value={councilDraft.image}
                onChange={(img) => setCouncilDraft({ ...councilDraft, image: img })}
                aspectRatio="1:1"
                helpText="Upload a square 1:1 portrait. Image is encoded and saved directly in local database."
              />

              <div>
                <label className="block font-bold text-slate-700 mb-1">Biography</label>
                <textarea
                  rows={2}
                  placeholder="Brief clinical background and leadership experience..."
                  value={councilDraft.bio}
                  onChange={(e) => setCouncilDraft({ ...councilDraft, bio: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddCouncilModalOpen(false)}
                  className="px-3 py-1.5 rounded-xl text-slate-600 hover:bg-slate-100 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary !py-2 px-4 text-xs font-black shadow-md"
                >
                  Save Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. Add Photo to Gallery Modal */}
      {isAddGalleryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">Upload Gallery Image</h3>
              <button onClick={() => setIsAddGalleryModalOpen(false)} className="w-7 h-7 bg-slate-100 rounded-full">✕</button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                addGalleryItem(galleryDraft);
                setIsAddGalleryModalOpen(false);
                setGalleryDraft({
                  title: '',
                  category: 'Hospitals',
                  imageUrl: '',
                  date: 'August 2026',
                  caption: ''
                });
              }}
              className="space-y-3"
            >
              <div>
                <label className="block font-bold text-slate-700 mb-1">Image Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. FLACS Laser Suite at Bangalore"
                  value={galleryDraft.title}
                  onChange={(e) => setGalleryDraft({ ...galleryDraft, title: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Category</label>
                <select
                  value={galleryDraft.category}
                  onChange={(e) => setGalleryDraft({ ...galleryDraft, category: e.target.value as any })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                >
                  <option value="Hospitals">Hospitals</option>
                  <option value="Rural Camps">Rural Camps</option>
                  <option value="Laser Tech">Laser Tech</option>
                  <option value="Events & Awards">Events & Awards</option>
                </select>
              </div>

              <ImageUploadField
                label="Photo Upload"
                value={galleryDraft.imageUrl}
                onChange={(img) => setGalleryDraft({ ...galleryDraft, imageUrl: img })}
                aspectRatio="16:9"
              />

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddGalleryModalOpen(false)}
                  className="px-3 py-1.5 rounded-xl text-slate-600 hover:bg-slate-100 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary !py-2 px-4 text-xs font-black shadow-md"
                >
                  Save Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. HR Application Detail Modal */}
      {selectedAppForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200 text-xs max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] text-orange-600 font-bold font-mono">CANDIDATE #{selectedAppForModal.id}</span>
                <h3 className="text-base font-black text-slate-900">{selectedAppForModal.candidateName || selectedAppForModal.applicantName}</h3>
              </div>
              <button onClick={() => setSelectedAppForModal(null)} className="w-7 h-7 bg-slate-100 rounded-full">✕</button>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl space-y-1.5 text-xs">
              <div><span className="text-slate-400">Department:</span> <strong>{selectedAppForModal.departmentRole}</strong></div>
              <div><span className="text-slate-400">Preferred Unit:</span> <strong className="text-orange-600">{selectedAppForModal.preferredUnit}</strong></div>
              <div><span className="text-slate-400">Qualifications:</span> {selectedAppForModal.qualification} ({selectedAppForModal.experienceYears})</div>
              <div><span className="text-slate-400">Email:</span> {selectedAppForModal.email}</div>
              <div><span className="text-slate-400">Phone:</span> {selectedAppForModal.phone}</div>
              {selectedAppForModal.coverNote && (
                <div className="pt-1 text-slate-600 italic">"{selectedAppForModal.coverNote}"</div>
              )}
            </div>

            <div className="space-y-2">
              <label className="block font-bold text-slate-700">Update Hiring Status</label>
              <select
                value={selectedAppForModal.status || 'New'}
                onChange={(e) => updateJobApplicationStatus(selectedAppForModal.id, e.target.value as any, hrNoteDraft)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
              >
                <option value="New">New Application</option>
                <option value="Under Review">Under Review (HR Screening)</option>
                <option value="Shortlisted">Shortlisted for Technical Round</option>
                <option value="Interview Scheduled">Interview Scheduled</option>
                <option value="Offer Extended">Offer Extended</option>
                <option value="Rejected">Rejected / Archived</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">HR & Clinical Interviewer Notes</label>
              <textarea
                rows={3}
                value={hrNoteDraft}
                onChange={(e) => setHrNoteDraft(e.target.value)}
                placeholder="Enter candidate feedback, salary expectations, relocation timeline..."
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => {
                  deleteJobApplication(selectedAppForModal.id);
                  setSelectedAppForModal(null);
                }}
                className="text-red-600 font-bold hover:underline"
              >
                Delete Application
              </button>
              <button
                onClick={() => {
                  updateJobApplicationStatus(selectedAppForModal.id, selectedAppForModal.status || 'Under Review', hrNoteDraft);
                  setSelectedAppForModal(null);
                }}
                className="btn-primary !py-2 px-4 text-xs font-bold"
              >
                Save Evaluation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. ➕ Super Admin Create New User Modal */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 space-y-5 shadow-2xl border border-slate-200 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-black">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">Create New Staff Account</h3>
                  <p className="text-[11px] text-slate-400 font-medium">Role-Based Internal Access Provisioning</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddUserModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 font-bold"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newUserEmpId.trim() || !newUserName.trim() || !newUserEmail.trim() || !newUserPassword.trim() || !newUserDepartment.trim()) {
                  showToast('Please fill out all required fields.');
                  return;
                }

                const success = createAdminAccount({
                  empId: newUserEmpId.trim(),
                  name: newUserName.trim(),
                  email: newUserEmail.trim(),
                  role: newUserRole,
                  department: newUserDepartment.trim(),
                  passcode: newUserPassword.trim(),
                  phone: newUserPhone.trim()
                });

                if (success) {
                  setIsAddUserModalOpen(false);
                  setNewUserEmpId('');
                  setNewUserName('');
                  setNewUserEmail('');
                  setNewUserPassword('');
                  setNewUserDepartment('');
                }
              }}
              className="space-y-3.5"
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Employee ID (Emp ID) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 010195"
                    value={newUserEmpId}
                    onChange={(e) => setNewUserEmpId(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Assigned Role <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={newUserRole}
                    onChange={(e) => setNewUserRole(e.target.value as AdminRole)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="finance">Finance (Donation & 80G Verification)</option>
                    <option value="hr">HR (Talent & Exam Applications)</option>
                    <option value="marketing">Marketing (Wishes Banner & PR)</option>
                    <option value="administration">Administration (Hospital Network)</option>
                    <option value="management">Management (Trustee & Governance)</option>
                    <option value="admin">Systems Administrator</option>
                    <option value="super_admin">Super Administrator</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ananya Sharma"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Official Email ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@sankaraeye.com"
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Backend Password / Passcode <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya@1234"
                    value={newUserPassword}
                    onChange={(e) => setNewUserPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Department / Unit <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Central Accounts & Audit"
                    value={newUserDepartment}
                    onChange={(e) => setNewUserDepartment(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Contact Phone (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="+91 80 6903 8900"
                    value={newUserPhone}
                    onChange={(e) => setNewUserPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddUserModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary !py-2.5 px-6 text-xs font-black shadow-md flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Provision Account</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. 🔑 Reset Passcode Modal */}
      {editingUserPasscodeEmail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-slate-200 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900">Reset Security Passcode</h3>
              <button
                onClick={() => setEditingUserPasscodeEmail(null)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="text-slate-600 text-[11px]">
              Updating password for: <strong className="text-slate-900 font-mono">{editingUserPasscodeEmail}</strong>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">New Passcode</label>
              <input
                type="text"
                required
                value={newPasscodeDraft}
                onChange={(e) => setNewPasscodeDraft(e.target.value)}
                placeholder="Enter new secure password"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setEditingUserPasscodeEmail(null)}
                className="px-3.5 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (newPasscodeDraft.trim().length < 4) {
                    showToast('Passcode must be at least 4 characters.');
                    return;
                  }
                  updateAdminAccount(editingUserPasscodeEmail, { passcode: newPasscodeDraft.trim() });
                  setEditingUserPasscodeEmail(null);
                }}
                className="btn-primary !py-2 px-5 text-xs font-black"
              >
                Update Passcode
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
