import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useTheme } from '../context/ThemeContext';
import {
  GraduationCap,
  Shield,
  User,
  Lock,
  ArrowRight,
  Sparkles,
  BookOpen,
  Calculator,
  Award,
  Sun,
  Moon,
  Eye,
  EyeOff,
  CheckCircle2,
} from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const { login, users } = useAuth();
  const { showToast } = useToast();
  const { theme, toggleTheme } = useTheme();

  const [activeRoleTab, setActiveRoleTab] = useState<'siswa' | 'guru'>('siswa');
  const [username, setUsername] = useState('ahmad_fauzi');
  const [password, setPassword] = useState('123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Switch role tab
  const handleTabChange = (role: 'siswa' | 'guru') => {
    setActiveRoleTab(role);
    setError('');
    if (role === 'guru') {
      setUsername('guru_ahmad');
      setPassword('guru123');
    } else {
      setUsername('ahmad_fauzi');
      setPassword('123');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('Masukkan username terlebih dahulu.');
      return;
    }

    if (!password) {
      setError('Masukkan kata sandi / password.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const res = login(username, password);
      setIsLoading(false);
      if (res.success) {
        showToast('success', 'Berhasil Masuk', `Ahlan wa sahlan! Selamat datang di PAI-Waris Digital.`);
        onLoginSuccess();
      } else {
        setError(res.message || 'Username atau password tidak sesuai.');
        showToast('error', 'Login Gagal', res.message || 'Periksa kembali data login Anda.');
      }
    }, 200);
  };

  // Quick 1-click login helper
  const handleQuickLogin = (uname: string, pass: string, role: 'siswa' | 'guru') => {
    setActiveRoleTab(role);
    setUsername(uname);
    setPassword(pass);
    const res = login(uname, pass);
    if (res.success) {
      showToast('success', 'Login Cepat Berhasil', `Masuk sebagai ${uname}`);
      onLoginSuccess();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/20 to-teal-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950/20 flex flex-col justify-between text-slate-900 dark:text-slate-100 transition-colors">
      {/* Top Header Navbar with Official School Logo */}
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 p-1.5 flex items-center justify-center shadow-md border border-slate-200/80 dark:border-slate-700 shrink-0">
            <img
              src="/assets/aistudio/logo_d004d6e9.png"
              alt="Logo SMKN 1 Sidayu Gresik"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-black text-base sm:text-lg tracking-tight bg-gradient-to-r from-emerald-800 via-emerald-600 to-teal-700 dark:from-emerald-400 dark:via-emerald-300 dark:to-teal-300 bg-clip-text text-transparent">
                PAI-Waris Digital
              </h1>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300">
                Faraidh Syar'i
              </span>
            </div>
            <p className="text-[11px] font-bold text-slate-600 dark:text-slate-300 tracking-wider">
              SMKN 1 SIDAYU GRESIK
            </p>
          </div>
        </div>

        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 shadow-xs transition-colors"
          title="Ubah Tema"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
        </button>
      </header>

      {/* Main Login Center Area */}
      <main className="max-w-5xl w-full mx-auto px-4 py-6 sm:py-10 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
        {/* Left Side: School Branding & Features */}
        <div className="flex-1 space-y-6 text-center lg:text-left max-w-xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/80 border border-emerald-300/80 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300 text-xs font-bold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Media Pembelajaran Resmi PAI & Budi Pekerti
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Perhitungan Harta Waris Islam (Faraidh) SMKN 1 Sidayu
          </h2>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Aplikasi interaktif kurikulum PAI SMA/SMK. Dilengkapi materi fiqih mawaris, simulasi kalkulator waris otomatis, latihan soal gamifikasi XP, serta ujian kemampuan bersertifikat.
          </p>

          {/* 3 Key Feature Chips */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-1">
              <Calculator className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Kalkulator Waris</p>
              <p className="text-[11px] text-slate-500">Diagram pie & dalil Al-Qur'an</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-1">
              <BookOpen className="w-5 h-5 text-amber-500" />
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Materi Lengkap</p>
              <p className="text-[11px] text-slate-500">QS. An-Nisa: 11, 12, 176</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-1">
              <Award className="w-5 h-5 text-blue-500" />
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Monitoring & Rapor</p>
              <p className="text-[11px] text-slate-500">Ekspor laporan PDF & Excel</p>
            </div>
          </div>
        </div>

        {/* Right Side: The Branded Login Card */}
        <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-2xl space-y-5">
          {/* Logo Header Inside Card */}
          <div className="text-center space-y-2">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-50 dark:bg-slate-800 p-2 shadow-md border border-slate-200 dark:border-slate-700 flex items-center justify-center">
              <img
                src="/assets/aistudio/logo_d004d6e9.png"
                alt="Logo SMKN 1 Sidayu"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Masuk ke Aplikasi
              </h3>
              <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                SMK NEGERI 1 SIDAYU GRESIK
              </p>
            </div>
          </div>

          {/* Role Switcher Tabs */}
          <div className="grid grid-cols-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl gap-1">
            <button
              type="button"
              onClick={() => handleTabChange('siswa')}
              className={`py-2 px-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 ${
                activeRoleTab === 'siswa'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-emerald-600'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Portal Siswa</span>
            </button>
            <button
              type="button"
              onClick={() => handleTabChange('guru')}
              className={`py-2 px-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 ${
                activeRoleTab === 'guru'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-emerald-600'
              }`}
            >
              <Shield className="w-3.5 h-3.5 text-amber-300" />
              <span>Guru / Admin</span>
            </button>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs text-red-600 dark:text-red-300 font-semibold animate-in fade-in-50">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Username Akun
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder={activeRoleTab === 'siswa' ? 'Masukkan username siswa...' : 'Masukkan username guru...'}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-medium transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Password / Kata Sandi
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Masukkan kata sandi..."
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-medium transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 p-0.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                  title={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md shadow-emerald-700/20 active:scale-98 flex items-center justify-center gap-2"
            >
              <span>{isLoading ? 'Memproses...' : 'Masuk ke Aplikasi'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Click Shortcut Testing Badges */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <p className="text-[11px] font-bold text-slate-400 text-center uppercase tracking-wider">
              Akses Cepat Pengujian (1-Klik Masuk):
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin('guru_ahmad', 'guru123', 'guru')}
                className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 hover:bg-amber-100 dark:hover:bg-amber-950/60 text-amber-900 dark:text-amber-200 text-xs font-bold transition-all text-left flex items-center gap-2"
              >
                <Shield className="w-4 h-4 shrink-0 text-amber-500" />
                <div className="min-w-0">
                  <p className="font-extrabold text-[11px] truncate">Guru (Admin)</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">H. Ahmad Heru, M.Pd.I</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('ahmad_fauzi', '123', 'siswa')}
                className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 hover:bg-emerald-100 dark:hover:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 text-xs font-bold transition-all text-left flex items-center gap-2"
              >
                <User className="w-4 h-4 shrink-0 text-emerald-600" />
                <div className="min-w-0">
                  <p className="font-extrabold text-[11px] truncate">Siswa Demo</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">Ahmad Fauzi (XII RPL 1)</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-4 text-xs text-slate-400 border-t border-slate-200/80 dark:border-slate-800">
        PAI-Waris Digital • SMK Negeri 1 Sidayu Gresik © 2026 • Kurikulum Fiqih Mawaris Syafi'iyyah
      </footer>
    </div>
  );
};
