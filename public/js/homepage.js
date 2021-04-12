//This is where the calendar code will go

const express = require("express");
const { google, outlook, office365, yahoo, ics } = require("calendar-link");
const button = document.querySelector('#submitButton');


// function alertme() {
// // window.open("https://calendar.google.com/calendar/render...");
// console.log("Hello?")
// };


button.addEventListener('click', displayDetails);

function displayDetails(e) {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const date = document.getElementById("date").value;
  const start = document.getElementById('start').value;
  const end = document.getElementById('end').value;
  const description = document.getElementById('description').value;
  const place = document.getElementById('place').value;
  const guests = document.getElementById('guests').value;

  if (!title || !start || !end || !description || !place || !guests) {
    alert('please fill all the boxes');
    return;
  }
  // alert(title + " on " + date + " from " + start + " to " +  end + " to " +  description + " at " +  place + " with invitees, " +  guests);
  const event = {
    title: title,
    description: description,
    start: date + " " + start + "+0100",
    // start: "2019-12-29 18:00:00 +0100",
    duration: [end - start, "hour"],
    place: place,
    guests: guests,
  };
  google(event);

}