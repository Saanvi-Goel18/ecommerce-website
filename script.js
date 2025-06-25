const productList = document.getElementById("product-grid");

function createProductCard(product) {
  return `
    <div class="col-md-4 mb-4">
      <div class="card h-100 shadow-sm product-card" 
           onclick="window.location.href='product.html?id=${product.id}'" 
           style="cursor:pointer;">
        <img src="${product.image}" class="card-img-top" alt="${product.name}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text text-muted">₹${product.price}</p>
          <div class="mt-auto d-flex justify-content-between">
            <button class="btn btn-primary fw-semibold px-3 py-1 btn-sm"

              data-id="${product.id}" 
              data-name="${product.name}" 
              data-price="${product.price}" 
              data-img="${product.image}" 
              onclick="event.stopPropagation(); addToCart(${product.id}); showPopup('${product.name}', '${product.price}', '${product.image}')">
              Add to Cart
            </button>
            <button class="btn btn-outline-danger btn-sm"
              onclick="event.stopPropagation(); addToWishlist(${product.id})">
              <i class="bi bi-heart"></i>
            </button>
          </div>
        </div>
      </div>
    </div>`;
}

function renderProducts(productArray) {
  productList.innerHTML = "";
  productArray.forEach((product) => {
    productList.innerHTML += createProductCard(product);
  });
}

function addToCart(id) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(id);
  localStorage.setItem("cart", JSON.stringify(cart));
}

function showPopup(name, price, imgSrc) {
  document.getElementById("popup-name").innerText = name;
  document.getElementById("popup-price").innerText = `₹${price}`;
  document.getElementById("popup-img").src = imgSrc;

  const popup = document.getElementById("cart-popup");
  popup.classList.remove("hidden");
  requestAnimationFrame(() => popup.classList.add("show"));
}

function closePopup() {
  const popup = document.getElementById("cart-popup");
  popup.classList.remove("show");
  setTimeout(() => popup.classList.add("hidden"), 300);
}

function addToWishlist(id) {
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  if (!wishlist.includes(id)) wishlist.push(id);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  alert("Added to wishlist!");
}

if (document.querySelector(".add-to-cart")) {
  document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
      alert("Item added to cart!");
    });
  });
}

document.querySelectorAll(".btn-category").forEach((btn) => {
  btn.addEventListener("click", () => {
    const category = btn.innerText;

    document
      .querySelectorAll(".btn-category")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    if (category === "All") {
      renderProducts(products);
    } else {
      const filtered = products.filter((p) => p.category === category);
      renderProducts(filtered);
    }
  });
});

renderProducts(products);

