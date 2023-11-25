function leaveEvent(eventButton) {
    const event = eventButton.parentElement.parentElement;
    const id = event.querySelector('#event-id').textContent;
    Network.leaveEvent(id, function(data) { 
        eventButton.parentElement.parentElement.remove();
        alert(Network.getResponse(data));
    });
}

/**
 * Called to fetch the joined events from server
 */
function getJoinedEvents() {
    let filter;
    if (EventCloner.lastCreationTime == null) {
        filter = { $or: [ { joinedUsers: UserUtils.getUsername() }, { waitlistedUsers: UserUtils.getUsername() }] };
    } else {
        filter = {$and: 
            [ 
                {creationTime: 
                    { $lt: EventCloner.lastCreationTime }
                }, 
                { $or: 
                    [ 
                        { joinedUsers: UserUtils.getUsername() }, 
                        { waitlistedUsers: UserUtils.getUsername() }
                    ] 
                } 
            ]};
    }
    const sort = { _id: -1 };
    Network.fetchEvents(filter, sort, function(data) { 
        if (Network.getResponse(data) == NexaResponse.RESPONSE_E.BADLOGIN) {
            Network.goToLogin();
        } else if (Network.getResponse(data) == NexaResponse.RESPONSE_E.SERVERERROR) {
            alert('Server Error');
        }
        makeJoinedEventsFromArr(data); 
    });
}

/**
 * Called when the data from the server is recieved
 * 
 * @param {*} arrayOfEvents 
 */
function makeJoinedEventsFromArr(arrayOfEvents) {

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

window.addEventListener('load', function() { 
    getJoinedEvents();
    addScrollEvent(getJoinedEvents);
});