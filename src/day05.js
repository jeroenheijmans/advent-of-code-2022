const input = `
[D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
`;

function parseArrangements(text) {
  text = text.replaceAll("    ", " [ ]");
  text = text.replaceAll("]", "");
  text = text.replaceAll("[", ";");
  text = text.replaceAll(" ", "");

  const lines = text.split(/\r?\n/).map(x => x.split(";"));
  const stacks = [];
  for (let y = 0; y < lines.length - 1; y++) {
    lines[y].forEach((val, idx) => {
      stacks[idx] = stacks[idx] || [];
      if (val) stacks[idx].unshift(val);
    });
  }
  return stacks;
}

const [text1, text2] = input
  .trim()
  .split(/\r?\n\r?\n/)
  ;

const arrangements = parseArrangements(text1);
const instructions = text2
  .replaceAll(/(move )|(from )|(to )/g, "")
  .split(/\r?\n/)
  .map(x => x.split(" "))
  .map(x => ({ source: x[0], from: x[1], to: x[2] }));

console.log(arrangements);
console.log(instructions);

let part1 = 0;
let part2 = 0;

console.log("Part 1:", part1);
console.log("Part 2:", part2);