const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const firstName = document.querySelector('#First_name').value.trim();
    const lastName = document.querySelector('#Last_name').value.trim();
    const email = document.querySelector('#signupEmail').value.trim();
    const password = document.querySelector('#signupPassword').value.trim();

    console.log(firstName)
    console.log(lastName)
    console.log(email)
    console.log(firstName)
    
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
  .querySelector('#signup-btn')
  .addEventListener('submit', signupFormHandler);