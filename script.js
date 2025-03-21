// Add JS here
document.addEventListener('DOMContentLoaded', function() {
    const scenarioTitleElement = document.querySelector('.scenario-page-container h1');
    const situationElement = document.getElementById('situation');
    const decisionPointsElement = document.getElementById('decision-points');
    const feedbackAreaElement = document.getElementById('feedback-text');
    const nextButton = document.getElementById('next-button');
    const scenarioContentElement = document.getElementById('scenario-content'); // Get the main content area

    // Scenario Data for Small Kitchen Grease Fire
    const greaseFireScenario = {
        title: "Small Kitchen Grease Fire",
        situation: "You are working in the hotel kitchen and notice flames erupting from a pan on the stove.",
        currentStage: 0, // Keep track of the current stage
        stages: [
            {
                text: "What do you do FIRST?",
                choices: [
                    { text: "Throw water on the fire.", value: "water", consequence: "Fire flares up, worsens.", feedback: "Incorrect. Water will make a grease fire worse! Grease and water don't mix and can spread the fire. Grease fires are Class B fires.", nextStage: "failure_spreads" },
                    { text: "Grab a fire extinguisher.", value: "extinguisher", consequence: "Scenario progresses to extinguisher choice.", feedback: "Correct! A fire extinguisher is the right tool. Now, which type of extinguisher?", nextStage: 1 } // Move to the next stage (index 1)
                ]
            },
            {
                text: "Which type of fire extinguisher do you use?",
                choices: [
                    { text: "Water extinguisher.", value: "water_extinguisher", consequence: "Fire likely to reignite.", feedback: "Incorrect. Water extinguishers are not effective on grease fires (Class B). They are for Class A fires (paper, wood, etc.).", nextStage: "failure_wrong_extinguisher" },
                    { text: "Class B (or ABC) extinguisher.", value: "class_b_abc", consequence: "Fire suppressed.", feedback: "Correct! A Class B (or ABC) extinguisher is designed for grease and flammable liquid fires. Aim at the base of the flames and use a sweeping motion.", nextStage: "success" }
                ]
            },
            {
                id: "failure_spreads",
                text: "The fire quickly spreads, engulfing the stovetop and reaching the overhead exhaust. Smoke fills the kitchen.",
                choices:[],
                feedback: "This was the wrong approach. The fire has escalated. Scenario: Failure - Fire Spreads."
            },
            {
                id: "failure_wrong_extinguisher",
                text: "You spray the fire with the water extinguisher, but the flames briefly subside and then reignite. The grease continues to burn.",
                choices:[],
                feedback: "Using the wrong extinguisher made the situation worse. Scenario: Failure - Wrong Extinguisher."
            },
            {
                id: "success",
                text: "You aim the Class B extinguisher at the base of the flames and use a sweeping motion. The fire is quickly extinguished.",
                choices:[],
                feedback: "Congratulations! You correctly responded to the grease fire. Scenario: Success - Fire Contained."
            }
        ]
    };

// Function to display the current stage of the scenario
        function displayStage(stageIndex) {
            const stageData = greaseFireScenario.stages[stageIndex];
            situationElement.textContent = stageData.text || "";
            decisionPointsElement.innerHTML = ""; // Clear previous buttons
            feedbackAreaElement.textContent = ""; // Clear previous feedback
            nextButton.style.display = 'none'; // Hide next button initially
    
            if (stageData.choices && stageData.choices.length > 0) {
                stageData.choices.forEach(choice => {
                    const button = document.createElement('button');
                    button.textContent = choice.text;
                    button.classList.add('choice-button'); // Add a class for potential styling
                    button.addEventListener('click', function() {
                        feedbackAreaElement.textContent = choice.feedback;
                        // Handle progression based on the choice
                        if (choice.nextStage !== undefined) {
                            if (typeof choice.nextStage === 'number') {
                                greaseFireScenario.currentStage = choice.nextStage;
                                displayStage(greaseFireScenario.currentStage);
                            } else if (typeof choice.nextStage === 'string') {
                                // Handle failure or success stages by ID
                                const nextStageData = greaseFireScenario.stages.find(stage => stage.id === choice.nextStage);
                                if (nextStageData) {
                                    situationElement.textContent = nextStageData.text;
                                    feedbackAreaElement.textContent = nextStageData.feedback;
                                    decisionPointsElement.innerHTML = ""; // Clear buttons
                                    // Add Restart Button for failure stages
                                    if (choice.nextStage === 'failure_spreads' || choice.nextStage === 'failure_wrong_extinguisher') {
                                        addRestartButton();
                                    }
                                } else if (choice.nextStage === 'success') {
                                    // Handle success stage
                                    situationElement.textContent = nextStageData.text;
                                    feedbackAreaElement.textContent = nextStageData.feedback;
                                    decisionPointsElement.innerHTML = ""; // Clear buttons
                                    addBackButton(); // Add Back Button on success
                                }
                            }
                        } else {
                            // Potentially show a "Next" button
                            nextButton.style.display = 'block';
                        }
                    });
                    decisionPointsElement.appendChild(button);
                });
            } else if (stageData.id === 'failure_spreads' || stageData.id === 'failure_wrong_extinguisher') {
                // Add Restart Button if directly reaching failure stage
                addRestartButton();
            } else if (stageData.id === 'success') {
                addBackButton(); // Add Back Button if directly reaching success stage
            } else {
                // If no choices and not a specific end stage
                scenarioContentElement.classList.add('scenario-ended');
            }
        }
    
        // Function to add the Restart Button
        function addRestartButton() {
            const restartButton = document.createElement('button');
            restartButton.textContent = 'Restart Scenario';
            restartButton.classList.add('restart-button'); // Add a class for styling
            restartButton.addEventListener('click', function() {
                greaseFireScenario.currentStage = 0; // Reset to the first stage
                displayStage(greaseFireScenario.currentStage); // Redisplay the first stage
                scenarioContentElement.classList.remove('scenario-ended'); // Remove any end class
            });
            decisionPointsElement.appendChild(restartButton);
        }
    
             // Function to add the Back to Scenarios Button
    function addBackButton() {
        const backButton = document.createElement('button');
        backButton.textContent = 'Back to Scenarios';
        backButton.classList.add('back-button'); // Add a class for styling
        backButton.addEventListener('click', function() {
            window.history.back(); // Navigate back to the previous page
        });
        decisionPointsElement.appendChild(backButton);
    }
        // Check if we are on the Grease Fire Scenario page
        if (scenarioTitleElement && scenarioTitleElement.textContent.includes("Small Kitchen Grease Fire")) {
            // Load the initial situation and first decision
            scenarioTitleElement.textContent = greaseFireScenario.title;
            situationElement.textContent = greaseFireScenario.situation;
            displayStage(greaseFireScenario.currentStage); // Start at the first stage (index 0)
        }
    });