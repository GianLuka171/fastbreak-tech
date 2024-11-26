let cart = [];

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between');
        li.innerHTML = `
            ${item.name} - R$ ${item.price.toFixed(2)}
            <button class="btn btn-sm btn-danger remove-item" data-index="${index}">X</button>
        `;
        cartItems.appendChild(li);
    });

    cartTotal.textContent = total.toFixed(2);
}

document.querySelectorAll('.add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));
        cart.push({ name, price });
        updateCart();
        alert(`${name} adicionado ao carrinho!`);
    });
});

document.getElementById('view-cart').addEventListener('click', () => {
    new bootstrap.Modal(document.getElementById('cartModal')).show();
});

document.getElementById('clear-cart').addEventListener('click', () => {
    cart = [];
    updateCart();
    alert('Carrinho limpo!');
});

document.getElementById('cart-items').addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-item')) {
        const index = event.target.getAttribute('data-index');
        cart.splice(index, 1);
        updateCart();
    }
});

document.getElementById('finalize-purchase').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('O carrinho está vazio!');
    } else {
        alert('Compra finalizada! Obrigado pela preferência.');
        cart = [];
        updateCart();
    }
});