document.addEventListener('DOMContentLoaded', () => {
    // --- DOM ELEMENTS ---
    const trustBar = document.getElementById('trust-bar');
    const preparednessBar = document.getElementById('preparedness-bar');
    const safetyBar = document.getElementById('safety-bar');
    const scenarioImage = document.getElementById('scenario-image');
    const scenarioText = document.getElementById('scenario-text');
    const choicesContainer = document.getElementById('choices-container');
    const startScreen = document.getElementById('start-screen');
    const endScreen = document.getElementById('end-screen');
    const startButton = document.getElementById('start-button');
    const restartButton = document.getElementById('restart-button');
    const endMessage = document.getElementById('end-message');

    // --- GAME STATE ---
    let stats = {
        trust: 50,
        preparedness: 20,
        safety: 50
    };
    let currentScenarioId = 'start';

    // --- STORY DATA ---
    // This is where the entire game's narrative is stored.
    // You can add more scenarios and choices here.
    const story = {
        'start': {
            image: 'https://imgs.search.brave.com/uDNPiOgaMPoHUmZCwVeF2cG847sWP68liLO0smFBISc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNTI5/ODM3NjcyL3Bob3Rv/L2h1cnJpY2FuZS1h/bG9uZy1jb2FzdGxp/bmUuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPTBLYVc2ajVr/ZVhaOUR2d1dfUkNG/OHR0RTZWdEw2LTJ0/WU9qSDBlSTJ2Smc9',
            text: "The IMD has issued a 'yellow' alert for your coastal village. The sky is still clear, but the warning is official. The fishermen want to go for one last catch before the weather turns.",
            choices: [
                { text: "Forbid them from going to sea.", effects: { trust: -10, preparedness: +10, safety: +15 }, nextScenarioId: 'rumor' },
                { text: "Allow them, but urge caution.", effects: { trust: +10, preparedness: -5, safety: -15 }, nextScenarioId: 'rumor' },
                { text: "Tell them to check their equipment first.", effects: { trust: +5, preparedness: +5, safety: 0 }, nextScenarioId: 'rumor' }
            ]
        },
        'rumor': {
            image: 'https://imgs.search.brave.com/JRaBvQT2Z4aoEde_ioyLGdRcuJ-Mo0DEYqo8z4xnx0U/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9nb3Nz/aXAtY2FydG9vbi1k/b29kbGUtdmVjdG9y/LWJ1bGx5aW5nLWNv/bmNlcHQtMTcxNDQ5/MjgxLmpwZw',
            text: "A message spreads on WhatsApp: 'The cyclone has changed course! We are safe.' People are becoming relaxed.",
            choices: [
                { text: "Make a public announcement to ignore the rumor.", effects: { trust: +5, preparedness: +15, safety: +10 }, nextScenarioId: 'shelter' },
                { text: "Ignore it. It will pass.", effects: { trust: -10, preparedness: -20, safety: -10 }, nextScenarioId: 'shelter' },
                { text: "Find who started it and publicly scold them.", effects: { trust: -15, preparedness: +5, safety: +5 }, nextScenarioId: 'shelter' }
            ]
        },
        'shelter': {
            image: 'https://imgs.search.brave.com/h4VsdHGSsYNFQrEcK_fPOgXFA79PxKFsPDphl811zqQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc3F1YXJlc3Bh/Y2UtY2RuLmNvbS9j/b250ZW50L3YxLzU1/NjVmOWI1ZTRiMDc5/YjVlMDFhN2I3OS8x/NDQ3Njg0MTkxOTIy/LUJJQjNTNUg2SFM3/TTRHSTk4SjNML2Z0/Mi5qcGc',
            text: "The alert is now 'red'. The district collector has ordered an evacuation to the main cyclone shelter, but some families refuse to leave their homes and belongings.",
            choices: [
                { text: "Force them to evacuate for their own good.", effects: { trust: -20, preparedness: +10, safety: +20 }, nextScenarioId: 'end' },
                { text: "Go personally to persuade them, explaining the risk.", effects: { trust: +15, preparedness: +5, safety: +15 }, nextScenarioId: 'end' },
                { text: "Leave them but ensure the rescue team knows their location.", effects: { trust: -5, preparedness: -10, safety: -5 }, nextScenarioId: 'end' }
            ]
        }
    };

    // --- GAME FUNCTIONS ---
    function startGame() {
        stats = { trust: 50, preparedness: 20, safety: 50 };
        currentScenarioId = 'start';
        startScreen.classList.add('hidden');
        endScreen.classList.add('hidden');
        updateMeters();
        displayScenario(currentScenarioId);
    }

    function displayScenario(id) {
        const scenario = story[id];
        if (!scenario) {
            return endGame();
        }
        scenarioImage.style.backgroundImage = `url('${scenario.image}')`;
        scenarioText.textContent = scenario.text;
        choicesContainer.innerHTML = ''; // Clear old choices

        scenario.choices.forEach(choice => {
            const button = document.createElement('button');
            button.classList.add('choice-button');
            button.textContent = choice.text;
            button.onclick = () => selectChoice(choice);
            choicesContainer.appendChild(button);
        });
    }

    function selectChoice(choice) {
        // Update stats
        stats.trust += choice.effects.trust || 0;
        stats.preparedness += choice.effects.preparedness || 0;
        stats.safety += choice.effects.safety || 0;

        // Clamp stats between 0 and 100
        stats.trust = Math.max(0, Math.min(100, stats.trust));
        stats.preparedness = Math.max(0, Math.min(100, stats.preparedness));
        stats.safety = Math.max(0, Math.min(100, stats.safety));

        updateMeters();
        currentScenarioId = choice.nextScenarioId;
        displayScenario(currentScenarioId);
    }

    function updateMeters() {
        trustBar.value = stats.trust;
        preparednessBar.value = stats.preparedness;
        safetyBar.value = stats.safety;
    }

    function endGame() {
        let finalMessage = "The cyclone has passed. ";
        const finalScore = Math.round((stats.trust + stats.preparedness + stats.safety) / 3);

        if (finalScore > 75) {
            finalMessage += "Thanks to your wise leadership, the village suffered minimal damage. The people trust you and feel safe.";
        } else if (finalScore > 40) {
            finalMessage += "It was a difficult storm, and some mistakes were made, but the village has survived. There is much to rebuild.";
        } else {
            finalMessage += "The village is in a state of disarray. Your decisions led to significant damage and loss of trust.";
        }
        endMessage.textContent = finalMessage;
        endScreen.classList.remove('hidden');
    }

    // --- EVENT LISTENERS ---
    startButton.addEventListener('click', startGame);
    restartButton.addEventListener('click', startGame);
});