class Network {
    /**
     * A method to create a response object
     * 
     * @param {string} message a message to send to the user
     * @returns a response object containing the message
     */
    static createResponse(message) {
        const response = {
            'Response': message
        }
        return response;
    }

}

exports.Network = Network;