/* ==========================================================================
   Admin dashboard — listing CRUD, pricing, per-size stock and inventory
   ========================================================================== */

(function () {
  var form = document.getElementById("adminForm");
  if (!form) return;

  var yearEl = document.getElementById("currentYear");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  var tbody = document.getElementById("productsTableBody");
  var statGrid = document.getElementById("statGrid");
  var formMsg = document.getElementById("formMsg");
  var formHeading = document.getElementById("formHeading");
  var saveBtn = document.getElementById("saveBtn");
  var tableMeta = document.getElementById("tableMeta");
  var tableSearch = document.getElementById("tableSearch");
  var tableCategory = document.getElementById("tableCategory");
  var stockEditor = document.getElementById("stockEditor");

  var IMAGE_OPTIONS = [
    "images/tee-solid-movement.svg",
    "images/tee-high-life.svg",
    "images/tee-hustle-district.svg",
    "images/hoodie-solid-movement.svg",
    "images/hoodie-night-shift.svg",
    "images/jacket-varsity.svg",
    "images/cap-daily-grind.svg",
    "images/cap-koykoy.svg",
    "images/beanie-solid-movement.svg"
  ];

  var SIZE_KEYS = BNK_APPAREL_SIZES.concat([BNK_ACCESSORY_SIZE]);

  var tableFilter = { search: "", category: "all" };

  /* ------------------------------------------------------------------ */
  /* Form scaffolding                                                    */
  /* ------------------------------------------------------------------ */

  function buildCategoryOptions() {
    var select = document.getElementById("category");
    select.innerHTML = BNK_CATEGORIES.map(function (category) {
      return (
        '<option value="' +
        escapeHtml(category.id) +
        '">' +
        escapeHtml(category.label) +
        " — " +
        escapeHtml(category.collection) +
        "</option>"
      );
    }).join("");

    var tableSelect = document.getElementById("tableCategory");
    tableSelect.innerHTML =
      '<option value="all">All categories</option>' +
      BNK_CATEGORIES.map(function (category) {
        return (
          '<option value="' +
          escapeHtml(category.id) +
          '">' +
          escapeHtml(category.label) +
          "</option>"
        );
      }).join("");
  }

  function buildImageOptions() {
    document.getElementById("image").innerHTML = IMAGE_OPTIONS.map(function (path) {
      return '<option value="' + escapeHtml(path) + '">' + escapeHtml(path) + "</option>";
    }).join("");
  }

  function buildStockEditor() {
    stockEditor.innerHTML = SIZE_KEYS.map(function (size) {
      var label = size === BNK_ACCESSORY_SIZE ? "One Size" : size;
      return (
        '<div class="stock-field">' +
        '<label for="stock-' +
        escapeHtml(size) +
        '">' +
        escapeHtml(label) +
        "</label>" +
        '<input class="input" id="stock-' +
        escapeHtml(size) +
        '" data-size="' +
        escapeHtml(size) +
        '" type="number" min="0" step="1" value="0" />' +
        "</div>"
      );
    }).join("");
  }

  function readStockEditor() {
    var sizes = {};
    var inputs = stockEditor.querySelectorAll("[data-size]");
    for (var i = 0; i < inputs.length; i++) {
      var size = inputs[i].getAttribute("data-size");
      var qty = parseInt(inputs[i].value, 10);
      if (!isNaN(qty) && qty > 0) sizes[size] = qty;
    }
    return sizes;
  }

  function writeStockEditor(sizes) {
    var inputs = stockEditor.querySelectorAll("[data-size]");
    for (var i = 0; i < inputs.length; i++) {
      var size = inputs[i].getAttribute("data-size");
      var qty = sizes && sizes[size] ? sizes[size] : 0;
      inputs[i].value = String(qty);
    }
  }

  /* ------------------------------------------------------------------ */
  /* Form binding                                                        */
  /* ------------------------------------------------------------------ */

  function setForm(product) {
    document.getElementById("productId").value = product.id || "";
    document.getElementById("name").value = product.name || "";
    document.getElementById("category").value =
      product.category || BNK_CATEGORIES[0].id;
    document.getElementById("price").value = product.price != null ? product.price : 0;
    document.getElementById("image").value =
      product.image || IMAGE_OPTIONS[0];
    document.getElementById("description").value = product.description || "";
    document.getElementById("featured").checked = Boolean(product.featured);
    document.getElementById("topSeller").checked = Boolean(product.topSeller);
    writeStockEditor(product.sizes || {});
  }

  function resetForm() {
    setForm({
      id: "",
      name: "",
      category: BNK_CATEGORIES[0].id,
      price: 0,
      image: IMAGE_OPTIONS[0],
      description: "",
      sizes: {},
      featured: false,
      topSeller: false
    });
    if (formHeading) formHeading.textContent = "Add New Listing";
    if (saveBtn) saveBtn.textContent = "Save Listing";
    if (formMsg) {
      formMsg.textContent = "";
      formMsg.className = "form-msg";
    }
  }

  function setMessage(text, kind) {
    if (!formMsg) return;
    formMsg.textContent = text;
    formMsg.className = "form-msg" + (kind ? " " + kind : "");
  }

  /* ------------------------------------------------------------------ */
  /* Dashboard rendering                                                 */
  /* ------------------------------------------------------------------ */

  function renderStats(products) {
    var units = 0;
    var value = 0;
    var low = 0;
    var out = 0;

    products.forEach(function (product) {
      var stock = totalStock(product);
      units += stock;
      value += stock * product.price;
      var status = stockStatus(product).key;
      if (status === "low-stock") low += 1;
      if (status === "out-of-stock") out += 1;
    });

    var cards = [
      { label: "Total Listings", value: products.length },
      { label: "Categories", value: BNK_CATEGORIES.length },
      { label: "Units In Stock", value: units },
      { label: "Inventory Value", value: formatPrice(value) },
      { label: "Low Stock Alerts", value: low },
      { label: "Sold Out Items", value: out }
    ];

    statGrid.innerHTML = cards
      .map(function (card) {
        return (
          '<div class="stat-card"><span>' +
          escapeHtml(card.label) +
          "</span><b>" +
          escapeHtml(card.value) +
          "</b></div>"
        );
      })
      .join("");
  }

  function renderTable() {
    var products = getAllProducts();

    var visible = products.filter(function (product) {
      if (tableFilter.category !== "all" && product.category !== tableFilter.category) {
        return false;
      }
      if (tableFilter.search) {
        var haystack = (product.name + " " + product.id).toLowerCase();
        if (haystack.indexOf(tableFilter.search.toLowerCase()) === -1) return false;
      }
      return true;
    });

    tbody.innerHTML = "";
    if (!visible.length) {
      tbody.innerHTML =
        '<tr><td colspan="9" style="text-align:center;padding:28px;color:#9b968a;">No listings match the current filter.</td></tr>';
    } else {
      visible.forEach(function (product) {
        var status = stockStatus(product);
        var category = categoryById(product.category);
        var sizes = sizeEntries(product)
          .map(function (entry) {
            return (
              escapeHtml(entry.size) + ": " + entry.qty
            );
          })
          .join(" · ");

        var tr = document.createElement("tr");
        tr.innerHTML =
          '<td><img class="thumb" src="' +
          escapeHtml(product.image) +
          '" alt="' +
          escapeHtml(product.name) +
          '" /></td>' +
          "<td>" +
          escapeHtml(product.id) +
          "</td>" +
          "<td>" +
          escapeHtml(product.name) +
          (product.featured ? ' <span class="badge">F</span>' : "") +
          (product.topSeller ? ' <span class="badge dark">TS</span>' : "") +
          "</td>" +
          "<td>" +
          escapeHtml(category.label) +
          "</td>" +
          "<td>" +
          formatPrice(product.price) +
          "</td>" +
          '<td style="font-size:0.8rem;white-space:nowrap;">' +
          sizes +
          "</td>" +
          "<td>" +
          totalStock(product) +
          "</td>" +
          '<td><span class="avail ' +
          status.key +
          '">' +
          status.label +
          "</span></td>" +
          '<td><div class="row-actions">' +
          '<button class="btn secondary small" type="button" data-act="edit" data-id="' +
          escapeHtml(product.id) +
          '">Edit</button>' +
          '<button class="btn rust small" type="button" data-act="delete" data-id="' +
          escapeHtml(product.id) +
          '">Delete</button>' +
          "</div></td>";
        tbody.appendChild(tr);
      });
    }

    renderStats(products);
    if (tableMeta) {
      tableMeta.textContent =
        "Showing " +
        visible.length +
        " of " +
        products.length +
        " listing(s). Inventory is saved in this browser and syncs to the storefront catalogue.";
    }
  }

  /* ------------------------------------------------------------------ */
  /* Create / update / delete                                            */
  /* ------------------------------------------------------------------ */

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var idField = document.getElementById("productId").value.trim();
    var name = document.getElementById("name").value.trim();
    var category = document.getElementById("category").value;
    var price = parseFloat(document.getElementById("price").value);
    var image = document.getElementById("image").value;
    var description = document.getElementById("description").value.trim();
    var sizes = readStockEditor();

    if (!name) {
      setMessage("Please enter a product name.", "err");
      return;
    }
    if (isNaN(price) || price < 0) {
      setMessage("Please enter a valid price.", "err");
      return;
    }
    if (!description) {
      setMessage("Please enter a short description.", "err");
      return;
    }

    var products = getAllProducts();
    var id = idField || uid();
    var existingIndex = -1;
    for (var i = 0; i < products.length; i++) {
      if (products[i].id === id) existingIndex = i;
    }

    var record = {
      id: id,
      name: name,
      category: category,
      price: price,
      image: image,
      description: description,
      sizes: sizes,
      featured: document.getElementById("featured").checked,
      topSeller: document.getElementById("topSeller").checked
    };

    if (existingIndex >= 0) {
      products[existingIndex] = record;
      setMessage("“" + name + "” updated.", "ok");
    } else {
      products.push(record);
      setMessage("“" + name + "” added to the catalogue.", "ok");
    }

    saveProducts(products);
    renderTable();
    resetForm();
    notify(existingIndex >= 0 ? "Listing updated." : "Listing added.");
  });

  tbody.addEventListener("click", function (event) {
    var button = event.target.closest("button[data-act]");
    if (!button) return;

    var id = button.getAttribute("data-id");
    var action = button.getAttribute("data-act");
    var products = getAllProducts();

    if (action === "edit") {
      var item = null;
      for (var i = 0; i < products.length; i++) {
        if (products[i].id === id) item = products[i];
      }
      if (!item) return;
      setForm(item);
      if (formHeading) formHeading.textContent = "Edit Listing — " + item.name;
      if (saveBtn) saveBtn.textContent = "Update Listing";
      setMessage("Editing “" + item.name + "”.", "");
      window.scrollTo({ top: form.offsetTop - 90, behavior: "smooth" });
    } else if (action === "delete") {
      var target = null;
      for (var j = 0; j < products.length; j++) {
        if (products[j].id === id) target = products[j];
      }
      if (!target) return;
      if (!window.confirm('Delete "' + target.name + '" from the catalogue?')) return;
      saveProducts(
        products.filter(function (row) {
          return row.id !== id;
        })
      );
      renderTable();
      resetForm();
      setMessage('"' + target.name + '" deleted.', "ok");
      notify("Listing deleted.");
    }
  });

  var resetBtn = document.getElementById("resetBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", function (event) {
      event.preventDefault();
      resetForm();
    });
  }

  var newBtn = document.getElementById("newBtn");
  if (newBtn) {
    newBtn.addEventListener("click", function () {
      resetForm();
      window.scrollTo({ top: form.offsetTop - 90, behavior: "smooth" });
    });
  }

  var restoreBtn = document.getElementById("restoreBtn");
  if (restoreBtn) {
    restoreBtn.addEventListener("click", function () {
      if (!window.confirm("Restore the original seed catalogue? Local edits will be lost.")) return;
      resetProductsToSeed();
      renderTable();
      resetForm();
      setMessage("Seed catalogue restored.", "ok");
      notify("Seed catalogue restored.");
    });
  }

  if (tableSearch) {
    tableSearch.addEventListener("input", function () {
      tableFilter.search = tableSearch.value.trim();
      renderTable();
    });
  }

  if (tableCategory) {
    tableCategory.addEventListener("change", function () {
      tableFilter.category = tableCategory.value;
      renderTable();
    });
  }

  /* ------------------------------------------------------------------ */
  /* Boot                                                                */
  /* ------------------------------------------------------------------ */

  buildCategoryOptions();
  buildImageOptions();
  buildStockEditor();
  resetForm();

  BNK_READY.then(function () {
    renderTable();
  });
})();
