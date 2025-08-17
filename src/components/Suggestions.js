import React from 'react';

const Suggestions = ({ suggestions }) => {
  if (!suggestions || suggestions.length === 0) {
    return (
      <div className="card">
        <h3 className="text-xl font-semibold mb-4">🎉 All Good!</h3>
        <p className="text-gray-600">
          Your website is well-optimized for SEO. Keep up the good work!
        </p>
      </div>
    );
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🔵';
      default: return '⚪';
    }
  };

  return (
    <div className="card">
      <h3 className="text-xl font-semibold mb-4">💡 Improvement Suggestions</h3>
      <div className="space-y-3">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border ${getPriorityColor(suggestion.priority)}`}
          >
            <div className="flex items-start gap-3">
              <span className="text-lg">{getPriorityIcon(suggestion.priority)}</span>
              <div className="flex-1">
                <h4 className="font-semibold mb-1">{suggestion.title}</h4>
                <p className="text-sm opacity-90">{suggestion.description}</p>
                <div className="mt-2">
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                    suggestion.priority === 'high' ? 'bg-red-100 text-red-800' :
                    suggestion.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {suggestion.priority.charAt(0).toUpperCase() + suggestion.priority.slice(1)} Priority
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold mb-2">📊 Priority Guide</h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
            <span><strong>High:</strong> Critical issues that significantly impact SEO</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
            <span><strong>Medium:</strong> Important improvements for better optimization</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
            <span><strong>Low:</strong> Nice-to-have enhancements for social sharing</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Suggestions;
