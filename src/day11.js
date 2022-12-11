const input = `
Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1

`;

const data = input
  .trim()
  .split(/\r?\n/)
  .filter(x => !!x)
  .map(x => x.trim());
  ;

const monkeys = [];
let current = null;
let number = 0;

data.forEach(line => {
  if (line.includes("Monkey ")) {
    current = {
      nr: number++,
      items: [],
      divisor: null,
      operation: null,
      iftrue: null,
      iffalse: null,
      inspections: 0,
    };
    monkeys.push(current);
  }
  if (line.includes("Starting items: ")) {
    const stuff = line.replace("Starting items: ", "");
    current.items = stuff.split(", ").map(x => parseInt(x));
  }
  if (line.includes("Test: divisible by ")) {
    const nr = parseInt(line.replace("Test: divisible by ", ""));
    current.test = (lvl) => lvl % nr === 0;
    current.divisor = nr;
  }
  if (line.includes("Operation: new = ")) {
    const stuff = line.replace("Operation: new = old ", "");
    let isAddition = stuff.includes("+ ");
    if (stuff.includes("old")) {
      if (isAddition) {
        current.operation = (old) => old + old;
      } else {
        current.operation = (old) => old * old;
      }      
    } else {
      const nr = parseInt(stuff.substring(2));
      if (isAddition) {
        current.operation = (old) => nr + old;
      } else {
        current.operation = (old) => nr * old;
      }
    }
  }
  if (line.includes("If true")) {
    current.iftrue = parseInt(line.replace("If true: throw to monkey ", ""));
  }
  if (line.includes("If false")) {
    current.iffalse = parseInt(line.replace("If false: throw to monkey ", ""));
  }
});

let bigdivisor = monkeys.map(m => m.divisor).reduce((curr,prev) => curr * prev, 1);

for (let round = 0; round < 20; round++) {
  monkeys.forEach(monkey => {
    // console.log("Monkey", monkey.nr, " items ", monkey.items);

    for (let i = 0; i < monkey.items.length; i++) {
      monkey.inspections++;
      
      monkey.items[i] = monkey.operation(monkey.items[i]);
      monkey.items[i] = Math.trunc(monkey.items[i] / bigdivisor);

      // console.log("    changes were made, now:", monkey.items);
      if (isNaN(monkey.items[i])) throw new Error("Here");
      
      if (monkey.test(monkey.items[i])) {
        monkeys[monkey.iftrue].items.push(monkey.items[i]);
      } else {
        monkeys[monkey.iffalse].items.push(monkey.items[i]);
      }

    }
    monkey.items = [];
  });
}

for (let round = 0; round < 10000; round++) {
  monkeys.forEach(monkey => {
    // console.log("Monkey", monkey.nr, " items ", monkey.items);
    if (round % 100 === 0) console.log(round);

    for (let i = 0; i < monkey.items.length; i++) {
      monkey.inspections++;
      
      monkey.items[i] = monkey.operation(monkey.items[i]);
      monkey.items[i] = Math.trunc(monkey.items[i] / 3);

      // console.log("    changes were made, now:", monkey.items);
      if (isNaN(monkey.items[i])) throw new Error("Here");
      
      if (monkey.test(monkey.items[i])) {
        monkeys[monkey.iftrue].items.push(monkey.items[i]);
      } else {
        monkeys[monkey.iffalse].items.push(monkey.items[i]);
      }

    }
    monkey.items = [];
  });
}

let inspections = monkeys.map(m => m.inspections).sort((a,b) => b-a);

let part1 = inspections[0] * inspections[1];
let part2 = 0;

console.log("Part 1", part1);
console.log("Part 2", part2);