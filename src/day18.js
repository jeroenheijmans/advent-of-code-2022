const input = `
1,1,1
1,1,2
1,1,3
1,2,1
1,2,2
1,2,3
1,3,1
1,3,2
1,3,3
1,4,1
1,4,2
1,4,3
1,5,1
1,5,2
1,5,3

3,1,1
3,1,2
3,1,3
3,2,1
3,2,2
3,2,3
3,3,1
3,3,2
3,3,3
3,4,1
3,4,2
3,4,3
3,5,1
3,5,2
3,5,3

2,1,1
2,1,2
2,1,3
2,2,1

2,2,3
2,3,1

2,3,3
2,4,1

2,4,3
2,5,1
2,5,2
2,5,3
`;

const dropcoords = new Set(input.trim().split(/\r?\n/));

const data = input
    .trim()
    .split(/\r?\n/)
    .filter(x => !!x)
    .map(x => x.split(",").map(i => parseInt(i)))
    ;

let part1 = 0;

data.forEach(droplet => {
  if (!data.some(other => other !== droplet && other[0] === droplet[0] && other[1] === droplet[1] && other[2] - droplet[2] === +1)) part1++;
  if (!data.some(other => other !== droplet && other[0] === droplet[0] && other[1] === droplet[1] && other[2] - droplet[2] === -1)) part1++;
  if (!data.some(other => other !== droplet && other[0] === droplet[0] && other[2] === droplet[2] && other[1] - droplet[1] === +1)) part1++;
  if (!data.some(other => other !== droplet && other[0] === droplet[0] && other[2] === droplet[2] && other[1] - droplet[1] === -1)) part1++;
  if (!data.some(other => other !== droplet && other[1] === droplet[1] && other[2] === droplet[2] && other[0] - droplet[0] === +1)) part1++;
  if (!data.some(other => other !== droplet && other[1] === droplet[1] && other[2] === droplet[2] && other[0] - droplet[0] === -1)) part1++;
});

let minx = Math.min(...data.map(droplet => droplet[0]));
let miny = Math.min(...data.map(droplet => droplet[1]));
let minz = Math.min(...data.map(droplet => droplet[2]));

let maxx = Math.max(...data.map(droplet => droplet[0]));
let maxy = Math.max(...data.map(droplet => droplet[1]));
let maxz = Math.max(...data.map(droplet => droplet[2]));

const considered = new Set();
const bubbles = new Set();

data.forEach(droplet => {
  for (let x = droplet[0] - 1; x <= droplet[0] + 1; x++) {
    for (let y = droplet[1] - 1; y <= droplet[1] + 1; y++) {
      for (let z = droplet[2] - 1; z <= droplet[2] + 1; z++) {
        if (
          data.some(other => other[0] === x && other[1] === y && other[2] - z === +1) &&
          data.some(other => other[0] === x && other[1] === y && other[2] - z === -1) &&
          data.some(other => other[0] === x && other[2] === z && other[1] - y === +1) &&
          data.some(other => other[0] === x && other[2] === z && other[1] - y === -1) &&
          data.some(other => other[1] === y && other[2] === z && other[0] - x === +1) &&
          data.some(other => other[1] === y && other[2] === z && other[0] - x === -1)
        ) {
          const coords = `${x},${y},${z}`;
          if (!dropcoords.has(coords)) bubbles.add(coords);
        }
      }
    }
  }
});
console.log(bubbles);

let part2 = part1 - (bubbles.size * 6);

console.log("Part 1:", part1);
console.log("Part 1:", part2);