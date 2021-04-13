const addClash = async (event) => {
    event.preventDefault();
  
    const friendID = document.querySelector('.friend-id').value.trim();
    const friendName = document.querySelector('.friend-name').value.trim();
    const friendInterests = document.querySelector('.friend-interests').value.trim();
  
    const friend = {
        id: friendID,
        name: friendName,
        interests: friendInterests
    }
    
      const response = await fetch('/api/users/:id', {
        method: 'PUT',
        body: JSON.stringify({ friend }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to log in.');
      }
    
  };
  
  
  
  document
    .querySelector('.add-button')
    .addEventListener('submit', addClash);
  