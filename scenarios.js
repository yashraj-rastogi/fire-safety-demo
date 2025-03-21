document.addEventListener('DOMContentLoaded', function() { // Run script after DOM is fully loaded
    const scenarioListContainer = document.getElementById('scenario-list-container');

    // Sample Scenario Data (Replace with your actual scenario data!)
    const scenariosData = {
        "All Scenarios": [
            { title: "Guest Room - Electrical Overload", location: "Guest Room", link: "scenario1.html" }, // Link to actual scenario page (create later)
            { title: "Kitchen - Grease Fire", location: "Kitchen", link: "scenario2.html" },
            { title: "Lobby - Waste Bin Fire", location: "Lobby/Reception", link: "scenario3.html" },
            { title: "Hallway - Obstructed Exit", location: "Hallway/Corridor", link: "scenario4.html" },
            { title: "Guest Room - Hair Dryer Fire", location: "Guest Room", link: "scenario5.html" },
            { title: "Kitchen - Oven Fire", location: "Kitchen", link: "scenario6.html" },
            { title: "Kitchen - Gas leak", location: "Kitchen", link: "scenario7.html" },
            { title: "Kitchen - Gas leak", location: "Kitchen", link: "scenario7.html" },
            { title: "Kitchen - Deep fryer fire", location: "Kitchen", link: "scenario8.html" },
            { title: "Hallway - Smoke detector fire", location: "Hallway/Corridor", link: "scenario9.html" },
            { title: "Guest Room - Carelessly discarded cigarette", location: "Guest Room", link: "scenario10.html" }
            // ... add more scenarios ...
            // ... add more scenarios ...
        ],
        "Guest Room Scenarios": [
            { title: "Guest Room - Electrical Overload", location: "Guest Room", link: "scenario1.html" },
            { title: "Guest Room - Hair Dryer Fire", location: "Guest Room", link: "scenario5.html" },
            { title: "Guest Room - Carelessly discarded cigarette", location: "Guest Room", link: "scenario10.html" }
        ],
        "Kitchen Scenarios": [
            { title: "Kitchen - Grease Fire", location: "Kitchen", link: "scenario2.html" },
            { title: "Kitchen - Oven Fire", location: "Kitchen", link: "scenario6.html" }, { title: "Kitchen - Gas leak", location: "Kitchen", link: "scenario7.html" }, { title: "Kitchen - Deep fryer fire", location: "Kitchen", link: "scenario8.html" }
        ],
        "Lobby/Reception Scenarios": [
            { title: "Lobby - Waste Bin Fire", location: "Lobby/Reception", link: "scenario3.html" }
        ],
        "Hallway/Corridor Scenarios": [
            { title: "Hallway - Obstructed Exit", location: "Hallway/Corridor", link: "scenario4.html" }
             ,   { title: "Hallway - Smoke detector fire", location: "Hallway/Corridor", link: "scenario9.html" }
      ],};

    // Function to create a scenario list for a category
    function createScenarioCategoryList(categoryName, scenarios) {
        const categoryDiv = document.createElement('div'); // Container for category
        categoryDiv.classList.add('scenario-category'); // Add CSS class for styling

        const categoryHeading = document.createElement('h2');
        categoryHeading.textContent = categoryName;
        categoryDiv.appendChild(categoryHeading);

        const scenarioListUL = document.createElement('ul');
        scenarioListUL.classList.add('scenario-list'); // Add CSS class for styling

        scenarios.forEach(scenario => {
            const scenarioListItem = document.createElement('li');
            const scenarioLink = document.createElement('a');
            scenarioLink.href = scenario.link; // Set the link from scenario data
            scenarioLink.textContent = scenario.title;
            scenarioListItem.appendChild(scenarioLink);
            scenarioListUL.appendChild(scenarioListItem);
        });
        categoryDiv.appendChild(scenarioListUL);
        return categoryDiv;
    }

    // Generate and append scenario lists for each category
    for (const categoryName in scenariosData) {
        if (scenariosData.hasOwnProperty(categoryName)) {
            const scenarioCategoryListElement = createScenarioCategoryList(categoryName, scenariosData[categoryName]);
            scenarioListContainer.appendChild(scenarioCategoryListElement);
        }
    }

});