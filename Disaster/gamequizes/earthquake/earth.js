const allQuizData = [
  {
    question: "What is the primary safety action during an earthquake?",
    options: ["Run outside", "Stand in a doorway", "Drop, Cover, and Hold On", "Hide under a bed"],
    answer: "Drop, Cover, and Hold On"
  },
  {
    question: "Where is the safest place to be during an earthquake if you're indoors?",
    options: ["Near a window", "Under a sturdy table or desk", "Next to a tall bookshelf", "In the kitchen"],
    answer: "Under a sturdy table or desk"
  },
  {
    question: "After an earthquake, what is the first utility you should check and possibly turn off?",
    options: ["Water", "Electricity", "Gas", "TV"],
    answer: "Gas"
  },
  {
    question: "What should you do if you are driving when an earthquake strikes?",
    options: ["Accelerate to get away", "Pull over to an open area and stop", "Drive under an overpass", "Keep driving home"],
    answer: "Pull over to an open area and stop"
  },
  {
    question: "What items should be included in an earthquake emergency kit?",
    options: ["A deck of cards and board games", "Snacks, a blanket, and a tent", "Food, water, flashlight, and first-aid supplies", "Makeup and hair products"],
    answer: "Food, water, flashlight, and first-aid supplies"
  },
  {
    question: "How long should your emergency food and water supply last for each person?",
    options: ["One day", "Three days", "A week", "A month"],
    answer: "Three days"
  },
  {
    question: "What should you do after the shaking stops?",
    options: ["Immediately go back to bed", "Go outside to see the damage", "Check for injuries and damage, then listen to emergency broadcasts", "Take a hot shower"],
    answer: "Check for injuries and damage, then listen to emergency broadcasts"
  },
  {
    question: "Where should you take shelter if you are outdoors during an earthquake?",
    options: ["Next to a tall building", "Under a tree", "In a wide, open area away from buildings and power lines", "Inside a car"],
    answer: "In a wide, open area away from buildings and power lines"
  },
  {
    question: "Why should you avoid using matches or lighters after an earthquake?",
    options: ["They are flammable", "They might not work", "To avoid a gas leak ignition", "They are for a power outage"],
    answer: "To avoid a gas leak ignition"
  },
  {
    question: "What is a major risk of running out of a building during an earthquake?",
    options: ["You will trip and fall", "You might be hit by falling debris", "The door might be locked", "The building might explode"],
    answer: "You might be hit by falling debris"
  },
  {
    question: "What should you do if you are in a high-rise building during an earthquake?",
    options: ["Run for the stairs", "Stay inside, away from windows and exterior walls", "Use the elevator", "Go to the roof"],
    answer: "Stay inside, away from windows and exterior walls"
  },
  {
    question: "What is an aftershock?",
    options: ["A small shake that comes before the main earthquake", "A larger earthquake that follows the main one", "A smaller earthquake that follows a main one", "A tremor that happens at sea"],
    answer: "A smaller earthquake that follows a main one"
  },
  {
    question: "Which of the following should you NOT do during an earthquake?",
    options: ["Get under a desk", "Stand near a window", "Cover your head", "Stay calm"],
    answer: "Stand near a window"
  },
  {
    question: "Why should you wear sturdy shoes after an earthquake?",
    options: ["To look good", "To protect your feet from broken glass and debris", "For traction", "To avoid getting cold feet"],
    answer: "To protect your feet from broken glass and debris"
  },
  {
    question: "What is a 'safe spot' in a room during an earthquake?",
    options: ["Next to a window", "Under a heavy object", "Under a sturdy table or against an interior wall", "Near a light fixture"],
    answer: "Under a sturdy table or against an interior wall"
  },
  {
    question: "How should you communicate with family after an earthquake?",
    options: ["Use text messages instead of phone calls", "Use only phone calls", "Use only social media", "Do not communicate at all"],
    answer: "Use text messages instead of phone calls"
  },
  {
    question: "Which of the following is an example of an emergency preparedness item?",
    options: ["Bottled water", "A power bank", "A flashlight", "All of the above"],
    answer: "All of the above"
  },
  {
    question: "What is a good way to secure heavy furniture like bookshelves before an earthquake?",
    options: ["Put it in the middle of the room", "Fill it with heavy books", "Anchor it to the wall", "Put a rug underneath it"],
    answer: "Anchor it to the wall"
  },
  {
    question: "What should you do if you are in a mountainous area during an earthquake?",
    options: ["Run uphill", "Watch for falling rocks and landslides", "Find a cave to hide in", "Shout for help"],
    answer: "Watch for falling rocks and landslides"
  },
  {
    question: "Why is it important to have an emergency meeting place for your family?",
    options: ["To play games", "To have a fun outing", "To regroup if separated during an emergency", "To store supplies"],
    answer: "To regroup if separated during an emergency"
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