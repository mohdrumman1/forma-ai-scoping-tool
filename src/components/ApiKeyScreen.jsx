import { useState } from 'react';

export default function ApiKeyScreen({ onSubmit }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  function handleSubmit() {
    if (!value.trim().startsWith('sk-')) {
      setError(true);
      return;
    }
    onSubmit(value.trim());
  }

  return (
    <div id="api-screen">
      <div className="api-card">
        <h2>Enter Your API Key</h2>
        <p>You'll need an OpenRouter API key to generate scopes. Get one at openrouter.ai.</p>
        <div className="form-group">
          <label htmlFor="api-key-input">OpenRouter API Key</label>
          <input
            id="api-key-input"
            type="password"
            placeholder="sk-or-..."
            autoComplete="off"
            value={value}
            style={{ borderColor: error ? 'var(--red)' : '' }}
            onChange={e => { setValue(e.target.value); setError(false); }}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          />
        </div>
        <button className="btn btn-primary" onClick={handleSubmit}>Continue</button>
        <div className="api-note">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          Your key is stored in this browser session only and never logged or sent anywhere except OpenRouter.
        </div>
      </div>
    </div>
  );
}
