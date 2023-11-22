function makeHomeEvents() {

    const filter = { milliTime: { $gt: (new Date().getTime()) } };
    const sort = { _id: -1 };
    Network.fetchEvents(filter, sort, function(data) { EventCloner.makeEventsFromArr(JSON.parse(data)); });

}


window.addEventListener('load', function() { makeHomeEvents(); });