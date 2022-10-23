/**
 * Author: Muhammad Zaryaab Shahbaz
 * Email: zariab64@gmail.com
 * Date: 10/14/22
 */
const myModal = new bootstrap.Modal(document.getElementById("modal"), {});

const markDanger = id => {
  const selectedOption = document.getElementById(`option-${id}`);
  selectedOption.classList.add("text-bg-danger");
};

const unMarkDanger = id => {
  const selectedOption = document.getElementById(`option-${id}`);
  selectedOption.classList.remove("text-bg-danger");
};

const markCorrect = id => {
  const selectedOption = document.getElementById(`option-${id}`);
  selectedOption.classList.add("correct");
};

const scrollToElement = (e, id) => {
  e.preventDefault();
  document.getElementById(id).scrollIntoView("smooth");
};

let currentQuestion = 0;
// contains questions and answers
const quiz = [
  {
    question: "What year was Train of Consequences released?",
    answers: ["1973", "1988", "1994", "1999"],
  },
  {
    question: "Which Megadeth album was the song included on?",
    answers: [
      "Rust in Peace",
      "Youthanasia",
      "Peace sells… But who’s buying?",
      "Risk",
    ],
  },
  {
    question: "Who is credited as the song’s writer?",
    answers: ["Dave Mustaine", "Kirk Hammet", "Johnny Nash", "Devin Townsend"],
  },
  {
    question:
      "What was the song’s peak positon on the US Mainstream Rock chart by Billboard magazine?",
    answers: ["1st", "2nd", "13th", "29th"],
  },
];
// contains correct answer to all the questions in the sequence
const guide = [2, 1, 0, 3];
const totalQuestions = guide.length;

const markAnswer = (selectedAnswer, e) => {
  e.target.blur();
  // quiz has been completed
  if (currentQuestion === -1) return;

  // in case of incorrect answer, mark this option as danger
  if (guide[currentQuestion] !== selectedAnswer) {
    unMarkDanger(1);
    unMarkDanger(2);
    unMarkDanger(3);
    unMarkDanger(4);
    markDanger(selectedAnswer + 1);
    return;
  }

  const option = document.getElementById(`option-${selectedAnswer + 1}`);
  option.classList.add("correct");

  currentQuestion++;
  const realIndex = currentQuestion + 1;
  // move train
  const panelWidth = document.getElementById("train-block").clientWidth;
  const trainWidth = document.getElementById("train").clientWidth;
  const totalWidth = panelWidth - trainWidth;
  // calculat left offset
  const left = (totalWidth / totalQuestions) * currentQuestion;
  document.getElementById("train").style.left = `${left}px`;

  // correct answer
  if (currentQuestion === totalQuestions) {
    const flag = document.getElementById("flag");
    flag.innerText = atob(flag.innerText);
    // this is the last question | display a flag with a delay
    setTimeout(() => {
      myModal.toggle();
      currentQuestion = -1;
    }, 500);
    return;
  }

  // update colors of each button to light text-bg-light <=> text-bg-danger
  unMarkDanger(1);
  unMarkDanger(2);
  unMarkDanger(3);
  unMarkDanger(4);

  setTimeout(() => {
    option.classList.remove("correct");
    // update question and answers
    const question = quiz[currentQuestion];
    let i = 0;
    document.getElementById("question-number").innerText = realIndex;
    document.getElementById("question").innerText = question.question;

    //populate options
    document.getElementById(`option-${i + 1}`).innerText =
      question.answers[i++];
    document.getElementById(`option-${i + 1}`).innerText =
      question.answers[i++];
    document.getElementById(`option-${i + 1}`).innerText =
      question.answers[i++];
    document.getElementById(`option-${i + 1}`).innerText =
      question.answers[i++];
  }, 500);

  return;
};
