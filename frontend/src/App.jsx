import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import EncryptFile from './components/EncryptFile';
import DecryptFile from './components/DecryptFile';
import Report from './pages/Report';
import { Shield, ShieldAlert, ShieldCheck, Github, FileText } from 'lucide-react';

function HomeContent() {
  const [activeTab, setActiveTab] = useState('encrypt');

  return (
    <main className="flex-1 max-w-6xl mx-auto px-4 py-8 w-full flex flex-col items-center justify-center animate-in fade-in duration-500">
      <div className="text-center mb-10 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">
          Protect your data with military-grade encryption
        </h2>
        <p className="text-slate-600 text-lg">
          A simple, secure academic demonstration of AES-256 Symmetric Encryption. Keep your sensible documents private and secure.
        </p>
      </div>

      {/* Tab Navigation (Mobile) */}
      <div className="md:hidden flex bg-slate-200 p-1 rounded-xl mb-6 w-full max-w-md mx-auto">
        <button
          onClick={() => setActiveTab('encrypt')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'encrypt' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-600'
            }`}
        >
          Encrypt
        </button>
        <button
          onClick={() => setActiveTab('decrypt')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'decrypt' ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-600'
            }`}
        >
          Decrypt
        </button>
      </div>

      {/* Grid Layout (Desktop/Tablet) */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className={`${activeTab === 'encrypt' ? 'block' : 'hidden'} md:block`}>
          <EncryptFile />
        </div>
        <div className={`${activeTab === 'decrypt' ? 'block' : 'hidden'} md:block`}>
          <DecryptFile />
        </div>
      </div>

      {/* Security badges footer */}
      <div className="mt-16 pt-8 border-t border-slate-200 w-full flex flex-wrap justify-center gap-8 opacity-75">
        <div className="flex items-center gap-2 text-slate-500">
          <ShieldCheck size={20} className="text-blue-500" />
          <span className="text-sm font-medium">AES-256 Encryption</span>
        </div>
        <div className="flex items-center gap-2 text-slate-500">
          <ShieldAlert size={20} className="text-indigo-500" />
          <span className="text-sm font-medium">No Data Stored</span>
        </div>
        <div className="flex items-center gap-2 text-slate-500">
          <Lock size={20} className="text-emerald-500" />
          <span className="text-sm font-medium">End-to-End Security</span>
        </div>
      </div>
    </main>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-100 selection:text-blue-900 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 transition-shadow hover:shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <Shield size={24} />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700 hidden sm:block">
              Secure File Encryption System
            </h1>
            <h1 className="text-xl font-bold text-blue-800 sm:hidden">
              Secure File
            </h1>
          </Link>
          <div className="flex items-center gap-4 text-sm text-slate-500 font-medium">
            <Link to="/report" className="hover:text-blue-600 flex items-center gap-1 transition-colors">
              <FileText size={16} /> Docs
            </Link>
            <a href="https://github.com/Neerajkumhar/Secure-File-Encryption-System" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 flex items-center gap-1 transition-colors">
              <Github size={16} /> GitHub
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Router */}
      <Routes>
        <Route path="/" element={<HomeContent />} />
        <Route path="/report" element={<Report />} />
      </Routes>

      {/* Footer */}
      <footer className="bg-slate-900 py-6 text-center text-slate-400 text-sm mt-auto z-10 relative">
        <p className="mb-2">Cyber Security Lab Academic Project Demonstration</p>
        <p>
          Developed by{' '}
          <a 
            href="https://neerajkumhar.space" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
          >
            Neeraj Kumhar
          </a>
        </p>
      </footer>
    </div>
  );
}

// Inline lock since it's not imported above
const Lock = ({ size, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
)

export default App;
