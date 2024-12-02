import { loadFileByLine, window } from "./utils"

const lines = loadFileByLine('day02_full')

function* parseInput() {
    for (const line of lines) {
        yield line.split(/[ ]+/).map(x => parseInt(x));
    }
}

function isSafe(line: number[]) {
    const pairs = window(line, 2);
    const inRange = pairs.every(([a, b]) => Math.abs(b-a) >= 1 && Math.abs(b-a) <= 3);
    const directions = pairs.map(([a,b]) => Math.sign(b - a))
    const isSameDirection = directions.every((s) => s > 0) || directions.every((s) => s < 0)
    return inRange && isSameDirection;
}

function part1() {
    let numberOfValid = 0;
    for(const line of parseInput()) {
        if(isSafe(line)) {
            numberOfValid++
        }
    }
    console.log(numberOfValid)
}

function part2() {
    let numberOfValid = 0;
    for(const line of parseInput()) {
        if(isSafe(line)) {
            numberOfValid++
        } else {
            for(let i = 0; i<line.length; i++) {
                const lineWithRemoved = line.toSpliced(i, 1)
                if(isSafe(lineWithRemoved)) {
                    numberOfValid++
                    break
                }
            }
        }
    }
    console.log(numberOfValid)
}
part1();
part2()
