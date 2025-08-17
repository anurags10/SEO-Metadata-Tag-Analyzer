import React, { useState } from 'react';
import { validateHTML } from '../utils/proxyService';

const ManualInput = ({ onAnalyze, onBack }) => {
  const [htmlContent, setHtmlContent] = useState('');
  const [error, setError] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validate HTML content
    const validation = validateHTML(htmlContent);
    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    setIsAnalyzing(true);
    try {
      onAnalyze(htmlContent, true); // true indicates manual input
    } catch (err) {
      setError('Failed to analyze HTML content: ' + err.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleContentChange = (e) => {
    setHtmlContent(e.target.value);
    if (error) setError('');
  };

  return (
    <div className="card">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          📝 Manual HTML Input
        </h2>
        <p className="text-gray-600">
          Paste the HTML content directly when automatic fetching fails
        </p>
      </div>

      <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="font-semibold text-yellow-800 mb-2">📋 How to get HTML content:</h3>
        <ol className="text-sm text-yellow-700 space-y-1 list-decimal list-inside">
          <li>Visit the website you want to analyze in a new tab</li>
          <li>Right-click and select "View Page Source" (or press Ctrl+U / Cmd+U)</li>
          <li>Copy all the HTML content (Ctrl+A, Ctrl+C)</li>
          <li>Paste it in the field below</li>
        </ol>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="htmlContent" className="block text-sm font-medium text-gray-700 mb-2">
            HTML Content
          </label>
          <textarea
            id="htmlContent"
            className={`input min-h-[300px] font-mono text-sm ${error ? 'border-red-500' : ''}`}
            placeholder="Paste the HTML content here..."
            value={htmlContent}
            onChange={handleContentChange}
            disabled={isAnalyzing}
          />
          {error && (
            <p className="text-red-500 text-sm mt-1">{error}</p>
          )}
          <p className="text-gray-500 text-sm mt-1">
            Content length: {htmlContent.length} characters
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onBack}
            className="btn bg-gray-500 hover:bg-gray-600 text-white"
          >
            ← Back to URL Input
          </button>
          <button
            type="submit"
            className="btn btn-primary flex-1"
            disabled={isAnalyzing || !htmlContent.trim()}
          >
            {isAnalyzing ? (
              <>
                <div className="spinner mr-2"></div>
                Analyzing...
              </>
            ) : (
              '🔍 Analyze HTML'
            )}
          </button>
        </div>
      </form>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">💡 Why use manual input?</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>Bypasses CORS restrictions and proxy limitations</li>
          <li>Works with any website, including local/private sites</li>
          <li>Faster analysis (no network delays)</li>
          <li>Useful for testing draft content before publishing</li>
        </ul>
      </div>
    </div>
  );
};

export default ManualInput;
