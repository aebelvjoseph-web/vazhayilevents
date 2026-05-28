"use client";

import { useState, forwardRef, InputHTMLAttributes, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AnimatedInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: ReactNode;
  rightElement?: ReactNode;
}

export const AnimatedInput = forwardRef<HTMLInputElement, AnimatedInputProps>(
  ({ label, error, icon, rightElement, className = "", ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = Boolean(props.value) || Boolean(props.defaultValue);
    const isFloating = isFocused || hasValue;

    return (
      <div className="relative w-full mb-6">
        <div 
          className={`relative flex items-center border rounded-md transition-all duration-300 bg-dark-900/50 backdrop-blur-sm ${
            error 
              ? "border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.2)]" 
              : isFocused 
                ? "border-gold-500 shadow-[0_0_10px_rgba(212,175,55,0.2)]" 
                : "border-white/20 hover:border-white/40"
          }`}
        >
          {icon && (
            <div className={`pl-4 transition-colors duration-300 ${isFocused ? "text-gold-400" : "text-white/40"}`}>
              {icon}
            </div>
          )}
          
          <div className="relative flex-grow h-14">
            <motion.label
              initial={false}
              animate={{
                y: isFloating ? -26 : 14,
                x: isFloating && !icon ? 0 : isFloating && icon ? -24 : 0,
                scale: isFloating ? 0.85 : 1,
                color: error ? "#ef4444" : isFocused ? "#D4AF37" : "#a1a1aa"
              }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className={`absolute left-4 transform origin-left pointer-events-none z-10 ${
                isFloating ? "bg-dark-800 px-1" : ""
              }`}
            >
              {label}
            </motion.label>
            
            <input
              ref={ref}
              {...props}
              onFocus={(e) => {
                setIsFocused(true);
                props.onFocus?.(e);
              }}
              onBlur={(e) => {
                setIsFocused(false);
                props.onBlur?.(e);
              }}
              className={`w-full h-full px-4 bg-transparent outline-none text-cream-200 autofill-bg-dark placeholder-transparent ${className}`}
              placeholder={label}
            />
          </div>

          {rightElement && (
            <div className="pr-4 flex items-center">
              {rightElement}
            </div>
          )}
        </div>

        {/* Error message popup */}
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute -bottom-5 left-1 text-xs text-red-500 font-medium"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

AnimatedInput.displayName = "AnimatedInput";
