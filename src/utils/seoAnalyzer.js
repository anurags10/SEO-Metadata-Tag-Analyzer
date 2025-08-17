// SEO Analysis Utility Functions

export const analyzeSEO = (htmlContent) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, 'text/html');
  
  const results = {
    title: analyzeTitle(doc),
    metaDescription: analyzeMetaDescription(doc),
    metaKeywords: analyzeMetaKeywords(doc),
    canonical: analyzeCanonical(doc),
    openGraph: analyzeOpenGraph(doc),
    twitter: analyzeTwitter(doc),
    headings: analyzeHeadings(doc),
    images: analyzeImages(doc),
    viewport: analyzeViewport(doc),
    styling: analyzeStyling(doc),
    score: 0,
    suggestions: []
  };
  
  // Calculate total score
  results.score = calculateScore(results);
  
  // Generate suggestions
  results.suggestions = generateSuggestions(results);
  
  return results;
};

const analyzeTitle = (doc) => {
  const title = doc.querySelector('title');
  if (!title) {
    return { passed: false, score: 0, value: null, message: 'Title tag is missing' };
  }
  
  const titleText = title.textContent.trim();
  const length = titleText.length;
  
  if (length === 0) {
    return { passed: false, score: 0, value: titleText, message: 'Title tag is empty' };
  }
  
  if (length < 30) {
    return { passed: false, score: 10, value: titleText, message: 'Title is too short (recommended: 30-60 characters)' };
  }
  
  if (length > 60) {
    return { passed: false, score: 10, value: titleText, message: 'Title is too long (recommended: 30-60 characters)' };
  }
  
  return { passed: true, score: 15, value: titleText, message: 'Title tag is optimal' };
};

const analyzeMetaDescription = (doc) => {
  const metaDesc = doc.querySelector('meta[name="description"]');
  if (!metaDesc) {
    return { passed: false, score: 0, value: null, message: 'Meta description is missing' };
  }
  
  const content = metaDesc.getAttribute('content') || '';
  const length = content.length;
  
  if (length === 0) {
    return { passed: false, score: 0, value: content, message: 'Meta description is empty' };
  }
  
  if (length < 120) {
    return { passed: false, score: 10, value: content, message: 'Meta description is too short (recommended: 120-160 characters)' };
  }
  
  if (length > 160) {
    return { passed: false, score: 10, value: content, message: 'Meta description is too long (recommended: 120-160 characters)' };
  }
  
  return { passed: true, score: 15, value: content, message: 'Meta description is optimal' };
};

const analyzeMetaKeywords = (doc) => {
  const metaKeywords = doc.querySelector('meta[name="keywords"]');
  if (!metaKeywords) {
    return { passed: true, score: 5, value: null, message: 'Meta keywords are optional (not required for modern SEO)' };
  }
  
  const content = metaKeywords.getAttribute('content') || '';
  if (content.length === 0) {
    return { passed: false, score: 0, value: content, message: 'Meta keywords tag is empty' };
  }
  
  return { passed: true, score: 5, value: content, message: 'Meta keywords present' };
};

const analyzeCanonical = (doc) => {
  const canonical = doc.querySelector('link[rel="canonical"]');
  if (!canonical) {
    return { passed: false, score: 0, value: null, message: 'Canonical tag is missing' };
  }
  
  const href = canonical.getAttribute('href');
  if (!href || href.length === 0) {
    return { passed: false, score: 0, value: href, message: 'Canonical URL is empty' };
  }
  
  return { passed: true, score: 5, value: href, message: 'Canonical tag is present' };
};

const analyzeOpenGraph = (doc) => {
  const ogTags = {
    title: doc.querySelector('meta[property="og:title"]'),
    description: doc.querySelector('meta[property="og:description"]'),
    image: doc.querySelector('meta[property="og:image"]')
  };
  
  let score = 0;
  let passed = 0;
  const total = 3;
  
  if (ogTags.title) {
    score += 5;
    passed++;
  }
  if (ogTags.description) {
    score += 5;
    passed++;
  }
  if (ogTags.image) {
    score += 5;
    passed++;
  }
  
  const percentage = (passed / total) * 100;
  let status = 'passed';
  if (percentage < 50) status = 'failed';
  else if (percentage < 100) status = 'warning';
  
  return {
    passed: status === 'passed',
    score,
    value: ogTags,
    message: `${passed}/${total} Open Graph tags present`,
    status
  };
};

const analyzeTwitter = (doc) => {
  const twitterTags = {
    card: doc.querySelector('meta[name="twitter:card"]'),
    title: doc.querySelector('meta[name="twitter:title"]'),
    description: doc.querySelector('meta[name="twitter:description"]'),
    image: doc.querySelector('meta[name="twitter:image"]')
  };
  
  let score = 0;
  let passed = 0;
  const total = 4;
  
  if (twitterTags.card) {
    score += 2.5;
    passed++;
  }
  if (twitterTags.title) {
    score += 2.5;
    passed++;
  }
  if (twitterTags.description) {
    score += 2.5;
    passed++;
  }
  if (twitterTags.image) {
    score += 2.5;
    passed++;
  }
  
  const percentage = (passed / total) * 100;
  let status = 'passed';
  if (percentage < 50) status = 'failed';
  else if (percentage < 100) status = 'warning';
  
  return {
    passed: status === 'passed',
    score,
    value: twitterTags,
    message: `${passed}/${total} Twitter Card tags present`,
    status
  };
};

