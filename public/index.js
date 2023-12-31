class CheckBoxes {
    static TYPE_E = {
        City: 'city',
        Description: 'description',
        Zip: 'zip',
        Street: 'street',
        State: 'state',
        Title: 'title'
    }

    static currentChecked = 'description';
    static currentSearched = 'description';

    static check(checkbox) {
        CheckBoxes.currentChecked = checkbox.id;
        document.getElementById(CheckBoxes.TYPE_E.City).checked = false;
        document.getElementById(CheckBoxes.TYPE_E.Description).checked = false;
        document.getElementById(CheckBoxes.TYPE_E.Zip).checked = false;
        document.getElementById(CheckBoxes.TYPE_E.Street).checked = false;
        document.getElementById(CheckBoxes.TYPE_E.State).checked = false;
        document.getElementById(CheckBoxes.TYPE_E.Title).checked = false;
        
        checkbox.checked = true;
    }

    static searching = false;

    static getChecked() {
        return CheckBoxes.currentChecked;
    }
}

function continuedSearch() {
    let filter = { milliTime: { $gt: (new Date().getTime()) }, creationTime: { $lt: EventCloner.lastCreationTime } };

    let searchStr = document.getElementById('search-str').value;
    if (CheckBoxes.currentSearched == CheckBoxes.TYPE_E.City) {
        filter = { milliTime: { $gt: (new Date().getTime())}, "address.city": { "$regex": searchStr, "$options": "i" }, creationTime: { $lt: EventCloner.lastCreationTime }};
    } else if (CheckBoxes.currentSearched == CheckBoxes.TYPE_E.Description) {
        filter = { milliTime: { $gt: (new Date().getTime())}, "description": { "$regex": searchStr, "$options": "i" }, creationTime: { $lt: EventCloner.lastCreationTime }};
    } else if (CheckBoxes.currentSearched == CheckBoxes.TYPE_E.Zip) {
        filter = { milliTime: { $gt: (new Date().getTime())}, "address.zip": { "$regex": searchStr, "$options": "i" }, creationTime: { $lt: EventCloner.lastCreationTime }};
    } else if (CheckBoxes.currentSearched == CheckBoxes.TYPE_E.Street) {
        filter = { milliTime: { $gt: (new Date().getTime())}, "address.streetAddress": { "$regex": searchStr, "$options": "i" }, creationTime: { $lt: EventCloner.lastCreationTime }};
    } else if (CheckBoxes.currentSearched == CheckBoxes.TYPE_E.State) {
        filter = { milliTime: { $gt: (new Date().getTime())}, "address.state": { "$regex": searchStr, "$options": "i" }, creationTime: { $lt: EventCloner.lastCreationTime }};
    } else if (CheckBoxes.currentSearched == CheckBoxes.TYPE_E.Title) {
        filter = { milliTime: { $gt: (new Date().getTime())}, "title": { "$regex": searchStr, "$options": "i" }, creationTime: { $lt: EventCloner.lastCreationTime }};
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

function search()  {
    let filter = null;
    CheckBoxes.searching = true;
    EventCloner.lastCreationTime == null;
    CheckBoxes.currentSearched = CheckBoxes.getChecked();
    EventCloner.deleteEvents();
    let searchStr = document.getElementById('search-str').value;
    if (CheckBoxes.getChecked() == CheckBoxes.TYPE_E.City) {
        filter = { milliTime: { $gt: (new Date().getTime())}, "address.city": { "$regex": searchStr, "$options": "i" }};
    } else if (CheckBoxes.getChecked() == CheckBoxes.TYPE_E.Description) {
        filter = { milliTime: { $gt: (new Date().getTime())}, "description": { "$regex": searchStr, "$options": "i" }};
    } else if (CheckBoxes.getChecked() == CheckBoxes.TYPE_E.Zip) {
        filter = { milliTime: { $gt: (new Date().getTime())}, "address.zip": { "$regex": searchStr, "$options": "i" }};
    } else if (CheckBoxes.getChecked() == CheckBoxes.TYPE_E.Street) {
        filter = { milliTime: { $gt: (new Date().getTime())}, "address.streetAddress": { "$regex": searchStr, "$options": "i" }};
    } else if (CheckBoxes.getChecked() == CheckBoxes.TYPE_E.State) {
        filter = { milliTime: { $gt: (new Date().getTime())}, "address.state": { "$regex": searchStr, "$options": "i" }};
    } else if (CheckBoxes.getChecked() == CheckBoxes.TYPE_E.Title) {
        filter = { milliTime: { $gt: (new Date().getTime())}, "title": { "$regex": searchStr, "$options": "i" }};
    }

    const sort = { _id: -1 };
    Network.fetchEvents(filter, sort, function(data) { 
        if (Network.getResponse(data) == NexaResponse.RESPONSE_E.BADLOGIN) {
            Network.goToLogin();
        }
        for(let i = 0; i < data.length; i++) {
            EventCloner.makeEvent(data[i]);
            EventCloner.lastCreationTime = data[i].creationTime;
        }
    });

}

/**
 * Method to start the creation of all the home events
 */
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

/**
 * Method to join an event
 * 
 * @param {*} eventButton button that executed join-event
 */
function joinEvent(eventButton) {
    const event = eventButton.parentElement.parentElement;
    const id = event.querySelector('#event-id').textContent;
    Network.joinEvent(id, function(data) { 
        joinLeaveResponse(data, eventButton);
    });
}

/**
 * Method call to leave event
 * 
 * @param {*} eventButton button that user clicked
 */
function leaveEvent(eventButton) {
    const event = eventButton.parentElement.parentElement;
    const id = event.querySelector('#event-id').textContent;
    Network.leaveEvent(id, function(data) { 
        joinLeaveResponse(data, eventButton);
    });
}

function addScrollEvent() {
    document.getElementById('events-div').addEventListener('scroll', event => {
        const {scrollHeight, scrollTop, clientHeight} = event.target;

        if (Math.abs(scrollHeight - clientHeight - scrollTop) < 1) {
            console.log('Scrolled to bottom');
            if (CheckBoxes.searching) {
                continuedSearch();
            } else {
                makeHomeEvents();
            }
        }
    });
}

/**
 * Displays a response depending on server response
 * 
 * @param {*} data 
 * @param {*} eventButton 
 */
function joinLeaveResponse(data, eventButton) {
    const response = Network.getResponse(data);
    alert(response);

    if (response == NexaResponse.RESPONSE_E.JOINEDEVENT) {
        eventButton.textContent = 'Leave Event'; 
        eventButton.onclick = function() { 
            leaveEvent(eventButton); 
        }
    } else if (response == NexaResponse.RESPONSE_E.JOINEDWAITLIST) {
        eventButton.textContent = 'Leave Waitlist';
        eventButton.onclick = function() {
            leaveEvent(eventButton);
        }
    } else if (response == NexaResponse.RESPONSE_E.LEFTEVENT) {
        eventButton.textContent = 'Join Event';
        eventButton.onclick = function() {
            joinEvent(eventButton);
        }
    } else if (response == NexaResponse.RESPONSE_E.LEFTWAITLIST) {
        eventButton.textContent = 'Join Event';
        eventButton.onclick = function() {
            joinEvent(eventButton);
        }
    }

}

function enterSubmit(event) {
	if (event.key == 'Enter') {
		search();
	}
}

window.addEventListener('load', function() { 
    makeHomeEvents();
    addScrollEvent();
});