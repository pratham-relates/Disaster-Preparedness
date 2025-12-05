const allQuizData = [
  {
    question: "What is the first thing you should do if you discover a wildfire nearby?",
    options: ["Try to extinguish it yourself", "Call emergency services immediately", "Take photos or videos", "Warn your neighbors by shouting"],
    answer: "Call emergency services immediately"
  },
  {
    question: "What should you do to create a defensible space around your home?",
    options: ["Plant more trees and bushes close to the house", "Stack firewood against the house", "Clear flammable materials away from the house", "Store gasoline cans in the garage"],
    answer: "Clear flammable materials away from the house"
  },
  {
    question: "If a fire breaks out in your home, what is the first thing you should do?",
    options: ["Grab your valuables", "Run to the basement", "Alert everyone and get out immediately", "Open windows and doors to let the smoke out"],
    answer: "Alert everyone and get out immediately"
  },
  {
    question: "What is the proper way to exit a smoke-filled room?",
    options: ["Stand up and run quickly", "Crawl low to the ground", "Walk backward with a wet cloth", "Hold your breath and run"],
    answer: "Crawl low to the ground"
  },
  {
    question: "What should you do if your clothes catch on fire?",
    options: ["Run to find water", "Wave your arms to put it out", "Stop, Drop, and Roll", "Take off your clothes"],
    answer: "Stop, Drop, and Roll"
  },
  {
    question: "How often should you test your smoke alarms?",
    options: ["Once a year", "Every six months", "Once a month", "Only when they start beeping"],
    answer: "Once a month"
  },
  {
    question: "What is a good way to stay informed about a wildfire in your area?",
    options: ["Listen to local news and emergency broadcasts", "Check social media for rumors", "Ask a neighbor for information", "Wait for someone to knock on your door"],
    answer: "Listen to local news and emergency broadcasts"
  },
  {
    question: "What should you do if you are trapped in a building during a fire?",
    options: ["Open the window for fresh air", "Hide in a closet", "Stay low, seal the door, and signal for help", "Try to find the fire source"],
    answer: "Stay low, seal the door, and signal for help"
  },
  {
    question: "What is the purpose of a fire extinguisher?",
    options: ["To put out all types of fires", "To be used only by professionals", "To control or extinguish small, manageable fires", "To make a loud noise to alert others"],
    answer: "To control or extinguish small, manageable fires"
  },
  {
    question: "What should you do after evacuating a burning building?",
    options: ["Go back to get your belongings", "Stand in front of the building", "Go to a designated meeting place", "Call the fire department again"],
    answer: "Go to a designated meeting place"
  },
  {
    question: "What should you include in a family emergency plan?",
    options: ["A list of favorite foods", "A meeting place and an escape route", "A schedule for daily chores", "A list of movies to watch"],
    answer: "A meeting place and an escape route"
  },
  {
    question: "Where should you never hide from a fire?",
    options: ["In a closet or under a bed", "Near a window", "Behind a locked door", "In the basement"],
    answer: "In a closet or under a bed"
  },
  {
    question: "When should you replace the batteries in your smoke alarms?",
    options: ["Every year", "Every two years", "Every five years", "Only when the alarm beeps"],
    answer: "Every year"
  },
  {
    question: "What is a fire break?",
    options: ["A tool used by firefighters", "A natural or man-made barrier used to stop fires", "A type of wildfire", "A chemical to put out fires"],
    answer: "A natural or man-made barrier used to stop fires"
  },
  {
    question: "What should you check before opening a door in a fire?",
    options: ["If it's unlocked", "If the door handle is hot", "If you can hear anything behind it", "If the door is made of wood"],
    answer: "If the door handle is hot"
  },
  {
    question: "Why is it important to have an escape plan for your home?",
    options: ["To know where the best hiding spots are", "To quickly and safely exit in an emergency", "To find the best view of the fire", "To test how fast you can run"],
    answer: "To quickly and safely exit in an emergency"
  },
  {
    question: "What is the last thing you should do upon exiting a burning building?",
    options: ["Call 911", "Leave the door open for others", "Close the door behind you to slow the spread of the fire", "Break a window to alert others"],
    answer: "Close the door behind you to slow the spread of the fire"
  },
  {
    question: "What is a major cause of building fires?",
    options: ["Leaving lights on", "Unattended cooking", "Using a fan", "Having a plant indoors"],
    answer: "Unattended cooking"
  },
  {
    question: "What is the most effective way to alert your family to a fire at night?",
    options: ["Shouting their names", "A loud and working smoke alarm", "Turning on the lights", "Banging on their door"],
    answer: "A loud and working smoke alarm"
  },
  {
    question: "If you are caught in a wildfire while outdoors, what should you do?",
    options: ["Run away from the fire into thick forest", "Seek shelter in a cave", "Find a body of water or an open area", "Try to outrun the fire"],
    answer: "Find a body of water or an open area"
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