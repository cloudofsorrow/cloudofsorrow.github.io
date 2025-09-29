# Cloud of Sorrow - Researcher Homepage

A modern art style homepage for a researcher, featuring contemporary design with easy paper link management and self-introduction sections.

## Features

- **Modern Art Design**: Contemporary styling with floating geometric shapes and gradients
- **Responsive Layout**: Works beautifully on desktop, tablet, and mobile devices
- **Easy Paper Management**: Simple system for adding and managing publication links
- **Self-Introduction**: Dedicated sections for personal and research information
- **Smooth Animations**: Subtle hover effects and scroll animations
- **Accessible Navigation**: Clean navigation with smooth scrolling

## Structure

### Sections
1. **Hero Section**: Name, title, and floating geometric art
2. **About**: Personal introduction and research focus
3. **Research Areas**: Key research domains with visual icons
4. **Publications**: Easy-to-manage paper listings with links
5. **Contact**: Professional contact information

### Files
- `index.html` - Main homepage structure
- `styles.css` - Modern art inspired styling
- `script.js` - Interactive functionality and utilities

## Adding New Papers

### Method 1: Edit HTML directly
Add new paper entries in the `papers-list` section of `index.html`:

```html
<div class="paper-item">
    <div class="paper-year">YEAR</div>
    <div class="paper-content">
        <h3 class="paper-title">Paper Title</h3>
        <p class="paper-authors">Author Names</p>
        <p class="paper-venue">Venue/Journal Name</p>
        <div class="paper-links">
            <a href="URL" class="paper-link">PDF</a>
            <a href="URL" class="paper-link">Abstract</a>
            <a href="URL" class="paper-link">Code</a>
        </div>
    </div>
</div>
```

### Method 2: Use JavaScript utility (in browser console)
```javascript
HomepageUtils.addPaper(
    "2024", 
    "Your Paper Title",
    "Your Name, Co-Author",
    "Conference/Journal Name",
    [
        {text: "PDF", url: "https://example.com/paper.pdf"},
        {text: "Abstract", url: "https://example.com/abstract"},
        {text: "Code", url: "https://github.com/yourrepo"}
    ]
);
```

## Customization

### Personal Information
Update the following sections in `index.html`:
- Hero title and subtitle
- About section content
- Research areas
- Contact information

### Color Scheme
Modify CSS variables in `styles.css`:
```css
:root {
  --accent-blue: #2563eb;
  --accent-purple: #7c3aed;
  --accent-pink: #ec4899;
  --accent-orange: #f59e0b;
}
```

### Contact Links
Update contact URLs in the Contact section:
- Email: `mailto:your@email.com`
- Social media and professional profiles

## Development

The site uses vanilla HTML, CSS, and JavaScript with no build process required. Simply:

1. Edit files directly
2. Open `index.html` in a browser to preview
3. Deploy to GitHub Pages or any web server

## GitHub Pages Deployment

This repository is configured for GitHub Pages. The site will be available at:
`https://yourusername.github.io`

Changes pushed to the main branch will automatically deploy.
