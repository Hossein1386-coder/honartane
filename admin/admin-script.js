// Admin Panel JavaScript

// Configuration
const ADMIN_PASSWORD = "admin1234"; // تغییر این رمز عبور را فراموش نکنید
const PRODUCTS_STORAGE_KEY = "honartaneh_products";
const BLOG_POSTS_STORAGE_KEY = "honartaneh_blog_posts";
const ADMIN_SESSION_KEY = "admin_session";
const ADMIN_PASSWORD_KEY = "admin_password";

// DOM Elements
const loginScreen = document.getElementById('loginScreen');
const adminDashboard = document.getElementById('adminDashboard');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const logoutBtn = document.getElementById('logoutBtn');
const addProductBtn = document.getElementById('addProductBtn');
const addProductBtnAlt = document.getElementById('addProductBtnAlt');
const productsList = document.getElementById('productsList');
const productModal = document.getElementById('productModal');
const deleteModal = document.getElementById('deleteModal');
const productForm = document.getElementById('productForm');
const modalTitle = document.getElementById('modalTitle');
const closeModal = document.getElementById('closeModal');
const closeDeleteModal = document.getElementById('closeDeleteModal');
const cancelBtn = document.getElementById('cancelBtn');
const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');

// Mobile Menu Elements
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileSidebar = document.getElementById('mobileSidebar');
const mobileSidebarOverlay = document.getElementById('mobileSidebarOverlay');
const mobileSidebarClose = document.getElementById('mobileSidebarClose');

// Navigation Elements
const navLinks = document.querySelectorAll('.nav-link');
const contentSections = document.querySelectorAll('.content-section');

// Quick Actions
const quickAddProduct = document.getElementById('quickAddProduct');
const quickSettings = document.getElementById('quickSettings');

// Settings Elements
const contactForm = document.getElementById('contactForm');
const aboutForm = document.getElementById('aboutForm');
const settingsPhone = document.getElementById('settingsPhone');
const settingsInstagram = document.getElementById('settingsInstagram');
const about1 = document.getElementById('about1');
const about2 = document.getElementById('about2');
const about3 = document.getElementById('about3');
const about4 = document.getElementById('about4');
const resetContactBtn = document.getElementById('resetContactBtn');
const resetAboutBtn = document.getElementById('resetAboutBtn');

// Password Change Elements
const passwordChangeForm = document.getElementById('passwordChangeForm');
const currentPassword = document.getElementById('currentPassword');
const newPassword = document.getElementById('newPassword');
const confirmPassword = document.getElementById('confirmPassword');
const cancelPasswordChange = document.getElementById('cancelPasswordChange');

// Backup Elements
const exportAllBtn = document.getElementById('exportAllBtn');
const importBtn = document.getElementById('importBtn');
const importFile = document.getElementById('importFile');
const exportProductsBtn = document.getElementById('exportProductsBtn');

// Image Upload Elements
const productImageFile = document.getElementById('productImageFile');
const imageUploadArea = document.getElementById('imageUploadArea');
const uploadPlaceholder = document.getElementById('uploadPlaceholder');
const imagePreview = document.getElementById('imagePreview');
const previewImg = document.getElementById('previewImg');
const removeImage = document.getElementById('removeImage');
const productImage = document.getElementById('productImage');

// State
let currentProductId = null;
let products = [];
let blogPosts = [];
let currentBlogId = null;
let deleteProductId = null;
let deleteBlogId = null;
let siteSettings = null;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Show loading screen
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Simulate loading time
    setTimeout(() => {
        try {
            // Load data first to avoid empty UI after refresh
            loadProducts();
            loadBlogPosts();
            loadSettings();
            checkAdminSession();
            setupEventListeners();
            setupMobileMenu();
            setupBlogEventListeners();
            
            // Update displays after loading
            updateProductsDisplay();
            updateBlogPostsDisplay();
            
            // Hide loading screen
            if (loadingScreen) {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 300);
            }
        } catch (error) {
            console.error('Error during initialization:', error);
            // Hide loading screen even if there's an error
            if (loadingScreen) {
                loadingScreen.style.display = 'none';
            }
        }
    }, 1500); // 1.5 second loading time
});

// Check if admin is already logged in
function checkAdminSession() {
    const session = localStorage.getItem(ADMIN_SESSION_KEY);
    if (session === 'true') {
        showDashboard();
    } else {
        showLogin();
    }
}

// Show login screen
function showLogin() {
    loginScreen.classList.remove('hidden');
    adminDashboard.classList.add('hidden');
}

