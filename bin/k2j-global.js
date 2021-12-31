#!/usr/bin/env node

const { Command } = require('commander');
const program = new Command();
const util = require('../lib/utils');
var k2j = require('../lib/index.js');
let validSchema;
let outputFileName;
let inputFileName;

program.version('0.0.1');

program
    .requiredOption('-i, --input <location>', 'key-value property file')
    .option('-o, --output <location>', 'Output file')
    .option('-s, --schema <location>', 'JSON schema to tranform');


program.parse();
const userInput = program.opts();
inputFileName = userInput.input;
outputFileName = userInput.output;

const rawData = k2j.readProp(inputFileName);

let jsonOutput;
if (userInput.schema) {
    validSchema = util.getJSON(userInput.schema.replace(/'/g, '"'));
    jsonOutput = k2j.processWithSchema(rawData, validSchema);
} else {
    jsonOutput = k2j.processRaw(rawData);
}
if (outputFileName) {
    k2j.dumpOutputToFile(jsonOutput, outputFileName);
} else {
    k2j.dumpOutputToStdout(jsonOutput);
}