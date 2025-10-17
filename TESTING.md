# راهنمای تست

## تست‌های عملکرد

### Google PageSpeed Insights
```bash
# تست سرعت سایت
https://pagespeed.web.dev/
```

### GTmetrix
```bash
# تست عملکرد
https://gtmetrix.com/
```

### WebPageTest
```bash
# تست تفصیلی
https://www.webpagetest.org/
```

## تست‌های مرورگر

### Chrome DevTools
```bash
# باز کردن DevTools
F12 یا Ctrl+Shift+I

# تست responsive
Ctrl+Shift+M

# تست performance
Performance tab

# تست network
Network tab
```

### Firefox Developer Tools
```bash
# باز کردن DevTools
F12 یا Ctrl+Shift+I

# تست responsive
Ctrl+Shift+M

# تست performance
Performance tab
```

### Safari Web Inspector
```bash
# فعال کردن Developer menu
Preferences > Advanced > Show Develop menu

# باز کردن Web Inspector
Develop > Show Web Inspector
```

## تست‌های موبایل

### Chrome DevTools Mobile
```bash
# تست در device های مختلف
1. F12
2. Toggle device toolbar
3. انتخاب device
```

### Real Device Testing
```bash
# تست در موبایل واقعی
1. اتصال موبایل به WiFi
2. باز کردن سایت در موبایل
3. تست تمام قابلیت‌ها
```

## تست‌های عملکرد

### Core Web Vitals
```javascript
// تست Core Web Vitals
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

### Performance API
```javascript
// تست زمان بارگذاری
window.addEventListener('load', () => {
  const perfData = performance.getEntriesByType('navigation')[0];
  console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart);
});
```

## تست‌های امنیت

### Security Headers
```bash
# تست security headers
https://securityheaders.com/
```

### SSL Test
```bash
# تست SSL
https://www.ssllabs.com/ssltest/
```

## تست‌های SEO

### Google Search Console
```bash
# تست SEO
https://search.google.com/search-console
```

### Schema Markup
```bash
# تست structured data
https://search.google.com/test/rich-results
```

## تست‌های Accessibility

### WAVE
```bash
# تست accessibility
https://wave.webaim.org/
```

### axe DevTools
```bash
# نصب axe extension
Chrome Web Store > axe DevTools
```

## تست‌های عملکرد

### Load Testing
```bash
# تست بار
npm install -g artillery
artillery quick --count 10 --num 5 https://yoursite.com
```

### Stress Testing
```bash
# تست استرس
npm install -g loadtest
loadtest -n 1000 -c 10 https://yoursite.com
```

## تست‌های عملکرد

### Unit Testing
```javascript
// تست JavaScript
function testProductLoading() {
  const products = loadProducts();
  assert(products.length > 0, 'Products should be loaded');
}

