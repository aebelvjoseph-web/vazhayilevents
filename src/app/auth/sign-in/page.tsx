"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Check } from "lucide-react";
import { AnimatedInput } from "@/components/ui/AnimatedInput";
import { FingerprintLoader } from "@/components/ui/FingerprintLoader";
import { auth, db } from "@/lib/firebase/config";
import { signInWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loginError, setLoginError] = useState("");

  const validate = () => {
    let valid = true;
    const newErrors: typeof errors = {};
    
    if (!email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }
    
    if (!password) {
      newErrors.password = "Password is required";
      valid = false;
    }
    
    setErrors(newErrors);
    return valid;
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setLoginError("");
    setIsAuthenticating(true);
    
    try {
      await signInWithEmailAndPassword(auth, email, password);

      // Show success animation
      setIsAuthenticating(false);
      setIsSuccess(true);
      
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1500);
    } catch (error: any) {
      setIsAuthenticating(false);
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        setLoginError("Invalid email or password");
      } else {
        setLoginError(error.message || "Failed to sign in");
      }
    }
  };

  const handleSocialLogin = async (providerName: "google" | "facebook") => {
    try {
      setLoginError("");
      setIsAuthenticating(true);
      
      const provider = providerName === "google" 
        ? new GoogleAuthProvider() 
        : new FacebookAuthProvider();
        
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user exists in Firestore, if not create a document
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          fullName: user.displayName || "User",
          email: user.email || "",
          phone: user.phoneNumber || "",
          createdAt: new Date().toISOString()
        });
      }

      setIsAuthenticating(false);
      setIsSuccess(true);
      
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1500);

    } catch (error: any) {
      setIsAuthenticating(false);
      setLoginError(error.message || `Failed to sign in with ${providerName}`);
    }
  };

  return (
    <main className="min-h-screen bg-dark-900 text-cream-200 flex items-center justify-center py-24 px-6 relative overflow-hidden">
      {/* Background cinematic elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold-900/20 via-dark-900 to-dark-900 pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md z-10"
      >
        <div className="text-center mb-10">
          <Link href="/" className="text-3xl font-serif font-bold text-gold-400 tracking-wider mb-2 block hover:scale-105 transition-transform">
            VAZHAYIL <span className="text-white font-light text-2xl">EVENTS</span>
          </Link>
          <p className="text-cream-200/60 mt-4">Sign in to your luxury account</p>
        </div>

        <div className="glass-card p-8 shadow-2xl relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            {!isAuthenticating && !isSuccess ? (
              <motion.form 
                key="form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSignIn}
              >
                <AnimatedInput
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={errors.email}
                  icon={<Mail size={18} />}
                />

                <AnimatedInput
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={errors.password}
                  icon={<Lock size={18} />}
                  rightElement={
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-white/40 hover:text-gold-400 transition-colors focus:outline-none"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  }
                />

                <div className="flex items-center justify-between mt-6 mb-8 text-sm">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${rememberMe ? 'bg-gold-500 border-gold-500' : 'border-white/20 group-hover:border-gold-500/50'}`}>
                      {rememberMe && <Check size={12} className="text-dark-900" />}
                    </div>
                    <input 
                      type="checkbox" 
                      className="hidden" 
                      checked={rememberMe} 
                      onChange={() => setRememberMe(!rememberMe)} 
                    />
                    <span className="text-cream-200/70 group-hover:text-cream-200 transition-colors">Remember me</span>
                  </label>
                  
                  <Link href="#" className="text-gold-400 hover:text-gold-300 transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-gold-400 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
                    Forgot password?
                  </Link>
                </div>

                {/* Login Error */}
                {loginError && (
                  <div className="mb-4 px-4 py-3 rounded-sm bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center">
                    {loginError}
                  </div>
                )}

                <button 
                  type="submit"
                  className="w-full bg-gold-500 text-dark-900 font-semibold uppercase tracking-widest py-4 rounded-sm hover:bg-gold-400 transition-colors relative overflow-hidden group mb-6"
                >
                  <span className="relative z-10">Sign In</span>
                  <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out" />
                </button>

                <div className="relative flex items-center justify-center mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10"></div>
                  </div>
                  <div className="relative bg-dark-900/50 px-4 text-xs text-cream-200/40 uppercase tracking-widest backdrop-blur-sm">
                    Or continue with
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button 
                    type="button" 
                    onClick={() => handleSocialLogin("google")}
                    className="flex items-center justify-center gap-2 py-3 border border-white/10 rounded-sm hover:border-gold-500/50 hover:bg-white/5 transition-all group"
                  >
                    <svg className="w-5 h-5 text-white group-hover:text-gold-400 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                    </svg>
                    <span className="text-sm">Google</span>
                  </button>
                  <button 
                    type="button" 
                    onClick={() => handleSocialLogin("facebook")}
                    className="flex items-center justify-center gap-2 py-3 border border-white/10 rounded-sm hover:border-gold-500/50 hover:bg-white/5 transition-all group"
                  >
                    <svg className="w-5 h-5 text-white group-hover:text-gold-400 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.001,2C6.478,2,2.001,6.477,2.001,12c0,5.086,3.627,9.309,8.471,9.907v-6.937H7.95v-2.97h2.521v-2.285c0-2.502,1.528-3.87,3.766-3.87c1.068,0,1.986,0.08,2.253,0.116v2.613l-1.547,0.001c-1.213,0-1.448,0.576-1.448,1.423v1.996h2.898l-0.378,2.97h-2.52v6.942C18.393,21.328,22.001,17.098,22.001,12C22.001,6.477,17.524,2,12.001,2z"/>
                    </svg>
                    <span className="text-sm">Facebook</span>
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div 
                key="loader"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12"
              >
                <FingerprintLoader isScanning={isAuthenticating} success={isSuccess} />
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className={`mt-6 text-sm font-medium tracking-widest uppercase ${isSuccess ? 'text-green-400' : 'text-gold-400'}`}
                >
                  {isSuccess ? "Authentication Successful" : "Verifying Credentials"}
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
        
        <p className="text-center mt-8 text-cream-200/60 text-sm">
          Don't have an account?{" "}
          <Link href="/auth/sign-up" className="text-gold-400 hover:text-gold-300 font-medium transition-colors">
            Create one
          </Link>
        </p>
      </motion.div>
    </main>
  );
}