// Show admin dashboard
function showDashboard() {
    // Ensure products are loaded before rendering
    if (!products || products.length === 0) {
        loadProducts();
    }
    loginScreen.classList.add('hidden');
    adminDashboard.classList.remove('hidden');
    updateStats();
    renderProducts();
    
    // Show dashboard section by default
    showSection('dashboard');
}

// Setup event listeners
function setupEventListeners() {
    // Login form
    loginForm.addEventListener('submit', handleLogin);
    
    // Logout
    logoutBtn.addEventListener('click', handleLogout);
    
    // Navigation
    setupNavigation();
    
    // Add product buttons
    if (addProductBtn) addProductBtn.addEventListener('click', () => openProductModal());
    if (addProductBtnAlt) addProductBtnAlt.addEventListener('click', () => openProductModal());
    
    // Quick actions
    if (quickAddProduct) quickAddProduct.addEventListener('click', () => {
        showSection('add-product');
        openProductModal();
    });
    if (quickSettings) quickSettings.addEventListener('click', () => showSection('site-settings'));
    
    // Blog management buttons
    const addBlogBtn = document.getElementById('addBlogBtn');
    const addBlogBtnAlt = document.getElementById('addBlogBtnAlt');
    const exportBlogBtn = document.getElementById('exportBlogBtn');
    
    if (addBlogBtn) addBlogBtn.addEventListener('click', showAddBlogModal);
    if (addBlogBtnAlt) addBlogBtnAlt.addEventListener('click', showAddBlogModal);
    if (exportBlogBtn) exportBlogBtn.addEventListener('click', () => exportBlogPosts());
    
    // Modal controls
    closeModal.addEventListener('click', closeProductModal);
    closeDeleteModal.addEventListener('click', closeDeleteModalFunc);
    cancelBtn.addEventListener('click', closeProductModal);
    cancelDeleteBtn.addEventListener('click', closeDeleteModalFunc);
    
    // Product form
    productForm.addEventListener('submit', handleProductSubmit);
    
    // Delete confirmation
    confirmDeleteBtn.addEventListener('click', handleDeleteConfirm);
    
    // Image upload events
    setupImageUpload();

    // Settings forms
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
        resetContactBtn.addEventListener('click', resetContactToDefault);
    }
    
    if (aboutForm) {
        aboutForm.addEventListener('submit', handleAboutSubmit);
        resetAboutBtn.addEventListener('click', resetAboutToDefault);
    }
    
    // Backup functionality
    if (exportAllBtn) exportAllBtn.addEventListener('click', exportAllData);
    if (exportProductsBtn) exportProductsBtn.addEventListener('click', exportProducts);
    if (importBtn) importBtn.addEventListener('click', () => importFile.click());
    if (importFile) importFile.addEventListener('change', importAllData);
    
    // Password change functionality
    if (passwordChangeForm) passwordChangeForm.addEventListener('submit', handlePasswordChange);
    if (cancelPasswordChange) cancelPasswordChange.addEventListener('click', cancelPasswordChangeForm);
    if (newPassword) newPassword.addEventListener('input', checkPasswordStrength);
    if (confirmPassword) confirmPassword.addEventListener('input', checkPasswordMatch);
    
    // Close modals on outside click
    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) closeProductModal();
    });
    
    deleteModal.addEventListener('click', (e) => {
        if (e.target === deleteModal) closeDeleteModalFunc();
    });
}

// Navigation Functions
function setupNavigation() {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.getAttribute('data-section');
            showSection(section);
        });
    });
}

function showSection(sectionName) {
    // Hide all sections
    contentSections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from all nav links
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(`${sectionName}-section`);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Add active class to corresponding nav link
    const targetLink = document.querySelector(`[data-section="${sectionName}"]`);
    if (targetLink) {
        targetLink.classList.add('active');
    }
    
    // Update page title
    updatePageTitle(sectionName);
    
    // Close mobile sidebar if open
    closeMobileSidebar();
}

function updatePageTitle(sectionName) {
    const titles = {
        'dashboard': 'نمای کلی',
        'products': 'مدیریت محصولات',
        'add-product': 'افزودن محصول',
        'blog-posts': 'مدیریت مقالات',
        'add-blog': 'نوشتن مقاله جدید',
        'site-settings': 'تنظیمات سایت',
        'contact-info': 'اطلاعات تماس',
        'about-us': 'درباره ما',
        'change-password': 'تغییر رمز عبور',
        'backup': 'پشتیبان‌گیری',
        'help': 'راهنما'
    };
    
    const title = titles[sectionName] || 'پنل مدیریت';
    document.title = `${title} - هنر تنه`;
}

