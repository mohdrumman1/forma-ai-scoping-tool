import { useState } from 'react';
import Header from './components/Header';
import FormPanel from './components/FormPanel';
import EmptyState from './components/EmptyState';
import LoadingState from './components/LoadingState';
import ScopeContent from './components/ScopeContent';

const WORKER_URL = import.meta.env.VITE_WORKER_URL || '';

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
  const [loading, setLoading]           = useState(false);
  const [scopeData, setScopeData]       = useState(null);
  const [businessName, setBusinessName] = useState('');
  const [formError, setFormError]       = useState('');

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
      const response = await fetch(WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'google/gemini-2.0-flash-001',
          max_tokens: 2000,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user',   content: userMessage   },
          ],
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        setFormError(errData?.error?.message || 'API error (' + response.status + '). Please try again.');
        return;
      }

      const data  = await response.json();
      const raw   = data?.choices?.[0]?.message?.content || '';
      const jsonMatch = raw.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new SyntaxError('No JSON object found in response');
      setScopeData(JSON.parse(jsonMatch[0]));

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
      <div id="app-screen">
        <FormPanel
          onGenerate={handleGenerate}
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
    </>
  );
}
