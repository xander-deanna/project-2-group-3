const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const firstName = document.querySelector('#First_name').value.trim();
    const lastName = document.querySelector('#Last_name').value.trim();
    const email = document.querySelector('#signupEmail').value.trim();
    const password = document.querySelector('#signupPassword').value.trim();
    
    if (firstName && lastName && email && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ firstName, lastName, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to sign up.');
      }
    }
  };

  document
  .querySelector('#signup')
  .addEventListener('submit', signupFormHandler);