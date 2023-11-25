const { scheduleJob, scheduledJobs } = require('node-schedule');
const { MongoConnection } = require('../mongodb/mongodb');
const { createTransport } = require('nodemailer');
const { User } = require('./User');
const { ObjectId } = require('mongodb');

class EmailNotif {

    /**
     * Time Before an event that an email gets sent in minutes.
     */
    static timeBeforeEvent = 60;

    static emailAddress = 'EventNexaServer@gmail.com';

    static emailPass = 'hfykdwvbylsqcihw';
    
    static timeOffset = null;

    /**
     * Sets up scheduled email notif events when server starts up
     */
    static async setUpEvents() {
        EmailNotif.timeOffset = (60 * 1000) * EmailNotif.timeBeforeEvent;
        const futureDate = new Date().getTime() + EmailNotif.timeOffset;
        const eventsForTheFuture = 
            await (await MongoConnection.get().queryCollectionMulti({ milliTime: { $gt: futureDate } },
                         -1, -1, MongoConnection.COLLECTION_E.Events)).toArray();

        for (let i = 0; i < eventsForTheFuture.length; i++) {
            try {
                const users = eventsForTheFuture[i].joinedUsers;
                if (users == null) {
                    continue;
                } 
                for (let k = 0; k < users.length; k++) {
                    EmailNotif.scheduleEventNotifTimer(eventsForTheFuture[i], users[k]);
                }
            } catch(ex) {
                console.log(ex);
            }
        }
    }

    static async scheduleEventNotifTimer(event, username) {
        const emailNotifDate = new Date(event.milliTime - EmailNotif.timeOffset);
        scheduleJob(event._id + ' ' + username, emailNotifDate, async function() { 
            try{
                console.log(await EmailNotif.isUserInEvent(event, username));
                if (!(await EmailNotif.isUserInEvent(event, username))) {
                    return;
                }
                const receiver = await User.getEmailFromUsername(username);
                const eventTitle = event.title;
                //console.log('Its Time For ' + eventTitle + '!');
                console.log(receiver);
                console.log(eventTitle);
                EmailNotif.sendEmail(receiver, 'Event Starting Soon!', eventTitle + ' is starting soon!');
            } catch(ex) {
                console.log(ex);
            }
        });        
   
    }

    static cancelEventNotifTimer(eventId, username) {
        try {
            scheduledJobs[eventId + ' ' + username].cancel();
        } catch(ex) {
            console.log(ex);
        }
    }

    static async isUserInEvent(event, username) {
        const objId = new ObjectId(event._id);
        const dbEvent = await MongoConnection.get().queryCollection({ _id: objId }, MongoConnection.COLLECTION_E.Events);
        if (dbEvent.joinedUsers.includes(username)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Sends email from server email
     * 
     * @param {*} receiver email address to send to 
     * @param {*} subject subject of email
     * @param {*} body email body
     */
    static sendEmail(receiver, subject, body) {
        const transport = createTransport( {
            service: 'gmail',
            auth: {
                user: EmailNotif.emailAddress,
                pass: EmailNotif.emailPass
            }
         } );

         const mailObtions = {
            from: EmailNotif.emailAddress,
            to: receiver,
            subject: subject,
            text: body
         };

         transport.sendMail(mailObtions, function(error, info) {
            console.log(error);
            console.log(info);
         });
    }

}

exports.EmailNotif = EmailNotif;