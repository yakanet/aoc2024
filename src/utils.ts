import fs from 'node:fs'

export const loadFile = (name: string) => fs.readFileSync(`./src/${name}.txt`, { encoding: 'utf-8' });

export const loadFileByLine = (name: string) => loadFile(name).split(/\r?\n/);