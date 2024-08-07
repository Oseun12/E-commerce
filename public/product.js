document
  .getElementById('product-form')
  .addEventListener('submit', async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    try {
      const token = localStorage.getItem('jwtToken'); // Retrieve the token from local storage

      if (!token) {
        alert('No token found. Please login.');
        window.location.href = '/login.html';
        return;
      }

      const response = await fetch('/products', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        alert('Product added successfully!');
        console.log('Product added:', result);
        window.location.href = '/product.html';
      } else {
        const error = await response.json();
        alert('Failed to add product: ' + error.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while adding the product.');
    }
  });
