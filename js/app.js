/* ==========================================================================
   Bugoy na Koykoy Apparel — shared utilities
   Data store, category specifications, cart, navigation and product modal.
   Loaded on every page: index.html, products.html, admin.html
   ========================================================================== */

var BNK_STORE_KEY = "bnk_products_v1";
var BNK_CART_KEY = "bnk_cart_v1";

/* ---------- Categories & specifications ---------- */
var BNK_CATEGORIES = [
  {
    id: "graphic-tees",
    label: "Graphic Tees & Oversized Shirts",
    collection: "Streetwear Classics",
    blurb:
      "Heavyweight cotton statement pieces with high-density screen prints and relaxed oversized cuts built for daily rotation.",
    specs: [
      {
        label: "Material",
        value:
          "Premium 100% heavy cotton (220–240 GSM) for durability and comfort."
      },
      {
        label: "Fit",
        value:
          "Relaxed/oversized streetwear fit with reinforced double-needle stitching on shoulders and hem."
      },
      {
        label: "Details",
        value: "High-density screen prints and custom woven brand tags."
      }
    ]
  },
  {
    id: "hoodies-outerwear",
    label: "Hoodies & Outerwear",
    collection: "High Life Jackets",
    blurb:
      "Heavyweight fleece layers and varsity outerwear engineered for cold nights, late errands and higher lifestyle.",
    specs: [
      {
        label: "Material",
        value:
          "Heavyweight fleece lining for premium comfort and warmth."
      },
      {
        label: "Fit",
        value: "Street-style regular/oversized drop-shoulder fit."
      },
      {
        label: "Details",
        value:
          "Double-lined deep hoods, heavy-duty metal eyelets, custom drawstrings, and kangaroo pockets."
      }
    ]
  },
  {
    id: "caps-accessories",
    label: "Caps & Accessories",
    collection: "Daily Grind Collection",
    blurb:
      "Daily Grind accessories that finish the fit — 3D embroidered logos, adjustable enclosures and sweat-wicking comfort.",
    specs: [
      {
        label: "Material",
        value: "High-durability acrylic/cotton blend."
      },
      {
        label: "Details",
        value:
          "High-definition 3D embroidered logos, adjustable snapback/strap enclosures, and moisture-wicking inner headbands."
      }
    ]
  }
];

var BNK_APPAREL_SIZES = ["S", "M", "L", "XL", "XXL"];
var BNK_ACCESSORY_SIZE = "OS";

