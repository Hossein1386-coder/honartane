// Products Data - Load from localStorage or use default
let products = [];
let blogPosts = [];

// Load products from localStorage or use default data
function loadProducts() {
    // Try admin panel storage key first, then fallback to old key
    let stored = localStorage.getItem('honartaneh_products');
    if (!stored) {
        stored = localStorage.getItem('products');
    }
    
    if (stored) {
        try {
            products = JSON.parse(stored);
        } catch (error) {
            console.error('Error loading products from localStorage:', error);
            products = getDefaultProducts();
        }
    } else {
        products = getDefaultProducts();
    }
    
    // Filter only active products for display
    return products.filter(product => product.active !== false);
}

// Load blog posts from localStorage
function loadBlogPosts() {
    let stored = localStorage.getItem('honartaneh_blog_posts');
    
    if (stored) {
        try {
            blogPosts = JSON.parse(stored);
        } catch (error) {
            console.error('Error loading blog posts from localStorage:', error);
            blogPosts = getDefaultBlogPosts();
        }
    } else {
        blogPosts = getDefaultBlogPosts();
    }
    
    // Filter only published posts
    return blogPosts.filter(post => post.status === 'published');
}

// Get default blog posts
function getDefaultBlogPosts() {
    return [
        {
            id: '1',
            title: 'راهنمای انتخاب بهترین چوب برای خانه',
            category: 'راهنمای خرید',
            excerpt: 'انتخاب نوع چوب مناسب برای خانه یکی از مهم‌ترین تصمیمات در دکوراسیون است.',
            content: 'انتخاب نوع چوب مناسب برای خانه یکی از مهم‌ترین تصمیمات در دکوراسیون است. در این مقاله به شما کمک می‌کنیم تا بهترین نوع چوب را برای هر قسمت از خانه انتخاب کنید.',
            image: 'images/blog-1.jpg',
            keywords: 'چوب، انتخاب چوب، دکوراسیون',
            status: 'published',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        },
        {
            id: '2',
            title: 'نگهداری و مراقبت از محصولات چوبی',
            category: 'نگهداری',
            excerpt: 'محصولات چوبی با مراقبت مناسب می‌توانند سال‌ها زیبا و مقاوم بمانند.',
            content: 'محصولات چوبی با مراقبت مناسب می‌توانند سال‌ها زیبا و مقاوم بمانند. در این راهنما، روش‌های صحیح نگهداری از میز چوبی، قفسه چوبی و سایر محصولات چوبی را به شما آموزش می‌دهیم.',
            image: 'images/blog-2.jpg',
            keywords: 'نگهداری چوب، مراقبت چوبی',
            status: 'published',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
    ];
}

// Default products data
function getDefaultProducts() {
    return [
        {
            id: 1,
            title: "میز چوبی",
            description: "طراحی مینیمال با چوب گردو طبیعی",
            price: "تماس بگیرید",
            image: "images/55.jpg",
            active: true
        },
        {
            id: 2,
            title: "استند چوبی موبایل",
            description: "ساخته شده با دقت، مقاوم و زیبا",
            price: "تماس بگیرید",
            image: "images/2.jpg",
            active: true
        },
        {
            id: 3,
            title: "برد مزه",
            description: "سادگی و کارایی در یک طراحی",
            price: "تماس بگیرید",
            image: "images/3.jpg",
            active: true
        },
        {
            id: 4,
            title: "ساعت چوبی",
            description: "تراش داده شده با دست، برای دکور",
            price: "تماس بگیرید",
            image: "images/58.jpg",
            active: true
        },
        {
            id: 5,
            title: "برد مزه با چوب سنجد",
            description: "طراحی مدرن با چوب راش",
            price: "تماس بگیرید",
            image: "images/5.jpg",
            active: true
        },
        {
            id: 6,
            title: "میز گیمینگ با چوب سنجد",
            description: "مجموعه کامل با پرداخت طبیعی",
            price: "تماس بگیرید",
            image: "images/table.jpg",
            active: true
        }
    ];
}

// Settings (loaded from localStorage if present)
const SETTINGS_STORAGE_KEY = 'honartaneh_settings_v1';
function getSiteSettings() {
    try {
        const raw = localStorage.getItem(SETTINGS_STORAGE_KEY) || sessionStorage.getItem(SETTINGS_STORAGE_KEY);
        if (raw) return JSON.parse(raw);
    } catch {}
    return {
        phone: "989217907398",
        instagram: "woodview_atilier"
    };
}
const __SETTINGS__ = getSiteSettings();

// WhatsApp/Instagram from settings
const WHATSAPP_NUMBER = __SETTINGS__.phone;
const INSTAGRAM_USERNAME = __SETTINGS__.instagram;

// Open WhatsApp with message
function openWhatsApp(message, productTitle = null) {
    let finalMessage = message;
    
    if (productTitle) {
        finalMessage = `سلام، می‌خواهم محصول "${productTitle}" را سفارش دهم.\n\nلطفا اطلاعات بیشتری در مورد این محصول به من بدهید.`;
    }
    
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(finalMessage)}`;
    window.open(url, '_blank');
}

// Render Products
function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    const activeProducts = loadProducts();
    
    // Clear existing products
    productsGrid.innerHTML = '';
    
    if (activeProducts.length === 0) {
        productsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: #737373;">
                <div style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;">📦</div>
                <h3 style="margin-bottom: 0.5rem; color: #171717;">محصولی برای نمایش وجود ندارد</h3>
                <p>لطفاً بعداً دوباره بررسی کنید.</p>
            </div>
        `;
        return;
    }
    
    activeProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <div class="product-image-wrapper">
                <img src="${product.image}" alt="${product.title}" class="product-image" loading="lazy" onerror="this.onerror=null;this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjhGOUZBIi8+CjxwYXRoIGQ9Ik0xNTAgNzVDMTEwLjIyIDc1IDc1IDExMC4yMiA3NSAxNTBDNzUgMTg5Ljc4IDExMC4yMiAyMjUgMTUwIDIyNUMxODkuNzggMjI1IDIyNSAxODkuNzggMjI1IDE1MEMyMjUgMTEwLjIyIDE4OS43OCA3NSAxNTAgNzVaIiBmaWxsPSIjRTVFNUU1Ii8+CjxwYXRoIGQ9Ik0xMDUgMTUwTDEwNSAyMjVIMTk1VjE1MEgxMDVaIiBmaWxsPSIjRTVFNUU1Ii8+Cjwvc3ZnPgo=';">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">${product.price}</span>
                    <div class="product-order-group">
                        <button class="product-order" onclick="openWhatsApp('', '${product.title}')">واتساپ</button>
                        <a class="product-order" href="https://instagram.com/${INSTAGRAM_USERNAME}" target="_blank" rel="noopener">اینستاگرام</a>
                    </div>
                </div>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
    });
}

