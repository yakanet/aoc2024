import { argv } from "bun";
import fs from 'node:fs';

const day = parseInt(argv[2]);
if(isNaN(day)) {
    console.error('not a day');
    process.exit(1);
}

const tsFilename = `src/day${day.toString().padStart(2, '0')}.ts`;
if(!fs.existsSync(tsFilename)) {
    fs.writeFileSync(tsFilename, `
import { loadFile } from "./utils";

const content = loadFile();

function part1() {

}

function part2() {

}

part1();
part2();
`, {encoding: 'utf8'});
}

const sampleFilename = `src/day${day.toString().padStart(2, '0')}_sample.txt`;
if(!fs.existsSync(sampleFilename)) {
    fs.writeFileSync(sampleFilename, '', {encoding: 'utf8'})
}

const fullFilename = `src/day${day.toString().padStart(2, '0')}_full.txt`;
if(!fs.existsSync(fullFilename)) {
    fs.writeFileSync(fullFilename, '', {encoding: 'utf8'})
}
