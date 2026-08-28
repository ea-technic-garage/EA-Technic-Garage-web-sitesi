let cart = [];

/* =========================
   SEPET
========================= */

function addToCart(productName) {
  cart.push(productName);

  updateCartCount();

  showToast(productName + " sepete eklendi.");
}

function updateCartCount() {
  const cartCount = document.getElementById("cartCount");

  if (cartCount) {
    cartCount.textContent = cart.length;
  }
}

function showCart() {
  if (cart.length === 0) {
    showToast("Sepetiniz şu anda boş.");
    return;
  }

  const products = cart
    .map((item, index) => `${index + 1}. ${item}`)
    .join("\n");

  alert(
    "SEPETİNİZ\n\n" +
    products +
    "\n\nToplam ürün: " +
    cart.length
  );
}


/* =========================
   ÜRÜN FİLTRELEME
========================= */

function filterProducts(category) {
  const products = document.querySelectorAll(".product");

  products.forEach(function(product) {

    if (category === "all") {
      product.style.display = "block";
      return;
    }

    const productCategory =
      product.getAttribute("data-category");

    if (productCategory === category) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }

  });

  const productsSection =
    document.getElementById("urunler");

  if (productsSection) {
    productsSection.scrollIntoView({
      behavior: "smooth"
    });
  }
}


/* =========================
   ARAÇ SEÇİCİ
========================= */

function findParts() {

  const brand =
    document.getElementById("brand").value;

  const model =
    document.getElementById("model").value;

  const year =
    document.getElementById("year").value;

  const message =
    document.getElementById("vehicleMessage");


  if (!brand || !model || !year) {

    message.textContent =
      "Lütfen marka, model ve yıl seçiniz.";

    message.style.color = "#dc2626";

    return;
  }


  message.textContent =
    brand +
    " " +
    model +
    " (" +
    year +
    ") için uygun parçalar gösteriliyor.";

  message.style.color = "#16803c";


  setTimeout(function() {

    document
      .getElementById("urunler")
      .scrollIntoView({
        behavior: "smooth"
      });

  }, 500);
}


/* =========================
   BİLDİRİM
========================= */

function showToast(text) {

  const toast =
    document.getElementById("toast");

  if (!toast) {
    return;
  }

  toast.textContent = text;

  toast.classList.add("show");

  setTimeout(function() {

    toast.classList.remove("show");

  }, 2500);
}


/* =========================
   SAYFA BAŞLANGICI
========================= */

document.addEventListener(
  "DOMContentLoaded",
  function() {

    updateCartCount();

  }
);