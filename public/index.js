function makeHomeEvents() {
    let filter;
    if (EventCloner.lastCreationTime == null) {
        filter = { milliTime: { $gt: (new Date().getTime()) } };
    } else {
        filter = { milliTime: { $gt: (new Date().getTime()) }, creationTime: { $lt: EventCloner.lastCreationTime } };
    }
    const sort = { _id: -1 };
    Network.fetchEvents(filter, sort, function(data) { 
        if (Network.getResponse(data) == NexaResponse.RESPONSE_E.BADLOGIN) {
            Network.goToLogin();
        }
        for(let i = 0; i < data.length; i++) {
            EventCloner.makeEvent(data[i]);
            EventCloner.lastCreationTime = data[i].creationTime;
            //console.log(EventCloner.lastCreationTime);
        }
    });
}

function joinEvent(eventButton) {
    const event = eventButton.parentElement.parentElement;
    const id = event.querySelector('#event-id').textContent;
    Network.joinEvent(id, function(data) { 
        eventButton.textContent = 'Leave Event'; 
        alert(Network.getResponse(data));
        if (Network.getResponse(data) == NexaResponse.RESPONSE_E.JOINEDEVENT) {
            eventButton.onclick = function() { 
                leaveEvent(eventButton); 
            }
        }
    });
}

function leaveEvent(eventButton) {
    const event = eventButton.parentElement.parentElement;
    const id = event.querySelector('#event-id').textContent;
    Network.leaveEvent(id, function(data) { 
        eventButton.textContent = 'Join Event'; 
        alert(Network.getResponse(data));
        eventButton.onclick = function() { 
            joinEvent(eventButton); 
        };
    });
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