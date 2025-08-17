import React from 'react';

const CheckItem = ({ check, title, description, value, message, passed, status = 'passed' }) => {
  const getIcon = () => {
    if (status === 'warning') return '⚠️';
    if (passed) return '✅';
    return '❌';
  };

  const getStatusClass = () => {
    if (status === 'warning') return 'warning';
    if (passed) return 'passed';
    return 'failed';
  };

  const formatValue = (val) => {
    if (val === null || val === undefined) return 'N/A';
    if (typeof val === 'object') {
      return Object.entries(val)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ');
    }
    return String(val);
  };

  return (
    <div className={`check-item ${getStatusClass()}`}>
      <div className="check-icon">
        {getIcon()}
      </div>
      <div className="check-content">
        <div className="check-title">
          {title}
        </div>
        <div className="check-description">
          {message}
        </div>
        {value && (
          <div className="text-sm text-gray-500 mt-1">
            <strong>Value:</strong> {formatValue(value)}
          </div>
        )}
      </div>
      <div className="text-sm font-medium">
        {check.score} pts
      </div>
    </div>
  );
};

export default CheckItem;
