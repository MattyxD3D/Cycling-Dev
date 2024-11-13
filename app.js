
// Initialize products
const products = [
    new Electronics(1, "Smartphone", 699.99, "Electronics", "images/Smart Phone.png"),
    new Electronics(2, "Laptop", 999.99, "Electronics", "images/Laptop.png"),
    new Clothing(3, "T-Shirt", 29.99, "Clothing", "images/T-shirt.png"),
    new Clothing(4, "Jeans", 59.99, "Clothing", "images/Jeans.png"),
    new Books(5, "Novel", 19.99, "Books", "images/Novel.png"),
    new Books(6, "Textbook", 89.99, "Books", "images/Textbook.png")
];

// Initialize cart
const cart = new Cart();

const uName = localStorage.getItem('username');
const pWord = localStorage.getItem('password');

const customer = new Customer(uName, pWord);

// Display products
function displayProducts(productsToShow = products) {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = productsToShow.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" style="width:100%; height:auto; border-radius:8px;">
            <h3>${product.name}</h3>
            <p>Category: ${product.category}</p>
            <p>Price: $${product.price}</p>
            <p>Discount: $${product.calculateDiscount().toFixed(2)}</p>
            <p>Final Price: $${(product.price - product.calculateDiscount()).toFixed(2)}</p>
            <div class="button-wrapper">
                <button onclick="cart.addItem(products.find(p => p.id === ${product.id}))">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Filter products
function filterProducts() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const category = document.getElementById('category-filter').value;

    let filtered = products;

    if (category !== 'all') {
        filtered = filtered.filter(product => product.category === category);
    }

    if (searchTerm) {
        filtered = filtered.filter(product => 
            product.name.toLowerCase().includes(searchTerm)
        );
    }

    displayProducts(filtered);
}

// Checkout functions
function showCheckout() {
    if (cart.items.length === 0) {
        alert('Your cart is empty! I add to cart mo na yan');
        return;
    }

    const modal = document.getElementById('checkout-modal');
    const backdrop = document.querySelector('.modal-backdrop');
    const summary = document.getElementById('order-summary');

    summary.innerHTML = `
        <h3>Order Summary</h3>
        ${cart.items.map(item => `
            <div>${item.name} - $${(item.price - item.calculateDiscount()).toFixed(2)}</div>
            
        `).join('')}
        <h4>Total: $${cart.getTotal().toFixed(2)}</h4>
    `;

    modal.style.display = 'block';
    backdrop.style.display = 'block';
}

function closeCheckout() {
    const modal = document.getElementById('checkout-modal');
    const backdrop = document.querySelector('.modal-backdrop');
    modal.style.display = 'none';
    backdrop.style.display = 'none';
}

async function processOrder() {
    const paymentMethod = document.getElementById('payment-method').value;
    const order = new Order(customer, [...cart.items], cart.getTotal(), paymentMethod);

    try {
        await order.processPayment();
        customer.orders.push(order);
        cart.items = [];
        cart.updateCart();
        closeCheckout();
        alert('Order placed successfully!');
    } catch (error) {
        alert('Payment failed. Please try again.');
    }
}

// Initial display







displayProducts();