/* ---------- Seed catalogue ---------- */
var BNK_SEED_PRODUCTS = [
  {
    id: "bnk-tee-01",
    name: "Solid Movement Oversized Tee",
    category: "graphic-tees",
    price: 899,
    description:
      "Heavyweight oversized tee with a bold Solid Movement front print and a woven hem tag.",
    image: "images/tee-solid-movement.svg",
    sizes: { S: 12, M: 20, L: 18, XL: 9, XXL: 4 },
    featured: true,
    topSeller: true
  },
  {
    id: "bnk-tee-02",
    name: "High Life Statement Shirt",
    category: "graphic-tees",
    price: 1099,
    description:
      "Drop-shoulder statement shirt in washed bone cotton, screen printed front and back panels.",
    image: "images/tee-high-life.svg",
    sizes: { S: 8, M: 14, L: 12, XL: 7, XXL: 3 },
    featured: true,
    topSeller: false
  },
  {
    id: "bnk-tee-03",
    name: "Hustle District Boxy Tee",
    category: "graphic-tees",
    price: 849,
    description:
      "Boxy fit street tee in washed olive with a high-density hustle graphic and reinforced hem.",
    image: "images/tee-hustle-district.svg",
    sizes: { S: 6, M: 11, L: 15, XL: 11, XXL: 6 },
    featured: false,
    topSeller: true
  },
  {
    id: "bnk-ood-01",
    name: "Solid Movement Heavyweight Hoodie",
    category: "hoodies-outerwear",
    price: 1899,
    description:
      "Heavyweight fleece hoodie with double-lined hood, metal eyelets, custom drawstrings and kangaroo pocket.",
    image: "images/hoodie-solid-movement.svg",
    sizes: { S: 5, M: 9, L: 10, XL: 6, XXL: 2 },
    featured: true,
    topSeller: true
  },
  {
    id: "bnk-ood-02",
    name: "Koykoy Varsity Bomber Jacket",
    category: "hoodies-outerwear",
    price: 2799,
    description:
      "Varsity bomber with contrast sleeve panels, chenille patch and a quilted high-life lining.",
    image: "images/jacket-varsity.svg",
    sizes: { S: 3, M: 5, L: 6, XL: 4, XXL: 2 },
    featured: true,
    topSeller: false
  },
  {
    id: "bnk-ood-03",
    name: "Night Shift Zip Hoodie",
    category: "hoodies-outerwear",
    price: 2199,
    description:
      "Full-zip street hoodie with drop shoulders, heavy metal puller and side seam pockets.",
    image: "images/hoodie-night-shift.svg",
    sizes: { S: 0, M: 0, L: 2, XL: 3, XXL: 1 },
    featured: false,
    topSeller: false
  },
  {
    id: "bnk-ood-04",
    name: "Koykoy Varsity Vest",
    category: "hoodies-outerwear",
    price: 1599,
    description:
      "Sleeveless varsity vest in heavy twill with contrast trim and a woven back patch.",
    image: "images/jacket-varsity.svg",
    sizes: { S: 0, M: 0, L: 0, XL: 0, XXL: 0 },
    featured: false,
    topSeller: false
  },
  {
    id: "bnk-acc-01",
    name: "Daily Grind 3D Embroidered Cap",
    category: "caps-accessories",
    price: 549,
    description:
      "Six-panel cap with high-definition 3D embroidered logo, adjustable snapback and moisture-wicking band.",
    image: "images/cap-daily-grind.svg",
    sizes: { OS: 18 },
    featured: true,
    topSeller: true
  },
  {
    id: "bnk-acc-02",
    name: "Koykoy Strapback Cap",
    category: "caps-accessories",
    price: 599,
    description:
      "Acrylic/cotton blend strapback with 3D embroidery, brass strap buckle and sweat-wicking inner band.",
    image: "images/cap-koykoy.svg",
    sizes: { OS: 7 },
    featured: false,
    topSeller: false
  },
  {
    id: "bnk-acc-03",
    name: "Solid Movement Beanie",
    category: "caps-accessories",
    price: 399,
    description:
      "Ribbed knit beanie with woven brand tag and moisture-wicking inner band for cold early shifts.",
    image: "images/beanie-solid-movement.svg",
    sizes: { OS: 22 },
    featured: false,
    topSeller: false
  }
];

/* ==========================================================================
   Helpers
   ========================================================================== */

function escapeHtml(value) {
  if (value === null || value === undefined) return "";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatPrice(amount) {
  var value = Number(amount) || 0;
  return "₱" + value.toLocaleString("en-PH", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });
}

function uid(prefix) {
  return (
    (prefix || "bnk") +
    "-" +
    Math.random().toString(36).slice(2, 7) +
    Date.now().toString(36).slice(-3)
  );
}

function categoryById(id) {
  for (var i = 0; i < BNK_CATEGORIES.length; i++) {
    if (BNK_CATEGORIES[i].id === id) return BNK_CATEGORIES[i];
  }
  return BNK_CATEGORIES[0];
}

