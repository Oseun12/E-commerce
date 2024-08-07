document.addEventListener('DOMContentLoaded', () => {
  const cartButtons = document.querySelectorAll('.add-to-cart');

  cartButtons.forEach((button) => {
    button.addEventListener('click', async (event) => {
      const card = event.target.closest('.card');
      const productName = card.querySelector('h4').textContent;
      const productId = getProductIdFromName(productName); // Implement this function to map product name to ID
      const quantity = 1; // Default quantity, you can change this based on user input

      console.log('Adding to cart:', { productId, quantity });

      try {
        const response = await fetch('/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`, // Implement getToken() to retrieve the JWT token
          },
          body: JSON.stringify({ productId, quantity }),
        });

        const data = await response.json();

        if (response.ok) {
          alert('Item added to cart!');
          console.log(data);
        } else {
          alert('Failed to add item to cart.');
          console.error('Error:', data);
        }
      } catch (error) {
        alert('An error occurred.');
        console.error('Fetch error:', error);
      }
    });
  });

  function getProductIdFromName(name) {
    // Map product names to their IDs
    const products = {
      "Long Sleeves lady's top": 1,
      'Blue and white Office Bag': 2,
      'Pearl design Bridal heels': 3,
      '18-karat Pearl Bridal jewelries': 4,
      '6-shades of powder colors': 5,
      '2-n-1 Leather Office bag': 6,
    };
    return products[name];
  }

  function getToken() {
    // Retrieve JWT token from localStorage or cookie
    return localStorage.getItem('jwtToken') || '';
  }
});
