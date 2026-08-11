import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, AlertCircle, Loader2, Copy, Check, Globe } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAudioSound } from '../../hooks/useAudioSound';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    signInWithGoogle,
  } = useAuth();

  const { playClickSound, playSuccessSound } = useAudioSound();

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [unauthorizedDomain, setUnauthorizedDomain] = useState<string | null>(null);
  const [domainCopied, setDomainCopied] = useState(false);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (!isAuthModalOpen) {
      setErrorMsg(null);
      setSuccessMsg(null);
      setUnauthorizedDomain(null);
      setDomainCopied(false);
      setLoading(false);
    }
  }, [isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const currentHostname = typeof window !== 'undefined' ? window.location.hostname : '';

  const handleCopyDomain = () => {
    if (currentHostname) {
      navigator.clipboard.writeText(currentHostname);
      setDomainCopied(true);
      setTimeout(() => setDomainCopied(false), 2000);
    }
  };

  const handleGoogleSignIn = async () => {
    playClickSound();
    setLoading(true);
    setErrorMsg(null);
    setUnauthorizedDomain(null);
    try {
      await signInWithGoogle();
      playSuccessSound();
    } catch (err: any) {
      if (err?.code === 'auth/popup-closed-by-user') {
        setErrorMsg('Sign-in window closed before completing.');
      } else if (err?.code === 'auth/cancelled-popup-request') {
        // Ignored duplicate request
      } else if (err?.code === 'auth/unauthorized-domain' || (err?.message && err.message.includes('unauthorized-domain'))) {
        setUnauthorizedDomain(currentHostname || 'your app domain');
        setErrorMsg('Domain authorization required in Firebase Console.');
      } else {
        setErrorMsg(err?.message || 'Google Sign-In failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-sm bg-[#FFFBF5] text-[#2C1810] border border-[#EAE0D2] rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={() => {
            playClickSound();
            setIsAuthModalOpen(false);
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-white hover:bg-[#FFF3E0] text-[#8C7063] hover:text-[#2C1810] border border-[#EAE0D2] transition-colors cursor-pointer"
          aria-label="Close Auth Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-[#FFF3E0] text-[#D48C29] flex items-center justify-center mx-auto text-2xl shadow-xs border border-[#FCD34D]/40">
            🧇
          </div>
          <h2 className="font-serif font-black text-2xl text-[#2C1810]">
            Welcome to Waffles On Wheels
          </h2>
          <p className="text-xs text-[#8C7063] font-sans leading-relaxed">
            Sign in with Google to track your orders, save favorite waffles, and earn rewards!
          </p>
        </div>

        {/* Feedback Alert */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {unauthorizedDomain && (
          <div className="mb-5 p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-[#2C1810] text-xs font-sans space-y-3">
            <div className="flex items-start gap-2">
              <Globe className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[#2C1810]">Firebase Domain Whitelist Required</p>
                <p className="text-[11px] text-[#8C7063] leading-relaxed mt-0.5">
                  Add this domain under <strong className="text-[#2C1810]">Firebase Console &gt; Authentication &gt; Settings &gt; Authorized domains</strong> to enable Google Login for this URL.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-amber-200 font-mono text-[11px] text-slate-800">
              <span className="truncate max-w-[180px]">{unauthorizedDomain}</span>
              <button
                type="button"
                onClick={handleCopyDomain}
                className="px-2.5 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 text-[10px] font-bold font-sans flex items-center gap-1 transition-colors cursor-pointer"
              >
                {domainCopied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* 1-Click Google Sign In Button */}
        <div className="space-y-4">
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full py-4 px-5 rounded-2xl bg-white border-2 border-[#EAE0D2] hover:border-[#D48C29] text-[#2C1810] font-syne font-bold text-sm flex items-center justify-center gap-3 transition-all shadow-md hover:bg-[#FFF8EE] active:scale-98 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-5 h-5 text-[#D48C29] animate-spin" />
                <span>Signing in...</span>
              </div>
            ) : (
              <>
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google</span>
              </>
            )}
          </button>

          <p className="text-[11px] text-[#8C7063] text-center font-sans">
            By signing in, you agree to our Terms & Privacy Policy.
          </p>
        </div>

      </div>
    </div>
  );
};

