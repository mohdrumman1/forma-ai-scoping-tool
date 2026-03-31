import { useState, useEffect } from 'react';

const STATUS_STEPS = [
  'Analysing client brief...',
  'Identifying AI opportunities...',
  'Mapping project phases...',
  'Assessing risks and investment...',
  'Finalising scope document...',
];

export default function LoadingState({ isLoading }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!isLoading) { setStep(0); return; }
    setStep(0);
    const interval = setInterval(() => {
      setStep(prev => Math.min(prev + 1, STATUS_STEPS.length - 1));
    }, 1500);
    return () => clearInterval(interval);
  }, [isLoading]);

  if (!isLoading) return null;

  const progress = Math.round(((step + 1) / STATUS_STEPS.length) * 88);

  return (
    <div id="loading-state">
      <div className="loading-spinner" />
      <div className="loading-text">
        <div className="loading-label">Building Your Scope</div>
        {/* key forces remount → triggers fadeIn animation on each step */}
        <div id="loading-message" key={step}>{STATUS_STEPS[step]}</div>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
