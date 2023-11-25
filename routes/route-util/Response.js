class Response {
    static RESPONSE_E = {
        BADLOGIN: 'Bad Login',
        GOODLOGIN: 'Good Login',
        SERVERERROR: 'Server Error',
        EVENTCREATED: 'Event Created',
        NOSUCHEVENT: 'No Such Event',
        USERREGISTERED: 'User Registered! Please Log In!',
        TAKENUSERNAME: 'Username Already Exists!',
        JOINEDEVENT: 'Joined Event',
        LEFTEVENT: 'Left Event',
        EVENTFULL: 'Event Is Full',
        INVALIDEVENT: 'Invalid Event. Please Verify You Have Filled Out Every Field',
        JOINEDWAITLIST: 'Joined Waitlist',
        LEFTWAITLIST: 'Left Waitlist'
    };
}

exports.Response = Response;