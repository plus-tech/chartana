
export function formatDate(date, fmt){
    /**
     * Format a date.
     * 
     * @param {String} date: date to be formatted
     * @param {String} fmt: long or short format
     * @returns 
     *  YYYY-MM-DD: if fmt === 'LONG' 
     *  YY-M-D: if fmt === 'SHORT'
     */
    let d = new Date(date);

    let year = d.getFullYear();
    let month = (d.getMonth() + 1).toString();
    let day = (d.getDate()).toString();

    if (fmt === 'LONG'){
        if (month.length < 2) 
        month = '0' + month;
        if (day.length < 2) 
        day = '0' + day;
    }
    else if (fmt === 'SHORT'){
        year = year.toString().substring(2);
    }

    return [year, month, day].join('-'); 
} 


export function checkTicker(ticker){
    /**
     * Check ticker entered through the Search box.
     * 
     * @param {String} ticker: ticker to be validated
     * @returns 
     *  true: if valid
     *  false: if invalid
     */
    if (ticker == null){
        return false;
    }
    else if (ticker === ""){
        return false;
    }
    else if (isNaN (ticker)){
        return false;
    }
    else {
        return true;
    }
}