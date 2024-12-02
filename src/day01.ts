import { loadFileByLine } from "./utils"

const lines = loadFileByLine('day01_full')

function parseInput() {
    const leftList: number[] = []
    const rightList: number[] = []
    for (const line of lines) {
        const [left, right] = line.split(/[ ]+/);
        leftList.push(parseInt(left));
        rightList.push(parseInt(right));
    }
    return [leftList, rightList];
}

function part1() {
    const [leftList, rightList] = parseInput();
    leftList.sort();
    rightList.sort();

    let sum = 0;
    for (let i = 0; i < leftList.length; i++) {
        const distance = Math.abs(leftList[i] - rightList[i])
        sum += distance
    }

    console.log(sum)
}

function part2() {
    const [leftList, rightList] = parseInput();
    const rightIndex = rightList.reduce((acc, item) => {
        const existing = acc.get(item) ?? 0;
        acc.set(item, existing + 1)
        return acc;
    }, new Map<number, number>());

    let sum = 0;
    for (const item of leftList) {
        const occurence = rightIndex.get(item) ?? 0;
        sum += item * occurence
    }

    console.log(sum)
}
part1();
part2()