//This is where the info to view the profile will go

const viewProfile = async (event) => {
    event.preventDefault();
  
    const friendId = event.target.getAttribute('data-id')
    document.location.replace(`/profile/${friendId}`);
  
  };
  
  document
    .querySelectorAll('.view-profile').forEach(button => {
      button.addEventListener('click', viewProfile);
    })
    