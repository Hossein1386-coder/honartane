# هنر تنه 🪵

وب‌سایت فروش محصولات چوبی دست‌ساز با پنل مدیریت کامل

## ویژگی‌ها

### سایت اصلی
- ✅ طراحی ریسپانسیو و مدرن
- ✅ بهینه‌سازی شده برای SEO
- ✅ سازگار با موبایل و تبلت
- ✅ اتصال مستقیم به واتساپ و اینستاگرام
- ✅ نمایش محصولات با تصاویر باکیفیت

### پنل مدیریت
- ✅ ورود امن با رمز عبور
- ✅ مدیریت کامل محصولات (افزودن، ویرایش، حذف)
- ✅ فعال/غیرفعال کردن محصولات
- ✅ ذخیره‌سازی در localStorage
- ✅ رابط کاربری زیبا و کاربرپسند
- ✅ سازگار با GitHub Pages

## نصب و راه‌اندازی

### برای توسعه محلی
```bash
# کلون کردن پروژه
git clone https://github.com/yourusername/honartaneh.git
cd honartaneh

# نصب dependencies (اختیاری)
npm install

# اجرای سرور محلی
npm start
```

### برای GitHub Pages
1. پروژه را در GitHub آپلود کنید
2. در Settings > Pages، منبع را روی "Deploy from a branch" تنظیم کنید
3. شاخه `main` را انتخاب کنید
4. سایت شما در آدرس `https://yourusername.github.io/honartaneh` در دسترس خواهد بود

## دسترسی به پنل مدیریت

- آدرس: `yoursite.com/admin/`
- رمز عبور پیش‌فرض: `admin123`

⚠️ **مهم**: حتماً رمز عبور پیش‌فرض را تغییر دهید!

## ساختار پروژه

```
honartaneh/
├── index.html              # صفحه اصلی
├── style.css               # استایل‌های اصلی
├── script.js               # JavaScript اصلی
├── images/                 # تصاویر محصولات
├── admin/                  # پنل مدیریت
│   ├── index.html          # صفحه ورود و داشبورد
│   ├── admin-style.css     # استایل‌های پنل
│   ├── admin-script.js     # JavaScript پنل
│   ├── README.md           # راهنمای پنل
│   └── 404.html            # صفحه خطا
├── package.json            # تنظیمات npm
└── README.md               # این فایل
```

## سفارشی‌سازی

### تغییر اطلاعات تماس
فایل `script.js` را ویرایش کنید:
```javascript
const WHATSAPP_NUMBER = "989217907398";
const INSTAGRAM_USERNAME = "woodview_atilier";
```

### تغییر رمز عبور ادمین
فایل `admin/admin-script.js` را ویرایش کنید:
```javascript
const ADMIN_PASSWORD = "رمز_جدید_شما";
```

### اضافه کردن محصولات
1. وارد پنل مدیریت شوید
2. روی "افزودن محصول جدید" کلیک کنید
3. اطلاعات محصول را وارد کنید
4. تصاویر را در پوشه `images/` قرار دهید

## پشتیبانی

برای سوالات و مشکلات:
- ایمیل: info@honartaneh.com
- اینستاگرام: [@woodview_atilier](https://instagram.com/woodview_atilier)
- واتساپ: +989217907398

## مجوز

این پروژه تحت مجوز MIT منتشر شده است.

---

**هنر تنه** - جایی که هنر، عشق و طبیعت در کنار هم معنا پیدا می‌کنند 🌿
