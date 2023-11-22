function getCreatedEvents() {
    const filter = { author: UserUtils.getUsername() };
    const sort = { _id:-1 };
    Network.fetchEvents(filter, sort, function(data) { makeCreatedEventsFromArr(data) } );
}

function makeCreatedEventsFromArr(arrayOfEvents) {
    for(let i = 0; i < arrayOfEvents.length; i++) {
        if (arrayOfEvents[i].milliTime <= new Date().getTime()) {
            EventCloner.makeEvent(arrayOfEvents[i], true);
        } else {
            EventCloner.makeEvent(arrayOfEvents[i]);
        }
    }
}

window.addEventListener('load', function() { getCreatedEvents() });