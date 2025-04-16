let questions = [];

fetch("questions.json")
  .then(response => response.json())
  .then(data => {
    questions = data;
    displayQuestions(questions);
  });

function searchQuestions() {
  const keyword = document.getElementById("searchInput").value.toLowerCase();
  const filtered = questions.filter(q =>
    q.question.toLowerCase().includes(keyword)
  );
  displayQuestions(filtered);
}

function displayQuestions(data) {
  const results = document.getElementById("results");
  results.innerHTML = "";

  if (data.length === 0) {
    results.innerHTML = "<p>找不到相關題目。</p>";
    return;
  }

  data.forEach((q, index) => {
    const div = document.createElement("div");
    div.className = "question";

    let optionsHTML = "";
    for (const key in q.options) {
      optionsHTML += `<div>${key}. ${q.options[key]}</div>`;
    }

    div.innerHTML = `
      <strong>題目 ${index + 1}：</strong> ${q.question}
      <div>${optionsHTML}</div>
      <div class="answer">正確答案：${q.answer.join(", ")}</div>
    `;

    results.appendChild(div);
  });
}
