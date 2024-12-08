import { isInRange, loadFileGrid } from "./utils";

const content = loadFileGrid("day08_full");
type Position = { x: number; y: number };

function listAntennas() {
  const result = new Map<string, Position[]>();
  for (let row = 0; row < content.length; row++) {
    for (let col = 0; col < content[0].length; col++) {
      const cell = content[row][col];
      if (cell === ".") {
        continue;
      }
      if (!result.has(cell)) {
        result.set(cell, []);
      }
      result.get(cell)!.push({ x: col, y: row });
    }
  }
  return result;
}

function findAntinodes(antennas: Map<string, Position[]>, singleStep = true) {
  const antinodes = new Set<string>();
  for (const [_, currentAntennas] of antennas.entries()) {
    const pairs = currentAntennas
      .map((a, i) =>
        currentAntennas
          .filter((_, j) => i < j)
          .map(
            (b) =>
              [a, b] as [
                (typeof currentAntennas)[0],
                (typeof currentAntennas)[0]
              ]
          )
      )
      .flat();
    const inBounds = ({ x, y }: { x: number; y: number }) =>
      isInRange(y, 0, content.length) && isInRange(x, 0, content[y].length);
    for (const [a, b] of pairs) {
      const delta = { i: a.x - b.x, j: a.y - b.y };
      const coordinates = [];
      let step = singleStep ? 1 : 0;
      let someValid = true;
      while ((singleStep && step == 1) || (!singleStep && someValid)) {
        const antinodePositions = [
          { x: a.x + step * delta.i, y: a.y + step * delta.j },
          { x: b.x - step * delta.i, y: b.y - step * delta.j },
        ].filter(inBounds);
        someValid = antinodePositions.length > 0;
        coordinates.push(...antinodePositions);
        step++;
      }
      coordinates.map(({ x, y }) => antinodes.add(`${x}-${y}`));
    }
  }
  return antinodes;
}

function dumpMap(antinodes: Set<string>) {
  for (let row = 0; row < content.length; row++) {
    let buffer = "";
    for (let col = 0; col < content[row].length; col++) {
      if (antinodes.has(`${col}-${row}`)) {
        buffer += "#";
      } else {
        buffer += content[row][col];
      }
    }
    console.log(buffer);
  }
}

function part1() {
  const antennas = listAntennas();
  let antinodes = findAntinodes(antennas);
  //dumpMap(antinodes);
  console.log(antinodes.size);
}

function part2() {
  const antennas = listAntennas();
  let antinodes = findAntinodes(antennas, false);
  //dumpMap(antinodes);
  console.log(antinodes.size);
}

part1();
part2();
