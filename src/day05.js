const input = `

`;

const data = input
  .trim()
  .split(/\r?\n/)
  .filter(x => !!x)
  .map(x => x)
  ;

let part1 = 0;
let part2 = 0;

data.forEach(row => {
  part1++;
});

console.log("Part 1:", part1);
console.log("Part 2:", part2);