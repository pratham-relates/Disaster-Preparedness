const allQuizData = [
  {
    question: "What is the first step you should take when a cyclone watch is issued?",
    options: ["Go to the beach", "Board up all windows and doors", "Monitor local news and weather reports", "Start driving to a different city"],
    answer: "Monitor local news and weather reports"
  },
  {
    question: "What should you do to your windows during a cyclone?",
    options: ["Open them to let the pressure equalize", "Seal them with tape", "Board them up with plywood or storm shutters", "Leave them as they are"],
    answer: "Board them up with plywood or storm shutters"
  },
  {
    question: "What essential supply should you store for at least 3-5 days?",
    options: ["Soda and juice", "Bottled water", "Fresh vegetables", "Ice cream"],
    answer: "Bottled water"
  },
  {
    question: "Why is it important to have a battery-powered radio during a cyclone?",
    options: ["To listen to music", "To receive emergency broadcasts if power goes out", "To play games", "To contact friends"],
    answer: "To receive emergency broadcasts if power goes out"
  },
  {
    question: "What should you do with outdoor furniture and loose items before a cyclone?",
    options: ["Leave them in the yard", "Tie them down or bring them inside", "Cover them with a tarp", "Move them to the roof"],
    answer: "Tie them down or bring them inside"
  },
  {
    question: "Where is the safest place to shelter during a cyclone?",
    options: ["In a car", "In a basement or interior room away from windows", "On the top floor of a building", "Near a large tree"],
    answer: "In a basement or interior room away from windows"
  },
  {
    question: "What is the 'eye' of a cyclone?",
    options: ["The strongest part of the storm", "A calm, clear area in the center", "The outer edge of the storm", "The area with the most rainfall"],
    answer: "A calm, clear area in the center"
  },
  {
    question: "What should you do if the eye of a cyclone passes over you?",
    options: ["Go outside and check for damage", "Assume the storm is over and relax", "Use the brief calm to prepare for the return of strong winds", "Start driving to a safer location"],
    answer: "Use the brief calm to prepare for the return of strong winds"
  },
  {
    question: "What is the main danger associated with a storm surge?",
    options: ["High winds", "Heavy rain", "Rising ocean water that floods coastal areas", "Hail"],
    answer: "Rising ocean water that floods coastal areas"
  },
  {
    question: "What should you turn off before a cyclone hits?",
    options: ["Your computer", "All electronic devices", "Water supply, gas, and electricity", "The air conditioning"],
    answer: "Water supply, gas, and electricity"
  },
  {
    question: "What is a 'Cyclone Warning'?",
    options: ["A cyclone might form in a few days", "A cyclone is expected to hit your area within 24 hours", "A cyclone has already passed", "A cyclone is far away and not a threat"],
    answer: "A cyclone is expected to hit your area within 24 hours"
  },
  {
    question: "What is the purpose of an emergency plan?",
    options: ["To find a new hobby", "To know what to do before, during, and after an emergency", "To store old documents", "To entertain yourself during a storm"],
    answer: "To know what to do before, during, and after an emergency"
  },
  {
    question: "Why should you avoid using your landline phone during a cyclone?",
    options: ["The lines might be busy", "It will attract lightning", "The phone won't work", "It is not an emergency phone"],
    answer: "It will attract lightning"
  },
  {
    question: "Which of these should be in your emergency kit?",
    options: ["A television", "A battery-powered flashlight", "Your favorite video games", "Expensive jewelry"],
    answer: "A battery-powered flashlight"
  },
  {
    question: "What should you do with important documents during a cyclone?",
    options: ["Leave them on a table", "Put them in a waterproof bag or container", "Bury them in the backyard", "Burn them for warmth"],
    answer: "Put them in a waterproof bag or container"
  },
  {
    question: "How can you protect your car during a cyclone?",
    options: ["Park it near a large tree", "Drive it around constantly", "Park it in a garage or away from trees", "Leave it unlocked"],
    answer: "Park it in a garage or away from trees"
  },
  {
    question: "What should you do with your pets during a cyclone?",
    options: ["Let them outside to find shelter", "Take them to a safe shelter with you", "Leave them behind with food and water", "Tie them to a tree"],
    answer: "Take them to a safe shelter with you"
  },
  {
    question: "What is the 'cone of uncertainty' in a cyclone forecast?",
    options: ["The exact path the cyclone will take", "The area where the storm might track", "The area of the strongest winds", "The area with no wind"],
    answer: "The area where the storm might track"
  },
  {
    question: "What should you do if a 'Do Not Travel' order is issued?",
    options: ["Start traveling immediately", "Avoid all non-essential travel", "Only travel on main roads", "Take public transportation"],
    answer: "Avoid all non-essential travel"
  },
  {
    question: "After a cyclone has passed, what is one of the first things you should check for?",
    options: ["The temperature outside", "Damage to your property and downed power lines", "Your internet connection", "The mail"],
    answer: "Damage to your property and downed power lines"
  },
];

let quizData = [];
const quizLength = 5;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const submitButton = document.getElementById("submit");
const quiz = document.getElementById("quiz");

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

function getRandomQuestions(data, num) {
  const shuffled = [...data].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}

function showQuestion() {
  const question = quizData[currentQuestion];
  questionElement.innerText = question.question;
  optionsElement.innerHTML = "";
  
  question.options.forEach(option => {
    const button = document.createElement("button");
    button.innerText = option;
    optionsElement.appendChild(button);
    button.classList.add("option-btn");
  });
  
  const optionButtons = document.querySelectorAll('.option-btn');
  optionButtons.forEach(button => {
    button.addEventListener("click", () => {
      optionButtons.forEach(btn => btn.classList.remove('selected'));
      button.classList.add('selected');
      selectedAnswer = button.innerText;
    });
  });
  
  submitButton.style.display = 'block';
}

submitButton.addEventListener('click', () => {
    if (selectedAnswer !== null) {
        if (selectedAnswer === quizData[currentQuestion].answer) {
            score++;
        }

        currentQuestion++;
        selectedAnswer = null;

        if (currentQuestion < quizData.length) {
            showQuestion();
        } else {
            showResult();
        }
    } else {
        alert("Please select an answer!");
    }
});

function showResult() {
  submitButton.style.display = 'none';

  quiz.innerHTML = `
    <h1>Quiz Completed!</h1>
    <p>Your final score is: ${score} out of ${quizData.length}</p>
    <p>Thank you for participating!</p>
  `;
}

// Initial setup to run on page load
quizData = getRandomQuestions(allQuizData, quizLength);
showQuestion();