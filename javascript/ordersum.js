document.addEventListener('DOMContentLoaded', () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const totalPrice = localStorage.getItem('totalPrice') || '0.00';

    const cartTableBody = document.querySelector('#cartTable tbody');
    cartItems.forEach(item => {
        const row = cartTableBody.insertRow();
        row.innerHTML = `<td>${item.name}</td><td>Rs. ${item.price.toFixed(2)}</td><td>${item.quantity}</td><td>Rs. ${item.totalPrice.toFixed(2)}</td>`;
    });

    document.getElementById('totalPrice').textContent = `Rs. ${totalPrice}`;
});