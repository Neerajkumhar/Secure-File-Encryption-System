import React from 'react';
import { ArrowLeft, Shield, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const Report = () => {
  return (
    <main className="flex-1 max-w-5xl mx-auto px-2 sm:px-4 py-4 sm:py-8 w-full flex flex-col transition-all duration-300 h-full">
      <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
        <Link to="/" className="inline-flex items-center justify-center sm:justify-start gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors bg-blue-50 hover:bg-blue-100 px-4 py-2.5 sm:py-2 rounded-lg">
          <ArrowLeft size={16} /> <span>Back to Tool</span>
        </Link>
        <a href="/report.pdf" download className="inline-flex items-center justify-center sm:justify-start gap-2 text-slate-600 hover:text-slate-800 font-medium transition-colors bg-white hover:bg-slate-50 border border-slate-200 shadow-sm px-4 py-2.5 sm:py-2 rounded-lg">
          <Download size={16} /> Download PDF
        </a>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-3 sm:p-6 h-[80vh] min-h-[500px] mb-6 sm:mb-10 relative flex flex-col overflow-hidden">
        {/* Background purely aesthetic pattern */}
        <div className="absolute top-0 right-0 p-8 sm:p-12 opacity-5 pointer-events-none z-0">
          <Shield className="w-32 h-32 sm:w-[200px] sm:h-[200px]" />
        </div>
        
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4 tracking-tight z-10 relative">
          Project Documentation & Report
        </h1>

        <div className="flex-1 w-full bg-slate-100 rounded-xl overflow-hidden z-10 relative border border-slate-200 shadow-inner">
          <iframe 
            src="/report.pdf#toolbar=0" 
            title="Project Report PDF"
            className="w-full h-full border-0"
          >
            <div className="flex flex-col items-center justify-center h-full p-4 sm:p-8 text-center text-slate-600">
              <p className="mb-4">Your browser does not support natively viewing PDFs.</p>
              <a href="/report.pdf" className="inline-flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">
                <Download size={16} /> Download the PDF instead
              </a>
            </div>
          </iframe>
        </div>
      </div>
    </main>
  );
};

export default Report;
