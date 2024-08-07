document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('jwtToken');
  const payload = JSON.parse(atob(token.split('.')[1]));

  if (payload.role !== 'admin') {
    alert('Access denied.');
    window.location.href = '/';
  }

  const productForm = document.getElementById('product-form');
  productForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(productForm);

    try {
      const response = await fetch('/products', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        alert('Product created successfully!');
        window.location.reload();
      } else {
        alert('Failed to create product.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred.');
    }
  });
});
