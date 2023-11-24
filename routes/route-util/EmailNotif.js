const { scheduleJob } = require('node-schedule');
const { MongoConnection } = require('../mongodb/mongodb');
const { Collection } = require('mongodb');

class EmailNotif {

    /**
     * Time Before an event that an email gets sent in minutes.
     */
    static timeBeforeEvent = 1;
   
    /**
     * Sets up scheduled email notif events when server starts up
     */
    static async setUpEvents() {
        const timeToAdd = (60 * 1000) * EmailNotif.timeBeforeEvent;
        const futureDate = new Date().getTime() + timeToAdd;
        const eventsForTheFuture = 
            await (await MongoConnection.get().queryCollectionMulti({ milliTime: { $gt: futureDate } },
                         -1, -1, MongoConnection.COLLECTION_E.Events)).toArray();

        for (let i = 0; i < eventsForTheFuture.length; i++) {
            try {
                const emailNotifDate = new Date(eventsForTheFuture[i].milliTime - timeToAdd);
                scheduleJob(emailNotifDate, function() { 
                    const eventTitle = eventsForTheFuture[i].title;

                    console.log('Its Time For ' + eventTitle + '!');
                });        
            } catch(ex) {
                console.log(ex);
            }
        }
        //const date = new Date(new Date().getTime() + timeToAdd);
        //scheduleJob(date, function() { console.log('Hello Thereeeee! Event Fired!') });
    }

}

exports.EmailNotif = EmailNotif;