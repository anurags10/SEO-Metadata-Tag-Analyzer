// Simple Proxy Service for fetching website content
// Basic fallback options to handle CORS restrictions

const PROXY_SERVICES = [
  {
    name: 'CORS Anywhere',
    url: 'https://cors-anywhere.herokuapp.com/',
    transform: (data) => data
  },
  {
    name: 'CORS Proxy',
    url: 'https://corsproxy.io/?',
    transform: (data) => data
  },
  {
    name: 'AllOrigins',
    url: 'https://api.allorigins.win/get',
    transform: (data) => data.contents
  }
];

export const fetchWebsiteContent = async (url) => {
  let lastError = null;
  
  // Try each proxy service until one works
  for (const proxy of PROXY_SERVICES) {
    try {
      console.log(`Trying ${proxy.name} proxy...`);
      
      let proxyUrl;
      if (proxy.name === 'CORS Anywhere') {
        proxyUrl = proxy.url + url;
      } else if (proxy.name === 'CORS Proxy') {
        proxyUrl = proxy.url + encodeURIComponent(url);
      } else {
        proxyUrl = `${proxy.url}?url=${encodeURIComponent(url)}`;
      }
      
      const response = await fetch(proxyUrl, {
        method: 'GET',
        headers: {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.text();
      const transformedData = proxy.transform(data);
      
      if (transformedData && transformedData.length > 0) {
        console.log(`✅ Successfully fetched content using ${proxy.name}`);
        return transformedData;
      } else {
        throw new Error('Empty content received');
      }
      
    } catch (error) {
      console.warn(`${proxy.name} failed:`, error.message);
      lastError = error;
      continue;
    }
  }
  
  // If all proxies failed, provide simple error message
  throw new Error(
    `All proxy services failed. Last error: ${lastError?.message || 'Unknown error'}. ` +
    'Try using Manual HTML Input instead.'
  );
};

// Alternative method: Use browser extension or manual input
export const getManualInputInstructions = () => {
  return {
    title: 'Manual HTML Input',
    description: 'If automatic fetching fails, you can manually input the HTML content',
    steps: [
      '1. Visit the website you want to analyze in a new tab',
      '2. Right-click and select "View Page Source" (or press Ctrl+U / Cmd+U)',
      '3. Copy all the HTML content (Ctrl+A, Ctrl+C)',
      '4. Paste it in the manual input field below'
    ]
  };
};

// Validate HTML content
export const validateHTML = (htmlContent) => {
  if (!htmlContent || typeof htmlContent !== 'string') {
    return { valid: false, error: 'Content must be a non-empty string' };
  }
  
  if (htmlContent.length < 100) {
    return { valid: false, error: 'Content seems too short to be valid HTML' };
  }
  
  if (!htmlContent.includes('<html') && !htmlContent.includes('<body')) {
    return { valid: false, error: 'Content does not appear to be valid HTML' };
  }
  
  return { valid: true };
};
