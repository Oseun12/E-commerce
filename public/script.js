document.addEventListener('DOMContentLoaded', () => {
  const showToast = (text, type) => {
    let backgroundColor;
    if (type === 'success') {
      backgroundColor = 'navy blue';
    } else if (type === 'error') {
      backgroundColor = 'red';
    }

    Toastify({
      text: text,
      duration: 3000,
      gravity: 'bottom',
      position: 'right',
      backgroundColor: backgroundColor,
    }).showToast();
  };

  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const role = document.getElementById('role').value;

      try {
        const response = await fetch('/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password, role }),
        });

        const data = await response.json();
        if (response.ok) {
          showToast('Signup successful', 'success');
          setTimeout(() => {
            window.location.href = '/login.html';
          }, 2000);
        } else {
          showToast(data.message || 'Signup failed', 'error');
        }
      } catch (error) {
        console.error('Error:', error);
        showToast('An error occurred during signup.', 'error');
      }
    });
  } else {
    console.error('Signup form not found');
  }

  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
        const response = await fetch('/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.ok) {
          showToast('Login successful', 'success');
          setTimeout(() => {
            window.location.href = '/shop.html';
          }, 1000);
        } else {
          showToast(data.message || 'Login failed', 'error');
        }
      } catch (error) {
        console.error('Error:', error);
        showToast('An error occurred during login.', 'error');
      }
    });
  } else {
    console.error('Login form not found');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const languageDropdown = document.getElementById('language-dropdown');
  const currencyDropdown = document.getElementById('currency-dropdown');

  languageDropdown.addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
      const selectedLanguage = event.target.getAttribute('data-lang');
      console.log('Selected language:', selectedLanguage);
      // Here you can add the functionality to change the language
    }
  });

  currencyDropdown.addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
      const selectedCurrency = event.target.getAttribute('data-currency');
      console.log('Selected currency:', selectedCurrency);
      // Here you can add the functionality to change the currency
    }
  });

  const showAllButtons = document.querySelectorAll('.show-all');

  showAllButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const section = event.target.closest('.product-section');
      const itemsContainer = section.querySelector('.items');
      itemsContainer.style.display =
        itemsContainer.style.display === 'none' ||
        itemsContainer.style.display === ''
          ? 'block'
          : 'none';
    });
  });

  document
    .getElementById('productForm')
    .addEventListener('submit', async (event) => {
      event.preventDefault();

      const form = document.getElementById('productForm');
      const formData = new FormData(form);

      try {
        const response = await fetch('http://localhost:3000/products', {
          method: 'POST',
          headers: {
            Authorization: 'Bearer YOUR_JWT_TOKEN',
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to add product');
        }

        const result = await response.json();
        console.log('Product added:', result);
        alert('Product added successfully!');
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to add product');
      }
    });
});
