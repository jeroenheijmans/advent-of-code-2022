const input = `
1
2
3
4
5
`;

let data = input
  .trim()
  .split(/\r?\n/)
  .filter(x => !!x)
  .map(x => parseInt(x))
  ;

let part1 = data.reduce((prev, curr) => prev + curr, 0);
let part2 = data.reduce((prev, curr) => prev * curr, 1);

console.log("Part 1:", part1);
console.log("Part 2:", part2);