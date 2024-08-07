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
          // Store the token in localStorage
          localStorage.setItem('jwtToken', data.token);
          setTimeout(() => {
            window.location.href = '/product.html';
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
