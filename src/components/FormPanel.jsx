import { useState } from 'react';

export default function FormPanel({ onGenerate, formError, loading }) {
  const [businessName, setBusinessName] = useState('');
  const [industry, setIndustry]         = useState('');
  const [problem, setProblem]           = useState('');
  const [budget, setBudget]             = useState('');
  const [timeline, setTimeline]         = useState('');

  function handleSubmit() {
    onGenerate({ businessName, industry, problem, budget, timeline });
  }

  return (
    <div id="form-panel">
      <div className="panel-title">Client Intake Brief</div>

      <div className="form-group">
        <label htmlFor="business-name">Business Name</label>
        <input
          id="business-name"
          type="text"
          placeholder="e.g. Apex Dental Group"
          value={businessName}
          onChange={e => setBusinessName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="industry">Industry</label>
        <input
          id="industry"
          type="text"
          placeholder="e.g. Healthcare, Real Estate, Legal"
          value={industry}
          onChange={e => setIndustry(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="problem">Problem to Solve</label>
        <span className="helper">Aim for 2–4 sentences describing what's broken or slow today.</span>
        <textarea
          id="problem"
          placeholder="e.g. We miss a lot of inbound calls after hours. Leads go cold before anyone follows up."
          value={problem}
          onChange={e => setProblem(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="budget">Rough Budget Range</label>
        <select id="budget" value={budget} onChange={e => setBudget(e.target.value)}>
          <option value="" disabled>Select a range</option>
          <option value="Under $2,000">Under $2,000</option>
          <option value="$2,000–$5,000">$2,000–$5,000</option>
          <option value="$5,000–$10,000">$5,000–$10,000</option>
          <option value="$10,000+">$10,000+</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="timeline">Timeline</label>
        <select id="timeline" value={timeline} onChange={e => setTimeline(e.target.value)}>
          <option value="" disabled>Select timeline</option>
          <option value="ASAP">ASAP</option>
          <option value="1–3 months">1–3 months</option>
          <option value="Flexible">Flexible</option>
        </select>
      </div>

      {formError && <div className="error-box">{formError}</div>}

      <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="13 2 13 9 20 9"/>
          <polygon points="22 2 2 22 13 13 22 2"/>
        </svg>
        {loading ? 'Generating…' : 'Generate Scope'}
      </button>

    </div>
  );
}
