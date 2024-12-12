let cart = JSON.parse(localStorage.getItem('favoriteOrder')) || [];

function updateCartTable() {
    const tableBody = document.querySelector("#cartTable tbody");
    tableBody.innerHTML = "";
    let totalPrice = 0;
    cart.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>$${item.price * item.quantity}</td>
        `;
        tableBody.appendChild(row);
        totalPrice += item.price * item.quantity;
    });
    document.getElementById("totalPrice").textContent = totalPrice;
}

document.getElementById('checkoutForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const payment = document.getElementById('payment').value;

    if (name && address && payment) {
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 7); // Set delivery date 7 days from now
        alert(`Thank you for your purchase, ${name}! Your order will be delivered on ${deliveryDate.toDateString()}.`);
    } else {
        alert("Please fill in all fields.");
    }
});

// Initialize the cart table on page load
updateCartTable();
