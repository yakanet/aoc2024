import fs from 'node:fs'

export const loadFile = (name: string): string => fs.readFileSync(`./src/${name}.txt`, { encoding: 'utf-8' });

export const loadFileByLine = (name: string) => loadFile(name).split(/\r?\n/);

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