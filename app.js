// Decode HTML entities
function decodeHTML(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

// Fetch and display random trivia questions
async function getRandomTrivia() {
  const url = "https://opentdb.com/api.php?amount=5&type=multiple";
  const form = document.getElementById("quiz-form");
  form.innerHTML = "";

  try {
    const res = await fetch(url);
    const data = await res.json();
    const questions = data.results;

    questions.forEach((questionData, index) => {
      const allAnswers = [
        ...questionData.incorrect_answers,
        questionData.correct_answer,
      ];
      allAnswers.sort(() => Math.random() - 0.5); // Shuffle

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
      `;

      form.appendChild(questionBlock);
    });

    const submitBtn = document.createElement("button");
    submitBtn.textContent = "Submit Answers";
    submitBtn.className = "btn-submit";
    submitBtn.type = "button";
    submitBtn.addEventListener("click", () => checkAnswers(questions));
    form.appendChild(submitBtn);
  } catch (error) {
    console.error("Failed to load trivia questions:", error);
    form.innerHTML = "<p>Something went wrong. Please try again.</p>";
  }
}

// Evaluate answers
function checkAnswers(questions) {
  const form = document.getElementById("quiz-form");
  let score = 0;

  questions.forEach((q, index) => {
    const selected = form.querySelector(
      `input[name="question-${index}"]:checked`,
    );
    const selectedAnswer = selected ? selected.value : null;
    const correctAnswer = decodeHTML(q.correct_answer);

    if (selectedAnswer === correctAnswer) {
      score++;
    }
  });

  const result = document.createElement("p");
  result.className = "score";
  result.innerHTML = `🎉 You scored <strong>${score}</strong> out of <strong>${questions.length}</strong>`;
  form.appendChild(result);
}

// Set up button listener
document.getElementById("start-btn").addEventListener("click", getRandomTrivia);
