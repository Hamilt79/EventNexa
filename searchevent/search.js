// JavaScript logic for handling search functionality
document.getElementById('searchButton').addEventListener('click', function () {
    // Get the value entered in the location input
    const location = document.getElementById('locationInput').value;

    // Perform an action with the location (e.g., fetch events)
    // For demonstration purposes, let's log the entered location
    console.log('Location entered:', location);

    // Simulated search results display (replace with actual logic)
    displaySearchResults(location);
});

function displaySearchResults(location) {
    const searchResultsContainer = document.getElementById('searchResults');

    // Clear previous search results
    searchResultsContainer.innerHTML = '';

    // Simulated search results (replace with actual data)
    const events = [
        'Found events are: ',
        'Event 1 in ' + location,
        'Event 2 in ' + location,
        'Event 3 in ' + location,
    ];

    // Display search results in the container
    events.forEach(event => {
        const eventElement = document.createElement('p');
        eventElement.textContent = event;
        searchResultsContainer.appendChild(eventElement);
    });
}
