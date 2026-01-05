const charactersWow = [
  {
    name: "Alleria",
    image: "images/Alleria.webp",
    options: ["Alleria", "Garona", "Valeera Sanguinar", "Mathias Shaw"],
  },
  {
    name: "Archimonde",
    image: "images/Archimonde.webp",
    options: ["Archimonde", "Garrosh", "Grom Hellscream", "Durotan"],
  },
  {
    name: "Arthas",
    image: "images/Arthas.webp",
    options: ["Arthas", "Uther", "Bolvar", "Tirion Fordring"],
  },
  {
    name: "Blackhand",
    image: "images/Blackhand.webp",
    options: ["Garrosh", "Thrall", "Grommash", "Blackhand"],
  },
  {
    name: "Brann Bronzebeard",
    image: "images/Brann.webp",
    options: ["Brann Bronzebeard", "Magni Bronzebeard", "Muradin", "Falstad"],
  },
  {
    name: "Broxigar",
    image: "images/Broxigar.webp",
    options: ["Gul'dan", "Ner'zhul", "Cho'gall", "Broxigar"],
  },
  {
    name: "Denathrius",
    image: "images/Denathrius.webp",
    options: ["Rexxar", "Rokhan", "Denathrius", "Chen Stormstout"],
  },
  {
    name: "Illidan",
    image: "images/Illidan.webp",
    options: ["Vashj", "Malfurion", "Kael'thas", "Illidan"],
  },
  {
    name: "Kiljaeden",
    image: "images/Kiljaeden.webp",
    options: ["Ragnaros", "Kiljaeden", "Majordomo", "Sulfuron"],
  },
  {
    name: "Malfurion",
    image: "images/Malfurion.webp",
    options: ["Illidan", "Cenarius", "Fandral","Malfurion"],
  },
  {
    name: "Malganis",
    image: "images/Malganis.webp",
    options: ["Malganis", "Archimonde", "Kil'jaeden", "Mannoroth"],
  },
  {
    name: "Malygos",
    image: "images/Malygos.webp",
    options: ["Sindragosa", "Malygos", "Kalecgos", "Ysera"],
  },
  {
    name: "Onyxia",
    image: "images/Onyxia.webp",
    options: ["Onyxia", "Ysera", "Nozdormu", "Malygos"],
  },
  {
    name: "Sindragosa",
    image: "images/Sindragosa.webp",
    options: ["Sindragosa", "Neltharion", "Onyxia", "Sinestra"],
  },
  {
    name: "Sylvanas",
    image: "images/Sylvanas.webp",
    options: ["Sylvanas", "Alleria", "Vereesa", "Nathanos"],
  },
  {
    name: "Thrall",
    image: "images/Thrall.webp",
    options: ["Thrall", "Drek'Thar", "Nobundo", "Rehgar"],
  },
  {
    name: "Tichondrius",
    image: "images/Tichondrius.webp",
    options: ["Tichondrius", "Vol'jin", "Rokhan", "Sen'jin"],
  },
  {
    name: "Varimathras",
    image: "images/Varimathras.webp",
    options: ["Varimathras", "Tyrande", "Shandris", "Naisha"],
  },
  {
    name: "Velen",
    image: "images/Velen.webp",
    options: ["Velen", "Lor'themar", "Rommath", "Anasterian"],
  },
  {
    name: "Voljin",
    image: "images/Voljin.webp",
    options: ["Voljin", "Cho'gall", "Teron'gor", "Ner'zhul"],
  },
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const charactersImages = document.getElementById("character-image");
const selectAnswer = document.getElementById("options");
const feedback = document.getElementById("feedback");
const nextButton = document.getElementById("next-button");
const showScore = document.getElementById("score");
const showTotalScore = document.getElementById("total");
const gameArea = document.getElementById("game-area");
const gameOver = document.getElementById("game-over");
const showFinalScore = document.getElementById("final-score");
const restartButton = document.getElementById("restart-button");

function loadQuestion() {
  answered = false;
  feedback.textContent = "";
  feedback.className = "feedback";
  nextButton.style.display = "none";

  const current = charactersWow[currentQuestion];
  charactersImages.src = current.image;

  selectAnswer.innerHTML = "";
  current.options.forEach((option) => {
    const btn = document.createElement("button");
    btn.className = "option-button";
    btn.textContent = option;
    btn.onclick = () => checkAnswer(option, btn);
    selectAnswer.appendChild(btn);
  });
  showTotalScore.textContent = charactersWow.length;
}

function checkAnswer(selected, btn) {
  if (answered) return;

  answered = true;
  const correct = charactersWow[currentQuestion].name;
  const allButtons = document.querySelectorAll(".option-button");

  allButtons.forEach((b) => (b.disabled = true));

  if (selected === correct) {
    score++;
    showScore.textContent = score;
    btn.classList.add("correct");
    feedback.textContent = "✓ Correct !";
    feedback.className = "feedback correct";
  } else {
    btn.classList.add("wrong");
    allButtons.forEach((b) => {
      if (b.textContent === correct) {
        b.classList.add("correct");
      }
    });
    feedback.textContent = `✗ Wrong! It was ${correct}`;
    feedback.className = "feedback wrong";
  }

  nextButton.style.display = "block";
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion >= charactersWow.length) {
    endGame();
  } else {
    loadQuestion();
  }
}

function endGame() {
  gameArea.style.display = "none";
  gameOver.style.display = "block";
  showFinalScore.textContent = `${score} / ${charactersWow.length}`;
}

function restartGame() {
  currentQuestion = 0;
  score = 0;
  showScore.textContent = 0;
  gameArea.style.display = "block";
  gameOver.style.display = "none";
  loadQuestion();
}

nextButton.onclick = nextQuestion;
restartButton.onclick = restartGame;

loadQuestion();
