const ANSWERS = 4;

let gk = document.getElementById("general-knowledge-form");
let history = document.getElementById("history-form");
let geography = document.getElementById("geography-form");
let bible = document.getElementById("bible-form");
let tv = document.getElementById("tv-form");
let movie = document.getElementById("movie-form");

let questions = ["temp", "temp", "temp", "temp"];
let gkQuestions = {
  question1: "What is the largest ocean on Earth?",
  question2: "How many days are there in a week?",
  question3: "What is the chemcical symbol for gold?",
  question4: "Who was the first president of the United States?",
  question5: "What is the capital of France?",
};
let posGkAnswers = {
  answer1: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
  answer2: ["6 days", "7 days", "4 days", "5 days"],
  answer3: ["Au", "Pt", "Zn", "Cu"],
  answer4: [
    "Abraham Lincoln",
    "Andrew Jackson",
    "John Adams",
    "George Washington",
  ],
  ansewr5: ["Strasbourg", "Bordeaux", "Paris", "Lyon"],
};
let gkCorrectAnswers = {
  answer1: "Pacific Ocean",
  answer2: "7 days",
  answer3: "Au",
  answer4: "George Washington",
  answer5: "Paris",
};

function isCorrectGK(currQuestion, val) {
  const elem = document.getElementById("gkbtn");
}

// Note: Fix for loop and find out where size of 7 is coming from

function getGeneralKnowledge() {
  document.getElementById("trivia-picker-container").style.display = "none";
  document.getElementById("general-knowledge-container").style.display =
    "block";

  let currQuestion = 0;
  for (let i = 0; i < ANSWERS; i++) {
    let input = document.createElement("input");
    input.type = "button";
    input.className = "btn";
    input.value = Object.values(posGkAnswers)[currQuestion][i];
    input.id = "gkbtn";
    gk.append(input);
    isCorrectGK(currQuestion, input.value);
  }
}

function getHistory() {
  document.getElementById("trivia-picker-container").style.display = "none";
  document.getElementById("history-container").style.display = "block";
  for (let i = 0; i < questions.length; i++) {
    let input = document.createElement("input");
    input.type = "button";
    input.className = "btn";
    input.value = questions[i];
    history.append(input);
  }
}

function getGeography() {
  document.getElementById("trivia-picker-container").style.display = "none";
  document.getElementById("geography-container").style.display = "block";
  for (let i = 0; i < questions.length; i++) {
    let input = document.createElement("input");
    input.type = "button";
    input.className = "btn";
    input.value = questions[i];
    geography.append(input);
  }
}

function getBible() {
  document.getElementById("trivia-picker-container").style.display = "none";
  document.getElementById("bible-container").style.display = "block";
  for (let i = 0; i < questions.length; i++) {
    let input = document.createElement("input");
    input.type = "button";
    input.className = "btn";
    input.value = questions[i];
    bible.append(input);
  }
}

function getTV() {
  document.getElementById("trivia-picker-container").style.display = "none";
  document.getElementById("tv-container").style.display = "block";
  for (let i = 0; i < questions.length; i++) {
    let input = document.createElement("input");
    input.type = "button";
    input.className = "btn";
    input.value = questions[i];
    tv.append(input);
  }
}

function getMovie() {
  document.getElementById("trivia-picker-container").style.display = "none";
  document.getElementById("movie-container").style.display = "block";
  for (let i = 0; i < questions.length; i++) {
    let input = document.createElement("input");
    input.type = "button";
    input.className = "btn";
    input.value = questions[i];
    movie.append(input);
  }
}
