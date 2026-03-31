import { useState } from 'react';

export default function ScopeContent({ data, businessName }) {
  const [copyLabel, setCopyLabel] = useState('Copy to Clipboard');

  async function handleCopy() {
    const text = buildPlainText(data, businessName);
    try {
      await navigator.clipboard.writeText(text);
      setCopyLabel('Copied!');
      setTimeout(() => setCopyLabel('Copy to Clipboard'), 2000);
    } catch {
      setCopyLabel('Copy failed — try manually.');
    }
  }

  const PRIORITY_MAP = {
    'green': { label: 'Low',    className: 'green' },
    'amber': { label: 'Medium', className: 'amber' },
    'red':   { label: 'High',   className: 'red'   },
  };

  return (
    <div id="scope-content">

      <div className="scope-section">
        <div className="scope-label">Executive Summary</div>
        <p>{data.executiveSummary}</p>
      </div>

      <hr className="scope-divider" />

      <div className="scope-section">
        <div className="scope-label">Recommended Forma AI Service</div>
        <div className="value">{data.recommendedService}</div>
      </div>

      <hr className="scope-divider" />

      <div className="scope-section">
        <div className="scope-label">Project Phases</div>
        {(data.phases || []).map((phase, i) => (
          <div className="phase" key={i}>
            <div className="phase-header">
              <span className="phase-name">{phase.name}</span>
              <span className="phase-duration">{phase.duration}</span>
            </div>
            <ul>
              {(phase.deliverables || []).map((d, j) => <li key={j}>{d}</li>)}
            </ul>
          </div>
        ))}
      </div>

      <hr className="scope-divider" />

      <div className="scope-section">
        <div className="scope-label">Risk Flags</div>
        {(data.risks || []).map((risk, i) => {
          const level = ['green', 'amber', 'red'].includes(risk.level) ? risk.level : 'amber';
          const label = { green: 'Low', amber: 'Medium', red: 'High' }[level];
          return (
            <div className={`risk ${level}`} key={i}>
              <div className="risk-dot" />
              <span className="risk-text">
                <strong>{label} Risk:</strong> {risk.description}
              </span>
            </div>
          );
        })}
      </div>

      <hr className="scope-divider" />

      <div className="scope-section">
        <div className="scope-label">Investment Range</div>
        <div className="value">{data.investmentRange}</div>
      </div>

      <hr className="scope-divider" />

      <div className="scope-section">
        <div className="scope-label">Suggested Next Step</div>
        <div className="next-step-box">{data.nextStep}</div>
      </div>

      <div className="btn-row">
        <button className="btn btn-secondary" onClick={handleCopy}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
          </svg>
          {copyLabel}
        </button>
        <button className="btn btn-secondary" onClick={() => window.print()}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 6 2 18 2 18 9"/>
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
            <rect x="6" y="14" width="12" height="8"/>
          </svg>
          Print / Save as PDF
        </button>
      </div>

    </div>
  );
}

function buildPlainText(data, businessName) {
  let t = `FORMA AI — PROJECT SCOPE\n`;
  t += `Client: ${businessName}\n`;
  t += `Generated: ${new Date().toLocaleDateString('en-AU')}\n\n`;
  t += `EXECUTIVE SUMMARY\n${data.executiveSummary}\n\n`;
  t += `RECOMMENDED SERVICE\n${data.recommendedService}\n\n`;
  t += `PROJECT PHASES\n`;
  (data.phases || []).forEach((p, i) => {
    t += `\n${i + 1}. ${p.name} (${p.duration})\n`;
    (p.deliverables || []).forEach(d => { t += `   - ${d}\n`; });
  });
  t += `\nRISK FLAGS\n`;
  (data.risks || []).forEach(r => {
    const label = { green: 'Low', amber: 'Medium', red: 'High' }[r.level] || r.level;
    t += `[${label}] ${r.description}\n`;
  });
  t += `\nINVESTMENT RANGE\n${data.investmentRange}\n\n`;
  t += `SUGGESTED NEXT STEP\n${data.nextStep}\n`;
  return t;
}
