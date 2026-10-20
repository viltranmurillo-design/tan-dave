/* ==========================================================================
   Catalogue page — filters, sorting, product listings and detail modal
   ========================================================================== */

(function () {
  var grid = document.getElementById("productsGrid");
  if (!grid) return;

  var yearEl = document.getElementById("currentYear");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  var params = new URLSearchParams(window.location.search);
  var deepLinkId = params.get("id");
  var categoryParam = params.get("cat");

  var state = {
    category: categoryParam || "all",
    sizes: [],
    availability: "all",
    search: "",
    minPrice: null,
    maxPrice: null,
    sort: params.get("sort") || "featured"
  };

  var categoryBox = document.getElementById("categoryFilters");
  var sizeBox = document.getElementById("sizeFilters");
  var availabilityBox = document.getElementById("availabilityFilters");
  var metaLine = document.getElementById("filterMeta");
  var titleEl = document.getElementById("catalogueTitle");
  var eyebrowEl = document.getElementById("catalogueEyebrow");
  var ledeEl = document.getElementById("catalogueLede");
  var searchInput = document.getElementById("searchInput");
  var minPriceInput = document.getElementById("minPrice");
  var maxPriceInput = document.getElementById("maxPrice");
  var sortSelect = document.getElementById("sortSelect");

  /* ------------------------------------------------------------------ */
  /* Filter controls                                                     */
  /* ------------------------------------------------------------------ */

  function chipHtml(id, label, isActive) {
    return (
      '<button class="chip' +
      (isActive ? " active" : "") +
      '" type="button" data-filter="' +
      id +
      '" aria-pressed="' +
      (isActive ? "true" : "false") +
      '">' +
      escapeHtml(label) +
      "</button>"
    );
  }

  function renderCategoryFilters() {
    var html = chipHtml("all", "All", state.category === "all");
    BNK_CATEGORIES.forEach(function (category) {
      html += chipHtml(
        category.id,
        category.label,
        state.category === category.id
      );
    });
    categoryBox.innerHTML = html;
  }

  function renderSizeFilters() {
    var html = "";
    BNK_APPAREL_SIZES.concat([BNK_ACCESSORY_SIZE]).forEach(function (size) {
      var label = size === BNK_ACCESSORY_SIZE ? "One Size" : size;
      html += chipHtml(size, label, state.sizes.indexOf(size) !== -1);
    });
    sizeBox.innerHTML = html;
  }

  function renderAvailabilityFilters() {
    var options = [
      { id: "all", label: "All" },
      { id: "in-stock", label: "In Stock" },
      { id: "low-stock", label: "Low Stock" },
      { id: "out-of-stock", label: "Sold Out" }
    ];
    availabilityBox.innerHTML = options
      .map(function (option) {
        return chipHtml(option.id, option.label, state.availability === option.id);
      })
      .join("");
  }

  function refreshChipStates() {
    var chips = document.querySelectorAll("#categoryFilters .chip");
    for (var i = 0; i < chips.length; i++) {
      var active = chips[i].getAttribute("data-filter") === state.category;
      chips[i].classList.toggle("active", active);
      chips[i].setAttribute("aria-pressed", String(active));
    }

    var sizeChips = document.querySelectorAll("#sizeFilters .chip");
    for (var j = 0; j < sizeChips.length; j++) {
      var size = sizeChips[j].getAttribute("data-filter");
      var sizeActive = state.sizes.indexOf(size) !== -1;
      sizeChips[j].classList.toggle("active", sizeActive);
      sizeChips[j].setAttribute("aria-pressed", String(sizeActive));
    }

    var availabilityChips = document.querySelectorAll("#availabilityFilters .chip");
    for (var k = 0; k < availabilityChips.length; k++) {
      var avail = availabilityChips[k].getAttribute("data-filter");
      var availActive = state.availability === avail;
      availabilityChips[k].classList.toggle("active", availActive);
      availabilityChips[k].setAttribute("aria-pressed", String(availActive));
    }
  }

  /* ------------------------------------------------------------------ */
  /* Filtering + sorting                                                 */
  /* ------------------------------------------------------------------ */

  function filteredProducts() {
    var products = getAllProducts();

    var result = products.filter(function (product) {
      if (state.category !== "all" && product.category !== state.category) {
        return false;
      }
      if (state.sizes.length) {
        var matchesSize = state.sizes.some(function (size) {
          return (product.sizes[size] || 0) > 0;
        });
        if (!matchesSize) return false;
      }
      if (state.availability !== "all") {
        if (stockStatus(product).key !== state.availability) return false;
      }
      if (state.search) {
        var haystack = (
          product.name +
          " " +
          product.description +
          " " +
          categoryById(product.category).label +
          " " +
          categoryById(product.category).collection
        ).toLowerCase();
        if (haystack.indexOf(state.search.toLowerCase()) === -1) return false;
      }
      if (state.minPrice !== null && product.price < state.minPrice) {
        return false;
      }
      if (state.maxPrice !== null && product.price > state.maxPrice) {
        return false;
      }
      return true;
    });

    result.sort(function (a, b) {
      switch (state.sort) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "name":
          return a.name.localeCompare(b.name);
        case "best":
          return (
            Number(b.topSeller) - Number(a.topSeller) ||
            totalStock(b) - totalStock(a)
          );
        case "stock":
          return totalStock(b) - totalStock(a);
        default:
          return (
            Number(b.featured) - Number(a.featured) ||
            Number(b.topSeller) - Number(a.topSeller) ||
            a.name.localeCompare(b.name)
          );
      }
    });

    return result;
  }

  function render() {
    var products = filteredProducts();
    refreshChipStates();

    if (state.category === "all") {
      titleEl.textContent = "Shop All Products";
      eyebrowEl.textContent = "The Catalogue";
      ledeEl.textContent =
        "Every item ships with the full Bugoy na Koykoy specification sheet — material, fit and construction details.";
    } else {
      var category = categoryById(state.category);
      titleEl.textContent = category.label;
      eyebrowEl.textContent = "Collection · " + category.collection;
      ledeEl.textContent = category.blurb;
    }

    metaLine.textContent =
      products.length +
      " item(s)" +
      (state.category === "all"
        ? ""
        : " in " + categoryById(state.category).collection);

    if (!products.length) {
      grid.innerHTML =
        '<div class="empty-state">No products match the current filters. Try clearing a filter or two.</div>';
      return;
    }

    grid.innerHTML = products.map(productCardHtml).join("");
  }

  /* ------------------------------------------------------------------ */
  /* Events                                                              */
  /* ------------------------------------------------------------------ */

  function handleFilterClick(event) {
    var chip = event.target.closest("#categoryFilters .chip");
    if (chip) {
      state.category = chip.getAttribute("data-filter");
      render();
      return;
    }

    var sizeChip = event.target.closest("#sizeFilters .chip");
    if (sizeChip) {
      var size = sizeChip.getAttribute("data-filter");
      var index = state.sizes.indexOf(size);
      if (index === -1) state.sizes.push(size);
      else state.sizes.splice(index, 1);
      render();
      return;
    }

    var availChip = event.target.closest("#availabilityFilters .chip");
    if (availChip) {
      state.availability = availChip.getAttribute("data-filter");
      render();
    }
  }

  document.addEventListener("click", handleFilterClick);

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      state.search = searchInput.value.trim();
      render();
    });
  }

  function readPriceInputs() {
    var min = parseFloat(minPriceInput.value);
    var max = parseFloat(maxPriceInput.value);
    state.minPrice = isNaN(min) ? null : min;
    state.maxPrice = isNaN(max) ? null : max;
    render();
  }

  if (minPriceInput) minPriceInput.addEventListener("change", readPriceInputs);
  if (maxPriceInput) maxPriceInput.addEventListener("change", readPriceInputs);

  if (sortSelect) {
    sortSelect.value = state.sort;
    sortSelect.addEventListener("change", function () {
      state.sort = sortSelect.value;
      render();
    });
  }

  var resetBtn = document.getElementById("resetFilters");
  if (resetBtn) {
    resetBtn.addEventListener("click", function () {
      state.category = "all";
      state.sizes = [];
      state.availability = "all";
      state.search = "";
      state.minPrice = null;
      state.maxPrice = null;
      state.sort = "featured";
      if (searchInput) searchInput.value = "";
      if (minPriceInput) minPriceInput.value = "";
      if (maxPriceInput) maxPriceInput.value = "";
      if (sortSelect) sortSelect.value = "featured";
      render();
    });
  }

  window.addEventListener("storage", function (event) {
    if (event.key === BNK_STORE_KEY) render();
  });

  /* ------------------------------------------------------------------ */
  /* Boot                                                                */
  /* ------------------------------------------------------------------ */

  BNK_READY.then(function () {
    renderCategoryFilters();
    renderSizeFilters();
    renderAvailabilityFilters();
    render();

    if (deepLinkId && findProduct(deepLinkId)) {
      openProductModal(deepLinkId);
    }
  });
})();
