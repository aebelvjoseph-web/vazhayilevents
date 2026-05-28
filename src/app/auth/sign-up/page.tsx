"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Phone, Lock, Eye, EyeOff, Check } from "lucide-react";
import { AnimatedInput } from "@/components/ui/AnimatedInput";
import { PasswordStrength } from "@/components/ui/PasswordStrength";
import { auth, db } from "@/lib/firebase/config";
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [errors, setErrors] = useState<Partial<typeof formData>>({});
  const [signUpError, setSignUpError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error for field when typing
    if (errors[e.target.name as keyof typeof formData]) {
      setErrors({ ...errors, [e.target.name]: undefined });
    }
  };

  const validate = () => {
    let valid = true;
    const newErrors: Partial<typeof formData> = {};
    
    if (!formData.fullName.trim()) { newErrors.fullName = "Full name is required"; valid = false; }
    
    if (!formData.email) { newErrors.email = "Email is required"; valid = false; }
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) { newErrors.email = "Invalid email format"; valid = false; }
    
    if (!formData.phone) { newErrors.phone = "Phone number is required"; valid = false; }
    
    if (!formData.password) { newErrors.password = "Password is required"; valid = false; }
    else if (formData.password.length < 8) { newErrors.password = "Password must be at least 8 characters"; valid = false; }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }
    
    setErrors(newErrors);
    return valid;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || !termsAccepted) return;
    
    setSignUpError("");
    setIsSubmitting(true);
    
    try {
      // 1. Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      );
      
      const user = userCredential.user;

      // 2. Update Auth Profile with Full Name
      await updateProfile(user, {
        displayName: formData.fullName
      });

      // 3. Save additional details (Phone, Name) to Firestore
      await setDoc(doc(db, "users", user.uid), {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        createdAt: new Date().toISOString()
      });

      setIsSubmitting(false);
      setShowSuccessPopup(true);

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 3000);
      
    } catch (error: any) {
      setIsSubmitting(false);
      if (error.code === 'auth/email-already-in-use') {
        setErrors({ email: "An account with this email already exists" });
      } else {
        setSignUpError(error.message || "Failed to create account");
      }
    }
  };

  const handleSocialLogin = async (providerName: "google" | "facebook") => {
    try {
      setSignUpError("");
      setIsSubmitting(true);
      
      const provider = providerName === "google" 
        ? new GoogleAuthProvider() 
        : new FacebookAuthProvider();
        
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

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

      setIsSubmitting(false);
      setShowSuccessPopup(true);
      
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1500);

    } catch (error: any) {
      setIsSubmitting(false);
      setSignUpError(error.message || `Failed to sign up with ${providerName}`);
    }
  };

  return (
    <main className="min-h-screen bg-dark-900 text-cream-200 flex items-center justify-center py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-gold-900/10 via-dark-900 to-dark-900 pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg z-10"
      >
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-serif font-bold text-gold-400 tracking-wider mb-2 block hover:scale-105 transition-transform">
            VAZHAYIL <span className="text-white font-light text-2xl">EVENTS</span>
          </Link>
          <p className="text-cream-200/60 mt-2">Begin your luxury journey</p>
        </div>

        <div className="glass-card p-8 shadow-2xl relative">
          
          <form onSubmit={handleSignUp} className="mt-2">
            
            <AnimatedInput
              name="fullName"
              label="Full Name"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              error={errors.fullName}
              icon={<User size={18} />}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
              <AnimatedInput
                name="email"
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                icon={<Mail size={18} />}
              />
              <AnimatedInput
                name="phone"
                label="Phone Number"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
                icon={<Phone size={18} />}
              />
            </div>

            <AnimatedInput
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              icon={<Lock size={18} />}
              rightElement={
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-white/40 hover:text-gold-400 focus:outline-none">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
            />
            
            <PasswordStrength password={formData.password} />

            <AnimatedInput
              name="confirmPassword"
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              icon={<Lock size={18} />}
              rightElement={
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="text-white/40 hover:text-gold-400 focus:outline-none">
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
            />

            <label className="flex items-start gap-3 mt-4 mb-8 cursor-pointer group">
              <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center transition-colors shrink-0 ${termsAccepted ? 'bg-gold-500 border-gold-500' : 'border-white/20 group-hover:border-gold-500/50'}`}>
                {termsAccepted && <Check size={12} className="text-dark-900" />}
              </div>
              <input 
                type="checkbox" 
                className="hidden" 
                checked={termsAccepted} 
                onChange={() => setTermsAccepted(!termsAccepted)} 
              />
              <span className="text-sm text-cream-200/70 leading-tight">
                I agree to the <Link href="/terms" className="text-gold-400 hover:underline">Terms & Conditions</Link> and <Link href="/privacy" className="text-gold-400 hover:underline">Privacy Policy</Link>.
              </span>
            </label>

            {/* Sign Up Error */}
            {signUpError && (
              <div className="mb-4 px-4 py-3 rounded-sm bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center">
                {signUpError}
              </div>
            )}

            <button 
              type="submit"
              disabled={isSubmitting || !termsAccepted}
              className={`w-full py-4 rounded-sm font-semibold uppercase tracking-widest relative overflow-hidden transition-all mb-6 ${
                isSubmitting || !termsAccepted 
                  ? 'bg-white/10 text-white/40 cursor-not-allowed' 
                  : 'bg-gold-500 text-dark-900 hover:bg-gold-400 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]'
              }`}
            >
              <span className="relative z-10">{isSubmitting ? "Creating Account..." : "Sign Up"}</span>
            </button>

            <div className="relative flex items-center justify-center mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative bg-dark-900/50 px-4 text-xs text-cream-200/40 uppercase tracking-widest backdrop-blur-sm">
                Or sign up with
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
          </form>

          {/* Success Popup Overlay */}
          <AnimatePresence>
            {showSuccessPopup && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 bg-dark-900/90 backdrop-blur-md flex flex-col items-center justify-center rounded-2xl"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
                  className="w-20 h-20 bg-gold-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(212,175,55,0.5)]"
                >
                  <Check size={40} className="text-dark-900" />
                </motion.div>
                <motion.h3 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl font-serif text-white mb-2"
                >
                  Welcome to Luxury
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-cream-200/60 text-sm text-center px-8"
                >
                  Your account has been successfully created. Redirecting to sign in...
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
        
        <p className="text-center mt-8 text-cream-200/60 text-sm">
          Already have an account?{" "}
          <Link href="/auth/sign-in" className="text-gold-400 hover:text-gold-300 font-medium transition-colors">
            Sign in
          </Link>
        </p>
      </motion.div>
    </main>
  );
}