function normalizeProduct(raw) {
  var product = raw && typeof raw === "object" ? raw : {};
  var sizes = {};
  var source = product.sizes && typeof product.sizes === "object" ? product.sizes : {};
  Object.keys(source).forEach(function (key) {
    var qty = parseInt(source[key], 10);
    if (!isNaN(qty) && qty >= 0) sizes[key] = qty;
  });
  return {
    id: product.id || uid(),
    name: product.name || "Untitled Item",
    category: product.category || BNK_CATEGORIES[0].id,
    price: isNaN(parseFloat(product.price)) ? 0 : parseFloat(product.price),
    description: product.description || "",
    image: product.image || "images/tee-solid-movement.svg",
    sizes: sizes,
    featured: Boolean(product.featured),
    topSeller: Boolean(product.topSeller)
  };
}

/* ---------- Stock helpers ---------- */
function totalStock(product) {
  if (!product || !product.sizes) return 0;
  return Object.keys(product.sizes).reduce(function (sum, key) {
    return sum + (parseInt(product.sizes[key], 10) || 0);
  }, 0);
}

function stockStatus(product) {
  var total = totalStock(product);
  if (total <= 0) return { key: "out-of-stock", label: "Out of Stock" };
  if (total <= 10) return { key: "low-stock", label: "Low Stock" };
  return { key: "in-stock", label: "In Stock" };
}

function sizeEntries(product) {
  if (!product) return [];
  var isAccessory = product.category === "caps-accessories";
  var keys = isAccessory
    ? [BNK_ACCESSORY_SIZE]
    : BNK_APPAREL_SIZES.slice();

  /* Keep any custom size keys an administrator has added. */
  var extra = Object.keys(product.sizes || {});
  for (var i = 0; i < extra.length; i++) {
    if (keys.indexOf(extra[i]) === -1) keys.push(extra[i]);
  }

  return keys.map(function (key) {
    return { size: key, qty: (product.sizes && product.sizes[key]) || 0 };
  });
}

/* ==========================================================================
   Product store (localStorage first, JSON seed file as the base catalogue)
   ========================================================================== */

function readStore() {
  try {
    var raw = window.localStorage.getItem(BNK_STORE_KEY);
    if (!raw) return null;
    var parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed.map(normalizeProduct);
  } catch (error) {
    /* storage unavailable — fall through to the seed catalogue */
  }
  return null;
}

function saveProducts(list) {
  try {
    window.localStorage.setItem(BNK_STORE_KEY, JSON.stringify(list));
  } catch (error) {
    /* ignore quota / privacy-mode failures */
  }
}

function getAllProducts() {
  var stored = readStore();
  if (stored) return stored;
  var seed = BNK_SEED_PRODUCTS.map(normalizeProduct);
  saveProducts(seed);
  return seed;
}

function findProduct(id) {
  var list = getAllProducts();
  for (var i = 0; i < list.length; i++) {
    if (list[i].id === id) return list[i];
  }
  return null;
}

function resetProductsToSeed() {
  var seed = BNK_SEED_PRODUCTS.map(normalizeProduct);
  saveProducts(seed);
  return seed;
}

/* Fetch the seed catalogue file when the site is served over http(s). */
function loadSeedFile() {
  return fetch("data/products.json")
    .then(function (response) {
      if (!response.ok) throw new Error("seed file unavailable");
      return response.json();
    })
    .then(function (data) {
      if (!Array.isArray(data)) throw new Error("seed file malformed");
      var list = data.map(normalizeProduct);
      if (readStore()) return list;
      saveProducts(list);
      return list;
    })
    .catch(function () {
      return BNK_SEED_PRODUCTS.map(normalizeProduct);
    });
}

/* Pages wait on this before their first render so the catalogue is in sync. */
var BNK_READY = Promise.race([
  loadSeedFile(),
  new Promise(function (resolve) {
    window.setTimeout(function () {
      resolve(BNK_SEED_PRODUCTS.map(normalizeProduct));
    }, 1500);
  })
]);

/* ==========================================================================
   Cart
   ========================================================================== */

function getCart() {
  try {
    var raw = window.localStorage.getItem(BNK_CART_KEY);
    if (!raw) return [];
    var parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
  } catch (error) {
    /* ignore */
  }
  return [];
}

