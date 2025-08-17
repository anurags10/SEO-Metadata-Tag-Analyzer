import React from 'react';
import ScoreCircle from './ScoreCircle';
import CheckItem from './CheckItem';
import Suggestions from './Suggestions';

const Results = ({ results, url }) => {
  if (!results) return null;

  const checks = [
    {
      key: 'title',
      title: 'Title Tag',
      description: 'Page title optimization',
      check: results.title
    },
    {
      key: 'metaDescription',
      title: 'Meta Description',
      description: 'Page description for search results',
      check: results.metaDescription
    },
    {
      key: 'metaKeywords',
      title: 'Meta Keywords',
      description: 'Keywords meta tag (optional)',
      check: results.metaKeywords
    },
    {
      key: 'canonical',
      title: 'Canonical URL',
      description: 'Prevents duplicate content issues',
      check: results.canonical
    },
    {
      key: 'openGraph',
      title: 'Open Graph Tags',
      description: 'Social media sharing optimization',
      check: results.openGraph
    },
    {
      key: 'twitter',
      title: 'Twitter Cards',
      description: 'Twitter sharing optimization',
      check: results.twitter
    },
    {
      key: 'headings',
      title: 'Heading Structure',
      description: 'H1, H2, H3 hierarchy',
      check: results.headings
    },
    {
      key: 'images',
      title: 'Image Alt Text',
      description: 'Accessibility and SEO for images',
      check: results.images
    },
    {
      key: 'viewport',
      title: 'Mobile Viewport',
      description: 'Mobile responsiveness',
      check: results.viewport
    },
    {
      key: 'styling',
      title: 'CSS Best Practices',
      description: 'Styling and performance',
      check: results.styling
    }
  ];

  return (
    <div className="space-y-6">
      {/* Score Display */}
      <div className="card text-center">
        <h2 className="text-2xl font-bold mb-4">SEO Analysis Results</h2>
        <p className="text-gray-600 mb-6">Analyzed: {url}</p>
        <ScoreCircle score={results.score} />
      </div>

      {/* Detailed Checks */}
      <div className="card">
        <h3 className="text-xl font-semibold mb-4">📋 Detailed Analysis</h3>
        <div className="space-y-3">
          {checks.map((check) => (
            <CheckItem
              key={check.key}
              title={check.title}
              description={check.description}
              check={check.check}
              value={check.check.value}
              message={check.check.message}
              passed={check.check.passed}
              status={check.check.status}
            />
          ))}
        </div>
      </div>

      {/* Suggestions */}
      <Suggestions suggestions={results.suggestions} />

      {/* Summary Stats */}
      <div className="card">
        <h3 className="text-xl font-semibold mb-4">📊 Summary Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{results.score}</div>
            <div className="text-sm text-blue-600">Total Score</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {checks.filter(c => c.check.passed).length}
            </div>
            <div className="text-sm text-green-600">Passed Checks</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">
              {checks.filter(c => !c.check.passed).length}
            </div>
            <div className="text-sm text-yellow-600">Failed Checks</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {results.suggestions.length}
            </div>
            <div className="text-sm text-purple-600">Suggestions</div>
          </div>
        </div>
      </div>

      {/* Export Results */}
      <div className="card">
        <h3 className="text-xl font-semibold mb-4">💾 Export Results</h3>
        <div className="flex gap-3">
          <button
            onClick={() => exportToJSON(results, url)}
            className="btn btn-primary"
          >
            Export as JSON
          </button>
          <button
            onClick={() => exportToCSV(results, url)}
            className="btn btn-primary"
          >
            Export as CSV
          </button>
        </div>
      </div>
    </div>
  );
};

const exportToJSON = (results, url) => {
  const data = {
    url,
    analyzedAt: new Date().toISOString(),
    score: results.score,
    results,
    suggestions: results.suggestions
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url_blob = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url_blob;
  a.download = `seo-analysis-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url_blob);
};

const exportToCSV = (results, url) => {
  const checks = [
    'Title Tag', 'Meta Description', 'Meta Keywords', 'Canonical URL',
    'Open Graph Tags', 'Twitter Cards', 'Heading Structure', 'Image Alt Text',
    'Mobile Viewport', 'CSS Best Practices'
  ];
  
  const scores = [
    results.title.score, results.metaDescription.score, results.metaKeywords.score,
    results.canonical.score, results.openGraph.score, results.twitter.score,
    results.headings.score, results.images.score, results.viewport.score, results.styling.score
  ];
  
  const statuses = [
    results.title.passed ? 'Passed' : 'Failed',
    results.metaDescription.passed ? 'Passed' : 'Failed',
    results.metaKeywords.passed ? 'Passed' : 'Failed',
    results.canonical.passed ? 'Passed' : 'Failed',
    results.openGraph.passed ? 'Passed' : 'Failed',
    results.twitter.passed ? 'Passed' : 'Failed',
    results.headings.passed ? 'Passed' : 'Failed',
    results.images.passed ? 'Passed' : 'Failed',
    results.viewport.passed ? 'Passed' : 'Failed',
    results.styling.passed ? 'Passed' : 'Failed'
  ];
  
  let csv = 'Check,Score,Status\n';
  checks.forEach((check, index) => {
    csv += `"${check}",${scores[index]},"${statuses[index]}"\n`;
  });
  csv += `\nTotal Score,${results.score},\n`;
  csv += `URL,${url},\n`;
  csv += `Analyzed At,${new Date().toISOString()},\n`;
  
  const blob = new Blob([csv], { type: 'text/csv' });
  const url_blob = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url_blob;
  a.download = `seo-analysis-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url_blob);
};

export default Results;
