import React, { useEffect, useState } from "react";
import {
  Copy,
  Check,
  Loader2,
  AlertCircle,
  Mic,
  Code,
  Download,
  Sparkles
} from "lucide-react";
import Sidebar from "../components/Sidebar";

const WidgetGenerator = () => {
  const [assistants, setAssistants] = useState([]);
  const [selectedAssistant, setSelectedAssistant] = useState("");
  const [widgetScript, setWidgetScript] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState("");
  const [isLoadingAssistants, setIsLoadingAssistants] = useState(true);

  useEffect(() => {
    fetchAssistants();
  }, []);

  const fetchAssistants = async () => {
    try {
      setIsLoadingAssistants(true);
      const res = await fetch("http://localhost:8000/vapi/vapi/get-list-assistants");
      const data = await res.json();
      setAssistants(Array.isArray(data) ? data : []);
      setError("");
    } catch (err) {
      console.error("Assistant fetch error", err);
      setError("Failed to load assistants. Please check your connection.");
    } finally {
      setIsLoadingAssistants(false);
    }
  };

  const generateScript = async () => {
    if (!selectedAssistant) return;

    try {
      setIsLoading(true);
      setError("");

      const res = await fetch("http://localhost:8000/vapi/get_widget_script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assistant_id: selectedAssistant }),
      });

      const data = await res.json();

      if (res.ok && data.script) {
        setWidgetScript(data.script);
      } else {
        setError("Failed to generate widget script. Please try again.");
      }
    } catch (err) {
      console.error("Script fetch error", err);
      setError("Failed to generate widget script. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(widgetScript);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  const downloadScript = () => {
    const blob = new Blob([widgetScript], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "vapi-widget.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 w-[calc(100%-18rem)] ml-[18rem]">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-6 shadow-lg">
              <Mic className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800 mb-4">
              Widget Generation
            </h1>
            <p className="text-xl text-slate-600 max-w-xl mx-auto">
              Generate your assistant embed script and copy it to use on any website.
            </p>
          </div>

          {/* Config Panel */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                <Code className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-2xl font-semibold text-slate-800">Configuration</h2>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center">
                <AlertCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Select Your Assistant
                </label>
                {isLoadingAssistants ? (
                  <div className="flex items-center justify-center p-4 border-2 border-dashed border-slate-300 rounded-xl">
                    <Loader2 className="w-5 h-5 animate-spin text-slate-500 mr-2" />
                    <span className="text-slate-500">Loading assistants...</span>
                  </div>
                ) : (
                  <select
                    className="w-full p-4 border-2 border-slate-200 rounded-xl bg-white"
                    value={selectedAssistant}
                    onChange={(e) => setSelectedAssistant(e.target.value)}
                  >
                    <option value="">Choose an assistant...</option>
                    {assistants.map((assistant) => (
                      <option key={assistant.id} value={assistant.id}>
                        {assistant.name || `Assistant ${assistant.id.slice(0, 8)}`}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <button
                onClick={generateScript}
                disabled={!selectedAssistant || isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-xl font-semibold"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Generating...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Script
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Script Output */}
          {widgetScript && (
            <div className="mt-10 bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                    <Code className="w-5 h-5 text-purple-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-slate-800">Widget Script</h2>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-4 h-4 mr-2 text-green-600" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </>
                    )}
                  </button>
                  <button
                    onClick={downloadScript}
                    className="flex items-center px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </button>
                </div>
              </div>

              <textarea
                value={widgetScript}
                readOnly
                className="w-full h-64 p-4 border-2 border-slate-200 rounded-xl font-mono text-sm bg-slate-50"
                placeholder="Your widget script will appear here..."
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WidgetGenerator;
