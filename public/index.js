function makeHomeEvents() {

    const filter = { milliTime: { $gt: (new Date().getTime()) } };
    const sort = { _id: -1 };
    Network.fetchEvents(filter, sort, function(data) { EventCloner.makeEventsFromArr(data); });

}

function joinEvent(eventButton) {

}

function addScrollEvent() {
    document.getElementById('events-div').addEventListener('scroll', event => {
        const {scrollHeight, scrollTop, clientHeight} = event.target;

        if (Math.abs(scrollHeight - clientHeight - scrollTop) < 1) {
            console.log('scrolled');
        }
    });
}

window.addEventListener('load', function() { 
    makeHomeEvents();
    addScrollEvent();
});