// SETTINGS: Keys and defaults
const SETTINGS_STORAGE_KEY = 'honartaneh_settings_v1';
const defaultSettings = {
    phone: '989217907398',
    instagram: 'woodview_atilier',
    about: [
        'در هنرتنه، ما باور داریم هر تکه چوب، روحی از دل طبیعت در خود دارد.',
        'ما با عشق، دقت و مهارت، این روح را به زندگی برمی‌گردانیم و آن را به اثری دست‌ساز و منحصربه‌فرد تبدیل می‌کنیم.',
        'بیشتر کارهای ما سفارشی و اختصاصی هستند — یعنی دقیقاً همان چیزی را می‌سازیم که شما در ذهن دارید.',
        'از انتخاب طرح و نوع چوب گرفته تا جزئیات نهایی، هر مرحله با عشق و سلیقه‌ی شما همراه است.'
    ]
};

function loadSettings() {
    try {
        const raw = localStorage.getItem(SETTINGS_STORAGE_KEY) || sessionStorage.getItem(SETTINGS_STORAGE_KEY);
        siteSettings = raw ? JSON.parse(raw) : defaultSettings;
    } catch {
        siteSettings = defaultSettings;
    }
    // Prefill forms
    if (siteSettings) {
        if (settingsPhone) settingsPhone.value = siteSettings.phone || '';
        if (settingsInstagram) settingsInstagram.value = siteSettings.instagram || '';
        if (about1) about1.value = siteSettings.about?.[0] || '';
        if (about2) about2.value = siteSettings.about?.[1] || '';
        if (about3) about3.value = siteSettings.about?.[2] || '';
        if (about4) about4.value = siteSettings.about?.[3] || '';
    }
}

function saveSettings() {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(siteSettings));
    sessionStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(siteSettings));
}

function handleContactSubmit(e) {
    e.preventDefault();
    siteSettings = {
        ...siteSettings,
        phone: (settingsPhone.value || '').trim(),
        instagram: (settingsInstagram.value || '').trim()
    };
    saveSettings();
    showNotification('اطلاعات تماس با موفقیت ذخیره شد ✅', 'success');
}

function handleAboutSubmit(e) {
    e.preventDefault();
    siteSettings = {
        ...siteSettings,
        about: [
            (about1.value || '').trim(),
            (about2.value || '').trim(),
            (about3.value || '').trim(),
            (about4.value || '').trim()
        ]
    };
    saveSettings();
    showNotification('متن‌های درباره ما با موفقیت ذخیره شد ✅', 'success');
}

function resetContactToDefault() {
    siteSettings = {
        ...siteSettings,
        phone: defaultSettings.phone,
        instagram: defaultSettings.instagram
    };
    saveSettings();
    loadSettings();
    showNotification('اطلاعات تماس به حالت پیش‌فرض بازنشانی شد', 'info');
}

function resetAboutToDefault() {
    siteSettings = {
        ...siteSettings,
        about: [...defaultSettings.about]
    };
    saveSettings();
    loadSettings();
    showNotification('متن‌های درباره ما به حالت پیش‌فرض بازنشانی شد', 'info');
}

// Handle login
function handleLogin(e) {
    e.preventDefault();
    const password = document.getElementById('password').value;
    
    // Get stored password or use default
    const storedPassword = localStorage.getItem(ADMIN_PASSWORD_KEY) || ADMIN_PASSWORD;
    
    if (password === storedPassword) {
        localStorage.setItem(ADMIN_SESSION_KEY, 'true');
        showDashboard();
        loginError.classList.add('hidden');
        document.getElementById('password').value = '';
    } else {
        loginError.classList.remove('hidden');
        document.getElementById('password').value = '';
    }
}

// Handle logout
function handleLogout() {
    localStorage.removeItem(ADMIN_SESSION_KEY);
    showLogin();
}

// Load products from localStorage with fallback to sessionStorage
function loadProducts() {
    let stored = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    
    // If not found in localStorage, try sessionStorage
    if (!stored) {
        stored = sessionStorage.getItem(PRODUCTS_STORAGE_KEY);
    }
    
    if (stored) {
        try {
            products = JSON.parse(stored);
        } catch (error) {
            console.error('Error parsing products data:', error);
            products = getDefaultProducts();
            saveProducts();
        }
    } else {
        // Initialize with default products if none exist
        products = getDefaultProducts();
        saveProducts();
    }
}