function saveCart(cart) {
  try {
    window.localStorage.setItem(BNK_CART_KEY, JSON.stringify(cart));
  } catch (error) {
    /* ignore */
  }
}

function addToCart(productId, size, qty) {
  var product = findProduct(productId);
  if (!product) return false;
  var stock = (product.sizes && product.sizes[size]) || 0;
  if (!stock) return false;

  var cart = getCart();
  var line = null;
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].id === productId && cart[i].size === size) {
      line = cart[i];
      break;
    }
  }
  var amount = Math.max(1, parseInt(qty, 10) || 1);
  if (line) {
    line.qty = Math.min(line.qty + amount, stock);
  } else {
    cart.push({ id: productId, size: size, qty: Math.min(amount, stock) });
  }
  saveCart(cart);
  updateCartBadges();
  renderCartDrawer();
  return true;
}

function setCartQty(productId, size, qty) {
  var cart = getCart();
  var product = findProduct(productId);
  var stock = (product && product.sizes && product.sizes[size]) || 0;
  cart = cart
    .map(function (line) {
      if (line.id !== productId || line.size !== size) return line;
      var next = Math.max(0, parseInt(qty, 10) || 0);
      return { id: line.id, size: line.size, qty: Math.min(next, stock || next) };
    })
    .filter(function (line) {
      return line.qty > 0;
    });
  saveCart(cart);
  updateCartBadges();
  renderCartDrawer();
}

function removeCartLine(productId, size) {
  var cart = getCart().filter(function (line) {
    return !(line.id === productId && line.size === size);
  });
  saveCart(cart);
  updateCartBadges();
  renderCartDrawer();
}

function cartCount() {
  return getCart().reduce(function (sum, line) {
    return sum + (parseInt(line.qty, 10) || 0);
  }, 0);
}

function cartSubtotal() {
  return getCart().reduce(function (sum, line) {
    var product = findProduct(line.id);
    if (!product) return sum;
    return sum + product.price * (parseInt(line.qty, 10) || 0);
  }, 0);
}

function updateCartBadges() {
  var count = cartCount();
  var badges = document.querySelectorAll("[data-cart-count]");
  for (var i = 0; i < badges.length; i++) {
    badges[i].textContent = String(count);
    badges[i].hidden = count === 0;
  }
}

/* ==========================================================================
   Product card markup (shared by home, catalog and search results)
   ========================================================================== */

function productCardHtml(product) {
  var meta = categoryById(product.category);
  var status = stockStatus(product);
  var sizes = sizeEntries(product);
  var pills = sizes
    .map(function (entry) {
      var cls = "size-pill";
      if (entry.qty <= 0) cls += " sold-out";
      else if (entry.qty <= 3) cls += " low";
      return '<span class="' + cls + '">' + escapeHtml(entry.size) + "</span>";
    })
    .join("");

  var badges = "";
  if (product.topSeller) badges += '<span class="badge">Top Seller</span>';
  if (product.featured) badges += '<span class="badge dark">Featured</span>';
  if (status.key === "out-of-stock")
    badges += '<span class="badge rust">Sold Out</span>';

  return (
    '<article class="card" data-product-id="' +
    escapeHtml(product.id) +
    '">' +
    '<div class="card-media">' +
    '<img src="' +
    escapeHtml(product.image) +
    '" alt="' +
    escapeHtml(product.name) +
    '" loading="lazy" />' +
    '<div class="card-badges">' +
    badges +
    "</div>" +
    "</div>" +
    '<div class="card-body">' +
    '<h3 class="card-title">' +
    escapeHtml(product.name) +
    "</h3>" +
    '<div class="meta">' +
    escapeHtml(meta.collection) +
    " · " +
    escapeHtml(meta.label) +
    "</div>" +
    '<div class="price">' +
    formatPrice(product.price) +
    "</div>" +
    '<span class="avail ' +
    status.key +
    '">' +
    status.label +
    "</span>" +
    '<p class="meta">' +
    escapeHtml(product.description) +
    "</p>" +
    '<div class="size-list">' +
    pills +
    "</div>" +
    '<div class="card-actions">' +
    '<a class="btn" href="products.html?id=' +
    encodeURIComponent(product.id) +
    '">Details</a>' +
    '<button class="btn secondary" type="button" data-open-modal="' +
    escapeHtml(product.id) +
    '">Add to Cart</button>' +
    "</div>" +
    "</div>" +
    "</article>"
  );
}

