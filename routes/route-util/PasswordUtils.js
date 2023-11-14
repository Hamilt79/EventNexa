const crypto = require('crypto');
 
class PasswordUtils {

    /**
     * Creates the password hash from password
     * @param {*} password password to make hash from
     * @returns hashed password
     */
    static createPasswordHash(password) {
        // Creates a hash object
        const hash = crypto.createHash('sha512');
        // Updates the hash object with the text to turn into sha512 hash
        hash.update(password);
        // Getting the hash from the object as a string
        const passwordHash = hash.digest('hex');
        return passwordHash;
    }

    /**
     * Method to verify if a password is within the accepted length
     * and contains at least one digit.
     * 
     * @param {string} password a string containing the password to verify
     * @returns A string containing the error message or an empty string if no
     * 			errors occurred
     */
    static verifyPassword(password) {
        const MAX_LEN = 20;
        const MIN_LEN = 10;
        let errorMessage = "";
        if (password.length > MAX_LEN || password.length < MIN_LEN) {
            errorMessage = "Password must be between " + MAX_LEN + " and " + MIN_LEN + " characters long.";
        } else if (PasswordUtils.containsDigit(password) === false) {
            errorMessage = "Password must contain at least one digit.";
        }

        return errorMessage;
    }

    /**
     * Method checking if a string contains at least one digit.
     * 
     * @param {string} str a string to check
     * @returns true if the string contains a digit, and false if it does not
     */
    static containsDigit(str) {
        for (let i = 0; i < str.length; i++) {
            if (str.charAt(i) >= '0' && str.charAt(i) <= 9) {
                return true;
            }
        }
        return false;
    }

}

exports.PasswordUtils = PasswordUtils;