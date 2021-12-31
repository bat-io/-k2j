/**
 * 
 * @param {*} jsonStr 
 * @returns 
 */
const getJSON = (jsonStr) => {
    let validSchema;
    try {
        if (!jsonStr && jsonStr.length == 0) {
            throw new Error("Empty string");
        }
        validSchema = JSON.parse(jsonStr);
    } catch (err) {
        console.error(err.message);
    }

    return validSchema;
}

/**
 * Remove extra spaces, incorrect key-value or line ending
 * @param {data} Object key-value raw data from property file 
 */
const sanitize = (data) => {

};

module.exports = {
    getJSON
}