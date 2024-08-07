document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('/products');
    const products = await response.json();

    const productContainer = document.getElementById('product-container');
    products.forEach((product) => {
      const productElement = document.createElement('div');
      productElement.className = 'product';
      productElement.innerHTML = `
            <h4>${product.name}</h4>
            <p>${product.description}</p>
            <span>${product.price}</span>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
          `;
      productContainer.appendChild(productElement);
    });

    document.querySelectorAll('.add-to-cart').forEach((button) => {
      button.addEventListener('click', async (event) => {
        const productId = event.target.getAttribute('data-id');
        const token = localStorage.getItem('jwtToken');

        try {
          const response = await fetch('/cart', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ productId, quantity: 1 }),
          });

          if (response.ok) {
            alert('Item added to cart!');
          } else {
            alert('Failed to add item to cart.');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('An error occurred.');
        }
      });
    });
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to fetch products.');
  }
});
