document.addEventListener("DOMContentLoaded", () => {
	renderCart();
});

// Rendert den Warenkorb
function renderCart() {
	const cartContainer = document.getElementById("cart-container");
	let cart;

	try {
		cart = JSON.parse(localStorage.getItem("cart")) || {};
		if (typeof cart !== "object" || Array.isArray(cart)) {
			throw new Error("Ungültiges Warenkorb-Format");
		}
	} catch (error) {
		console.error("Warenkorb beschädigt. Setze zurück.", error);
		localStorage.removeItem("cart");
		cartContainer.innerHTML = "<p>Ein Fehler ist aufgetreten. Der Warenkorb wurde zurückgesetzt.</p>";
		return;
	}

	if (Object.keys(cart).length === 0) {
		cartContainer.innerHTML = '<div class="cart-empty-message">Dein Warenkorb ist leer.</div>';
		return;
	}

	cartContainer.innerHTML = "";
	let total = 0;

	for (const productId in cart) {
		const quantity = cart[productId];
		const product = products[productId];

		if (!product || quantity <= 0) {
			console.warn(`Ungültiges Produkt im Warenkorb: ${productId}`);
			continue;
		}

		const productCard = document.createElement("div");
		productCard.classList.add("cart-item");

		const img = document.createElement("img");
		img.src = Array.isArray(product.img) ? product.img[0] : product.img;
		img.classList.add("cart-item-img");

		const details = document.createElement("div");
		details.classList.add("cart-item-details");

		const name = document.createElement("div");
		name.textContent = product.name;
		name.classList.add("cart-item-title");

		const pricePerItem = product.price;
		const itemTotal = pricePerItem * quantity;
		total += itemTotal;

		const price = document.createElement("div");
		price.textContent = `${itemTotal.toFixed(2)} €`;
		price.classList.add("cart-item-price");

		const qtyControls = document.createElement("div");
		qtyControls.classList.add("cart-item-qty");

		const minusBtn = document.createElement("button");
		minusBtn.textContent = "−";
		minusBtn.addEventListener("click", () => updateQuantity(productId, -1));

		const qtyDisplay = document.createElement("span");
		qtyDisplay.textContent = quantity;
		qtyDisplay.classList.add("cart-item-qty-number");

		const plusBtn = document.createElement("button");
		plusBtn.textContent = "+";
		plusBtn.addEventListener("click", () => updateQuantity(productId, 1));

		qtyControls.appendChild(minusBtn);
		qtyControls.appendChild(qtyDisplay);
		qtyControls.appendChild(plusBtn);

		const removeBtn = document.createElement("button");
		removeBtn.textContent = "Entfernen";
		removeBtn.classList.add("cart-item-remove");
		removeBtn.addEventListener("click", () => removeFromCart(productId));

		details.appendChild(name);
		details.appendChild(price);
		details.appendChild(qtyControls);

		productCard.appendChild(img);
		productCard.appendChild(details);
		productCard.appendChild(removeBtn);

		cartContainer.appendChild(productCard);
	}

	const totalElement = document.createElement("div");
	totalElement.classList.add("cart-summary");
	totalElement.textContent = `Gesamt: ${total.toFixed(2)} €`;

	// Zahlungsoptionen
	const checkoutBtn = document.createElement("button");
	checkoutBtn.textContent = "Zur Kasse";
	checkoutBtn.className = "cart-checkout";
	checkoutBtn.style.marginLeft = "20px";
	checkoutBtn.addEventListener("click", openCheckoutModal);

	const summaryWrapper = document.createElement("div");
	summaryWrapper.style.display = "flex";
	summaryWrapper.style.justifyContent = "flex-end";
	summaryWrapper.style.alignItems = "center";
	summaryWrapper.appendChild(totalElement);
	summaryWrapper.appendChild(checkoutBtn);

	cartContainer.appendChild(summaryWrapper);
}

// Aktualisiert die Menge eines Produkts im Warenkorb
function updateQuantity(productId, delta) {
	let cart = JSON.parse(localStorage.getItem("cart")) || {};

	if (!cart[productId]) return;

	cart[productId] += delta;

	if (cart[productId] <= 0) {
		delete cart[productId];
	}

	localStorage.setItem("cart", JSON.stringify(cart));
	renderCart();
}

// Entfernt ein Produkt aus dem Warenkorb
function removeFromCart(productId) {
	let cart = JSON.parse(localStorage.getItem("cart")) || {};
	delete cart[productId];
	localStorage.setItem("cart", JSON.stringify(cart));
	renderCart();
}

// Checkout modal logic
function openCheckoutModal() {
	document.getElementById("checkout-modal").style.display = "block";
	document.getElementById("checkout-overlay").style.display = "block";
}
function closeCheckoutModal() {
	document.getElementById("checkout-modal").style.display = "none";
	document.getElementById("checkout-overlay").style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
	renderCart();
	const closeBtn = document.getElementById("checkout-close");
	const overlay = document.getElementById("checkout-overlay");
	if (closeBtn) closeBtn.onclick = closeCheckoutModal;
	if (overlay) overlay.onclick = closeCheckoutModal;
});