function testAdminLogin() {
  const result = login('admin123');
  assert(result === true, 'Admin login should work');
}
```

### Integration Testing
```javascript
// تست یکپارچگی
function testProductManagement() {
  // اضافه کردن محصول
  const product = addProduct({
    title: 'Test Product',
    description: 'Test Description',
    price: 'Test Price',
    image: 'test.jpg'
  });
  
  // بررسی وجود محصول
  const products = loadProducts();
  assert(products.includes(product), 'Product should be added');
  
  // حذف محصول
  deleteProduct(product.id);
  
  // بررسی حذف محصول
  const updatedProducts = loadProducts();
  assert(!updatedProducts.includes(product), 'Product should be deleted');
}
```

## تست‌های عملکرد

### Cross-browser Testing
```bash
# تست در مرورگرهای مختلف
- Chrome
- Firefox
- Safari
- Edge
- Opera
```

### Cross-platform Testing
```bash
# تست در platform های مختلف
- Windows
- macOS
- Linux
- iOS
- Android
```

## تست‌های عملکرد

### Performance Testing
```javascript
// تست عملکرد
function testPageLoadTime() {
  const startTime = performance.now();
  
  // بارگذاری صفحه
  window.addEventListener('load', () => {
    const endTime = performance.now();
    const loadTime = endTime - startTime;
    
    assert(loadTime < 3000, 'Page should load in less than 3 seconds');
  });
}
```

### Memory Testing
```javascript
// تست حافظه
function testMemoryUsage() {
  const initialMemory = performance.memory.usedJSHeapSize;
  
  // انجام عملیات
  loadProducts();
  renderProducts();
  
  const finalMemory = performance.memory.usedJSHeapSize;
  const memoryIncrease = finalMemory - initialMemory;
  
  assert(memoryIncrease < 1000000, 'Memory usage should be reasonable');
}
```

## تست‌های عملکرد

### Error Testing
```javascript
// تست خطاها
function testErrorHandling() {
  try {
    // عملیات که ممکن است خطا دهد
    loadProducts();
  } catch (error) {
    assert(error.message, 'Error should have a message');
  }
}
```

### Edge Case Testing
```javascript
// تست edge cases
function testEdgeCases() {
  // تست با داده‌های خالی
  const emptyProducts = loadProducts([]);
  assert(emptyProducts.length === 0, 'Empty products should return empty array');
  
  // تست با داده‌های نامعتبر
  const invalidProducts = loadProducts(null);
  assert(Array.isArray(invalidProducts), 'Invalid products should return array');
}
```

## تست‌های عملکرد

### User Experience Testing
```bash
# تست تجربه کاربری
1. تست navigation
2. تست forms
3. تست buttons
4. تست links
5. تست responsive design
```

### Usability Testing
```bash
# تست قابلیت استفاده
1. تست menu
2. تست search
3. تست filters
4. تست pagination
5. تست accessibility
```

## تست‌های عملکرد

### Regression Testing
```bash
# تست regression
1. تست تمام قابلیت‌های موجود
2. تست تغییرات جدید
3. تست compatibility
4. تست performance
```

### Smoke Testing
```bash
# تست smoke
1. تست ورود به سایت
2. تست navigation
3. تست نمایش محصولات
4. تست پنل ادمین
```

## تست‌های عملکرد

### Test Automation
```javascript
// اتوماسیون تست
function runAllTests() {
  testProductLoading();
  testAdminLogin();
  testProductManagement();
  testErrorHandling();
  testEdgeCases();
  
  console.log('All tests passed!');
}
```

### Continuous Testing
```yaml
# GitHub Actions
name: Test
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Run tests
      run: npm test
```

## تست‌های عملکرد

### Test Data
```javascript
// داده‌های تست
const testProducts = [
  {
    id: 1,
    title: 'Test Product 1',
    description: 'Test Description 1',
    price: 'Test Price 1',
    image: 'test1.jpg',
    active: true
  },
  {
    id: 2,
    title: 'Test Product 2',
    description: 'Test Description 2',
    price: 'Test Price 2',
    image: 'test2.jpg',
    active: false
  }
];
```

### Test Environment
```bash
# محیط تست
- Local development
- Staging environment
- Production environment
```

## تست‌های عملکرد

### Test Results
```javascript
// نتایج تست
const testResults = {
  passed: 0,
  failed: 0,
  total: 0
};

function recordTestResult(testName, passed) {
  testResults.total++;
  if (passed) {
    testResults.passed++;
    console.log(`✅ ${testName} passed`);
  } else {
    testResults.failed++;
    console.log(`❌ ${testName} failed`);
  }
}
```

### Test Reporting
```javascript
// گزارش تست
function generateTestReport() {
  console.log('Test Results:');
  console.log(`Total: ${testResults.total}`);
  console.log(`Passed: ${testResults.passed}`);
  console.log(`Failed: ${testResults.failed}`);
  console.log(`Success Rate: ${(testResults.passed / testResults.total * 100).toFixed(2)}%`);
}
```

## تماس

برای سوالات تست:

- 📧 ایمیل: testing@honartaneh.com
- 📱 واتساپ: +989217907398
- 🐛 [Issues](https://github.com/yourusername/honartaneh/issues)

---

**تست موفق! ✅**