/* ==========================================================================
   Product detail modal (size picker + full specifications)
   ========================================================================== */

var BNK_MODAL_SIZE = null;

function ensureModalMarkup() {
  if (document.getElementById("productModal")) return;

  var wrap = document.createElement("div");
  wrap.className = "modal";
  wrap.id = "productModal";
  wrap.setAttribute("role", "dialog");
  wrap.setAttribute("aria-modal", "true");
  wrap.setAttribute("aria-label", "Product details");
  wrap.hidden = true;
  wrap.innerHTML =
    '<div class="modal-panel" id="productModalPanel">' +
    '<button class="modal-close" type="button" data-close-modal aria-label="Close product details">&#10005;</button>' +
    '<div id="productModalBody"></div>' +
    "</div>";
  document.body.appendChild(wrap);

  wrap.addEventListener("click", function (event) {
    if (event.target === wrap || event.target.hasAttribute("data-close-modal")) {
      closeProductModal();
    }
  });

  wrap.addEventListener("click", function (event) {
    var option = event.target.closest(".size-option");
    if (!option) return;
    var buttons = wrap.querySelectorAll(".size-option");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove("selected");
      buttons[i].removeAttribute("aria-pressed");
    }
    option.classList.add("selected");
    option.setAttribute("aria-pressed", "true");
    BNK_MODAL_SIZE = option.getAttribute("data-size");
    var stockLine = wrap.querySelector("[data-stock-line]");
    if (stockLine) {
      stockLine.textContent =
        "Size " + BNK_MODAL_SIZE + " selected — " + option.getAttribute("data-qty") + " piece(s) ready to ship.";
    }
  });

  wrap.addEventListener("click", function (event) {
    var addButton = event.target.closest("[data-modal-add]");
    if (!addButton) return;
    if (!BNK_MODAL_SIZE) {
      notify("Select a size first.", "error");
      return;
    }
    if (addToCart(BNK_MODAL.id, BNK_MODAL_SIZE, 1)) {
      notify(BNK_MODAL.name + " (size " + BNK_MODAL_SIZE + ") added to cart.");
      closeProductModal();
    } else {
      notify("That size is out of stock.", "error");
    }
  });
}

var BNK_MODAL = { id: null };

