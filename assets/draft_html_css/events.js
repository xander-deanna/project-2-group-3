const express = require("express");
const { google, outlook, office365, yahoo, ics } = require("calendar-link");
const button = document.querySelector('#submitButton');


// function alertme() {
// // window.open("https://calendar.google.com/calendar/render...");
// console.log("Hello?")
// };


button.addEventListener('click', displayDetails);

const row = 1; 

function displayDetails(e) {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const start = document.getElementById('start').value;
    const end = document.getElementById('end').value;
    const description = document.getElementById('description').value;
    const place = document.getElementById('place').value;
    const guests = document.getElementById('guests').value;

    if(!title || !start || !end || !description || !place || !guests) {
        alert("please fill all the boxes");
        return;
    };
    alert(title + start + end + description + place + guests);
};