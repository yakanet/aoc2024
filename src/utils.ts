import process from 'node:process';
import fs from 'node:fs'

function getFile() {
    if (process.argv.length === 3) {
        return process.argv[2]
    }
    throw new Error('Need to define the input file');
}

export const loadFile = (name?: string): string => fs.readFileSync(name ? `./src/${name}.txt` : getFile(), { encoding: 'utf-8' });

export const loadFileByLine = (name?: string) => loadFile(name).split(/\r?\n/);

export const loadFileGrid = (name?: string) => loadFileByLine(name).map(line => line.split(''));

type Repeat<T, C extends number, Result extends any[] = [], Counter extends any[] = []> = Counter['length'] extends C ?
    Result :
    Repeat<T, C, [...Result, T], [...Counter, unknown]>

export function window<T, S extends number>(array: T[], windowSize: S) {
    return array.map((_, i, ary) => ary.slice(i, i + windowSize)).slice(0, -windowSize + 1) as Repeat<T, S>[];
}

export function wait(ms: number) {
    return new Promise<void>((resolve) => {
        setTimeout(() => resolve(), ms)
    })
}

export const isInRange = (value: number, min: number, max: number) => value >= min && value < max;