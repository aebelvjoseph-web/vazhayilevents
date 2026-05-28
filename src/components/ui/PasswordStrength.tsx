"use client";

import { motion } from "framer-motion";

interface PasswordStrengthProps {
  password?: string;
}

export function PasswordStrength({ password = "" }: PasswordStrengthProps) {
  const calculateStrength = (pass: string) => {
    let score = 0;
    if (!pass) return 0;
    
    if (pass.length >= 8) score += 25;
    if (pass.match(/[A-Z]/)) score += 25;
    if (pass.match(/[0-9]/)) score += 25;
    if (pass.match(/[^A-Za-z0-9]/)) score += 25;
    
    return score;
  };

  const strength = calculateStrength(password);
  
  const getColor = (score: number) => {
    if (score === 0) return "bg-gray-600";
    if (score <= 25) return "bg-red-500";
    if (score <= 50) return "bg-orange-500";
    if (score <= 75) return "bg-yellow-400";
    return "bg-green-500";
  };

  const getLabel = (score: number) => {
    if (score === 0) return "Too weak";
    if (score <= 25) return "Weak";
    if (score <= 50) return "Fair";
    if (score <= 75) return "Good";
    return "Strong";
  };

  const colorClass = getColor(strength);

  return (
    <div className="w-full mt-2 mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-cream-200/60">Password strength</span>
        <span className={`text-xs font-medium ${strength > 0 ? colorClass.replace('bg-', 'text-') : 'text-cream-200/60'}`}>
          {password ? getLabel(strength) : ""}
        </span>
      </div>
      <div className="flex gap-1 h-1.5 w-full bg-dark-900 rounded-full overflow-hidden">
        {[25, 50, 75, 100].map((threshold) => (
          <motion.div
            key={threshold}
            className={`h-full flex-1 rounded-full ${
              strength >= threshold ? colorClass : "bg-white/10"
            }`}
            initial={{ opacity: 0.5 }}
            animate={{ 
              opacity: strength >= threshold ? 1 : 0.3,
              scaleY: strength >= threshold ? 1 : 0.8
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </div>
  );
}
