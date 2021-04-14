//This is where the info to view the profile will go

const viewprofile = async (event) => {
    event.preventDefault();
  
  
    const friendID = event.target.getAttribute('data-id')
    const friendName = event.target.getAttribute('data-name')
    
  
    //This is going to pull friend user info from the API routes
    const friendInfo = await fetch(`/api/users/${friendID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    //this is going to turn the data into a readable object
    const friendObj = await friendInfo.json()
  
    // const interestArr = [];
  
    // for( let i=0; i<friendObj.interests.length; i++){
    //  interestArr = interests.push(friendObj.interests.interest_name[i])
    // }
  
    //This is going to repack the interest data into the object
    const friend = {
      id: friendID,
      name: friendName,
      // interests: interestArr
    }
    console.log(friend)
    //This is going to put the user info into the friends section of the current user
    const response = await fetch('/api/users/2', {
      method: 'PUT',
      body: JSON.stringify({ friend }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Friend was not added');
    }
  
  };
  
  
  
  document
    .querySelectorAll('.add-friend').forEach(button => {
      button.addEventListener('click', addClash);
    })
    