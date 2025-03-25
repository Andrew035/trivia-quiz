const API_URL =
  "https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple";
const gkForm = document.getElementById("general-knowledge-form");
let currentGKQuestion = 0;
let gkData = [];

// Helper: Shuffle an array
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Load and show questions
async function getGeneralKnowledge() {
  try {
    // Fetch once
    if (gkData.length === 0) {
      const response = await fetch(API_URL);
      const data = await response.json();
      gkData = data.results;
    }

    if (currentGKQuestion >= gkData.length) {
      alert("All questions asnwerd. NICE!");
      return;
    }

    // Hide picker, show trivia container
    document.getElementById("trivia-picker-container").style.display = "none";
    document.getElementById("general-knowledge-container").style.display =
      "block";

    gkForm.innerHTML = ""; // Clear old question

    // Get current question data
    const qData = gkData[currentGKQuestion];
    const allAnswers = shuffle([
      ...qData.incorrect_answers,
      qData.correct_answer,
    ]);

    // Create and insert question
    const questionP = document.createElement("p");
    questionP.innerHTML = decodeURIComponent(qData.question);
    gkForm.appendChild(questionP);

    // Create answer buttons
    allAnswers.forEach((answer) => {
      const btn = document.createElement("input");
      btn.type = "button";
      btn.className = "btn";
      btn.value = decodeURIComponent(answer);
      btn.onclick = () => {
        if (answer === qData.correct_answer) {
          alert("Correct!");
        } else {
          alert(`Wrong! The correct answer was: ${qData.correct_answer}`);
        }
        currentGKQuestion++;
        getGeneralKnowledge(); // Move to next question
      };
      gkForm.appendChild(btn);
    });
  } catch (error) {
    console.error("Failed to load trivia:", error);
    alert("Oops! Could not load trivia questions.");
  }
}
