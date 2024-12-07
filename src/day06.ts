import { isInRange, loadFileGrid, mod } from "./utils";

const content = loadFileGrid();

type Grid = string[][];
const Direction = [
  [0, -1], // NORTH
  [1, 0], // EAST
  [0, 1], // SOUTH
  [-1, 0], // WEST
] as const;

type Guard = {
  x: number;
  y: number;
  direction: number;
};
function getInput(): [Grid, Guard] {
  const guard: Guard = {
    x: 0,
    y: 0,
    direction: 0,
  };
  for (let y = 0; y < content.length; y++) {
    for (let x = 0; x < content[y].length; x++) {
      const cell = content[y][x];
      if (cell === "#" || cell === ".") {
        continue;
      }
      console.log("Found player position ", x, y, cell);
      guard.x = x;
      guard.y = y;
      break;
    }
  }
  const grid: Grid = structuredClone(content);
  grid[guard.y][guard.x] = ".";
  return [grid, guard];
}
function part1() {
  const [grid, guard] = getInput();
  let visited = new Set<string>();
  visited.add(`${guard.x}-${guard.y}`);
  while (true) {
    const [dx, dy] = Direction[guard.direction];
    const newX = guard.x + dx;
    const newY = guard.y + dy;
    const cell = grid[newY]?.[newX];
    if (!cell) {
      break;
    }
    if (cell === "#") {
      guard.direction = mod(guard.direction + 1, Direction.length);
      //console.log({cell, guard})
    }
    if (cell === ".") {
      guard.x = newX;
      guard.y = newY;
      visited.add(`${newX}-${newY}`);
    }
  }

  //dumpGrid(grid, visited);
  console.log(visited.size);
}

function dumpGrid(grid: Grid, visited: Set<string>) {
  for (let y = 0; y < grid.length; y++) {
    let line = "";
    for (let x = 0; x < grid[y].length; x++) {
      if (visited.has(`${x}-${y}`)) {
        line += "X";
      } else {
        line += grid[y][x];
      }
    }
    console.log(line);
  }
}

function part2() {
  const [grid, guard] = getInput();
  let result = 0;

  const directions = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] !== "#") {
        let direction = 0;
        let position = [guard.y, guard.x];
        const getKey = (index: number) =>
          [...position, ...directions[index]].join("#");

        const visited = new Set([getKey(direction)]);

        const newGrid = structuredClone(grid);
        newGrid[i][j] = "#";

        while (true) {
          const [row, col] = position;
          const [dRow, dCol] = directions[direction];
          const nextPos = [row + dRow, col + dCol];

          if (
            !isInRange(nextPos[0], 0, newGrid.length) ||
            !isInRange(nextPos[1], 0, newGrid.length)
          ) {
            break;
          }

          if (newGrid[nextPos[0]][nextPos[1]] === "#") {
            direction = mod(direction + 1, directions.length);
            continue;
          }

          position = nextPos;

          if (visited.has(getKey(direction))) {
            result++;
            break;
          }

          visited.add(getKey(direction));
        }
        //console.log(visited)
      }
    }
  }
  console.log(result);
}

part1();
part2();
