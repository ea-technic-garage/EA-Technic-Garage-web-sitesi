let cartCount = 0;

function toast(message) {
  const el = document.getElementById("toast");
  el.textContent = message;
  el.classList.add("show");
  setTimeout(() => el.classList.remove("show"), 2400);
}

function addToCart(product) {
  cartCount++;
  document.getElementById("cartCount").textContent = cartCount;
  toast(product + " sepete eklendi.");
}

function showCart() {
  toast(cartCount ? `Sepetinizde ${cartCount} ürün var.` : "Sepetiniz şu anda boş.");
}

function findParts() {
  const brand = document.getElementById("brand").value;
  const model = document.getElementById("model").value;
  const year = document.getElementById("year").value;
  const message = document.getElementById("vehicleMessage");

  if (!brand || !model || !year) {
    message.textContent = "Lütfen marka, model ve yıl seçin.";
    return;
  }

  message.textContent = `${brand} ${model} ${year} için uygun ürünler listeleniyor.`;
  document.getElementById("urunler").scrollIntoView({behavior:"smooth"});
}

function filterProducts(category) {
  const products = document.querySelectorAll(".product");

  products.forEach(product => {
    product.style.display =
      category === "all" || product.dataset.category === category
        ? ""
        : "none";
  });

  document.getElementById("urunler").scrollIntoView({behavior:"smooth"});
}
