// ==========================================
// 1. DATA MASTER TENANT & MENU
// (Anda cukup mengubah data di bagian ini)
// ==========================================
const tenantsData = [
    {
        id: "tenant-1",
        name: "Piscok Bang-Gal",
        description: "Aneka Pisang Goreng Dengan Berbagai Toping Lengkap.",
        image: "image_search_1789219500675[1].jpg",
        menu: [
            {
                id: "m1",
                name: "Pisang Coklat Klasik",
                category: "Makanan",
                price: 15000,
                description: "Menu Best Seller.",
                image: "image_search_1789219755448[1].jpg"
            },
            {
                id: "m2",
                name: "Pisang Keju",
                category: "Makanan",
                price: 15000,
                description: "Pisang Yang DIbaluri Keju Premium Dan Dibuat Sepenuh Hati.",
                image: "image_search_1789220213927[1].jpg"
            },
            {
                id: "m3",
                name: "Pisang Coklat+Keju",
                category: "Makanan",
                price: 15000,
                description: "Perpaduan Antara Dua Toping Terbaik.",
                image: "image_search_1789219726321[1].jpg"
            }
        ]
    },
    {
        id: "tenant-2",
        name: "Wara-Wiri Ayam Suir",
        description: "Menu Sarapan Recommended.",
        image: "image_search_1789219566065[1].jpg",
        menu: [
            {
                id: "m4",
                name: "Ayam Suir Biasa",
                category: "Makanan",
                price: 25000,
                description: "Ayam Yang Disuir Dan Dicampur Oleh Nasi Hangat.",
                image: "image_search_1789219911414[1].jpg"
            },
            {
                id: "m5",
                name: "Ayam Utuh",
                category: "Makanan",
                price: 40000,
                description: "Full Daging Ayam Tanpa Di Suir.",
                image: "image_search_1789219957663[1].jpg"
            },
            {
                id: "m6",
                name: "Kuah Gurih",
                category: "Makanan",
                price: 5000,
                description: "Hanya Berisi Kuah pelengkap Ayam Suir.",
                image: "image_search_1789219957663[1].jpg"
            }
        ]
    },
    {
        id: "tenant-3",
        name: "Chiken Pok Pok",
        description: "Ayam Yang Di Potong Kecil-Kecil Yang Di Baluri Beberapa Bumbu.",
        image: "image_search_1789219667729[1].jpg",
        menu: [
            {
                id: "m7",
                name: "Chiken Pok Pok Bumbu Original",
                category: "Makanan",
                price: 10000,
                description: "Ayam Potong Yang Di Beri Bumbu Asin Dan Gurih.",
                image: "image_search_1789219802566[1].jpg"
            },
            {
                id: "m8",
                name: "Chiken Pok Pok Bumbu Barbeque",
                category: "Makanan",
                price: 20000,
                description: "Ayam Potong Dengan Bumbu Tabur BBQ.",
                image: "image_search_1789219844536[1].webp"
            }
        ]
    }
];

// Variable State (Menyimpan kondisi aktif saat ini)
let currentTenant = null;
let currentCategory = "Semua";
let searchQuery = "";

// ==========================================
// 2. ELEMENT SELECTION (DOM)
// ==========================================
const viewTenants = document.getElementById("view-tenants");
const viewMenu = document.getElementById("view-menu");

const tenantListContainer = document.getElementById("tenant-list");
const tenantDetailHeader = document.getElementById("tenant-detail-header");
const productListContainer = document.getElementById("product-list");
const categoryPillsContainer = document.getElementById("category-pills");

const btnBack = document.getElementById("btn-back");
const searchInput = document.getElementById("search-input");

// ==========================================
// 3. FUNGSI UTAMA & HELPER
// ==========================================

// Format angka ke format Rupiah (Contoh: 15000 -> Rp 15.000)
function formatRupiah(number) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(number);
}

// Menampilkan daftar Tenant di halaman utama
function renderTenants() {
    tenantListContainer.innerHTML = ""; // Bersihkan kontainer

    tenantsData.forEach(tenant => {
        const card = document.createElement("div");
        card.className = "tenant-card";
        card.innerHTML = `
            <img src="${tenant.image}" alt="${tenant.name}" class="tenant-img">
            <div class="tenant-body">
                <h3 class="tenant-title">${tenant.name}</h3>
                <p class="tenant-desc">${tenant.description}</p>
                <button class="btn-primary" onclick="openTenantMenu('${tenant.id}')">Lihat Menu</button>
            </div>
        `;
        tenantListContainer.appendChild(card);
    });
}

// Buka Halaman Menu Tenant
function openTenantMenu(tenantId) {
    // Cari data tenant berdasarkan ID
    currentTenant = tenantsData.find(t => t.id === tenantId);
    if (!currentTenant) return;

    // Reset filter
    currentCategory = "Semua";
    searchQuery = "";
    searchInput.value = "";

    // Render Header Tenant yang dipilih
    tenantDetailHeader.innerHTML = `
        <img src="${currentTenant.image}" alt="${currentTenant.name}" class="tenant-header-logo">
        <div class="tenant-header-info">
            <h2>${currentTenant.name}</h2>
            <p>${currentTenant.description}</p>
        </div>
    `;

    // Render Pilihan Kategori (Pills)
    renderCategories();

    // Render Menu Produk
    renderProducts();

    // Berpindah Tampilan View
    viewTenants.classList.remove("active");
    viewMenu.classList.add("active");
    
    // Scroll layar ke paling atas
    window.scrollTo(0, 0);
}

// Render Tombol/Pill Kategori
function renderCategories() {
    // Ambil semua kategori unik dari menu tenant ini
    const categories = ["Semua", ...new Set(currentTenant.menu.map(item => item.category))];

    categoryPillsContainer.innerHTML = "";
    categories.forEach(category => {
        const button = document.createElement("button");
        button.className = `pill ${category === currentCategory ? 'active' : ''}`;
        button.innerText = category;
        button.onclick = () => {
            currentCategory = category;
            renderCategories(); // Render ulang pill agar status 'active' berpindah
            renderProducts();   // Render ulang produk yang disaring
        };
        categoryPillsContainer.appendChild(button);
    });
}

// Render Daftar Produk/Menu yang difilter
function renderProducts() {
    productListContainer.innerHTML = "";

    // Saring menu berdasarkan kategori dan keyword pencarian
    const filteredMenu = currentTenant.menu.filter(item => {
        const matchCategory = (currentCategory === "Semua") || (item.category === currentCategory);
        const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCategory && matchSearch;
    });

    // Jika menu tidak ditemukan
    if (filteredMenu.length === 0) {
        productListContainer.innerHTML = `<p style="text-align: center; color: #888; margin-top: 20px;">Menu tidak ditemukan.</p>`;
        return;
    }

    // Render kartu produk
    filteredMenu.forEach(item => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";
        productCard.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="product-img">
            <div class="product-details">
                <div>
                    <div class="product-name">${item.name}</div>
                    <div class="product-desc">${item.description}</div>
                </div>
                <div class="product-price">${formatRupiah(item.price)}</div>
            </div>
        `;
        productListContainer.appendChild(productCard);
    });
}

// ==========================================
// 4. EVENT LISTENERS
// ==========================================

// Event Tombol Kembali
btnBack.addEventListener("click", () => {
    viewMenu.classList.remove("active");
    viewTenants.classList.add("active");
    currentTenant = null;
    window.scrollTo(0, 0);
});

// Event Input Pencarian
searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value;
    renderProducts();
});

// ==========================================
// 5. INISIALISASI
// (Dijalankan pertama kali saat file di-load)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    renderTenants();
});