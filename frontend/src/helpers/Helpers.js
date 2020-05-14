"use strict;"

// ------------------------- Date related helper functions -------------------------

export const compareDates = (date1, date2) => {
    return date1.getFullYear() === date2.getFullYear() 
        && date1.getMonth() === date2.getMonth()
        && date1.getDate() === date2.getDate();
}

export const formatDate = (date) => {
    return [date.getFullYear(), 
        ("0" + (date.getMonth() + 1)).slice(-2), 
        ("0" + date.getDate()).slice(-2)]
        .join("-");
}

export const getKeyByValue = (object, value) => {
    return Object.keys(object).find(key => object[key] === value);
}
