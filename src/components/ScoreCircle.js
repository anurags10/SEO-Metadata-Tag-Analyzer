import React from 'react';

const ScoreCircle = ({ score }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return 'var(--success-color)';
    if (score >= 60) return 'var(--warning-color)';
    return 'var(--error-color)';
  };

  const getScoreText = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Poor';
  };

  const color = getScoreColor(score);
  const text = getScoreText(score);

  return (
    <div className="text-center">
      <div 
        className="score-circle"
        style={{
          background: `conic-gradient(${color} 0deg, ${color} ${score * 3.6}deg, #e5e7eb ${score * 3.6}deg)`
        }}
      >
        <div className="score-text">
          {score}
        </div>
      </div>
      <div style={{ color }} className="text-xl font-semibold mb-2">
        {text}
      </div>
      <div className="text-gray-600">
        SEO Score out of 100
      </div>
    </div>
  );
};

export default ScoreCircle;
