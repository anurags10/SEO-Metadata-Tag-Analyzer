import React, { useState } from 'react';

const UrlInput = ({ onAnalyze, isLoading }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const validateUrl = (input) => {
    try {
      const urlObj = new URL(input);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    // Add protocol if missing
    let processedUrl = url.trim();
    if (!processedUrl.startsWith('http://') && !processedUrl.startsWith('https://')) {
      processedUrl = 'https://' + processedUrl;
    }

    if (!validateUrl(processedUrl)) {
      setError('Please enter a valid URL');
      return;
    }

    onAnalyze(processedUrl);
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
    if (error) setError('');
  };

  return (
    <div className="card">
      <div className="text-center mb-6">
        <p className="text-gray-600 text-lg">
          Analyze your website's SEO optimization and get actionable improvement suggestions
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
            Website URL
          </label>
          <input
            type="text"
            id="url"
            className={`input ${error ? 'border-red-500' : ''}`}
            placeholder="Enter website URL (e.g., example.com or https://example.com)"
            value={url}
            onChange={handleUrlChange}
            disabled={isLoading}
          />
          {error && (
            <p className="text-red-500 text-sm mt-1">{error}</p>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={isLoading || !url.trim()}
        >
          {isLoading ? (
            <>
              <div className="spinner mr-2"></div>
              Analyzing...
            </>
          ) : (
            '🔍 Analyze SEO'
          )}
        </button>
      </form>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">💡 What this tool analyzes:</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>Title tags and meta descriptions</li>
          <li>Open Graph and Twitter Card tags</li>
          <li>Heading structure (H1, H2, H3)</li>
          <li>Image alt text and accessibility</li>
          <li>Mobile viewport configuration</li>
          <li>CSS best practices</li>
        </ul>
      </div>
    </div>
  );
};

export default UrlInput;
