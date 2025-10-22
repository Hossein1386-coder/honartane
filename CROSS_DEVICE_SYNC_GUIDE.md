# راهنمای همگام‌سازی بین دستگاه‌ها

## وضعیت فعلی

✅ **همگام‌سازی محلی**: کار می‌کند (بین تب‌های همان مرورگر)  
⚠️ **همگام‌سازی بین دستگاه‌ها**: نیاز به تنظیم GitHub Token

## راه حل کامل: GitHub API

### مرحله 1: ایجاد GitHub Personal Access Token

1. به GitHub بروید: https://github.com/settings/tokens
2. روی "Generate new token" کلیک کنید
3. نام توکن: `honartaneh-admin`
4. دسترسی‌های مورد نیاز:
   - ✅ `repo` (دسترسی کامل به repository)
   - ✅ `workflow` (برای GitHub Actions)

### مرحله 2: فعال‌سازی در پنل ادمین

در فایل `admin/admin-script.js` خط زیر را پیدا کنید:

```javascript
// TODO: Implement GitHub API call with Personal Access Token
```

و آن را با کد زیر جایگزین کنید:

```javascript
// GitHub API configuration
const GITHUB_TOKEN='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'; // توکن خود را اینجا قرار دهید
const GITHUB_REPO = 'UpShopco-Ir/honartaneh';
const GITHUB_FILE_PATH = 'data/products.json';

async function saveToGitHub() {
    try {
        // Get current file SHA
        const getResponse = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${GITHUB_FILE_PATH}`, {
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        
        let currentSha = null;
        if (getResponse.ok) {
            const fileData = await getResponse.json();
            currentSha = fileData.sha;
        }
        
        // Update file
        const response = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${GITHUB_FILE_PATH}`, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: `Update products from admin panel - ${new Date().toLocaleString('fa-IR')}`,
                content: btoa(JSON.stringify(products, null, 2)),
                sha: currentSha
            })
        });
        
        if (response.ok) {
            console.log('✅ محصولات با موفقیت به GitHub ارسال شدند');
            showNotification('محصولات به سرور ارسال شدند ☁️', 'success');
        } else {
            throw new Error(`GitHub API error: ${response.status}`);
        }
        
    } catch (error) {
        console.error('❌ خطا در ارسال به GitHub:', error);
        showNotification('خطا در ارسال به سرور', 'error');
    }
}
```

### مرحله 3: تست همگام‌سازی

1. **پنل ادمین**: محصول جدیدی اضافه کنید
2. **سایت اصلی**: منتظر بمانید (حداکثر 2 دقیقه)
3. **دستگاه دیگر**: سایت را refresh کنید

## راه حل‌های جایگزین

### 1. Firebase Realtime Database

```javascript
// Firebase configuration
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-project.firebaseapp.com",
    databaseURL: "https://your-project.firebaseio.com",
    projectId: "your-project-id"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Save products to Firebase
function saveProductsToFirebase() {
    database.ref('products').set(products);
}

// Listen for changes
database.ref('products').on('value', (snapshot) => {
    const newProducts = snapshot.val();
    if (newProducts) {
        products = newProducts;
        renderProducts();
    }
});
```

### 2. Supabase

```javascript
// Supabase configuration
const supabaseUrl = 'https://your-project.supabase.co';
const supabaseKey = 'your-anon-key';
const supabase = createClient(supabaseUrl, supabaseKey);

// Save products
async function saveProductsToSupabase() {
    const { error } = await supabase
        .from('products')
        .upsert(products);
}

// Listen for changes
supabase
    .channel('products')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, 
        (payload) => {
            loadProducts();
            renderProducts();
        })
    .subscribe();
```

### 3. Airtable API

```javascript
// Airtable configuration
const AIRTABLE_API_KEY = 'your-api-key';
const AIRTABLE_BASE_ID = 'your-base-id';
const AIRTABLE_TABLE_NAME = 'Products';

async function saveProductsToAirtable() {
    const records = products.map(product => ({
        fields: {
            'Title': product.title,
            'Description': product.description,
            'Price': product.price,
            'Image': product.image,
            'Active': product.active
        }
    }));
    
    const response = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ records })
    });
}
```

## مقایسه راه حل‌ها

| راه حل | هزینه | پیچیدگی | Real-time | امنیت |
|--------|-------|---------|-----------|-------|
| GitHub API | رایگان | متوسط | 2 دقیقه | بالا |
| Firebase | رایگان تا حدی | آسان | فوری | بالا |
| Supabase | رایگان تا حدی | آسان | فوری | بالا |
| Airtable | پولی | آسان | متوسط | متوسط |

## توصیه

برای شروع، **GitHub API** را پیشنهاد می‌کنم چون:
- رایگان است
- نیازی به سرویس خارجی ندارد
- با ساختار فعلی سازگار است
- امنیت بالایی دارد

## نکات امنیتی

⚠️ **مهم**: هرگز توکن GitHub را در کد عمومی قرار ندهید!

برای امنیت بیشتر:
1. توکن را در متغیر محیطی قرار دهید
2. از GitHub Secrets استفاده کنید
3. دسترسی توکن را محدود کنید
4. توکن را به‌طور منظم تجدید کنید

## عیب‌یابی

### اگر همگام‌سازی کار نمی‌کند:

1. **Console را بررسی کنید**:
   ```javascript
   console.log('🔄 محصولات جدید از GitHub دریافت شد');
   ```

2. **Network tab را بررسی کنید**:
   - درخواست به `raw.githubusercontent.com` موفق است؟
   - پاسخ JSON معتبر است؟

3. **GitHub Token را بررسی کنید**:
   - توکن معتبر است؟
   - دسترسی‌های لازم را دارد؟

4. **CORS را بررسی کنید**:
   - GitHub API از مرورگر قابل دسترسی است
   - نیازی به تنظیم CORS نیست
