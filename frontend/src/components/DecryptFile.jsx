import React, { useState, useRef } from 'react';
import { decryptFile } from '../api';
import { UploadCloud, File as FileIcon, Unlock, Download, CheckCircle, AlertCircle, X, Loader2 } from 'lucide-react';

const DecryptFile = () => {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      resetState();
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      resetState();
    }
  };

  const resetState = () => {
    setError(null);
    setSuccess(false);
    setDownloadUrl(null);
    setProgress(0);
  };

  const getOriginalFileName = (encName) => {
    if (encName.endsWith('.enc')) {
      return encName.slice(0, -4);
    }
    return `decrypted_${encName}`;
  };

  const handleDecrypt = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select an encrypted file');
      return;
    }
    if (!password) {
      setError('Please enter the decryption password');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const blob = await decryptFile(file, password, (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setProgress(percentCompleted);
      });

      const url = window.URL.createObjectURL(new Blob([blob]));
      setDownloadUrl(url);
      setSuccess(true);
    } catch (err) {
      setError('Incorrect password or invalid file. Failed to decrypt.');
    } finally {
      setLoading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 transition-all duration-300 hover:shadow-2xl">
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 px-6 py-4">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <Unlock size={20} />
          Decrypt File
        </h2>
        <p className="text-emerald-100 text-sm mt-1">Restore your encrypted documents</p>
      </div>

      <div className="p-6">
        {/* Upload Area */}
        <div 
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${file ? 'border-emerald-300 bg-emerald-50/50' : 'border-slate-300 hover:border-emerald-400 hover:bg-slate-50'}`}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => !file && fileInputRef.current?.click()}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileSelect}
            // accept=".enc" 
            className="hidden" 
          />
          
          {file ? (
            <div className="flex flex-col items-center">
              <div className="relative">
                <FileIcon size={48} className="text-emerald-500 mb-3" />
                <button 
                  onClick={(e) => { e.stopPropagation(); setFile(null); resetState(); }} 
                  className="absolute -top-2 -right-2 bg-red-100 text-red-600 rounded-full p-1 hover:bg-red-200 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
              <p className="font-medium text-slate-800 line-clamp-1 max-w-[250px]">{file.name}</p>
              <p className="text-sm text-slate-500 mt-1">{formatFileSize(file.size)} • {file.type || 'Encrypted File'}</p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <UploadCloud size={48} className="text-slate-400 mb-3" />
              <p className="font-medium text-slate-700">Drop your .enc file here</p>
              <p className="text-sm text-slate-500 mt-1">or click to browse from your computer</p>
            </div>
          )}
        </div>

        {/* Form Area */}
        <form onSubmit={handleDecrypt} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Decryption Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Unlock size={16} className="text-slate-400" />
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter the correct password"
                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow outline-none"
                disabled={loading || success}
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-lg flex items-start gap-2 text-sm border border-red-100 animate-in fade-in slide-in-from-top-2">
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}

          {/* Progress Bar */}
          {loading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-slate-600">
                <span>Decrypting...</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div 
                  className="bg-emerald-600 h-2 rounded-full transition-all duration-300 ease-out" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Actions */}
          {!success ? (
            <button 
              type="submit" 
              disabled={!file || !password || loading}
              className={`w-full py-3 px-4 rounded-lg text-white font-medium flex items-center justify-center gap-2 transition-all
                ${!file || !password || loading 
                  ? 'bg-slate-300 cursor-not-allowed' 
                  : 'bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg hover:-translate-y-0.5'}`}
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Unlock size={18} />
                  Decrypt File
                </>
              )}
            </button>
          ) : (
            <div className="space-y-4">
              <div className="bg-green-50 text-green-700 p-4 rounded-lg flex items-center gap-3 border border-green-200 animate-in fade-in slide-in-from-top-2">
                <CheckCircle size={24} className="text-green-500 shrink-0" />
                <div>
                  <h4 className="font-medium">Decryption Successful!</h4>
                  <p className="text-sm opacity-90">Your file has been restored to its original state.</p>
                </div>
              </div>
              
              <a 
                href={downloadUrl} 
                download={getOriginalFileName(file.name)}
                className="w-full py-3 px-4 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:-translate-y-0.5"
                onClick={() => {
                  setTimeout(() => {
                    setFile(null);
                    setPassword('');
                    resetState();
                  }, 1000);
                }}
              >
                <Download size={18} />
                Download Decrypted File
              </a>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default DecryptFile;
