const addClash = async (event) => {
  event.preventDefault();


  const friendID = event.target.getAttribute('data-id')
  const friendName = event.target.getAttribute('data-name')
  const userId = event.target.getAttribute('data-user')
  const userImg = event.target.getAttribute('data-img')
  const friendInterests = event.target.getAttribute('data-interest')
  // const friendints = await JSON.parse(friendInterests)

  //This is going to pull friend user info from the API routes
  const friendInfo = await fetch(`/api/users/${friendID}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  //this is going to turn the data into a readable object
  const friendObj = await friendInfo.json();
  //this is going to create an interest array
  const interestArr = [];
  // This is going to push all the interests in the friends object to the new array
  for (let i = 0; i < friendObj.interests.length; i++) {
    interestArr.push(friendObj.interests[i].interest_name)
  };

  //This is going to repack the interest data into the object

   const newFriend = {
      id: friendID,
      name: friendName,
      image_path: userImg,
      interests: interestArr
    };
 

  //This is goint to pull the data from the current user
  const userInfo = await fetch(`/api/users/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  //This is going to unpack the friends data from the current user
  const userObj = await userInfo.json();
  const currentFriendArr = userObj.friends;

  //This is going to push the friend to user object if none exist
  if (!userObj.friends) {
    const friendsArr = []
    friendsArr.push(newFriend)
    const response = await fetch(`/api/users/addfriend/${userId}`, {
      method: 'PUT',
      body: JSON.stringify({ friendsArr }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Friend was not added');
    }
  }
  //This is going to push the friend to the user object if they already have friends
  else {

    currentFriendArr.push(newFriend)
    const friendsArr = currentFriendArr

    const response = await fetch(`/api/users/addfriend/${userId}`, {
      method: 'PUT',
      body: JSON.stringify({ friendsArr }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Friend was not added');
    }
  }


};



document
  .querySelectorAll('.add-friend').forEach(button => {
    button.addEventListener('click', addClash);
  })

