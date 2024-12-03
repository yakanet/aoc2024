import { loadFile } from "./utils"

const content = loadFile('day03_full')

function part1() {
    const parts = content.matchAll(/mul\((\d+),(\d+)\)/g);
    const result = [...parts].reduce((acc, item) => {
        const [_, a, b] = item
        return acc + (parseInt(a) * parseInt(b));
    }, 0)
    console.log(result)
}

function part2() {
    const parts = content.matchAll(/don't\(\)|do\(\)|mul\((\d+),(\d+)\)/gm);
    let result = 0;
    let enabled = true;
    for(const match of parts) {
        if(match[0] === 'do()') {
            enabled = true;
        }
        else if(match[0] === 'don\'t()') {
            enabled = false;
        }
        else if(enabled) {
            const [_, a, b] = match
            result += (parseInt(a) * parseInt(b));
        }
    }
    console.log(result)
}

part1();
part2();
