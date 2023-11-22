function makeHomeEvents() {
    const filter = { milliTime: { $gt: (new Date().getTime()) } };
    const sort = { _id: -1 };
    Network.fetchEvents(filter, sort, function(data) { 
        for(let i = 0; i < arrayOfEvents.length; i++) {
            EventCloner.makeEvent(arrayOfEvents[i]);
            EventCloner.lastEventId = arrayOfEvents[i]._id;
            console.log(EventCloner.lastEventId);
        }
    });
}

function joinEvent(eventButton) {

}

function addScrollEvent() {
    document.getElementById('events-div').addEventListener('scroll', event => {
        const {scrollHeight, scrollTop, clientHeight} = event.target;

        if (Math.abs(scrollHeight - clientHeight - scrollTop) < 1) {
            console.log('Scrolled to bottom');
        }
    });
}

window.addEventListener('load', function() { 
    makeHomeEvents();
    addScrollEvent();
});