// Load blog posts from localStorage
function loadBlogPosts() {
    let stored = localStorage.getItem(BLOG_POSTS_STORAGE_KEY);
    
    if (!stored) {
        stored = sessionStorage.getItem(BLOG_POSTS_STORAGE_KEY);
    }
    
    if (stored) {
        try {
            blogPosts = JSON.parse(stored);
        } catch (error) {
            console.error('Error parsing blog posts data:', error);
            blogPosts = getDefaultBlogPosts();
            saveBlogPosts();
        }
    } else {
        // Initialize with default blog posts if none exist
        blogPosts = getDefaultBlogPosts();
        saveBlogPosts();
    }
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

// Save blog posts to localStorage
function saveBlogPosts() {
    try {
        localStorage.setItem(BLOG_POSTS_STORAGE_KEY, JSON.stringify(blogPosts));
        sessionStorage.setItem(BLOG_POSTS_STORAGE_KEY, JSON.stringify(blogPosts));
    } catch (error) {
        console.error('Error saving blog posts:', error);
    }
}

// Update products display
function updateProductsDisplay() {
    updateStats();
    renderProducts();
}

// Update blog posts display
function updateBlogPostsDisplay() {
    const blogPostsList = document.getElementById('blogPostsList');
    if (!blogPostsList) return;
    
    if (blogPosts.length === 0) {
        blogPostsList.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📝</div>
                <h3>هیچ مقاله‌ای وجود ندارد</h3>
                <p>برای شروع، اولین مقاله خود را بنویسید</p>
                <button class="btn btn-primary" onclick="showAddBlogModal()">
                    <span>✍️</span>
                    نوشتن مقاله جدید
                </button>
            </div>
        `;
        return;
    }
    
    blogPostsList.innerHTML = blogPosts.map(post => `
        <div class="blog-post-card">
            <div class="blog-post-header">
                <h3 class="blog-post-title">${post.title}</h3>
                <div class="blog-post-actions">
                    <button class="btn btn-secondary" onclick="editBlogPost('${post.id}')">
                        <span>✏️</span>
                        ویرایش
                    </button>
                    <button class="btn btn-danger" onclick="deleteBlogPost('${post.id}')">
                        <span>🗑️</span>
                        حذف
                    </button>
                </div>
            </div>
            <div class="blog-post-meta">
                <span class="blog-post-category">${post.category}</span>
                <span class="blog-post-status ${post.status}">${post.status === 'published' ? 'منتشر شده' : 'پیش‌نویس'}</span>
                <span class="blog-post-date">${new Date(post.createdAt).toLocaleDateString('fa-IR')}</span>
            </div>
            <p class="blog-post-excerpt">${post.excerpt}</p>
        </div>
    `).join('');
}

// Blog management functions
function showAddBlogModal() {
    currentBlogId = null;
    document.getElementById('blogModalTitle').textContent = 'نوشتن مقاله جدید';
    document.getElementById('blogForm').reset();
    document.getElementById('blogImage').value = '';
    document.getElementById('blogImagePreview').style.display = 'none';
    document.getElementById('blogUploadPlaceholder').style.display = 'block';
    showModal('blogModal');
}

function editBlogPost(id) {
    const post = blogPosts.find(p => p.id === id);
    if (!post) return;
    
    currentBlogId = id;
    document.getElementById('blogModalTitle').textContent = 'ویرایش مقاله';
    document.getElementById('blogId').value = post.id;
    document.getElementById('blogTitle').value = post.title;
    document.getElementById('blogCategory').value = post.category;
    document.getElementById('blogExcerpt').value = post.excerpt;
    document.getElementById('blogContent').value = post.content;
    document.getElementById('blogKeywords').value = post.keywords;
    document.getElementById('blogStatus').value = post.status;
    document.getElementById('blogImage').value = post.image;
    
    if (post.image) {
        document.getElementById('blogPreviewImg').src = post.image;
        document.getElementById('blogImagePreview').style.display = 'block';
        document.getElementById('blogUploadPlaceholder').style.display = 'none';
    }
    
    showModal('blogModal');
}

function deleteBlogPost(id) {
    const post = blogPosts.find(p => p.id === id);
    if (!post) return;
    
    deleteBlogId = id;
    document.getElementById('deleteBlogName').textContent = post.title;
    showModal('deleteBlogModal');
}

function confirmDeleteBlog() {
    if (!deleteBlogId) return;
    
    blogPosts = blogPosts.filter(p => p.id !== deleteBlogId);
    saveBlogPosts();
    updateBlogPostsDisplay();
    hideModal('deleteBlogModal');
    deleteBlogId = null;
    
    showNotification('مقاله با موفقیت حذف شد', 'success');
}

function saveBlogPost(formData) {
    const postData = {
        id: currentBlogId || Date.now().toString(),
        title: formData.get('title'),
        category: formData.get('category'),
        excerpt: formData.get('excerpt'),
        content: formData.get('content'),
        image: formData.get('image'),
        keywords: formData.get('keywords'),
        status: formData.get('status'),
        createdAt: currentBlogId ? blogPosts.find(p => p.id === currentBlogId)?.createdAt || new Date().toISOString() : new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    
    if (currentBlogId) {
        // Update existing post
        const index = blogPosts.findIndex(p => p.id === currentBlogId);
        if (index !== -1) {
            blogPosts[index] = postData;
        }
    } else {
        // Add new post
        blogPosts.unshift(postData);
    }
    
    saveBlogPosts();
    updateBlogPostsDisplay();
    hideModal('blogModal');
    
    showNotification(currentBlogId ? 'مقاله با موفقیت ویرایش شد' : 'مقاله جدید با موفقیت اضافه شد', 'success');
}

// Export blog posts
function exportBlogPosts() {
    const dataStr = JSON.stringify(blogPosts, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `blog-posts-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    
    showNotification('مقالات با موفقیت دانلود شدند', 'success');
}

// Get default products
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

// Save products to localStorage
function saveProducts() {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    // Also save to main site's localStorage for immediate sync
    localStorage.setItem('products', JSON.stringify(products));
    
    // Save to sessionStorage as backup
    sessionStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
}

// Update statistics
function updateStats() {
    const totalProducts = products.length;
    const activeProducts = products.filter(p => p.active).length;
    const inactiveProducts = totalProducts - activeProducts;
    
    document.getElementById('totalProducts').textContent = totalProducts;
    document.getElementById('activeProducts').textContent = activeProducts;
    if (document.getElementById('inactiveProducts')) {
        document.getElementById('inactiveProducts').textContent = inactiveProducts;
    }
}

// Backup Functions
function exportAllData() {
    const allData = {
        products: products,
        settings: siteSettings,
        exportDate: new Date().toISOString(),
        version: '1.0'
    };
    
    const dataStr = JSON.stringify(allData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `honartaneh-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    
    showNotification('پشتیبان کامل با موفقیت دانلود شد!', 'success');
}

function importAllData(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const importedData = JSON.parse(e.target.result);
                
                if (importedData.products && Array.isArray(importedData.products)) {
                    products = importedData.products;
                    saveProducts();
                }
                
                if (importedData.settings) {
                    siteSettings = importedData.settings;
                    saveSettings();
                    loadSettings();
                }
                
                updateStats();
                renderProducts();
                showNotification('داده‌ها با موفقیت بازیابی شدند!', 'success');
            } catch (error) {
                showNotification('خطا در خواندن فایل پشتیبان!', 'error');
            }
        };
        reader.readAsText(file);
    }
}

// Render products list
function renderProducts() {
    if (products.length === 0) {
        productsList.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📦</div>
                <h3>هیچ محصولی وجود ندارد</h3>
                <p>برای شروع، اولین محصول خود را اضافه کنید.</p>
                <button class="btn btn-primary" onclick="openProductModal()">
                    افزودن محصول جدید
                </button>
            </div>
        `;
        return;
    }
    
    productsList.innerHTML = products.map(product => `
        <div class="product-item">
            <img src="${product.image}" alt="${product.title}" class="product-image" 
                 onerror="this.onerror=null;this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRjhGOUZBIi8+CjxwYXRoIGQ9Ik00MCAyMEMzMC4wNTg5IDIwIDIyIDI4LjA1ODkgMjIgMzhDMjIgNDcuOTQxMSAzMC4wNTg5IDU2IDQwIDU2QzQ5Ljk0MTEgNTYgNTggNDcuOTQxMSA1OCAzOEM1OCAyOC4wNTg5IDQ5Ljk0MTEgMjAgNDAgMjBaIiBmaWxsPSIjRTVFNUU1Ii8+CjxwYXRoIGQ9Ik0yOCAzOEwyOCA2MEg1MlYzOEgyOFoiIGZpbGw9IiNFNUU1RTUiLz4KPC9zdmc+Cg=='"
                 loading="lazy">
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-meta">
                    <span>قیمت: ${product.price}</span>
                    <span class="status-badge ${product.active ? 'status-active' : 'status-inactive'}">
                        ${product.active ? 'فعال' : 'غیرفعال'}
                    </span>
                </div>
            </div>
            <div class="product-actions">
                <button class="btn btn-secondary" onclick="editProduct(${product.id})">
                    ویرایش
                </button>
                <button class="btn btn-danger" onclick="deleteProduct(${product.id})">
                    حذف
                </button>
            </div>
        </div>
    `).join('');
}


// Edit product
function editProduct(productId) {
    openProductModal(productId);
}

// Delete product
function deleteProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        deleteProductId = productId;
        document.getElementById('deleteProductName').textContent = product.title;
        deleteModal.classList.remove('hidden');
    }
}

