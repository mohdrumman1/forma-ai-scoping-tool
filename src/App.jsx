import { useState, useEffect } from 'react';
import Header from './components/Header';
import ApiKeyScreen from './components/ApiKeyScreen';
import FormPanel from './components/FormPanel';
import EmptyState from './components/EmptyState';
import LoadingState from './components/LoadingState';
import ScopeContent from './components/ScopeContent';

const SYSTEM_PROMPT = `You are a solutions consultant at Forma AI, an AI agency that delivers voice agents, AI receptionists, lead nurture automations, and AI content generation for small to medium businesses.

Given a client intake brief, produce a structured project scope document. Be specific and practical. Flag any risks that could blow out scope. Keep tone confident and professional but plain — no jargon.

Respond ONLY with a valid JSON object (no markdown fences, no extra text) with this exact structure:
{
  "executiveSummary": "string",
  "recommendedService": "string",
  "phases": [
    { "name": "string", "duration": "string", "deliverables": ["string"] }
  ],
  "risks": [
    { "level": "green|amber|red", "description": "string" }
  ],
  "investmentRange": "string",
  "nextStep": "string"
}`;

export default function App() {
  const [apiKey, setApiKey]           = useState('');
  const [screen, setScreen]           = useState('api'); // 'api' | 'app'
  const [loading, setLoading]         = useState(false);
  const [scopeData, setScopeData]     = useState(null);
  const [businessName, setBusinessName] = useState('');
  const [formError, setFormError]     = useState('');

  // On mount: check env var, then sessionStorage
  useEffect(() => {
    const envKey = import.meta.env.VITE_API_KEY;
    if (envKey?.startsWith('sk-')) {
      setApiKey(envKey);
      setScreen('app');
      return;
    }
    const stored = sessionStorage.getItem('forma_api_key');
    if (stored?.startsWith('sk-')) {
      setApiKey(stored);
      setScreen('app');
    }
  }, []);

  function handleKeySubmit(key) {
    setApiKey(key);
    sessionStorage.setItem('forma_api_key', key);
    setScreen('app');
  }

  function handleChangeKey() {
    setApiKey('');
    sessionStorage.removeItem('forma_api_key');
    setScopeData(null);
    setFormError('');
    setScreen('api');
  }

  async function handleGenerate({ businessName: bName, industry, problem, budget, timeline }) {
    if (!bName || !industry || !problem || !budget || !timeline) {
      setFormError('Please fill in all fields before generating a scope.');
      return;
    }

    setFormError('');
    setLoading(true);
    setScopeData(null);
    setBusinessName(bName);

    const userMessage = `Business name: ${bName}
Industry: ${industry}
Problem to solve: ${problem}
Budget range: ${budget}
Timeline: ${timeline}`;

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': 'https://mohdrumman1.github.io/forma-ai-scoping-tool/',
          'X-Title': 'Forma AI Scoping Tool',
        },
        body: JSON.stringify({
          model: 'anthropic/claude-sonnet-4-5',
          max_tokens: 1500,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user',   content: userMessage   },
          ],
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        setFormError(
          response.status === 401
            ? 'Invalid API key. Check your key and try again.'
            : errData?.error?.message || `API error (${response.status}). Please try again.`
        );
        return;
      }

      const data  = await response.json();
      const raw   = data?.choices?.[0]?.message?.content || '';
      const clean = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
      setScopeData(JSON.parse(clean));

    } catch (err) {
      setFormError(
        err instanceof SyntaxError
          ? 'The API returned an unexpected format. Please try again.'
          : 'Could not connect to the API. Check your internet connection and try again.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />

      {screen === 'api' ? (
        <ApiKeyScreen onSubmit={handleKeySubmit} />
      ) : (
        <div id="app-screen">
          <FormPanel
            onGenerate={handleGenerate}
            onChangeKey={handleChangeKey}
            formError={formError}
            loading={loading}
          />
          <div id="output-panel">
            {!loading && !scopeData && <EmptyState />}
            <LoadingState isLoading={loading} />
            {!loading && scopeData && (
              <ScopeContent data={scopeData} businessName={businessName} />
            )}
          </div>
        </div>
      )}
    </>
  );
}
