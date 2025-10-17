# راهنمای بهینه‌سازی عملکرد

## بهینه‌سازی تصاویر

### فرمت‌های تصویر
- **WebP**: بهترین کیفیت و کمترین حجم
- **AVIF**: جدیدترین فرمت، پشتیبانی محدود
- **JPEG**: مناسب برای عکس‌ها
- **PNG**: مناسب برای تصاویر با شفافیت

### ابزارهای بهینه‌سازی
```bash
# نصب imagemin
npm install -g imagemin-cli

# بهینه‌سازی تصاویر
imagemin images/* --out-dir=images/optimized --plugin=webp
```

### Responsive Images
```html
<picture>
  <source media="(min-width: 768px)" srcset="image-large.webp">
  <source media="(min-width: 480px)" srcset="image-medium.webp">
  <img src="image-small.webp" alt="Description">
</picture>
```

## بهینه‌سازی CSS

### Critical CSS
```html
<!-- Critical CSS در head -->
<style>
  /* CSS های ضروری */
</style>

<!-- Non-critical CSS -->
<link rel="preload" href="style.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
```

### CSS Minification
```bash
# نصب clean-css
npm install -g clean-css-cli

# فشرده‌سازی CSS
cleancss -o style.min.css style.css
```

### CSS Optimization
```css
/* استفاده از CSS Grid و Flexbox */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

/* استفاده از CSS Variables */
:root {
  --primary-color: #171717;
  --secondary-color: #737373;
}
```

## بهینه‌سازی JavaScript

### Lazy Loading
```javascript
// Lazy loading تصاویر
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove('lazy');
      imageObserver.unobserve(img);
    }
  });
});

images.forEach(img => imageObserver.observe(img));
```

### Code Splitting
```javascript
// Dynamic import
const loadAdminPanel = () => {
  return import('./admin/admin-script.js');
};
```

### Minification
```bash
# نصب terser
npm install -g terser

# فشرده‌سازی JavaScript
terser script.js -o script.min.js
```

## بهینه‌سازی HTML

### Semantic HTML
```html
<!-- استفاده از semantic elements -->
<header>
  <nav>
    <ul>
      <li><a href="#home">خانه</a></li>
    </ul>
  </nav>
</header>

<main>
  <section>
    <article>
      <h1>عنوان</h1>
      <p>محتوا</p>
    </article>
  </section>
</main>
```

### Meta Tags
```html
<!-- Viewport -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- Preload -->
<link rel="preload" href="style.css" as="style">
<link rel="preload" href="script.js" as="script">

<!-- DNS Prefetch -->
<link rel="dns-prefetch" href="//fonts.googleapis.com">
```

## بهینه‌سازی شبکه

### CDN
```html
<!-- استفاده از CDN -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
```

### Compression
```bash
# Gzip compression
gzip -k style.css
gzip -k script.js
```

### Caching
```html
<!-- Cache Control -->
<meta http-equiv="Cache-Control" content="max-age=31536000">
```

## بهینه‌سازی Database

### LocalStorage Optimization
```javascript
// بهینه‌سازی localStorage
const saveProducts = (products) => {
  try {
    localStorage.setItem('products', JSON.stringify(products));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

// Compression
const compressData = (data) => {
  return LZString.compress(JSON.stringify(data));
};
```

## بهینه‌سازی SEO

### Meta Tags
```html
<!-- Title -->
<title>هنر تنه | بهترین محصولات چوبی دست‌ساز ایران</title>

<!-- Description -->
<meta name="description" content="هنر تنه - برترین تولیدکننده محصولات چوبی دست‌ساز در ایران">

<!-- Keywords -->
<meta name="keywords" content="چوب دست‌ساز، محصولات چوبی، میز چوبی">

<!-- Open Graph -->
<meta property="og:title" content="هنر تنه - محصولات چوبی دست‌ساز">
<meta property="og:description" content="تولید و فروش محصولات چوبی دست‌ساز">
<meta property="og:image" content="https://honartaneh.ir/images/og-image.jpg">
```

### Structured Data
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "هنر تنه",
  "description": "تولید و فروش محصولات چوبی دست‌ساز",
  "url": "https://honartaneh.ir",
  "telephone": "+989217907398"
}
</script>
```

## بهینه‌سازی Accessibility

### ARIA Labels
```html
<!-- ARIA labels -->
<button aria-label="بستن منو" class="close-btn">&times;</button>
<nav aria-label="منوی اصلی">
  <ul>
    <li><a href="#home" aria-current="page">خانه</a></li>
  </ul>
</nav>
```

### Keyboard Navigation
```css
/* Focus styles */
.btn:focus-visible {
  outline: 2px solid #667eea;
  outline-offset: 2px;
}
```

## Monitoring Performance

### Google PageSpeed
```html
<!-- Google PageSpeed Insights -->
<script>
  // Performance monitoring
  window.addEventListener('load', () => {
    const perfData = performance.getEntriesByType('navigation')[0];
    console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart);
  });
</script>
```

### Web Vitals
```javascript
// Core Web Vitals
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

## Best Practices

### 1. تصاویر
- استفاده از فرمت WebP
- بهینه‌سازی اندازه
- Lazy loading
- Responsive images

### 2. CSS
- Critical CSS
- Minification
- استفاده از CSS Grid/Flexbox
- CSS Variables

### 3. JavaScript
- Code splitting
- Lazy loading
- Minification
- Tree shaking

### 4. HTML
- Semantic HTML
- Meta tags
- Preload resources
- DNS prefetch

### 5. شبکه
- CDN
- Compression
- Caching
- HTTP/2

## ابزارهای اندازه‌گیری

### Google Tools
- **PageSpeed Insights**: https://pagespeed.web.dev/
- **Search Console**: https://search.google.com/search-console
- **Analytics**: https://analytics.google.com/

### Third-party Tools
- **GTmetrix**: https://gtmetrix.com/
- **WebPageTest**: https://www.webpagetest.org/
- **Lighthouse**: Chrome DevTools

## تماس

برای سوالات بهینه‌سازی:

- 📧 ایمیل: performance@honartaneh.com
- 📱 واتساپ: +989217907398
- 🐛 [Issues](https://github.com/yourusername/honartaneh/issues)

---

**بهینه‌سازی موفق! ⚡**
