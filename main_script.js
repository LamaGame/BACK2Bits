// Sidebar Script
const sidebar = document.getElementById("sidebar");

function openSidebar() {
	sidebar.style.right = "0";
}

function closeSidebar() {
	sidebar.style.right = "-210px";
}

// Cart array to hold product IDs
const cart = [];

// Move the indicator square to the first sidebar item
function moveSquareToFirstItem() {
	const indicatorSquare = document.querySelector("#sidebar .indicator-square");
	indicatorSquare.style.top = "140px"; // Fixed offset for the first item
}

// DOM ready
document.addEventListener('DOMContentLoaded', () => {
	productLayout();
	setupSearch();
	moveSquareToFirstItem(); // Move square to the first item
});

// Product layout generator
function productLayout(filteredProducts = null) {
	const productContainer = document.getElementById("product-container");
	productContainer.innerHTML = "";

	const categorySections = {};

	categories.forEach(category => {
		const wrapper = document.createElement("div");
		wrapper.classList.add("category-wrapper");

		const heading = document.createElement("h2");
		heading.textContent = category;

		const categoryContainer = document.createElement('div');
		categoryContainer.classList.add("category");
		categoryContainer.id = category;

		wrapper.appendChild(heading);
		wrapper.appendChild(categoryContainer);
		productContainer.appendChild(wrapper);

		categorySections[category] = { container: categoryContainer, wrapper: wrapper };
	});

	const productsToRender = filteredProducts || products;

	for (const productId in productsToRender) {
		const product = productsToRender[productId];
		const productCard = document.createElement('div');
		productCard.classList.add("product");
		
		const img = document.createElement('img');
		img.src = product.img;
		img.classList.add("product-img");

		const wrapper = document.createElement('div');
		wrapper.classList.add("product-wrapper");

		const name = document.createElement('h3');
		name.textContent = product.name;
		name.classList.add("product-name");

		const price = document.createElement('p');
		price.textContent = `${product.price}€`;
		price.classList.add("product-price");

		// Assemble product card
		productCard.appendChild(img);
		productCard.appendChild(wrapper);
		wrapper.appendChild(name);
		productCard.appendChild(price);

		// Append to category
		const category = product.category;
		if (categorySections[category]) {
			categorySections[category].container.appendChild(productCard);
		} else {
			console.warn(`Category "${category}" not found in categories array.`);
		}
	}

	// Hide empty categories
	for (const category in categorySections) {
		const { container, wrapper } = categorySections[category];
		wrapper.style.display = container.children.length === 0 ? "none" : "block";
	}
}

// Add to Cart function
function addToCart(productId) {
	let cart = JSON.parse(localStorage.getItem("cart")) || {};

	if (cart[productId]) {
		cart[productId]++;
	} else {
		cart[productId] = 1;
	}

	localStorage.setItem("cart", JSON.stringify(cart));
	console.log(`Product ${productId} now has quantity ${cart[productId]}`);
}



// Search bar functionality
function setupSearch() {
	const searchInput = document.getElementById("search-input");

	if (!searchInput) {
		console.warn("No #search-input element found for search functionality.");
		return;
	}

	searchInput.addEventListener("input", () => {
		const query = searchInput.value.trim().toLowerCase();
		if (query === "") {
			productLayout();
			return;
		}

		const filtered = {};
		for (const productId in products) {
			const product = products[productId];
			const nameMatch = product.name.toLowerCase().includes(query);
			const categoryMatch = product.category.toLowerCase().includes(query);
			if (nameMatch || categoryMatch) {
				filtered[productId] = product;
			}
		}

		productLayout(filtered);
	});
}

// Highlight current category in sidebar
function highlightCurrentCategory() {
	const categoryContainers = document.querySelectorAll(".category-wrapper .category");
	const indicatorSquare = document.querySelector("#sidebar .indicator-square");

	// Adjusted threshold closer to the center of the screen, accounting for body margin
	const threshold = window.innerHeight / 3 + 170; // One-third of the screen height + 170px margin

	// Determine the currently visible category
	let currentCategoryIndex = null;
	categoryContainers.forEach((container, index) => {
		const rect = container.getBoundingClientRect();
		// Check if the container is within the threshold range
		if (rect.top <= threshold && rect.bottom > threshold) {
			currentCategoryIndex = index; // Use the index of the category
		}
	});

	// Move the indicator square to the corresponding sidebar item
	if (currentCategoryIndex !== null) {
		const offset = 35; // Initial offset for the first item
		const itemHeight = 65; // Height of each sidebar item
		const topOffset = offset + currentCategoryIndex * itemHeight;
		indicatorSquare.style.top = `${topOffset}px`;
	}
}

// Attach scroll event listener
window.addEventListener("scroll", highlightCurrentCategory);
