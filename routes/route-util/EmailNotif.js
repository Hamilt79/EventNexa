const { scheduleJob } = require('node-schedule');
const { MongoConnection } = require('../mongodb/mongodb');
const { createTransport } = require('nodemailer');
const { User } = require('./User');

class EmailNotif {

    /**
     * Time Before an event that an email gets sent in minutes.
     */
    static timeBeforeEvent = 1;

    static emailAddress = 'EventNexaServer@gmail.com';

    static emailPass = 'hfykdwvbylsqcihw'; 

    /**
     * Sets up scheduled email notif events when server starts up
     */
    static async setUpEvents() {
        const timeOffset = (60 * 1000) * EmailNotif.timeBeforeEvent;
        const futureDate = new Date().getTime() + timeOffset;
        const eventsForTheFuture = 
            await (await MongoConnection.get().queryCollectionMulti({ milliTime: { $gt: futureDate } },
                         -1, -1, MongoConnection.COLLECTION_E.Events)).toArray();

        for (let i = 0; i < eventsForTheFuture.length; i++) {
            try {
                const users = eventsForTheFuture[i].joinedUsers;
                for (let k = 0; k < users.length; k++) {
                    EmailNotif.scheduleEventNotifTimer(eventsForTheFuture[i], users[k]);
                }
            } catch(ex) {
                console.log(ex);
            }
        }
    }

    static async scheduleEventNotifTimer(event, username) {
        const emailNotifDate = new Date(event.milliTime - timeOffset);
        scheduleJob(emailNotifDate, function() { 
            try{
                if (!EmailNotif.isUserInEvent(event, username)) {
                    return;
                }
                const receiver = User.getEmailFromUsername(username);
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

    static async isUserInEvent(event, username) {
        const dbEvent = await MongoConnection.get().queryCollection({ _id: event._id }, MongoConnection.COLLECTION_E.Events);
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