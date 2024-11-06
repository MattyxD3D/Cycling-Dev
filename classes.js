// Base Product class
class Product {
    constructor(id, name, price, category, image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.category = category;
        this.image = image;
    }

    calculateDiscount() {
        return 0;
    }
}

// Derived product classes
class Electronics extends Product {
    calculateDiscount() {
        return this.price * 0.1; // 10% discount
    }
}

class Clothing extends Product {
    calculateDiscount() {
        return this.price * 0.15; // 15% discount
    }
}

class Books extends Product {
    calculateDiscount() {
        return this.price * 0.05; // 5% discount
    }
}

// Cart class
class Cart {
    constructor() {
        this.items = [];
    }

    addItem(product) {
        this.items.push(product);
        this.updateCart();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.updateCart();
    }

    getTotal() {
        return this.items.reduce((total, item) => {
            return total + (item.price - item.calculateDiscount());
        }, 0);
    }

    updateCart() {
        const cartElement = document.getElementById('cart-items');
        const totalElement = document.getElementById('cart-total');
        
        cartElement.innerHTML = this.items.map(item => `
            <div class="cart-item">
                <span>${item.name}</span>
                <span>$${(item.price - item.calculateDiscount()).toFixed(2)}</span>
                <button onclick="cart.removeItem(${item.id})">Remove</button>
            </div>
        `).join('');
        
        totalElement.innerHTML = `<h3>Total: $${this.getTotal().toFixed(2)}</h3>`;
    }
}

// Customer class
class Customer {
    constructor(name, email) {
        this.name = name;
        this.email = email;
        this.orders = [];
    }
}

// Order class
class Order {
    constructor(customer, items, total, paymentMethod) {
        this.customer = customer;
        this.items = items;
        this.total = total;
        this.paymentMethod = paymentMethod;
        this.date = new Date();
        this.status = 'pending';
    }

    processPayment() {
        // Simulate payment processing
        return new Promise((resolve) => {
            setTimeout(() => {
                this.status = 'completed';
                resolve(true);
            }, 1000);
        });
    }
}