function openProductModal(productId) {
  var product = findProduct(productId);
  if (!product) return;
  ensureModalMarkup();

  var modal = document.getElementById("productModal");
  var body = document.getElementById("productModalBody");
  var meta = categoryById(product.category);
  var status = stockStatus(product);
  var entries = sizeEntries(product);

  BNK_MODAL.id = product.id;
  BNK_MODAL_SIZE = null;

  var sizeButtons = entries
    .map(function (entry) {
      var disabled = entry.qty <= 0 ? " disabled" : "";
      var label = entry.size === BNK_ACCESSORY_SIZE ? "One Size" : entry.size;
      return (
        '<button class="size-option" type="button" data-size="' +
        escapeHtml(entry.size) +
        '" data-qty="' +
        entry.qty +
        '" aria-pressed="false"' +
        disabled +
        ">" +
        escapeHtml(label) +
        "</button>"
      );
    })
    .join("");

  var specs = meta.specs
    .map(function (spec) {
      return (
        '<div class="spec"><dt>' +
        escapeHtml(spec.label) +
        "</dt><dd>" +
        escapeHtml(spec.value) +
        "</dd></div>"
      );
    })
    .join("");

  body.innerHTML =
    '<div class="detail">' +
    '<div class="detail-media"><img src="' +
    escapeHtml(product.image) +
    '" alt="' +
    escapeHtml(product.name) +
    '" /></div>' +
    '<div class="detail-body">' +
    '<div class="eyebrow">' +
    escapeHtml(meta.collection) +
    "</div>" +
    '<h3>' +
    escapeHtml(product.name) +
    "</h3>" +
    '<div class="meta">' +
    escapeHtml(meta.label) +
    "</div>" +
    '<div class="price">' +
    formatPrice(product.price) +
    "</div>" +
    '<span class="avail ' +
    status.key +
    '">' +
    status.label +
    "</span>" +
    "<p>" +
    escapeHtml(product.description) +
    "</p>" +
    '<div class="eyebrow" style="margin-top:18px;">Specifications</div>' +
    '<dl class="spec-list">' +
    specs +
    "</dl>" +
    '<div class="eyebrow">Available sizes</div>' +
    '<div class="size-picker">' +
    sizeButtons +
    "</div>" +
    '<p class="stock-line" data-stock-line>Select a size to continue.</p>' +
    '<div class="detail-actions">' +
    '<button class="btn" type="button" data-modal-add' +
    (status.key === "out-of-stock" ? " disabled" : "") +
    ">Add to Cart</button>" +
    '<a class="btn ghost" href="products.html?cat=' +
    encodeURIComponent(meta.id) +
    '">Browse collection</a>' +
    "</div>" +
    "</div>" +
    "</div>";

  modal.hidden = false;
  document.body.style.overflow = "hidden";
  var closeBtn = modal.querySelector(".modal-close");
  if (closeBtn) closeBtn.focus();
}

function closeProductModal() {
  var modal = document.getElementById("productModal");
  if (!modal) return;
  modal.hidden = true;
  document.body.style.overflow = "";
  BNK_MODAL_SIZE = null;
}

/* ==========================================================================
   Cart drawer
   ========================================================================== */

function renderCartDrawer() {
  var container = document.getElementById("cartLines");
  if (!container) return;

  var cart = getCart();
  if (!cart.length) {
    container.innerHTML =
      '<p class="meta">Your cart is empty. Start with the Solid Movement staple pieces.</p>';
  } else {
    container.innerHTML = cart
      .map(function (line) {
        var product = findProduct(line.id);
        if (!product) return "";
        var meta = categoryById(product.category);
        var sizeLabel =
          line.size === BNK_ACCESSORY_SIZE ? "One Size" : "Size " + line.size;
        return (
          '<div class="cart-line">' +
          '<img src="' +
          escapeHtml(product.image) +
          '" alt="' +
          escapeHtml(product.name) +
          '" />' +
          "<div>" +
          "<h4>" +
          escapeHtml(product.name) +
          "</h4>" +
          '<div class="meta">' +
          escapeHtml(meta.collection) +
          " · " +
          escapeHtml(sizeLabel) +
          "</div>" +
          '<div class="price" style="font-size:1rem;margin:4px 0 6px;">' +
          formatPrice(product.price * line.qty) +
          "</div>" +
          '<div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">' +
          '<span class="qty">' +
          '<button type="button" data-cart-dec="' +
          escapeHtml(line.id) +
          "|" +
          escapeHtml(line.size) +
          '" aria-label="Decrease quantity">&minus;</button>' +
          "<span>" +
          line.qty +
          "</span>" +
          '<button type="button" data-cart-inc="' +
          escapeHtml(line.id) +
          "|" +
          escapeHtml(line.size) +
          '" aria-label="Increase quantity">+</button>' +
          "</span>" +
          '<button class="link-btn" type="button" data-cart-remove="' +
          escapeHtml(line.id) +
          "|" +
          escapeHtml(line.size) +
          '">Remove</button>' +
          "</div>" +
          "</div>" +
          "</div>"
        );
      })
      .join("");
  }

  var subtotal = cartSubtotal();
  var totalEl = document.getElementById("cartTotal");
  if (totalEl) totalEl.textContent = formatPrice(subtotal);

  var checkout = document.getElementById("checkoutBtn");
  if (checkout) checkout.disabled = cart.length === 0;
}

