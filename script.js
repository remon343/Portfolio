const waterBubble = document.querySelector(".water-bubble");

document.addEventListener("mousemove", e => {
  waterBubble.style.left = `${e.clientX - 10}px`;
  waterBubble.style.top = `${e.clientY - 10}px`;
});

// Sticky Navigation Menu JS Code
let nav = document.querySelector("nav");
let scrollBtn = document.querySelector(".scroll-button a");
console.log(scrollBtn);
let val;
window.onscroll = function () {
  if (document.documentElement.scrollTop > 20) {
    nav.classList.add("sticky");
    scrollBtn.style.display = "block";
  } else {
    nav.classList.remove("sticky");
    scrollBtn.style.display = "none";
  }

}

// Side NavIgation Menu JS Code
let body = document.querySelector("body");
let navBar = document.querySelector(".navbar");
let menuBtn = document.querySelector(".menu-btn");
let cancelBtn = document.querySelector(".cancel-btn");
menuBtn.onclick = function () {
  navBar.classList.add("active");
  menuBtn.style.opacity = "0";
  menuBtn.style.pointerEvents = "none";
  body.style.overflow = "hidden";
  scrollBtn.style.pointerEvents = "none";
}
cancelBtn.onclick = function () {
  navBar.classList.remove("active");
  menuBtn.style.opacity = "1";
  menuBtn.style.pointerEvents = "auto";
  body.style.overflow = "auto";
  scrollBtn.style.pointerEvents = "auto";
}

// Side Navigation Bar Close While We Click On Navigation Links
let navLinks = document.querySelectorAll(".menu li a");
for (var i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click", function () {
    navBar.classList.remove("active");
    menuBtn.style.opacity = "1";
    menuBtn.style.pointerEvents = "auto";
  });
}

const textArray = [  "Web Developer",  "Frontend Developer",  "HTML",  "CSS",  "ReactJS"];
let textIndex = 0;
let charIndex = 0;
const typingText = document.querySelector(".text-three");

function type() {
  if (charIndex < textArray[textIndex].length) {
    typingText.textContent += textArray[textIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, 50);
  } else {
    setTimeout(erase, 2000);
  }
}

function erase() {
  if (charIndex > 0) {
    typingText.textContent = textArray[textIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, 30);
  } else {
    textIndex++;
    if (textIndex >= textArray.length) {
      textIndex = 0;
    }
    setTimeout(type, 1000);
  }
}

document.addEventListener("DOMContentLoaded", function() {
  setTimeout(type, 1000);
});


//calling the api for quotes
const quotes = document.getElementById("quotes");
const author = document.getElementById("author");
const tweetBtn = document.getElementById("tweetbtn");
let realData = "";
let quotesData = "";
const tweetNow = () => {
  let tweetPost = `https://twitter.com/intent/tweet?text=${quotesData}`;
  window.open(tweetPost);
};
tweetBtn.addEventListener("click", tweetNow);

const api = "https://type.fit/api/quotes";
const getNewQuotes = () => {
  let rnum = Math.floor(Math.random() * 100);
  quotes.innerText = `"${realData[rnum].text}"`;
  quotesData = `${realData[rnum].text}`;
  if (realData[rnum].author == null) {
    author.innerText = "By unknown";
  } else {
    author.innerText = `By ${realData[rnum].author}`;
  }
};
const getQuotes = async () => {
  try {
    let data = await fetch(api);
    realData = await data.json();
    getNewQuotes();
  } catch (err) {}
};

getQuotes();