// Close delete modal
function closeDeleteModalFunc() {
    deleteModal.classList.add('hidden');
    deleteProductId = null;
}

// Handle delete confirmation
function handleDeleteConfirm() {
    if (deleteProductId) {
        products = products.filter(p => p.id !== deleteProductId);
        saveProducts();
        updateStats();
        renderProducts();
        closeDeleteModalFunc();
        
        // Show success message
        showNotification('محصول با موفقیت حذف شد!', 'success');
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease'
    });
    
    // Set background color based on type
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        info: '#17a2b8',
        warning: '#ffc107'
    };
    notification.style.backgroundColor = colors[type] || colors.info;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Export products data (for backup)
function exportProducts() {
    const dataStr = JSON.stringify(products, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'products-backup.json';
    link.click();
    URL.revokeObjectURL(url);
}

// Import products data (for restore)
function importProducts(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const importedProducts = JSON.parse(e.target.result);
                if (Array.isArray(importedProducts)) {
                    products = importedProducts;
                    saveProducts();
                    updateStats();
                    renderProducts();
                    showNotification('محصولات با موفقیت بازیابی شدند!', 'success');
                } else {
                    showNotification('فرمت فایل نامعتبر است!', 'error');
                }
            } catch (error) {
                showNotification('خطا در خواندن فایل!', 'error');
            }
        };
        reader.readAsText(file);
    }
}

