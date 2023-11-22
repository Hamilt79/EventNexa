function makeHomeEvents() {
    let filter;
    if (EventCloner.lastEventId == null) {
        filter = { milliTime: { $gt: (new Date().getTime()) } };
    } else {
        filter = { milliTime: { $gt: (new Date().getTime()) }, _id: { $gt: EventCloner.lastEventId } };
    }
    const sort = { _id: -1 };
    Network.fetchEvents(filter, sort, function(data) { 
        for(let i = 0; i < data.length; i++) {
            EventCloner.makeEvent(data[i]);
            EventCloner.lastEventId = data[i]._id;
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
            makeHomeEvents();
        }
    });
}

window.addEventListener('load', function() { 
    makeHomeEvents();
    addScrollEvent();
});