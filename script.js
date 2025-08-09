"use strict";

let scoreDisplay = document.querySelector(".score");
let highscoreDisplay = document.querySelector(".highscore");
const btnStart = document.querySelector(".start");
const btnStop = document.querySelector(".stop");
const holes = document.querySelectorAll(".down img"); // array of every image in down section
let minute = document.getElementById("minute");
let second = document.getElementById("second");

let playing = false; // boolean value showing state of game
console.log(`start hasn't been clicked yet: playing -> ${playing}`); // for debug

let minuteLeft = 1;
let secondLeft = 60;
let timerIdMinute; // interfal of counting down minutes
let timerIdSecond; // interval of counting down seconds
let moleInterval; // interval of moles appearing
let hideTimeout; // interfal of moles disappearing
let score = 0; // BE value to store scores
let highscore = 0; // BE value to store highscore

function startCountDown() {
  if (playing) {
    timerIdMinute = setInterval(() => {
      minuteLeft--;
      minute.textContent = minuteLeft;
      if (minuteLeft <= 0) {
        clearInterval(timerIdMinute);
      }
    }, 1000);
    timerIdSecond = setInterval(() => {
      secondLeft--;
      second.textContent = secondLeft;
      if (secondLeft <= 0) {
        clearInterval(timerIdSecond);
        endGame();
      }
    }, 1000);
  }
}

function showMole() {
  if (playing) {
    let index = Math.floor(Math.random() * holes.length);
    holes[index].src = "/img/mole-normal.png";

    hideTimeout = setTimeout(() => {
      holes[index].src = "/img/empty-pile.png";
    }, 1000);
  }
}

holes.forEach((hole) => {
  hole.addEventListener("click", () => {
    if (!playing) return;
    if (hole.src.includes("mole-normal.png")) {
      hole.src = "img/mole-squished.png";
      clearTimeout(hideTimeout);
      hideTimeout = setTimeout(() => {
        hole.src = "/img/empty-pile.png";
      }, 2000);
      score++;
      if (score > highscore) {
        highscore = score;
        highscoreDisplay.textContent = highscore;
      }
      scoreDisplay.textContent = score;
    }
  });
});

console.log(`start hasn't been clicked: playing -> ${playing}, entering start`);

btnStart.addEventListener("click", function () {
  if (playing) return;
  else {
    playing = true;
    console.log(`start has been clicked: playing -> ${playing}`);
    startCountDown();
    if (moleInterval) clearInterval(moleInterval);
    moleInterval = setInterval(showMole, 1000);
  }
});

btnStop.addEventListener("click", endGame);

function endGame() {
  // resetting values
  btnStart.textContent = "Start!";
  minute.textContent = 1;
  second.textContent = 0;
  minuteLeft = 1;
  secondLeft = 60;
  clearInterval(timerIdSecond);
  clearInterval(timerIdMinute);
  clearInterval(moleInterval);
  moleInterval = null;
  playing = false;
  score = 0;
  scoreDisplay.textContent = 0;

  console.log(`game has ended: playing -> ${playing}`);
}
