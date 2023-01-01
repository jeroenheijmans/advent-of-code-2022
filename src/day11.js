const input = `
Monkey 0:
  Starting items: 83, 88, 96, 79, 86, 88, 70
  Operation: new = old * 5
  Test: divisible by 11
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 59, 63, 98, 85, 68, 72
  Operation: new = old * 11
  Test: divisible by 5
    If true: throw to monkey 4
    If false: throw to monkey 0

Monkey 2:
  Starting items: 90, 79, 97, 52, 90, 94, 71, 70
  Operation: new = old + 2
  Test: divisible by 19
    If true: throw to monkey 5
    If false: throw to monkey 6

Monkey 3:
  Starting items: 97, 55, 62
  Operation: new = old + 5
  Test: divisible by 13
    If true: throw to monkey 2
    If false: throw to monkey 6

Monkey 4:
  Starting items: 74, 54, 94, 76
  Operation: new = old * old
  Test: divisible by 7
    If true: throw to monkey 0
    If false: throw to monkey 3

Monkey 5:
  Starting items: 58
  Operation: new = old + 4
  Test: divisible by 17
    If true: throw to monkey 7
    If false: throw to monkey 1

Monkey 6:
  Starting items: 66, 63
  Operation: new = old + 6
  Test: divisible by 2
    If true: throw to monkey 7
    If false: throw to monkey 5

Monkey 7:
  Starting items: 56, 56, 90, 96, 68
  Operation: new = old + 7
  Test: divisible by 3
    If true: throw to monkey 4
    If false: throw to monkey 1
`;

const data = input
  .trim()
  .split(/\r?\n/)
  .filter(x => !!x)
  .map(x => x.trim());
  ;

function getMonkeys() {
  const monkeys = [];
  let current = null;
  let number = 0;
  let itemid = 1001;

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
      current.items = stuff.split(", ").map(x => ({ itemid: itemid++, worry: parseInt(x) }));
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
  return monkeys;
}

function getMonkeyBusiness(monkeys) {
  let sorted = monkeys.map(m => m.inspections).sort((a,b) => b-a);
  return sorted[0] * sorted[1];
}

function part1(monkeys) {
  for (let round = 0; round < 20; round++) {
    monkeys.forEach(monkey => {
      for (let i = 0; i < monkey.items.length; i++) {
        monkey.inspections++;
        monkey.items[i].worry = monkey.operation(monkey.items[i].worry);
        monkey.items[i].worry = Math.trunc(monkey.items[i].worry / 3);

        if (monkey.test(monkey.items[i].worry)) {
          monkeys[monkey.iftrue].items.push(monkey.items[i]);
        } else {
          monkeys[monkey.iffalse].items.push(monkey.items[i]);
        }

      }
      monkey.items = [];
    });
  }
  return getMonkeyBusiness(monkeys);
}

function part2(monkeys) {
  const denominator = monkeys.map(m => m.divisor).reduce((acc, curr) => acc * curr, 1);

  for (let round = 0; round < 10000; round++) {
    monkeys.forEach(monkey => {
      for (let i = 0; i < monkey.items.length; i++) {
        monkey.inspections++;
        monkey.items[i].worry = monkey.operation(monkey.items[i].worry);
        monkey.items[i].worry = monkey.items[i].worry % denominator;

        if (monkey.test(monkey.items[i].worry)) {
          monkeys[monkey.iftrue].items.push(monkey.items[i]);
        } else {
          monkeys[monkey.iffalse].items.push(monkey.items[i]);
        }

      }
      monkey.items = [];
    });
  }
  return getMonkeyBusiness(monkeys);
}

console.log("Part 1", part1(getMonkeys()));
console.log("Part 2", part2(getMonkeys()));