// Image Upload Functions
function setupImageUpload() {
    // Click to select file
    imageUploadArea.addEventListener('click', () => {
        productImageFile.click();
    });
    
    // File input change
    productImageFile.addEventListener('change', handleImageSelect);
    
    // Drag and drop
    imageUploadArea.addEventListener('dragover', handleDragOver);
    imageUploadArea.addEventListener('dragleave', handleDragLeave);
    imageUploadArea.addEventListener('drop', handleDrop);
    
    // Remove image
    removeImage.addEventListener('click', removeSelectedImage);
}

function handleImageSelect(event) {
    const file = event.target.files[0];
    if (file) {
        processImageFile(file);
    }
}

function handleDragOver(event) {
    event.preventDefault();
    imageUploadArea.classList.add('dragover');
}

function handleDragLeave(event) {
    event.preventDefault();
    imageUploadArea.classList.remove('dragover');
}

function handleDrop(event) {
    event.preventDefault();
    imageUploadArea.classList.remove('dragover');
    
    const files = event.dataTransfer.files;
    if (files.length > 0) {
        processImageFile(files[0]);
    }
}

function processImageFile(file) {
    // Validate file type
    if (!file.type.startsWith('image/')) {
        showNotification('لطفاً فقط فایل‌های تصویری انتخاب کنید!', 'error');
        return;
    }

    // Validate file size (max 30MB)
    if (file.size > 30 * 1024 * 1024) {
        showNotification('حجم فایل نباید بیشتر از 30 مگابایت باشد!', 'error');
        return;
    }

    // Show loading
    imageUploadArea.classList.add('loading');

    // Convert to base64
    const reader = new FileReader();
    reader.onload = function(e) {
        const base64 = e.target.result;
        showImagePreview(base64);
        productImage.value = base64; // Store base64 as image data
        imageUploadArea.classList.remove('loading');
    };
    reader.onerror = function() {
        showNotification('خطا در خواندن فایل!', 'error');
        imageUploadArea.classList.remove('loading');
    };
    reader.readAsDataURL(file);
}

function showImagePreview(base64) {
    previewImg.src = base64;
    uploadPlaceholder.style.display = 'none';
    imagePreview.style.display = 'block';
}

function removeSelectedImage() {
    productImageFile.value = '';
    productImage.value = '';
    uploadPlaceholder.style.display = 'block';
    imagePreview.style.display = 'none';
}

