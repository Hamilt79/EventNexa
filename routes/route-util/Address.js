class Address {
    /**
     * Address object for representing a location
     * 
     * @param {*} city city
     * @param {*} state state (in full name)
     * @param {*} zip zip code
     * @param {*} streetAddress street address
     */
    constructor(city, state, zip, streetAddress) {
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.streetAddress = streetAddress;
    }
}