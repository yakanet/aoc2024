import { loadFileByLine } from "./utils";

type Rule = [number, number];
type Update = number[];
const lines = loadFileByLine("day05_full");

function getInput(): [Rule[], Update[]] {
  const rules: Rule[] = [];
  const updates: Update[] = [];
  let mode: "RULES" | "UPDATES" = "RULES";
  for (let line of lines) {
    if (!line) {
      mode = "UPDATES";
      continue;
    }
    if (mode === "RULES") {
      const [min, max] = line.split("|").map((x) => parseInt(x));
      rules.push([min, max]);
    } else if (mode === "UPDATES") {
      updates.push(line.split(",").map((x) => parseInt(x)));
    }
  }
  return [rules, updates];
}

function identifyValids(rules: Rule[], updates: Update[]) {
  const valids: Update[] = [];
  const invalids: Update[] = [];
  for (const update of updates) {
    let valid = true;
    for (let i = 0; i < update.length - 1; i++) {
      const current = update[i];
      const next = update[i + 1];
      const rule = rules.find(([from, to]) => from === current && to === next);
      if (!rule) {
        invalids.push(update);
        valid = false;
        break;
      }
    }
    if (valid) {
      valids.push(update);
    }
  }
  return [valids, invalids];
}

function fixUpdate(update: Update, rules: Rule[]) {
  let i = 0;
  while (i < update.length) {
    const current = update[i];
    const rule = rules.filter(([from, _]) => from === current);
    if (!rule) {
      i++;
      continue;
    }
    const left = update.slice(0, i);
    const right = update.slice(i + 1);
    const itemWrongPosition =
      left.find((num) => rule.find(([_, to]) => to === num)) ||
      right.find((num) => rule.find(([from, _]) => from === num));
    if (!itemWrongPosition) {
      i++;
      continue;
    }
    const j = update.indexOf(itemWrongPosition);
    update[j] = update[i];
    update[i] = itemWrongPosition;
    i = 0;
  }
  return update;
}

function part1() {
  let sum = 0;
  const [rules, updates] = getInput();
  const [valids] = identifyValids(rules, updates);
  for (const update of valids) {
    sum += update[Math.floor(update.length / 2)];
  }
  console.log(sum);
}

function part2() {
  let sum = 0;
  const [rules, updates] = getInput();
  const [, invalids] = identifyValids(rules, updates);
  for (const invalid of invalids) {
    const fixed = fixUpdate(invalid, rules);
    sum += fixed[Math.floor(fixed.length / 2)];
  }
  console.log(sum);
}

part1();
part2();
