const allQuizData = [
  {
    question: "What is the primary action to take if you suspect a landslide is about to happen?",
    options: ["Run uphill as fast as you can", "Evacuate immediately to a safe area", "Try to stop the moving debris", "Take photos of the slope"],
    answer: "Evacuate immediately to a safe area"
  },
  {
    question: "What is a major natural cause of landslides?",
    options: ["Long periods of no rain", "Heavy rainfall or rapid snowmelt", "Very cold temperatures", "Mild sunny weather"],
    answer: "Heavy rainfall or rapid snowmelt"
  },
  {
    question: "What is a 'debris flow'?",
    options: ["A slow-moving landslide of dry rocks", "A rapid flow of soil, rock, and water", "A small earth tremor", "A type of forest fire"],
    answer: "A rapid flow of soil, rock, and water"
  },
  {
    question: "What is a common sign that a landslide might occur?",
    options: ["New cracks in the ground or pavement", "A change in the color of the soil", "More birds nesting in trees", "A drop in local temperature"],
    answer: "New cracks in the ground or pavement"
  },
  {
    question: "What should you do if you hear a rumbling sound or see the ground moving?",
    options: ["Call the emergency services before doing anything else", "Immediately run to the nearest building", "Move away from the potential landslide path as quickly as possible", "Stay where you are and wait"],
    answer: "Move away from the potential landslide path as quickly as possible"
  },
  {
    question: "What human activity can increase the risk of landslides?",
    options: ["Planting native trees on a slope", "Building on steep slopes without proper engineering", "Using public transportation", "Recycling household waste"],
    answer: "Building on steep slopes without proper engineering"
  },
  {
    question: "How can a landslide affect a river?",
    options: ["It can make the river wider", "It can make the river flow faster", "It can block the river, creating a new dam", "It has no effect on a river"],
    answer: "It can block the river, creating a new dam"
  },
  {
    question: "What should you do if you are driving and encounter a landslide on the road?",
    options: ["Drive through the debris", "Stop your car and walk away from it", "Turn around and drive to a safer location", "Honk your horn until the debris clears"],
    answer: "Turn around and drive to a safer location"
  },
  {
    question: "Why are areas with steep slopes more prone to landslides?",
    options: ["Because of stronger winds", "Because of the greater pull of gravity", "Because the soil is always wet", "Because there are more rocks"],
    answer: "Because of the greater pull of gravity"
  },
  {
    question: "What should you do with your pets during a landslide warning?",
    options: ["Leave them behind with food and water", "Tie them to a tree", "Take them with you to the safe area", "Let them run free"],
    answer: "Take them with you to the safe area"
  },
  {
    question: "What should you do after a landslide has occurred?",
    options: ["Go back home immediately to check for damage", "Help dig out neighbors who may be trapped", "Stay away from the slide area due to the risk of more slides", "Start clearing the debris from the road"],
    answer: "Stay away from the slide area due to the risk of more slides"
  },
  {
    question: "What is a major risk of a landslide occurring near a volcano?",
    options: ["The landslide will make the volcano erupt", "The landslide can turn into a lahar, a dangerous volcanic mudflow", "The landslide will cause a forest fire", "The landslide will change the volcano's shape"],
    answer: "The landslide can turn into a lahar, a dangerous volcanic mudflow"
  },
  {
    question: "What is an important part of a family emergency plan for landslides?",
    options: ["A list of favorite restaurants", "A designated meeting place and escape routes", "A schedule for doing chores", "A list of movies to watch"],
    answer: "A designated meeting place and escape routes"
  },
  {
    question: "How can vegetation on a slope help prevent landslides?",
    options: ["By making the slope look nicer", "By attracting wildlife", "By their roots holding the soil together", "By providing shade"],
    answer: "By their roots holding the soil together"
  },
  {
    question: "Which of these is a tell-tale sign of an active landslide?",
    options: ["Leaning telephone poles or fence posts", "New flowers blooming on the hillside", "More sunlight reaching the ground", "Increased animal activity"],
    answer: "Leaning telephone poles or fence posts"
  },
  {
    question: "What should you do if you are in a building during a landslide?",
    options: ["Run outside as fast as possible", "Stay inside and shelter under a sturdy piece of furniture", "Run to the basement", "Shout for help from a window"],
    answer: "Stay inside and shelter under a sturdy piece of furniture"
  },
  {
    question: "What can you do to secure your home in a landslide-prone area?",
    options: ["Leave your doors and windows unlocked", "Install a security system", "Avoid building near steep slopes or drainage channels", "Paint the house a different color"],
    answer: "Avoid building near steep slopes or drainage channels"
  },
  {
    question: "What is the best way to monitor landslide warnings?",
    options: ["Only rely on social media", "Monitor official local news, weather radio, and government websites", "Ask your friends for updates", "Watch a movie and wait for a sign"],
    answer: "Monitor official local news, weather radio, and government websites"
  },
  {
    question: "What should you do if you see a sudden increase in the flow of a creek?",
    options: ["Go and see what's happening", "Move to higher ground immediately", "Throw a rock in to check the depth", "Assume it's just heavy rain"],
    answer: "Move to higher ground immediately"
  },
  {
    question: "Why is it important to have a first-aid kit ready for a landslide?",
    options: ["To treat injuries sustained from the event", "To use as a pillow", "To share with others", "To look for treasure"],
    answer: "To treat injuries sustained from the event"
  }
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