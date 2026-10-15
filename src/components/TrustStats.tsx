import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Sparkles, Calendar, Award, ShieldCheck } from 'lucide-react';
import { SERVICES, SERVICE_CATEGORY_LABELS } from '../data/serviceMenu';

interface StatItemProps {
  finalValue: number;
  suffix?: string;
  label: string;
  sublabel: string;
  icon: React.ComponentType<{ className?: string }>;
}

const AnimatedStat: React.FC<StatItemProps> = ({
  finalValue,
  suffix = '',
  label,
  sublabel,
  icon: Icon,
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCount(finalValue);
      return;
    }

    const duration = 1200; // ms
    const steps = 30;
    const increment = finalValue / steps;
    const intervalTime = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= finalValue) {
        setCount(finalValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isInView, finalValue]);

  return (
    <div ref={ref} className="flex flex-col items-center sm:items-start text-center sm:text-left">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-full bg-[#13281D] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.15)]">
          <Icon className="w-4 h-4" />
        </div>
        <span
          className="text-3xl sm:text-4xl font-serif font-bold text-[#FAF6F0] tabular-nums"
          aria-label={`${finalValue}${suffix} ${label}`}
        >
          {count}
          {suffix}
        </span>
      </div>
      <h4 className="text-xs font-semibold uppercase tracking-wider text-[#D5E2D9]">
        {label}
      </h4>
      <p className="text-[11px] text-[#9CB2A4] mt-0.5 max-w-[200px]">
        {sublabel}
      </p>
    </div>
  );
};

export const TrustStats: React.FC = () => {
  return (
    <div className="mt-14 pt-10 border-t border-[#223E2E]">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
        <AnimatedStat
          finalValue={SERVICES.length}
          label="Menu Services"
          sublabel="Treatments listed on the current spa menu"
          icon={Award}
        />
        <AnimatedStat
          finalValue={Object.keys(SERVICE_CATEGORY_LABELS).length}
          label="Menu Categories"
          sublabel="Massage, hammam, waxing, facials & self care"
          icon={Sparkles}
        />
        <AnimatedStat
          finalValue={7}
          label="Days Sanctuary Access"
          sublabel="Open Monday through Sunday with private suites"
          icon={Calendar}
        />
        <AnimatedStat
          finalValue={5}
          suffix=".0"
          label="Star Guest Rating"
          sublabel="Verified reviews from Gwarinpa, Maitama & Abuja"
          icon={ShieldCheck}
        />
      </div>
    </div>
  );
};