const analyzeHeadings = (doc) => {
  const h1s = doc.querySelectorAll('h1');
  const h2s = doc.querySelectorAll('h2');
  const h3s = doc.querySelectorAll('h3');
  
  let score = 0;
  let issues = [];
  
  // Check H1 (should be only one)
  if (h1s.length === 0) {
    issues.push('No H1 tag found');
  } else if (h1s.length > 1) {
    issues.push(`Multiple H1 tags found (${h1s.length})`);
  } else {
    score += 5;
  }
  
  // Check heading hierarchy
  if (h1s.length > 0 && h2s.length > 0) {
    score += 3;
  }
  if (h2s.length > 0 && h3s.length > 0) {
    score += 2;
  }
  
  const passed = issues.length === 0;
  
  return {
    passed,
    score,
    value: { h1: h1s.length, h2: h2s.length, h3: h3s.length },
    message: passed ? 'Heading structure is good' : issues.join(', '),
    issues
  };
};

const analyzeImages = (doc) => {
  const images = doc.querySelectorAll('img');
  let score = 0;
  let altCount = 0;
  
  images.forEach(img => {
    if (img.hasAttribute('alt') && img.getAttribute('alt').trim() !== '') {
      altCount++;
    }
  });
  
  if (images.length === 0) {
    return { passed: true, score: 10, value: { total: 0, withAlt: 0 }, message: 'No images found' };
  }
  
  const altPercentage = (altCount / images.length) * 100;
  
  if (altPercentage === 100) {
    score = 10;
  } else if (altPercentage >= 80) {
    score = 8;
  } else if (altPercentage >= 60) {
    score = 6;
  } else {
    score = 3;
  }
  
  return {
    passed: altPercentage >= 80,
    score,
    value: { total: images.length, withAlt: altCount, percentage: altPercentage },
    message: `${altCount}/${images.length} images have alt text (${altPercentage.toFixed(1)}%)`
  };
};

const analyzeViewport = (doc) => {
  const viewport = doc.querySelector('meta[name="viewport"]');
  if (!viewport) {
    return { passed: false, score: 0, value: null, message: 'Viewport meta tag is missing' };
  }
  
  const content = viewport.getAttribute('content') || '';
  if (content.includes('width=device-width')) {
    return { passed: true, score: 10, value: content, message: 'Mobile viewport is properly configured' };
  }
  
  return { passed: false, score: 5, value: content, message: 'Viewport tag exists but may not be mobile-optimized' };
};

const analyzeStyling = (doc) => {
  const inlineStyles = doc.querySelectorAll('[style]');
  const externalCSS = doc.querySelectorAll('link[rel="stylesheet"]');
  
  let score = 10;
  let issues = [];
  
  if (inlineStyles.length > 5) {
    score -= 3;
    issues.push('Too many inline styles detected');
  }
  
  if (externalCSS.length === 0) {
    score -= 2;
    issues.push('No external CSS files found');
  }
  
  const passed = score >= 8;
  
  return {
    passed,
    score: Math.max(0, score),
    value: { inlineStyles: inlineStyles.length, externalCSS: externalCSS.length },
    message: passed ? 'Styling practices are good' : issues.join(', '),
    issues
  };
};

const calculateScore = (results) => {
  let totalScore = 0;
  
  totalScore += results.title.score;
  totalScore += results.metaDescription.score;
  totalScore += results.metaKeywords.score;
  totalScore += results.canonical.score;
  totalScore += results.openGraph.score;
  totalScore += results.twitter.score;
  totalScore += results.headings.score;
  totalScore += results.images.score;
  totalScore += results.viewport.score;
  totalScore += results.styling.score;
  
  return Math.min(100, Math.round(totalScore));
};

const generateSuggestions = (results) => {
  const suggestions = [];
  
  if (!results.title.passed) {
    suggestions.push({
      type: 'error',
      title: 'Fix Title Tag',
      description: results.title.message,
      priority: 'high'
    });
  }
  
  if (!results.metaDescription.passed) {
    suggestions.push({
      type: 'error',
      title: 'Add Meta Description',
      description: results.metaDescription.message,
      priority: 'high'
    });
  }
  
  if (!results.headings.passed) {
    suggestions.push({
      type: 'warning',
      title: 'Improve Heading Structure',
      description: results.headings.message,
      priority: 'medium'
    });
  }
  
  if (!results.images.passed) {
    suggestions.push({
      type: 'warning',
      title: 'Add Alt Text to Images',
      description: `Add descriptive alt text to ${results.images.value.total - results.images.value.withAlt} images`,
      priority: 'medium'
    });
  }
  
  if (!results.viewport.passed) {
    suggestions.push({
      type: 'warning',
      title: 'Mobile Optimization',
      description: 'Add viewport meta tag for mobile responsiveness',
      priority: 'medium'
    });
  }
  
  if (!results.openGraph.passed) {
    suggestions.push({
      type: 'info',
      title: 'Social Media Optimization',
      description: 'Add Open Graph tags for better social media sharing',
      priority: 'low'
    });
  }
  
  if (!results.twitter.passed) {
    suggestions.push({
      type: 'info',
      title: 'Twitter Card Optimization',
      description: 'Add Twitter Card tags for better Twitter sharing',
      priority: 'low'
    });
  }
  
  return suggestions.sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });
};
