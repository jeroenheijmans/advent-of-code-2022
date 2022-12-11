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

const statemap = {};
let givenstate = null;

for (let round = 0; round < 10000; round++) {
  if (round === 1 || round === 20 || round === 1000) {
    console.log("------------------------------------------------------", round);
    monkeys.forEach(m => console.log("Monkey", m.nr, "inspected", m.inspections, "times."));
  }

  const startState = givenstate || monkeys.map(m => JSON.stringify({ nr: m.nr, items: m.items.map(i => i.itemid) }));

  if (statemap.hasOwnProperty(startState) && statemap.hasOwnProperty(statemap[startState].newState)) {
    Object.keys(statemap[startState].inspectsPerMonkey)
      .forEach(key => monkeys[key].inspections += statemap[startState].inspectsPerMonkey[key]);
    givenstate = statemap[startState].newState;
    continue;
  }

  const inspectsPerMonkey = {};
  
  monkeys.forEach(monkey => {
    inspectsPerMonkey[monkey.nr] = 0;
    for (let i = 0; i < monkey.items.length; i++) {
      inspectsPerMonkey[monkey.nr]++;
      monkey.items[i].worry = monkey.operation(monkey.items[i].worry);

      if (monkey.test(monkey.items[i].worry)) {
        monkeys[monkey.iftrue].items.push(monkey.items[i]);
      } else {
        monkeys[monkey.iffalse].items.push(monkey.items[i]);
      }
    }
    monkey.items = [];
    monkey.inspections += inspectsPerMonkey[monkey.nr];
  });

  const endState = monkeys.map(m => JSON.stringify({ nr: m.nr, items: m.items.map(i => i.itemid) }));

  statemap[startState] = {
    inspectsPerMonkey,
    newState: endState,
  };
}

let inspections1 = monkeys.map(m => m.inspections).sort((a,b) => b-a);
let part1 = inspections1[0] * inspections1[1];
let part2 = 0;
console.log(inspections1);
console.log("Part 1", part1);
console.log("Part 2", part2);

