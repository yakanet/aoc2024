import { isInRange, loadFileGrid } from "./utils";

const content = loadFileGrid("day04_full");
const width = content[0].length;
const height = content.length;
const WORD = "XMAS";
const XWORD = "MAS";

function part1() {
  let result = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      result += checkWordAt(x, y);
    }
  }
  console.log(result);
}

function part2() {
  let result = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      result += checkXWordAt(x, y);
    }
  }
  console.log(result);
}

function wordChecker(word: string, x: number, y: number) {
  return (dx: number, dy: number) => {
    for (let i = 0; i < word.length; i++) {
      const posX = x + dx * i;
      const posY = y + dy * i;
      if (!isInRange(posX, 0, width) || !isInRange(posY, 0, height)) {
        return 0;
      }
      if (content[posY][posX] !== word[i]) {
        return 0;
      }
    }
    return 1;
  };
}

function checkWordAt(x: number, y: number): number {
  const checkWordOffset = wordChecker(WORD, x, y);
  let result = 0;
  result += checkWordOffset(-1, -1);
  result += checkWordOffset(-1, 0);
  result += checkWordOffset(-1, 1);

  result += checkWordOffset(0, -1);
  result += checkWordOffset(0, 1);

  result += checkWordOffset(1, -1);
  result += checkWordOffset(1, 0);
  result += checkWordOffset(1, 1);

  return result;
}

function checkXWordAt(x: number, y: number): number {
  const check = (rx: number, ry: number) => wordChecker(XWORD, x + rx, y + ry)(-rx, -ry);
  let result = 0;
  if (check(-1, -1) && check(1, -1)) {
    result++;
  }
  if (check(-1, -1) && check(-1, 1)) {
    result++;
  }
  if (check(1, 1) && check(1, -1)) {
    result++;
  }
  if (check(1, 1) && check(-1, 1)) {
    result++;
  }
  return result;
}

part1();
part2();
