function getCreatedEvents() {
    const filter = { author: UserUtils.getUsername() };
    const sort = { _id:-1 };
    Network.fetchEvents(filter, sort, function(data) { EventCloner.makeEventsFromArr(data) } );
}

window.addEventListener('load', function() { getCreatedEvents() });