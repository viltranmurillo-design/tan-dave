/* ==========================================================================
   Homepage rendering — Bugoy na Koykoy Apparel
   ========================================================================== */

(function () {
  var yearEl = document.getElementById("currentYear");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  var grid = document.getElementById("topSellerGrid");
  if (!grid) return;

  function render() {
    var products = getAllProducts();
    var sellers = products.filter(function (product) {
      return product.topSeller;
    });
    if (!sellers.length) sellers = products.slice(0, 4);

    grid.innerHTML = sellers
      .slice(0, 4)
      .map(productCardHtml)
      .join("");
  }

  BNK_READY.then(render);

  /* Keep the storefront in sync with the admin dashboard inventory. */
  window.addEventListener("storage", function (event) {
    if (event.key === BNK_STORE_KEY) render();
  });
})();