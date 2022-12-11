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

let stateMapping = { };
let stateInspectChanges = { };
let prev = null;

for (let round = 0; round < 10000; round++) {
  const serializedStart = prev || JSON.stringify(
    monkeys.map(m => ({ nr: m.nr, items: m.items.map(i => i.itemid) }))
  );

  if (stateMapping.hasOwnProperty(serializedStart) && stateMapping.hasOwnProperty(stateMapping[serializedStart])) {
    // console.log(round, "saw old situation!");
    prev = stateMapping[serializedStart];
    monkeys.forEach((m, idx) => m.inspections += stateInspectChanges[serializedStart][idx]);
    continue;
  }

  if (!!prev) {
    throw new Error("Shouldn't be here");
  }

  const inspectChanges = monkeys.map(_ => 0);
  monkeys.forEach(monkey => {
    // console.log("Monkey", monkey.nr, " items ", monkey.items);
    // if (round % 100 === 0) console.log(round);

    for (let i = 0; i < monkey.items.length; i++) {
      monkey.inspections++;
      inspectChanges[monkey.nr]++;
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

  const serializedEnd = JSON.stringify(
    monkeys.map(m => ({ nr: m.nr, items: m.items.map(i => i.itemid) }))
  );

  stateMapping[serializedStart] = serializedEnd;
  stateInspectChanges[serializedStart] = inspectChanges;
}

let inspections2 = monkeys.map(m => m.inspections).sort((a,b) => b-a);
let part2 = inspections2[0] * inspections2[1];

console.log("Part 2", part2);
console.log("Target", 2713310158);
