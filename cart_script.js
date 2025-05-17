document.addEventListener("DOMContentLoaded", () => {
	renderCart();
});

function renderCart() {
	const cartContainer = document.getElementById("cart-container");
	let cart;

	// Try-catch to handle potential cart corruption
	try {
		cart = JSON.parse(localStorage.getItem("cart")) || {};

		// Validate structure
		if (typeof cart !== "object" || Array.isArray(cart)) {
			throw new Error("Invalid cart format");
		}
	} catch (error) {
		console.error("Cart corrupted. Resetting cart.", error);
		localStorage.removeItem("cart");
		cartContainer.innerHTML = "<p>Ein Fehler ist aufgetreten. Der Warenkorb wurde zurückgesetzt.</p>";
		return;
	}

	// If cart is empty, show a message
	if (Object.keys(cart).length === 0) {
		cartContainer.innerHTML = "<p>Dein Warenkorb ist leer.</p>";
		return;
	}

	// Clear the container before appending new content
	cartContainer.innerHTML = "";
	let total = 0;

	// Iterate over the cart items
	for (const productId in cart) {
		const quantity = cart[productId];
		const product = products[productId]; // Access the product from the global `products` object

		// Handle invalid product data
		if (!product || quantity <= 0) {
			console.warn(`Invalid product in cart: ${productId}`);
			continue;
		}

		// Render product card
		const productCard = document.createElement("div");
		productCard.classList.add("item");

		// Image
		const img = document.createElement("img");
		img.src = product.img;
		img.classList.add("item-img");

		// Product Name
		const name = document.createElement("h3");
		name.textContent = product.name;
		name.classList.add("item-name");

		// Product Description
		const desc = document.createElement("p");
		desc.textContent = product.description;
		desc.classList.add("item-desc");

		// Price Calculation
		const pricePerItem = product.price;
		const itemTotal = pricePerItem * quantity;
		total += itemTotal;

		// Price Element
		const price = document.createElement("p");
		price.textContent = `${itemTotal.toFixed(2)} €`;

		// Quantity Controls
		const quantityControls = document.createElement("div");
		quantityControls.classList.add("quantity-controls");

		const minusBtn = document.createElement("button");
		minusBtn.textContent = "−";
		minusBtn.addEventListener("click", () => updateQuantity(productId, -1));

		const plusBtn = document.createElement("button");
		plusBtn.textContent = "+";
		plusBtn.addEventListener("click", () => updateQuantity(productId, 1));

		const quantityDisplay = document.createElement("span");
		quantityDisplay.textContent = quantity;
		quantityDisplay.classList.add("quantity-number");

		quantityControls.appendChild(minusBtn);
		quantityControls.appendChild(quantityDisplay);
		quantityControls.appendChild(plusBtn);

		// Remove Button
		const removeBtn = document.createElement("button");
		removeBtn.textContent = "Entfernen";
		removeBtn.addEventListener("click", () => removeFromCart(productId));

		// Append elements to product card
		productCard.appendChild(img);
		productCard.appendChild(name);
		productCard.appendChild(desc);
		productCard.appendChild(price);
		productCard.appendChild(quantityControls);
		productCard.appendChild(removeBtn);

		// Append the product card to cart container
		cartContainer.appendChild(productCard);
	}

	// Total price (only added once, after all products)
	const totalElement = document.createElement("h2");
	totalElement.textContent = `Gesamt: ${total.toFixed(2)} €`;
	cartContainer.appendChild(totalElement);
}

// Update quantity for a specific product
function updateQuantity(productId, delta) {
	let cart = JSON.parse(localStorage.getItem("cart")) || {};

	if (!cart[productId]) return;

	cart[productId] += delta;

	if (cart[productId] <= 0) {
		delete cart[productId];
	}

	// Save the updated cart to localStorage
	localStorage.setItem("cart", JSON.stringify(cart));

	// Re-render the cart
	renderCart();
}

// Remove a specific product from the cart
function removeFromCart(productId) {
	let cart = JSON.parse(localStorage.getItem("cart")) || {};
	delete cart[productId];

	// Save the updated cart to localStorage
	localStorage.setItem("cart", JSON.stringify(cart));

	// Re-render the cart
	renderCart();
}
