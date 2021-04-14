
// Code for processing logins
const loginFormHandler = async (event) => {
  event.preventDefault();
  console.log("You're in!")

  const email = document.querySelector('#loginEmail').value.trim();
  const password = document.querySelector('#loginPassword').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in.');
    }
  }
};


// Code for processing sign ups

const signupFormHandler = async (event) => {
  console.log("You're reached the signupFormHandler");
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
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);
