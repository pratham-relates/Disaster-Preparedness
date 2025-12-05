const allQuizData = [
  {
    question: "What is the first thing you should do when a flood warning is issued?",
    options: ["Pack a suitcase", "Move to higher ground", "Stay home and wait", "Drive through flooded streets"],
    answer: "Move to higher ground"
  },
  {
    question: "What essential documents should you pack in a go-bag?",
    options: ["Movie tickets", "Photos", "Birth certificates and passports", "Old receipts"],
    answer: "Birth certificates and passports"
  },
  {
    question: "What is a major risk of using electrical appliances in a flooded area?",
    options: ["They will work better", "Risk of electrocution", "They will charge your phone faster", "Nothing will happen"],
    answer: "Risk of electrocution"
  },
  {
    question: "What should you turn off before evacuating your home?",
    options: ["The TV", "The lights", "Gas, electricity, and water", "The oven"],
    answer: "Gas, electricity, and water"
  },
  {
    question: "How can you protect important papers from floodwater?",
    options: ["Leave them on the floor", "Put them in a cardboard box", "Store them in a waterproof bag or container", "Bury them in the garden"],
    answer: "Store them in a waterproof bag or container"
  },
  {
    question: "Where should you never take shelter during a flood?",
    options: ["On the roof", "On a bridge", "In an attic without a means of exit", "On a boat"],
    answer: "In an attic without a means of exit"
  },
  {
    question: "What is a 'Go-Bag'?",
    options: ["A bag for a trip", "A survival kit with essentials", "A grocery bag", "A gym bag"],
    answer: "A survival kit with essentials"
  },
  {
    question: "How many days' worth of non-perishable food should be in your emergency kit?",
    options: ["One day", "Three to five days", "One week", "One month"],
    answer: "Three to five days"
  },
  {
    question: "Why should you avoid drinking tap water after a flood?",
    options: ["It tastes bad", "It may be contaminated", "It will make you sleepy", "It's too cold"],
    answer: "It may be contaminated"
  },
  {
    question: "What is the safest way to travel through floodwater?",
    options: ["Drive your car", "Swim across it", "Wade through it", "Avoid it and use higher ground"],
    answer: "Avoid it and use higher ground"
  },
  {
    question: "What should you do if you come across a live wire in floodwater?",
    options: ["Touch it to see if it's safe", "Push it away with a stick", "Stay away and report it immediately", "Take a photo of it"],
    answer: "Stay away and report it immediately"
  },
  {
    question: "What's an important item to have for communication during a flood?",
    options: ["A landline phone", "A battery-powered radio", "A megaphone", "A walkie-talkie"],
    answer: "A battery-powered radio"
  },
  {
    question: "Why is it important to have a first-aid kit in your emergency supplies?",
    options: ["To treat minor injuries", "To look for treasure", "To use as a pillow", "To share with others"],
    answer: "To treat minor injuries"
  },
  {
    question: "What is a safe way to check the depth of floodwater?",
    options: ["Walk through it with bare feet", "Use a stick or pole", "Jump in and see", "Throw a rock in"],
    answer: "Use a stick or pole"
  },
  {
    question: "What should you do with valuables you can't take with you?",
    options: ["Leave them on the floor", "Place them on a high shelf or upper floor", "Put them outside", "Bury them in a safe place"],
    answer: "Place them on a high shelf or upper floor"
  },
  {
    question: "What is one way to keep your family informed during a disaster?",
    options: ["Leave notes on the door", "Establish a family communication plan", "Use smoke signals", "Shout loudly"],
    answer: "Establish a family communication plan"
  },
  {
    question: "What type of footwear is best to wear during a flood?",
    options: ["Flip-flops", "High heels", "Sturdy, waterproof boots", "Barefoot"],
    answer: "Sturdy, waterproof boots"
  },
  {
    question: "Why is it crucial to listen to local authorities during a flood?",
    options: ["For entertainment", "For weather updates and evacuation orders", "To learn new facts", "To find out what's for dinner"],
    answer: "For weather updates and evacuation orders"
  },
  {
    question: "What should you do with perishable food in your fridge after a flood?",
    options: ["Eat it immediately", "Throw it away if it came into contact with floodwater", "Cook it and eat it", "Put it back in the fridge"],
    answer: "Throw it away if it came into contact with floodwater"
  },
  {
    question: "What is a good way to keep your pets safe during a flood?",
    options: ["Let them run free", "Take them with you to a safe location", "Leave them behind", "Give them a bath"],
    answer: "Take them with you to a safe location"
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

// The restartQuiz function and its associated call are now removed.

// Initial setup to run on page load
quizData = getRandomQuestions(allQuizData, quizLength);
showQuestion();
