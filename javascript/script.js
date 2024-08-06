// Get elements
const addToCartButton = document.getElementById('Pay');
const addToFavouritesButton = document.getElementById('addToFavourites');
const applyFavoritesButton = document.getElementById('applyFavorites');
const resetCartButton = document.getElementById('resetCart');
const cartTable = document.querySelector('table tbody');

// Add total row to the table
const totalRow = cartTable.insertRow();
totalRow.innerHTML = `<td colspan="3">Total</td><td id="totalPrice">Rs. 0.00</td>`;

// Function to update total price in the table
const updateTotalPrice = (totalPrice) => {
    document.getElementById('totalPrice').textContent = `Rs. ${totalPrice.toFixed(2)}`;
}

// Function to add items to the cart
const addToCart = () => {
    // Clear previous cart items (except the total row)
    while (cartTable.rows.length > 1) cartTable.deleteRow(0);

    let totalPrice = 0;
    document.querySelectorAll('.quantity-input input[type="number"]').forEach(quantity => {
        if (quantity.value > 0) {
            const orderItem = quantity.closest('.order-item');
            const itemName = orderItem.querySelector('.item-name').textContent;
            const itemPrice = parseFloat(orderItem.querySelector('.item-price').textContent.match(/Rs\.(\d+)/)[1]);
            const itemQuantity = parseInt(quantity.value);
            const itemTotalPrice = itemPrice * itemQuantity;

            // Add item to cart table
            const row = cartTable.insertRow(cartTable.rows.length - 1);
            row.innerHTML = `<td>${itemName}</td><td>Rs. ${itemPrice.toFixed(2)}</td><td>${itemQuantity}</td><td>Rs. ${itemTotalPrice.toFixed(2)}</td>`;

            totalPrice += itemTotalPrice;
        }
    });

    updateTotalPrice(totalPrice);
}

// Function to save the cart to local storage
const saveToFavourites = () => {
    const cartItems = Array.from(cartTable.querySelectorAll('tr:not(:last-child)')).map(row => {
        const cells = row.querySelectorAll('td');
        return { name: cells[0].textContent, price: cells[1].textContent, quantity: cells[2].textContent, total: cells[3].textContent };
    });
    localStorage.setItem('favourites', JSON.stringify(cartItems));
    alert('Your cart has been saved to favourites!');
}

// Function to apply favorites and update the table
const applyFavorites = () => {
    while (cartTable.rows.length > 1) cartTable.deleteRow(0);
    
    const cartItems = JSON.parse(localStorage.getItem('favourites') || '[]');
    let totalPrice = 0;

    cartItems.forEach(item => {
        const row = cartTable.insertRow(cartTable.rows.length - 1);
        row.innerHTML = `<td>${item.name}</td><td>${item.price}</td><td>${item.quantity}</td><td>${item.total}</td>`;
        totalPrice += parseFloat(item.total.match(/Rs\.\s*(\d+\.\d+)/)[1]);
    });

    updateTotalPrice(totalPrice);
}

// Function to reset the cart
const resetCart = () => {
    while (cartTable.rows.length > 1) cartTable.deleteRow(0);
    updateTotalPrice(0);
}

// Event listeners
addToCartButton.addEventListener('click', addToCart);
addToFavouritesButton.addEventListener('click', saveToFavourites);
applyFavoritesButton.addEventListener('click', applyFavorites);
resetCartButton.addEventListener('click', resetCart);

