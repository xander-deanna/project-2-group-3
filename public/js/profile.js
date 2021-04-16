// // Get the modal
// var modal = document.getElementById("#interest-popup");

// // Get the button that opens the modal
// var btn = document.getElementById("#add-interest");

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("#close")[0];

// // When the user clicks on the button, open the modal
// btn.onclick = function() {
//   modal.style.display = "block";
// }

// // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }

// query selectors to help add interests when user clicks add interest buttons
const addInterests = async (event) => {
  console.log("hellooooooo");
  event.preventDefault();
  const userIdBtn = document.querySelector('#modal-btn').getAttribute('value');
  const interestIdBtn = event.target.getAttribute('data-id');

  const response = await fetch('/api/interests/addInterest', {
    method: 'POST',
    body: JSON.stringify({userIdBtn, interestIdBtn}),
    headers: {'Content-Type': 'application/json'},
  });
  if (response.ok) {
    document.location.reload();
  }
};
document
  .querySelectorAll('.interest-btn').forEach(button => {
    button.addEventListener('click', addInterests);
  });