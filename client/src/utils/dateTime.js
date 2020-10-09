
/**
 * Formats DB date time string
 * @param {String} datetime
 */
export const format = (datetime) => {
    try {
        if(datetime === "" || typeof datetime === 'undefined') {
            return ""
        }
        var date = datetime.substring(0, 10).split('-');
        var time = datetime.substring(11, 16);
        return date[2] + "/" + date[1] + "/" + date[0] + ", " + time
    } catch (error) {
        console.log(error)
    }
    
}

/**
 * Converts a Stiring to a Date object
 */
export const stringToDate = (datetime) => {
    return new Date(datetime)
}

