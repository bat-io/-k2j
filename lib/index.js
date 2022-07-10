const fs = require('fs');
const readLine = require('readline');
const chalk = require('chalk');

/**
 * Read key-value property
 * 
 * @param {file} String file to read
 */
const readProp = (file) => {
    try {
        if (!fs.existsSync(file)) {
            throw new Error("File does not exists");
        }
        const data = fs.readFileSync(file, 'utf8');
        return data;
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

/**
 * Converts key-value property data to json
 * 
 * @param {key-value String} String to pocess into json
 * @returns
 */
const processRaw = (data) => {

    let jsonData = [];
    let invalidKeyCount = 0;

    for (let i = 0; i < data.length;) {
        var j = data.indexOf('\r\n', i);
        if (j == -1) j = data.length;
        const line = data.substr(i, j - i);
        const keyValue = line.split(/=(.*)/s);
        if (keyValue.length == 2 || keyValue.length == 3) {
            const key = keyValue[0].trim();
            const value = keyValue[1].trim();
            const keyValueJson = { [key]: value };
            jsonData.push(keyValueJson);
        } else {
            console.log(keyValue);
            invalidKeyCount++;
        }

        i = j + 1;
    }

    if(invalidKeyCount>0)
    console.log(chalk.yellow(`Warning: ${invalidKeyCount} Invalid key-value found`));

    return jsonData;

}

/**
 * Converts key-value property data to json as per the provided json schema
 * 
 * @param {key-value string} String to pocess into json
 * @param {schema object} Object schema to cutom process 
 */
const processWithSchema = (data, schema) => {

    let jsonData = [];
    let invalidKeyCount = 0;

    const predefinedKey = schema["k"];
    const predefinedValue = schema["v"];

    delete schema["k"];
    delete schema["v"];

    for (let i = 0; i < data.length;) {
        var j = data.indexOf('\r\n', i);
        if (j == -1) j = data.length;
        const line = data.substr(i, j - i);
        const keyValue = line.split(/=(.*)/s);
        if (keyValue.length == 2 || keyValue.length == 3) {
            const key = keyValue[0].trim();
            const value = keyValue[1].trim();
            const keyValueJson = { [predefinedKey]: key, [predefinedValue]: value, ...schema };
            jsonData.push(keyValueJson);
        } else {
            console.log(keyValue);
            invalidKeyCount++;
        }

        i = j + 1;
    }

    if(invalidKeyCount>0)
    console.log(chalk.yellow(`Warning: ${invalidKeyCount} Invalid key-value found`));

    return jsonData;

}

/**
 * Write output to the file
 * 
 * @param {json} Object to write into file
 * @param {file} String file to write processed json
 */
const dumpOutputToFile = (jsonData, file) => {

    fs.writeFileSync(file, JSON.stringify(jsonData, null, 4));
}

/**
 * Write output to the stdout
 * 
 * @param {json} Object to write into stdout
 *
 */
const dumpOutputToStdout = (jsonData) => {

    console.log((JSON.stringify(jsonData, null, 3)));

}

// Allows us to call this function from outside of the library file.
// Without this, the function would be private to this file.
module.exports = {
    readProp,
    processWithSchema,
    processRaw,
    dumpOutputToFile,
    dumpOutputToStdout
};