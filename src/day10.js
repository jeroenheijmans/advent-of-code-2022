const input = `
noop
noop
noop
addx 5
addx 1
addx 4
addx 1
noop
addx 4
noop
addx 1
addx 4
addx 8
addx -7
addx 3
addx 1
noop
addx 4
addx 2
addx 5
addx -1
noop
addx -37
noop
noop
addx 3
addx 2
addx 13
addx 12
addx -15
addx -2
addx 2
addx -11
addx 18
addx 2
addx -15
addx 16
addx 5
addx 2
addx 5
noop
noop
noop
addx 3
addx -2
addx -38
noop
addx 3
addx 4
noop
noop
noop
noop
noop
addx 5
addx 5
noop
noop
addx 21
addx -17
addx 6
noop
noop
noop
noop
addx 5
noop
noop
noop
noop
noop
addx 3
addx 5
addx -38
noop
noop
addx 5
addx -2
addx 1
addx 7
noop
addx 22
addx -18
addx -11
addx 27
addx -13
addx 2
addx 5
addx -8
addx 9
addx 2
noop
addx 7
noop
addx 1
noop
addx -38
noop
addx 2
addx 5
addx -3
noop
addx 8
addx 11
addx -6
noop
addx 24
addx -31
addx 10
addx 2
addx 5
addx 3
noop
addx 2
addx -29
addx 21
addx 11
addx 5
addx -39
addx 4
addx -2
addx 2
addx 7
noop
addx -1
addx 2
noop
addx 4
noop
addx 1
addx 2
addx 5
addx 2
noop
noop
addx -6
addx 9
addx -18
addx 25
addx 3
noop
addx -17
noop
`;

const data = input
  .trim()
  .split(/\r?\n/)
  .filter(x => !!x)
  .map(x => ({ opcode: x.split(" ")[0], val: parseInt(x.split(" ")[1]) }))
  ;

let cycle = 1;
let x = 1;
let signals = [];

data.forEach(line => {
  switch (line.opcode) {
    case "noop":
      cycle++;
      if ((cycle + 20) % 40 === 0) signals.push(x * cycle);
      break;

    case "addx":
      cycle++;
      if ((cycle + 20) % 40 === 0) signals.push(x * cycle);
      x += line.val;
      cycle++;
      if ((cycle + 20) % 40 === 0) signals.push(x * cycle);
      break;
  }
});

let part1 = signals.reduce((a,b) => a+b, 0);
let part2 = 0;

console.log("Part 1", part1);
console.log("Part 2", part2);