function toggleCartDrawer(open) {
  var drawer = document.getElementById("cartDrawer");
  if (!drawer) return;
  drawer.hidden = !open;
  document.body.style.overflow = open ? "hidden" : "";
  if (open) renderCartDrawer();
}

/* ==========================================================================
   Toast notifications
   ========================================================================== */

function notify(message, type) {
  var wrap = document.getElementById("toastWrap");
  if (!wrap) {
    wrap = document.createElement("div");
    wrap.className = "toast-wrap";
    wrap.id = "toastWrap";
    document.body.appendChild(wrap);
  }
  var toast = document.createElement("div");
  toast.className = "toast" + (type === "error" ? " error" : "");
  toast.textContent = message;
  wrap.appendChild(toast);
  window.setTimeout(function () {
    if (toast.parentNode) toast.parentNode.removeChild(toast);
  }, 2600);
}

/* ==========================================================================
   Navigation + global listeners
   ========================================================================== */

function initNav() {
  var button = document.getElementById("navToggle");
  var list = document.getElementById("navList");
  if (button && list) {
    button.addEventListener("click", function () {
      var open = list.classList.toggle("open");
      button.setAttribute("aria-expanded", String(open));
    });
  }
}

function initCart() {
  var triggers = document.querySelectorAll("[data-open-cart]");
  for (var i = 0; i < triggers.length; i++) {
    triggers[i].addEventListener("click", function () {
      toggleCartDrawer(true);
    });
  }

  var drawer = document.getElementById("cartDrawer");
  if (drawer) {
    drawer.addEventListener("click", function (event) {
      var target = event.target;
      if (target.hasAttribute("data-close-cart") || target.classList.contains("drawer-scrim")) {
        toggleCartDrawer(false);
        return;
      }
      var inc = target.closest("[data-cart-inc]");
      var dec = target.closest("[data-cart-dec]");
      var remove = target.closest("[data-cart-remove]");
      if (inc) {
        var parts = inc.getAttribute("data-cart-inc").split("|");
        var line = getCart().filter(function (item) {
          return item.id === parts[0] && item.size === parts[1];
        })[0];
        if (line) setCartQty(parts[0], parts[1], line.qty + 1);
      } else if (dec) {
        var decParts = dec.getAttribute("data-cart-dec").split("|");
        var decLine = getCart().filter(function (item) {
          return item.id === decParts[0] && item.size === decParts[1];
        })[0];
        if (decLine) setCartQty(decParts[0], decParts[1], decLine.qty - 1);
      } else if (remove) {
        var rmParts = remove.getAttribute("data-cart-remove").split("|");
        removeCartLine(rmParts[0], rmParts[1]);
      }
    });
  }

  var checkout = document.getElementById("checkoutBtn");
  if (checkout) {
    checkout.addEventListener("click", function () {
      var count = cartCount();
      if (!count) return;
      notify(
        "Order noted: " +
          count +
          " item(s) reserved. We will contact you to confirm payment."
      );
      toggleCartDrawer(false);
    });
  }
}

function initModalTriggers() {
  document.addEventListener("click", function (event) {
    var trigger = event.target.closest("[data-open-modal]");
    if (!trigger) return;
    event.preventDefault();
    openProductModal(trigger.getAttribute("data-open-modal"));
  });
}

document.addEventListener("keydown", function (event) {
  if (event.key !== "Escape") return;
  var drawer = document.getElementById("cartDrawer");
  if (drawer && !drawer.hidden) {
    toggleCartDrawer(false);
    return;
  }
  var modal = document.getElementById("productModal");
  if (modal && !modal.hidden) closeProductModal();
});

initNav();
initCart();
initModalTriggers();
updateCartBadges();
renderCartDrawer();