// Render product slider (top picks)
function renderProductSlider() {
    const activeProducts = loadProducts();
    const sliderTrack = document.getElementById('sliderTrack');
    const sliderDots = document.getElementById('sliderDots');
    if (!sliderTrack) return;
    sliderTrack.innerHTML = '';
    sliderDots.innerHTML = '';
    sliderTrack.setAttribute('role', 'group');
    sliderTrack.setAttribute('tabindex', '0');
    const slides = activeProducts.slice(0, 5); // show at most 5 products
    slides.forEach((p, i) => {
        const slide = document.createElement('div');
        slide.className = 'slide';
        slide.setAttribute('role', 'group');
        slide.setAttribute('aria-roledescription', 'slide');
        slide.setAttribute('aria-label', `${i + 1} از ${slides.length}`);
        slide.innerHTML = `
            <div class="product-card">
                <div class="product-image-wrapper">
                    <img src="${p.image}" alt="${p.title}" class="product-image" loading="lazy" onerror="this.onerror=null;this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjhGOUZBIi8+CjxwYXRoIGQ9Ik0xNTAgNzVDMTEwLjIyIDc1IDc1IDExMC4yMiA3NSAxNTBDNzUgMTg5Ljc4IDExMC4yMiAyMjUgMTUwIDIyNUMxODkuNzggMjI1IDIyNSAxODkuNzggMjI1IDE1MEMyMjUgMTEwLjIyIDE4OS43OCA3NSAxNTAgNzVaIiBmaWxsPSIjRTVFNUU1Ii8+CjxwYXRoIGQ9Ik0xMDUgMTUwTDEwNSAyMjVIMTk1VjE1MEgxMDVaIiBmaWxsPSIjRTVFNUU1Ii8+Cjwvc3ZnPgo=';'>
                </div>
                <div class="product-info">
                    <h3 class="product-title">${p.title}</h3>
                    <p class="product-description">${p.description}</p>
                    <div class="product-footer">
                        <span class="product-price">${p.price}</span>
                        <div class="product-order-group">
                            <button class="product-order" onclick="openWhatsApp('', '${p.title}')">واتساپ</button>
                            <a class="product-order" href="https://instagram.com/${INSTAGRAM_USERNAME}" target="_blank" rel="noopener">اینستاگرام</a>
                        </div>
                    </div>
                </div>
            </div>`;
        sliderTrack.appendChild(slide);
        const dot = document.createElement('button');
        dot.setAttribute('aria-label', `رفتن به اسلاید ${i + 1}`);
        dot.setAttribute('aria-controls', 'sliderTrack');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            sliderTrack.scrollTo({ left: slide.offsetLeft - 16, behavior: 'smooth' });
        });
        sliderDots.appendChild(dot);
    });

    // CTA slide: View all
    const ctaSlide = document.createElement('div');
    ctaSlide.className = 'slide';
    ctaSlide.innerHTML = `
        <div class="product-card" style="display:flex;align-items:center;justify-content:center;min-height:220px;">
            <a href="products.html" class="btn btn-primary" style="display:inline-flex;gap:.5rem;align-items:center;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 12.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                <span>مشاهده همه نمونه‌کارها</span>
            </a>
        </div>`;
    sliderTrack.appendChild(ctaSlide);

    // Nav buttons
    const prev = document.getElementById('sliderPrev');
    const next = document.getElementById('sliderNext');
    if (prev && next) {
        // Fix direction: راست (prev) -> به راست اسکرول کند (مثبت), چپ (next) -> به چپ اسکرول کند (منفی)
        prev.onclick = () => sliderTrack.scrollBy({ left: Math.max(320, sliderTrack.clientWidth * 0.9), behavior: 'smooth' });
        next.onclick = () => sliderTrack.scrollBy({ left: -Math.max(320, sliderTrack.clientWidth * 0.9), behavior: 'smooth' });
    }

    // Active dot sync on scroll
    const slidesEls = Array.from(sliderTrack.children);
    function updateDotsAndArrows() {
        const center = sliderTrack.scrollLeft + sliderTrack.clientWidth / 2;
        let activeIndex = 0;
        let minDist = Infinity;
        slidesEls.forEach((el, idx) => {
            const elCenter = el.offsetLeft + el.clientWidth / 2;
            const dist = Math.abs(elCenter - center);
            if (dist < minDist) { minDist = dist; activeIndex = idx; }
        });
        Array.from(sliderDots.children).forEach((d, i) => {
            if (i === activeIndex) d.classList.add('active'); else d.classList.remove('active');
        });
        // Disable arrows at edges
        if (prev && next) {
            const atStart = sliderTrack.scrollLeft <= 2;
            const atEnd = Math.ceil(sliderTrack.scrollLeft + sliderTrack.clientWidth) >= sliderTrack.scrollWidth - 2;
            prev.disabled = atStart;
            next.disabled = atEnd;
        }
    }
    sliderTrack.addEventListener('scroll', () => {
        // Use rAF for better perf
        if (sliderTrack._ticking) return;
        sliderTrack._ticking = true;
        requestAnimationFrame(() => { updateDotsAndArrows(); sliderTrack._ticking = false; });
    });
    updateDotsAndArrows();

    // Keyboard navigation
    sliderTrack.addEventListener('keydown', (e) => {
        // RTL-friendly: Right arrow moves to previous (right), Left arrow moves to next (left)
        if (e.key === 'ArrowRight') { e.preventDefault(); sliderTrack.scrollBy({ left: -sliderTrack.clientWidth, behavior: 'smooth' }); }
        if (e.key === 'ArrowLeft')  { e.preventDefault(); sliderTrack.scrollBy({ left: sliderTrack.clientWidth, behavior: 'smooth' }); }
        if (e.key === 'Home')       { e.preventDefault(); sliderTrack.scrollTo({ left: 0, behavior: 'smooth' }); }
        if (e.key === 'End')        { e.preventDefault(); sliderTrack.scrollTo({ left: sliderTrack.scrollWidth, behavior: 'smooth' }); }
    });
}


