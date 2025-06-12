// Holt Query-Parameter aus der URL
function getQueryParam(name) {
    const url = new URL(window.location.href);
    return url.searchParams.get(name);
}

document.addEventListener("DOMContentLoaded", () => {
    const productId = getQueryParam("productId");
    if (!productId || !products[productId]) {
        document.getElementById("details-container").innerHTML = "<p>Produkt nicht gefunden.</p>";
        return;
    }
    renderProductDetails(products[productId], productId);
});

// Rendert die Produktdetails
function renderProductDetails(product, productId) {
    document.getElementById("product-title").textContent = product.name;

    const images = Array.isArray(product.img) ? product.img : [product.img];
    let currentImg = 0;

    const mainImg = document.getElementById("main-product-img");
    const imageNav = document.getElementById("image-nav");

    function updateImage(idx) {
        mainImg.src = images[idx];
        mainImg.alt = product.name + " Bild " + (idx + 1);
        Array.from(imageNav.children).forEach((btn, i) => {
            btn.classList.toggle("active", i === idx);
        });
    }

    imageNav.innerHTML = "";
    images.forEach((_, idx) => {
        const btn = document.createElement("button");
        btn.className = "image-nav-btn";
        btn.textContent = idx + 1;
        btn.addEventListener("click", () => {
            currentImg = idx;
            updateImage(currentImg);
        });
        imageNav.appendChild(btn);
    });

    updateImage(currentImg);

    // Bewertungsbalken
    const ratingValue = product.rating || 0;
    const percent = Math.max(0, Math.min(10, ratingValue)) * 10;

    const barContainer = document.createElement("div");
    barContainer.className = "rating-bar-container";

    const bar = document.createElement("div");
    bar.className = "rating-bar";
    bar.style.width = percent + "%";

    if (percent < 100 && percent > 0) {
        bar.classList.add("rating-bar-angled");
    } else if (percent === 100) {
        bar.classList.remove("rating-bar-angled");
    }

    barContainer.appendChild(bar);

    const ratingDiv = document.getElementById("product-rating");
    ratingDiv.innerHTML = "";
    ratingDiv.appendChild(barContainer);

    document.getElementById("product-price").textContent = `${product.price} €`;
    document.getElementById("product-description").textContent = product.description || "Keine Beschreibung verfügbar.";

    const tags = Array.isArray(product.tag) ? product.tag.map(t => `#${t}`).join(" ") : "";
    document.getElementById("product-tags").textContent = tags;

    // Produkt zum Warenkorb hinzufügen
    document.getElementById("add-to-cart-btn").onclick = () => {
        let cart = JSON.parse(localStorage.getItem("cart")) || {};
        cart[productId] = (cart[productId] || 0) + 1;
        localStorage.setItem("cart", JSON.stringify(cart));
        if (window.updateCartBadge) updateCartBadge(true);
    };
}
