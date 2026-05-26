import { useState } from 'react';

const INITIAL_STATE = { name: '', email: '', phone: '', firm: '', message: '' };

export function useContactForm() {
  const [fields, setFields]   = useState(INITIAL_STATE);
  const [status, setStatus]   = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [error, setError]     = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setFields(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    setError(null);
    try {
      await new Promise(r => setTimeout(r, 800));
      setStatus('success');
      setFields(INITIAL_STATE);
    } catch (err) {
      setStatus('error');
      setError(err?.message ?? 'Something went wrong. Please try again.');
    }
  }

  function reset() {
    setFields(INITIAL_STATE);
    setStatus('idle');
    setError(null);
  }

  return { fields, status, error, handleChange, handleSubmit, reset };
}