// Enhanced product form handling
function handleProductSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(productForm);
    const productData = {
        title: formData.get('title'),
        description: formData.get('description'),
        price: formData.get('price'),
        image: formData.get('image'), // This will be base64 or existing image path
        active: formData.get('active') === 'true'
    };
    
    // If no new image selected and editing existing product, keep existing image
    if (currentProductId && !productData.image) {
        const existingProduct = products.find(p => p.id === currentProductId);
        if (existingProduct) {
            productData.image = existingProduct.image;
        }
    }
    
    if (currentProductId) {
        // Edit existing product
        const productIndex = products.findIndex(p => p.id === currentProductId);
        if (productIndex !== -1) {
            products[productIndex] = { ...products[productIndex], ...productData };
        }
    } else {
        // Add new product
        const newId = Math.max(...products.map(p => p.id), 0) + 1;
        products.push({
            id: newId,
            ...productData
        });
    }
    
    saveProducts();
    updateStats();
    renderProducts();
    closeProductModal();
    
    // Show success message
    showNotification('محصول با موفقیت ذخیره شد!', 'success');
}

// Enhanced modal opening
function openProductModal(productId = null) {
    currentProductId = productId;
    
    if (productId) {
        const product = products.find(p => p.id === productId);
        if (product) {
            modalTitle.textContent = 'ویرایش محصول';
            document.getElementById('productId').value = product.id;
            document.getElementById('productTitle').value = product.title;
            document.getElementById('productDescription').value = product.description;
            document.getElementById('productPrice').value = product.price;
            document.getElementById('productActive').value = product.active.toString();
            
            // Handle existing image
            if (product.image) {
                if (product.image.startsWith('data:') || product.image.startsWith('blob:')) {
                    // Base64 or blob image
                    showImagePreview(product.image);
                    productImage.value = product.image;
                } else {
                    // External image path
                    showImagePreview(product.image);
                    productImage.value = product.image;
                }
            } else {
                removeSelectedImage();
            }
        }
    } else {
        modalTitle.textContent = 'افزودن محصول جدید';
        productForm.reset();
        document.getElementById('productId').value = '';
        removeSelectedImage();
    }
    
    productModal.classList.remove('hidden');
}

// Enhanced modal closing
function closeProductModal() {
    productModal.classList.add('hidden');
    productForm.reset();
    removeSelectedImage();
    currentProductId = null;
}

// Mobile Menu Functions
function setupMobileMenu() {
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileSidebar);
    }
    
    if (mobileSidebarClose) {
        mobileSidebarClose.addEventListener('click', closeMobileSidebar);
    }
    
    if (mobileSidebarOverlay) {
        mobileSidebarOverlay.addEventListener('click', closeMobileSidebar);
    }
    
    // Close mobile sidebar when clicking on nav links
    const mobileNavLinks = mobileSidebar ? mobileSidebar.querySelectorAll('.nav-link') : [];
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileSidebar);
    });
}

