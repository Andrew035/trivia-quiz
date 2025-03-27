// Utility function to decode HTML entities from API
function decodeHTML(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

// Generic function to fetch and display questions
async function getTriviaQuestions(categoryId, formId) {
  const url = `https://opentdb.com/api.php?amount=5&category=${categoryId}&type=multiple`;
  const form = document.getElementById(formId);

  try {
    const res = await fetch(url);
    const data = await res.json();
    const questions = data.results;

    form.innerHTML = ""; // Clear previous questions

    questions.forEach((questionData, index) => {
      const allAnswers = [
        ...questionData.incorrect_answers,
        questionData.correct_answer,
      ];
      // Shuffle answers
      allAnswers.sort(() => Math.random() - 0.5);

      const questionBlock = document.createElement("div");
      questionBlock.className = "question-block";
      questionBlock.innerHTML = `
        <p class="question">${index + 1}. ${decodeHTML(questionData.question)}</p>
        ${allAnswers
          .map(
            (answer) => `
          <label class="answer">
            <input type="radio" name="question-${index}" value="${decodeHTML(answer)}">
            ${decodeHTML(answer)}
          </label>
        `,
          )
          .join("")}
        <hr/>
      `;

      form.appendChild(questionBlock);
    });

    // Add a Submit button at the end of the form
    const submitBtn = document.createElement("button");
    submitBtn.textContent = "Submit Answers";
    submitBtn.className = "btn-submit";
    submitBtn.type = "button";
    submitBtn.addEventListener("click", () => checkAnswers(questions, formId));
    form.appendChild(submitBtn);
  } catch (error) {
    console.error("Error fetching trivia:", error);
    form.innerHTML = "<p>Failed to load questions. Please try again later.</p>";
  }
}

// Functions for each category
function getGeneralKnowledge() {
  getTriviaQuestions(9, "general-knowledge-form");
}

function getHistory() {
  getTriviaQuestions(23, "history-form");
}

function getGeography() {
  getTriviaQuestions(22, "geography-form");
}

function getBible() {
  getTriviaQuestions(20, "geography-form");
}

function getTV() {
  getTriviaQuestions(14, "geography-form");
}

function getMovie() {
  getTriviaQuestions(11, "geography-form");
}

// Check submitted answers
function checkAnswers(questions, formId) {
  const form = document.getElementById(formId);
  let score = 0;

  questions.forEach((q, index) => {
    const selected = form.querySelector(
      `input[name="question${index}"]:checked`,
    );
    const selectedAnswer = selected ? selected.value : null;
    const correctAnswer = decodeHTML(q.correct_answer);

    if (selectedAnswer === correctAnswer) {
      score++;
    }
  });

  const result = document.createElement("p");
  result.className = "score";
  result.innerHTML = `<strong>You scored ${score} out of ${questions.length}</strong>`;
  form.appendChild(result);
}
