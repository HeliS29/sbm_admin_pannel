// TwilioConfigForm.jsx
import React, { useState } from 'react';
import Sidebar from './Sidebar';

function TwilioConfigForm({ onSuccess, token }) {
  const [form, setForm] = useState({
    twilio_whatsapp_number: '',
    account_sid: '',
    auth_token: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("https://api.interactivv.pro/vapi/twilio/config", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      if (!res.ok) {
        throw new Error("Failed to save Twilio configuration");
      }

      await res.json();
      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar />
    <div className="flex items-center justify-center h-screen bg-slate-50 w-[calc(100%-18rem)] ml-[18rem]">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-slate-800">Configure Twilio WhatsApp</h2>

        <div className="mb-4">
          <label className="block text-slate-700 font-semibold mb-2">WhatsApp Number</label>
          <input
            type="text"
            name="twilio_whatsapp_number"
            value={form.twilio_whatsapp_number}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
            placeholder="e.g. whatsapp:+14155238886"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-slate-700 font-semibold mb-2">Account SID</label>
          <input
            type="text"
            name="account_sid"
            value={form.account_sid}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-slate-700 font-semibold mb-2">Auth Token</label>
          <input
            type="password"
            name="auth_token"
            value={form.auth_token}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring focus:ring-green-500"
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
        >
          {isSubmitting ? "Saving..." : "Save Configuration"}
        </button>
      </form>
    </div>
    </div>
  );
}

export default TwilioConfigForm;
