let cart = [];
fetch('order.json')
    .then(response => response.json())
    .then(data => {
        window.medicines = data;
        generateMedicineItems('analgesics', 'analgesics');
        generateMedicineItems('antibiotics', 'antibiotics');
        generateMedicineItems('antidepressants', 'antidepressants');
        generateMedicineItems('antihistamines', 'antihistamines');
        generateMedicineItems('antihypertensives', 'antihypertensives');
    })
    .catch(error => console.error('Error fetching medicines data:', error));

function generateMedicineItems(category, categoryId) {
    const categoryDiv = document.getElementById(categoryId);
    categoryDiv.innerHTML = "";
    medicines[category].forEach((med, index) => {
        const medBox = document.createElement('div');
        medBox.classList.add('medicine-box');
        medBox.innerHTML = `
            <img src="${med.image}" alt="${med.name}">
            <h3>${med.name}</h3>
            <p>Price: $${med.price}</p>
            <input type="number" id="quantity${category}${index}" value="1" min="1" max="10">
            <button onclick="addToCart('${category}', ${index})">Add to Cart</button>
        `;
        categoryDiv.appendChild(medBox);
    });
}

function addToCart(category, index) {
    const quantity = document.getElementById(`quantity${category}${index}`).value;
    const med = medicines[category][index];
    const item = { ...med, quantity: parseInt(quantity) };
    cart.push(item);
    updateCartTable();
}

function updateCartTable() {
    const tableBody = document.querySelector("#cartTable tbody");
    tableBody.innerHTML = "";
    let totalPrice = 0;
    cart.forEach((item, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>$${item.price * item.quantity}</td>
            <td><button onclick="removeItem(${index})">Remove</button></td>
        `;
        tableBody.appendChild(row);
        totalPrice += item.price * item.quantity;
    });
    document.getElementById("totalPrice").textContent = totalPrice;
}

function removeItem(index) {
    cart.splice(index, 1); 
    updateCartTable(); 
}

document.getElementById('buyNowBtn').addEventListener('click', () => {
    window.location.href = "checkout.html";
});

// Favorite functionality
document.getElementById('addToFavoritesBtn').addEventListener('click', () => {
    localStorage.setItem('favoriteOrder', JSON.stringify(cart));
});

document.getElementById('applyFavoritesBtn').addEventListener('click', () => {
    const favoriteOrder = JSON.parse(localStorage.getItem('favoriteOrder'));
    if (favoriteOrder) {
        cart = favoriteOrder;
        updateCartTable();
    }
});

if (window.location.pathname.includes('checkout.html')) {
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
}