// Apply settings to About/Contact sections after DOM load
document.addEventListener('DOMContentLoaded', () => {
    const settings = __SETTINGS__;
    // Update phone links
    try {
        const telLink = document.querySelector('a[href^="tel:"]');
        if (telLink) {
            telLink.href = `tel:+${settings.phone}`;
            telLink.textContent = `+${settings.phone}`;
        }
        const footerPhone = document.querySelector('.footer-contact-item span[dir="ltr"]');
        if (footerPhone) footerPhone.textContent = settings.phone.startsWith('+') ? settings.phone : settings.phone.replace(/^/, '0');
        // Update instagram links
        document.querySelectorAll('a[href*="instagram.com"]').forEach(a => {
            a.href = `https://instagram.com/${settings.instagram}`;
            if (a.classList.contains('contact-link')) a.textContent = settings.instagram;
        });
        // Update about texts if present
        const aboutParas = document.querySelectorAll('.about-story .about-text');
        settings.about && aboutParas.forEach((p, idx) => {
            if (settings.about[idx]) p.textContent = settings.about[idx];
        });
    } catch {}
});


// Loading Screen Management
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    const body = document.body;
    
    // Add loaded class to body
    body.classList.add('loaded');
    
    // Hide loading screen after animation
    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
        }
    }, 800);
}

