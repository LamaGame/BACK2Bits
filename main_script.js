// Sidebar-Skript
const sidebar = document.getElementById("sidebar");

function openSidebar() {
	sidebar.style.right = "0";
}

function closeSidebar() {
	sidebar.style.right = "-210px";
}

// Wird beim Laden des DOM ausgeführt
document.addEventListener('DOMContentLoaded', () => {
	productLayout();
	setupSearch();
	if (window.updateCartBadge) updateCartBadge();
});

// Generiert das Produktlayout
function productLayout(filteredProducts = null) {
	const productContainer = document.getElementById("product-container");
	productContainer.innerHTML = "";

	const productsToRender = filteredProducts || products;
	const hasProducts = Object.keys(productsToRender).length > 0;
	if (!hasProducts) {
		const noResult = document.createElement("div");
		noResult.className = "no-products-message";
		noResult.textContent = "Ihre Suche ergab keine Treffer";
		productContainer.appendChild(noResult);
		return;
	}

	const categorySections = {};

	categories.forEach(category => {
		const wrapper = document.createElement("div");
		wrapper.classList.add("category-wrapper");

		const heading = document.createElement("h2");
		heading.textContent = category;
		heading.id = category;

		const categoryContainer = document.createElement('div');
		categoryContainer.classList.add("category");

		wrapper.appendChild(heading);
		wrapper.appendChild(categoryContainer);
		productContainer.appendChild(wrapper);

		categorySections[category] = { container: categoryContainer, wrapper: wrapper };
	});

	for (const productId in productsToRender) {
		const product = productsToRender[productId];
		const productCard = document.createElement('div');
		productCard.classList.add("product");
		
		const img = document.createElement('img');
		img.src = Array.isArray(product.img) ? product.img[0] : product.img;
		img.classList.add("product-img");

		// Hover-Effekt für Bildwechsel
		if (Array.isArray(product.img) && product.img.length > 1) {
			productCard.addEventListener('mouseenter', () => {
				img.src = product.img[1];
			});
			productCard.addEventListener('mouseleave', () => {
				img.src = product.img[0];
			});
		}
		
		const wrapper = document.createElement('div');
		wrapper.classList.add("product-wrapper");

		// Bewertungsbalken (Gradient)
		const rating = document.createElement('div');
		rating.classList.add("product-rating");
		const ratingValue = product.rating || 0;
		const percent = Math.max(0, Math.min(10, ratingValue)) * 10;

		const barContainer = document.createElement("div");
		barContainer.className = "rating-bar-container";
		const bar = document.createElement("div");
		bar.className = "rating-bar";
		bar.style.width = percent + "%";
		if (percent < 100 && percent > 0) {
			bar.classList.add("rating-bar-angled");
		}
		barContainer.appendChild(bar);
		rating.innerHTML = "";
		rating.appendChild(barContainer);

		const name = document.createElement('h3');
		name.textContent = product.name;
		name.classList.add("product-name");

		const price = document.createElement('p');
		price.textContent = `${product.price}€`;
		price.classList.add("product-price");

		productCard.appendChild(img);
		productCard.appendChild(wrapper);
		wrapper.appendChild(rating);
		wrapper.appendChild(name);
		productCard.appendChild(price);

		// Klick öffnet Produktdetailseite
		productCard.style.cursor = "pointer";
		productCard.addEventListener("click", () => {
			window.location.href = `product_details.html?productId=${encodeURIComponent(productId)}`;
		});

		const category = product.category;
		if (categorySections[category]) {
			categorySections[category].container.appendChild(productCard);
		}
	}

	// Leere Kategorien ausblenden
	for (const category in categorySections) {
		const { container, wrapper } = categorySections[category];
		wrapper.style.display = container.children.length === 0 ? "none" : "block";
	}
}

// Suchfunktion für Produkte
function setupSearch() {
	const searchInput = document.getElementById("search-input");

	if (!searchInput) {
		console.warn("Kein #search-input Element für die Suche gefunden.");
		return;
	}

	// Hilfsfunktion: Normalisiert Strings für Vergleich
	function normalize(str) {
		return str
			.toLowerCase()
			.replace(/[\s\-\_\[\]\(\)]/g, "");
	}

	searchInput.addEventListener("input", () => {
		const query = normalize(searchInput.value.trim());
		if (query === "") {
			productLayout();
			return;
		}

		const filtered = {};
		for (const productId in products) {
			const product = products[productId];
			const nameMatch = normalize(product.name).includes(query);
			const categoryMatch = normalize(product.category).includes(query);
			const tagMatch = Array.isArray(product.tag) && product.tag.some(t => normalize(t).includes(query));
			if (nameMatch || categoryMatch || tagMatch) {
				filtered[productId] = product;
			}
		}

		productLayout(filtered);
	});
}

// Hebt die aktuelle Kategorie in der Sidebar hervor
function highlightCurrentCategory() {
	const categoryContainers = document.querySelectorAll(".category-wrapper .category");
	const indicatorSquare = document.querySelector("#sidebar .indicator-square");

	const threshold = window.innerHeight / 3 + 170;

	let currentCategoryIndex = null;
	categoryContainers.forEach((container, index) => {
		const rect = container.getBoundingClientRect();
		if (rect.top <= threshold && rect.bottom > threshold) {
			currentCategoryIndex = index;
		}
	});

	if (currentCategoryIndex !== null) {
		const offset = 35;
		const itemHeight = 65;
		const topOffset = offset + currentCategoryIndex * itemHeight;
		indicatorSquare.style.top = `${topOffset}px`;
	}
}

window.addEventListener("scroll", highlightCurrentCategory);

// Warenkorb-Badge aktualisieren
function updateCartBadge(animate = false) {
	const badge = document.getElementById("cart-count-badge");
	if (!badge) return;
	let cart = {};
	try {
		cart = JSON.parse(localStorage.getItem("cart")) || {};
	} catch {}
	const count = Object.values(cart).reduce((sum, n) => sum + Number(n), 0);
	if (count > 0) {
		badge.textContent = count > 9 ? "9+" : count;
		badge.style.display = "flex";
		if (animate) {
			badge.classList.remove("cart-bounce");
			void badge.offsetWidth;
			badge.classList.add("cart-bounce");
		}
	} else {
		badge.textContent = "";
		badge.style.display = "none";
	}
}

window.updateCartBadge = updateCartBadge;

window.addEventListener("storage", (e) => {
	if (e.key === "cart") updateCartBadge();
});

document.addEventListener("DOMContentLoaded", () => updateCartBadge());
