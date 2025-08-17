# 🔍 SEO Metadata Tag Analyzer

A lightweight web application that evaluates website URLs for SEO optimization and provides actionable improvement suggestions. Built with React, this tool analyzes HTML metadata tags, headings, content structure, and styling best practices.

## ✨ Features

### Core Analysis
- **Title Tag Analysis**: Checks length, presence, and optimization (30-60 characters recommended)
- **Meta Description**: Validates presence and length (120-160 characters recommended)
- **Meta Keywords**: Optional check (not required for modern SEO)
- **Canonical URLs**: Prevents duplicate content issues
- **Open Graph Tags**: Social media sharing optimization
- **Twitter Cards**: Twitter sharing optimization
- **Heading Structure**: H1, H2, H3 hierarchy validation
- **Image Alt Text**: Accessibility and SEO for images
- **Mobile Viewport**: Mobile responsiveness check
- **CSS Best Practices**: Styling and performance analysis

### Scoring System
- **Weighted scoring** out of 100 points
- **Visual score indicator** with color-coded feedback
- **Detailed breakdown** of each SEO factor
- **Priority-based suggestions** (High, Medium, Low)

### User Experience
- **Clean, modern dashboard** design
- **Responsive layout** for desktop and mobile
- **Real-time analysis** with loading indicators
- **Export functionality** (JSON and CSV formats)
- **Actionable improvement tips**
- **Multiple analysis methods** (URL + Manual HTML input)

## 🚀 Quick Start

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd seo-metadata-analyzer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## 🎯 How to Use

### Method 1: URL Analysis
1. **Enter a URL**: Input any website URL (with or without protocol)
2. **Click Analyze**: The app will fetch and analyze the webpage
3. **Review Results**: See your SEO score and detailed breakdown

### Method 2: Manual HTML Input
1. **Get HTML Content**: View page source of any website
2. **Copy HTML**: Select all content (Ctrl+A, Ctrl+C)
3. **Paste & Analyze**: Paste in the manual input field
4. **Get Results**: Instant analysis without network issues

## 🔧 Troubleshooting Common Issues

### "Analysis Failed - All proxy services failed" Error

This error occurs due to **CORS restrictions** or **proxy service limitations**. Here are simple solutions:

#### ✅ **Immediate Solutions**

1. **Use Manual HTML Input** (Recommended - 100% Success)
   - Click "📝 Try Manual HTML Input Instead"
   - Copy HTML from the website's page source
   - Paste and analyze directly

2. **Try Different Websites**
   - Some websites block proxy services
   - Test with popular sites like `example.com`

3. **Use Browser Extensions**
   - Install SEO analyzer extensions
   - Analyze pages directly from your browser

#### 🔄 **How the App Handles This**

The app automatically tries multiple proxy services and provides clear fallback options:
- **URL Analysis** with proxy fallbacks
- **Manual HTML Input** (guaranteed to work)
- **Browser Extension recommendations**

## 🏗️ Architecture

### Frontend Structure
```
src/
├── components/          # React components
│   ├── UrlInput.js     # URL input and validation
│   ├── ManualInput.js  # Manual HTML input fallback
│   ├── ScoreCircle.js  # Circular score indicator
│   ├── CheckItem.js    # Individual check results
│   ├── Results.js      # Main results display
│   └── Suggestions.js  # Improvement suggestions
├── utils/
│   ├── seoAnalyzer.js  # Core SEO analysis logic
│   └── proxyService.js # Simple proxy fetching service
├── App.js              # Main application component
├── App.css             # Application styles
├── index.js            # React entry point
└── index.css           # Global styles
```

### Key Components

- **`UrlInput`**: Handles URL input, validation, and form submission
- **`ManualInput`**: Fallback for direct HTML analysis
- **`ScoreCircle`**: Displays the overall SEO score with visual feedback
- **`CheckItem`**: Shows individual SEO check results with status indicators
- **`Results`**: Comprehensive results display with export functionality
- **`Suggestions`**: Prioritized improvement recommendations

## 🔧 Technical Details

### SEO Analysis Algorithm
The scoring system evaluates 10 key SEO factors:

| Factor | Points | Description |
|--------|--------|-------------|
| Title Tag | 15 | Page title optimization |
| Meta Description | 15 | Search result description |
| Meta Keywords | 5 | Keywords meta tag |
| Canonical URL | 5 | Duplicate content prevention |
| Open Graph | 15 | Social media optimization |
| Twitter Cards | 10 | Twitter sharing optimization |
| Heading Structure | 10 | H1, H2, H3 hierarchy |
| Image Alt Text | 10 | Accessibility and SEO |
| Mobile Viewport | 10 | Mobile responsiveness |
| CSS Best Practices | 10 | Styling and performance |

### CORS Handling & Proxy Services
- **Simple fallback system** with multiple proxy services
- **Automatic retry logic** when services fail
- **Manual HTML input** as guaranteed fallback
- **Clear error messages** with actionable solutions

### Responsive Design
- Mobile-first approach
- CSS Grid and Flexbox for layouts
- CSS custom properties for theming
- Optimized for all screen sizes

## 🎨 Customization

### Styling
The application uses CSS custom properties for easy theming:

```css
:root {
  --primary-color: #2563eb;
  --success-color: #10b981;
  --warning-color: #f59e0b;
  --error-color: #ef4444;
  /* ... more variables */
}
```

### Adding New Checks
To add new SEO checks, modify `src/utils/seoAnalyzer.js`:

1. Create a new analysis function
2. Add it to the main `analyzeSEO` function
3. Update the scoring calculation
4. Add suggestions generation

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with React and modern web technologies
- Simple proxy service integration for CORS handling
- Manual HTML input fallback for maximum compatibility
- Inspired by popular SEO analysis tools
- Designed for developers and SEO professionals

## 📞 Support

If you encounter any issues or have questions:

1. **Check the troubleshooting section** above for common solutions
2. **Use Manual HTML Input** if URL analysis fails
3. **Check the [Issues](https://github.com/yourusername/seo-metadata-analyzer/issues) page**
4. **Create a new issue** with detailed information
5. **Include browser version and error messages**

---

**Happy SEO Analyzing! 🚀**