// Show loading screen initially
window.addEventListener('load', function() {
    // Simulate loading time for better UX
    setTimeout(hideLoadingScreen, 2000);
});

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navMobile = document.getElementById('navMobile');
    const menuIcon = document.getElementById('menuIcon');
    const closeIcon = document.getElementById('closeIcon');
    const navLinks = document.querySelectorAll('.nav-link-mobile');
    
    menuToggle.addEventListener('click', function() {
        navMobile.classList.toggle('hidden');
        menuIcon.classList.toggle('hidden');
        closeIcon.classList.toggle('hidden');
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMobile.classList.add('hidden');
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        });
    });
    
    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Header scroll effect
    let lastScroll = 0;
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
        } else {
            header.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
    
    // Render slider on page load (grid may be removed on homepage)
    renderProductSlider();

    // Active link highlighting using IntersectionObserver
    const sections = document.querySelectorAll('section[id]');
    const desktopLinks = document.querySelectorAll('.nav-desktop .nav-link');
    const bottomLinks = document.querySelectorAll('.bottom-nav .bottom-nav-link');
    const linkMap = new Map();
    desktopLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            linkMap.set(href.slice(1), link);
        }
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            const link = linkMap.get(id);
            if (entry.isIntersecting && link) {
                desktopLinks.forEach(l => l.classList.remove('active'));
                bottomLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                const bottomLink = Array.from(bottomLinks).find(l => l.getAttribute('href') === `#${id}`);
                if (bottomLink) bottomLink.classList.add('active');
            }
        });
    }, {
        root: null,
        rootMargin: '-40% 0px -55% 0px',
        threshold: 0.01
    });

    sections.forEach(section => observer.observe(section));
});