function toggleMobileSidebar() {
    if (mobileSidebar && mobileSidebarOverlay) {
        mobileSidebar.classList.toggle('active');
        mobileSidebarOverlay.classList.toggle('active');
        
        // Prevent body scroll when sidebar is open
        if (mobileSidebar.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
}

function closeMobileSidebar() {
    if (mobileSidebar && mobileSidebarOverlay) {
        mobileSidebar.classList.remove('active');
        mobileSidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Password Change Functions
function handlePasswordChange(e) {
    e.preventDefault();
    
    const currentPass = currentPassword.value;
    const newPass = newPassword.value;
    const confirmPass = confirmPassword.value;
    
    // Get stored password or use default
    const storedPassword = localStorage.getItem(ADMIN_PASSWORD_KEY) || ADMIN_PASSWORD;
    
    // Validate current password
    if (currentPass !== storedPassword) {
        showNotification('رمز عبور فعلی اشتباه است!', 'error');
        return;
    }
    
    // Validate new password
    if (newPass.length < 6) {
        showNotification('رمز عبور جدید باید حداقل 6 کاراکتر باشد!', 'error');
        return;
    }
    
    // Validate password match
    if (newPass !== confirmPass) {
        showNotification('رمز عبور جدید و تأیید آن مطابقت ندارند!', 'error');
        return;
    }
    
    // Save new password
    localStorage.setItem(ADMIN_PASSWORD_KEY, newPass);
    
    // Clear form
    passwordChangeForm.reset();
    
    // Show success message
    showNotification('رمز عبور با موفقیت تغییر یافت!', 'success');
    
    // Go back to dashboard
    showSection('dashboard');
}

function cancelPasswordChangeForm() {
    passwordChangeForm.reset();
    showSection('dashboard');
}

function checkPasswordStrength() {
    const password = newPassword.value;
    const strengthIndicator = document.getElementById('passwordStrength') || createPasswordStrengthIndicator();
    
    if (password.length === 0) {
        strengthIndicator.textContent = '';
        strengthIndicator.className = 'password-strength';
        return;
    }
    
    let strength = 0;
    let strengthText = '';
    let strengthClass = '';
    
    if (password.length >= 6) strength++;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    if (strength < 3) {
        strengthText = 'ضعیف';
        strengthClass = 'weak';
    } else if (strength < 5) {
        strengthText = 'متوسط';
        strengthClass = 'medium';
    } else {
        strengthText = 'قوی';
        strengthClass = 'strong';
    }
    
    strengthIndicator.textContent = `قدرت رمز: ${strengthText}`;
    strengthIndicator.className = `password-strength ${strengthClass}`;
}

function checkPasswordMatch() {
    const newPass = newPassword.value;
    const confirmPass = confirmPassword.value;
    const matchIndicator = document.getElementById('passwordMatch') || createPasswordMatchIndicator();
    
    if (confirmPass.length === 0) {
        matchIndicator.textContent = '';
        matchIndicator.className = 'password-match';
        return;
    }
    
    if (newPass === confirmPass) {
        matchIndicator.textContent = '✓ رمز عبور مطابقت دارد';
        matchIndicator.className = 'password-match match';
    } else {
        matchIndicator.textContent = '✗ رمز عبور مطابقت ندارد';
        matchIndicator.className = 'password-match no-match';
    }
}

function createPasswordStrengthIndicator() {
    const indicator = document.createElement('div');
    indicator.id = 'passwordStrength';
    indicator.className = 'password-strength';
    newPassword.parentNode.appendChild(indicator);
    return indicator;
}

function createPasswordMatchIndicator() {
    const indicator = document.createElement('div');
    indicator.id = 'passwordMatch';
    indicator.className = 'password-match';
    confirmPassword.parentNode.appendChild(indicator);
    return indicator;
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
    `;
    
    // Set background color based on type
    if (type === 'success') {
        notification.style.backgroundColor = '#28a745';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#dc3545';
    } else {
        notification.style.backgroundColor = '#17a2b8';
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Modal helper functions
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
    }
}

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
    }
}

// Blog form handling
function handleBlogSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    saveBlogPost(formData);
}

// Setup blog form event listener - moved to main initialization
function setupBlogEventListeners() {
    const blogForm = document.getElementById('blogForm');
    if (blogForm) {
        blogForm.addEventListener('submit', handleBlogSubmit);
    }
    
    // Blog modal controls
    const closeBlogModal = document.getElementById('closeBlogModal');
    const cancelBlogBtn = document.getElementById('cancelBlogBtn');
    const closeDeleteBlogModal = document.getElementById('closeDeleteBlogModal');
    const cancelDeleteBlogBtn = document.getElementById('cancelDeleteBlogBtn');
    const confirmDeleteBlogBtn = document.getElementById('confirmDeleteBlogBtn');
    
    if (closeBlogModal) closeBlogModal.addEventListener('click', () => hideModal('blogModal'));
    if (cancelBlogBtn) cancelBlogBtn.addEventListener('click', () => hideModal('blogModal'));
    if (closeDeleteBlogModal) closeDeleteBlogModal.addEventListener('click', () => hideModal('deleteBlogModal'));
    if (cancelDeleteBlogBtn) cancelDeleteBlogBtn.addEventListener('click', () => hideModal('deleteBlogModal'));
    if (confirmDeleteBlogBtn) confirmDeleteBlogBtn.addEventListener('click', confirmDeleteBlog);
    
    // Blog image upload
    const blogImageFile = document.getElementById('blogImageFile');
    const blogImageUploadArea = document.getElementById('blogImageUploadArea');
    const blogUploadPlaceholder = document.getElementById('blogUploadPlaceholder');
    const blogImagePreview = document.getElementById('blogImagePreview');
    const blogPreviewImg = document.getElementById('blogPreviewImg');
    const removeBlogImage = document.getElementById('removeBlogImage');
    
    if (blogImageUploadArea && blogImageFile) {
        blogImageUploadArea.addEventListener('click', () => blogImageFile.click());
        blogImageFile.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    blogPreviewImg.src = e.target.result;
                    blogUploadPlaceholder.style.display = 'none';
                    blogImagePreview.style.display = 'block';
                    document.getElementById('blogImage').value = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    if (removeBlogImage) {
        removeBlogImage.addEventListener('click', () => {
            blogImageFile.value = '';
            document.getElementById('blogImage').value = '';
            blogUploadPlaceholder.style.display = 'block';
            blogImagePreview.style.display = 'none';
        });
    }
}

// Make functions globally available
window.editProduct = editProduct;
window.deleteProduct = deleteProduct;
window.openProductModal = openProductModal;
window.showAddBlogModal = showAddBlogModal;
window.editBlogPost = editBlogPost;
window.deleteBlogPost = deleteBlogPost;
