/**
 * Called to fetch the created events from server
 */
function getCreatedEvents() {
    let filter;
    if (EventCloner.lastCreationTime == null) {
        filter = { author: UserUtils.getUsername() };
    } else {
        filter = {creationTime: { $lt: EventCloner.lastCreationTime } };
    }
    const sort = { _id: -1 };
    Network.fetchEvents(filter, sort, function(data) { 
        if (Network.getResponse(data) == NexaResponse.RESPONSE_E.BADLOGIN) {
            Network.goToLogin();
        } else if (Network.getResponse(data) == NexaResponse.RESPONSE_E.SERVERERROR) {
            alert('Server Error');
        }
        makeCreatedEventsFromArr(data); 
    
    });
}

/**
 * Called when the data from the server is recieved
 * 
 * @param {*} arrayOfEvents 
 */
function makeCreatedEventsFromArr(arrayOfEvents) {

    for(let i = 0; i < arrayOfEvents.length; i++) {
        if (arrayOfEvents[i].milliTime <= new Date().getTime()) {
            EventCloner.makeEvent(arrayOfEvents[i], true);
        } else {
            EventCloner.makeEvent(arrayOfEvents[i]);
        }
        EventCloner.lastCreationTime = arrayOfEvents[i].creationTime;
        console.log(EventCloner.lastCreationTime);
    }
}

/**
 * Adds an event listener to div containing events
 * 
 * @param {*} callback function to call when scrolled to bottom
 */
function addScrollEvent(callback) {
    document.getElementById('events-div').addEventListener('scroll', event => {
        const {scrollHeight, scrollTop, clientHeight} = event.target;

        if (Math.abs(scrollHeight - clientHeight - scrollTop) < 1) {
            console.log('Scrolled to bottom');
            callback();
        }
    });
}

function showAnalytics(button) {
    let joined = document.getElementById('analytics-joined');
    let waitlisted = document.getElementById('analytics-waitlisted');
    let id = button.parentElement.parentElement.querySelector("#event-id").textContent;
    const filter = { _id: id };

    Network.fetchEvents(filter, {  }, function(data) { console.log(); });
}

window.addEventListener('load', function() { 
    getCreatedEvents();
    addScrollEvent(getCreatedEvents);
});