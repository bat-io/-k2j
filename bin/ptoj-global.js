#!/usr/bin/env node

const { Command } = require('commander');
const program = new Command();
const util = require('../lib/utils');
var ptoj = require('../lib/index.js');
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

const rawData = ptoj.readProp(inputFileName);

let jsonOutput;
if (userInput.schema) {
    validSchema = util.getJSON(userInput.schema.replace(/'/g, '"'));
    jsonOutput = ptoj.processWithSchema(rawData, validSchema);
} else {
    jsonOutput = ptoj.processRaw(rawData);
}
if (outputFileName) {
    ptoj.dumpOutputToFile(jsonOutput, outputFileName);
} else {
    ptoj.dumpOutputToStdout(jsonOutput);
}