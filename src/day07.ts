
import { loadFileByLine } from "./utils";

const content = loadFileByLine();

function getInput(){
    const response: {result: number, numbers: number[]}[] = [];
    for(const line of content) {
        const [result, numbers] = line.split(': ');
        response.push({
            result: parseInt(result),
            numbers: numbers.split(' ').map(x => parseInt(x))
        }) 
    }
    return response;
}

function generateCombinations(arr: number[], operations: string[]): string[][] {
    return arr.slice(1).reduce(
        (combinations) =>
            combinations.flatMap((combination) =>
                operations.map((op) => [...combination, op])
            ),
        [[]] as string[][],
    )
}

function calculate(numbers: number[], operators: string[]) {
    let sum = numbers[0];
    for(let i = 1; i<numbers.length; i++) {
        if(operators[i - 1] === '+') {
            sum += numbers[i]
        }
        if(operators[i - 1] === '*') {
            sum *= numbers[i]
        }
        if(operators[i - 1] === '||') {
            sum = parseInt(sum.toString() + numbers[i].toString())
        }
    }
    return sum;
}

function part1() {
    let sum = 0;
    for(const line of getInput()) {
        let operators = generateCombinations(line.numbers, ['+', '*']);
        for(const operator of operators) {
            if(calculate(line.numbers, operator) === line.result) {
                //console.log(line.numbers, operator, line.result);
                sum+=line.result;
                break
            }
        }
    }
    console.log(sum)
}

function part2() {
    let sum = 0;
    for(const line of getInput()) {
        let operators = generateCombinations(line.numbers, ['+', '*', '||']);
        for(const operator of operators) {
            if(calculate(line.numbers, operator) === line.result) {
                sum+=line.result;
                break
            }
        }
    }
    console.log(sum)
}

part1();
part2();
