const { scheduleJob } = require('node-schedule');
const { MongoConnection } = require('../mongodb/mongodb');
const { createTransport } = require('nodemailer');

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