class DateUtils {

    /**
     * Adds a number of hours to a Date object and returns a new one
     * @param {*} date Date object to add from
     * @param {*} hours hours to add
     * @returns a Date object with the new hours
     */
    static addHours(date, hours) {
        let date = new Date(date.toUTCString());
        date.setTime(date.getTime() + (hours*60*60*1000));
        return date;
    }

}