import React, { useState } from 'react';
import UrlInput from './components/UrlInput';
import ManualInput from './components/ManualInput';
import Results from './components/Results';
import ThemeToggle from './components/ThemeToggle';
import { analyzeSEO } from './utils/seoAnalyzer';
import { fetchWebsiteContent } from './utils/proxyService';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [analyzedUrl, setAnalyzedUrl] = useState('');
  const [showManualInput, setShowManualInput] = useState(false);
  const [analysisMethod, setAnalysisMethod] = useState(''); // 'url' or 'manual'

  const handleAnalyze = async (input, isManual = false) => {
    setIsLoading(true);
    setError(null);
    setResults(null);
    setAnalysisMethod(isManual ? 'manual' : 'url');
    
    if (!isManual) {
      setAnalyzedUrl(input);
    }

    try {
      let htmlContent;
      
      if (isManual) {
        // Direct HTML analysis
        htmlContent = input;
        setAnalyzedUrl('Manual HTML Input');
      } else {
        // Fetch from URL using proxy services
        htmlContent = await fetchWebsiteContent(input);
      }

      // Analyze the HTML content
      const analysisResults = analyzeSEO(htmlContent);
      setResults(analysisResults);

    } catch (err) {
      console.error('Analysis error:', err);
      setError(err.message || 'An error occurred while analyzing the content');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResults(null);
    setError(null);
    setAnalyzedUrl('');
    setShowManualInput(false);
    setAnalysisMethod('');
  };

  const handleManualInputToggle = () => {
    setShowManualInput(!showManualInput);
    setError(null);
  };

  return (
    <div className="App">
      {/* Header with Theme Toggle */}
      <header className="app-header">
        <div className="container">
          <div className="header-content">
            <h1 className="app-title">🔍 SEO Metadata Tag Analyzer</h1>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="container py-8">
        {!results ? (
          <>
            {!showManualInput ? (
              <>
                <UrlInput onAnalyze={handleAnalyze} isLoading={isLoading} />
                
                {error && (
                  <div className="card border-red-200 bg-red-50">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">❌</span>
                      <div className="flex-1">
                        <h3 className="font-semibold text-red-800">Analysis Failed</h3>
                        <p className="text-red-700 whitespace-pre-line">{error}</p>
                        <div className="mt-4">
                          <button
                            onClick={handleManualInputToggle}
                            className="btn btn-primary"
                          >
                            📝 Try Manual HTML Input Instead
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {isLoading && (
                  <div className="card text-center">
                    <div className="loading">
                      <div className="spinner mr-4"></div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Analyzing Website...</h3>
                        <p className="text-gray-600">
                          Trying to fetch {analyzedUrl}
                        </p>
                        <div className="mt-2 text-sm text-gray-500">
                          This may take a few seconds...
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Alternative options */}
                <div className="card">
                  <h3 className="text-xl font-semibold mb-4">🔄 Alternative Analysis Methods</h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">📝 Manual HTML Input</h4>
                      <p className="text-blue-700 text-sm mb-3">
                        Paste HTML content directly to bypass CORS restrictions and proxy limitations.
                      </p>
                      <button
                        onClick={handleManualInputToggle}
                        className="btn btn-primary"
                      >
                        Use Manual Input
                      </button>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">🌐 Browser Extension</h4>
                      <p className="text-green-700 text-sm mb-3">
                        Install a browser extension to analyze pages directly from your browser.
                      </p>
                      <a
                        href="https://chrome.google.com/webstore/search/seo%20analyzer"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn bg-green-600 hover:bg-green-700 text-white"
                      >
                        Find Extensions
                      </a>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <ManualInput 
                onAnalyze={handleAnalyze}
                onBack={handleManualInputToggle}
              />
            )}
          </>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={handleReset}
                className="btn btn-primary"
              >
                ← Analyze Another Website
              </button>
              <div className="text-sm text-gray-600">
                Last analyzed: {new Date().toLocaleString()}
                {analysisMethod === 'manual' && ' (Manual HTML Input)'}
              </div>
            </div>
            
            <Results results={results} url={analyzedUrl} />
          </>
        )}

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>
            SEO Metadata Tag Analyzer - A lightweight tool for website SEO optimization
          </p>
          <p className="mt-1">
            Built with React • No data is stored or transmitted
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
