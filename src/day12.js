const input = `
abccccaaaaaaaaaaaaaccaaaaaaaacccccccccaaaaaaaaccccccccaaacaaacccccccaaaaaaccccccccccccccccccccccaaaacccccccccccacccccccccccccccccccccccccccccccccccccccccccccccaaaa
abccccaaaaacaaaaaaccccaaaaaaccccccccccaaaaaaacccccccccaaaaaaacccccaaaaaaaaaacccccccccccccccccccaaaaaacccccccccaaaaaaaaccccccccccccccccccccccccccccccccccccccccaaaaa
abcccaaaaaccaaaaaaccccaaaaaaccccccaacccaaaaaacccccccccaaaaaacccaaaaaaaaaaaaaaacaaccacccccccccccaaaaaaccccccccccaaaaaacccccccccccccccccccccccccccccccccccccccccaaaaa
abccccccaaccaaaaaaccaaaaaaaaccccccaaacaaaacaaacccccccaaaaaaaaccaaaaaaaaaaaaaaacaaaaacccccccccccccaaccccccccccccaaaaaaccccccccccccccccccccccccccccacccccccccccaaaaaa
abccccccccccaaccaaccaaaaccaacccccccaaaaaaaccccccccccaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacccccccaaaaccccccccccccccccaaaaaaaacccccccccccccccccccccccccccaaccccccccccccccaa
abcccccccaaaaacccaaaaaaaacccaaccccaaaaaaccccccccccccaaaaaaaaaaaaaaaacaaaaaaaccaaaaaaccccccaaaaaccccccccccccccaaaaaaaaaaccaccccccccccccccccccccccccaccccccccccccccca
abcccccccaaaaacccaaaaaaaaccaaaaccaaaaaaaaccccccccccccccaaacaaaaaaaaacaaaaaacccccaaaacccccaaaaaaccccccccccccccaaaaaaaaaaaaacccccccccccccccllllllccccdccccccccccccccc
abccccccaaaaaacccccaaaaccccaaaaacaaaaaaaaccccccccccccccaaacccccaaaccccaaaaaacccaaccccccccaaaaaacccccccccccccccccaaaaaaaaaacccccccccccccklllllllllcddddccaccaaaccccc
abccccccaaaaaacccccaaaaaaaaaaaaaaaccaaccccccaacaacccccccaaccccccccccccaaacaacccccccccccccaaaaaacccccccccccccccccaaaaaaaaaacccccccccccckklllppllllcddddddddaaaaccccc
abccccccaaaaaaccccaaacaaaaaaaaaaaaccaaccccccaaaaaccccccccccccccccccccccccccccccccccccccccccaaccccccaaccccccccccccaacaaaaaaaccccccccccckklpppppplllmdddddddddacccccc
abccccccccaaacccccaacccaccaaaaaaccccccccccccaaaaaaccccccccccccccccccccccccccccccccccccccccccccccccaaaaccccccccccccaaaaaaaaaaccccccccckkkkppppppplmmmmmmddddddaacccc
abccccaaacaaacccccccccccccaaaaaaccccccccccccaaaaaacccccccccccccccccaaaccccccccccccccccccccccccccccaaaaccccccccccccaaaaaaaaaaccccccccckkkppppuppppmmmmmmmmddeeeacccc
abccccaaaaaaacccccccccccccaaaaaacccaccccccccaaaaaacccccccccccccccccaaaacccccccccccccccccccccaaacccaaaacccccccccccaaaacaaaccccccccccckkkpppuuuuuppqqmmmmmmmmeeeacccc
abcccccaaaaaaccccccccccccaaaaaaaacaaccccccccccaaaccccccccccccccccccaaaaccccccccccccccccccccaaaaccccccccccccccccccaaaaaaaacccccccccckkkkpppuuuuupqqqqqqqmmmmeeeccccc
abcccccaaaaaaaacccccccccccaccccaaaaacccccccccccccccccccccccccccccccaaaccccccccccccccaaaccccaaaacccccccccccccaaccaaaaaaaaccccccccckkkkkrrpuuuxuuuqqqqqqqqmmmmeeccccc
abccccaaaaaaaaaccccccccccccccaaaaaacccccccacaacccccccccccccccccccccccccccccccccccccaaaaaacccaaaccccccccccaaaaccaaaaaaacccccccccckkkkrrrrruuuxxuvvvvvvqqqqnnneeccccc
abcccaaaaaaaaaaccccccccccccccaaaaaaaacccccaaaaacccccccccccccccaaaaaccccccccccccccccaaaaaaccccccccccccccccaaaaaaaaaaaaacccccccccjjjkrrrrruuuxxxxvvvvvvvqqqnnneeccccc
abcaaaaacaaacccccccccccccccccaaaaaaaacccccaaaaaccaacccccccccccaaaaaccccccccccccccccaaaaaccccccccccccccccccaaaaaccaaaaaacccccccjjjrrrrruuuuuxxxyvyyyvvvqqqnneeeccccc
abcaaaaacaaaccaaccccccccccccccccaacccccccaaaaaaaaaaaccccccccccaaaaaaccccccccccccccccaaaaaccccccccccccccccaaaaacccaaaaaaaacaaacjjjrrrtttuuxxxxxyyyyyvvvqqnnneeeccccc
abaaaaaccaacccaaaccaacccaaccccccaccccccccaaaaaaaaaacccccccccccaaaaaaccccccccccccccccaacaacccccccccccccccccccaacccaaccccaaaaaacjjjrrrtttxxxxxxxyyyyyvvvrrnnneeeccccc
SbaaaaacccccccaaaaaaaccaaaacccccccccccccccaaaaaaaaacccccccccccaaaaaaccccccccccccccccccccccccccccccccccccccccccccccaacccaaaaaacjjjrrrtttxxxEzzzzyyyvvvrrnnneeecccccc
abcaaaaacccccccaaaaaaccaaaacccccccccccccccaaaaaaaaacccccccccccccaaccccccccccccccccccccccccccccaaccccccccccaaccccacaaaacaaaaaaajjjrrrtttxxxxxyyyyyvvvrrrnnnfffcccccc
abcaacccccccaaaaaaaacccaaaaccccccccccccccccaaaaaaaaaaccccccccccccccccccccccccccccccccccccccaaaaaccccccccccaaccccaaaaaaaaaaaaaajjjqqqttttxxxxyyyyyyvvrrrnnnfffcccccc
abccccccccccaaaaaaaaaccccccccccccccccccccaaaaaaaaaaaaacccccccccccccccccaacccccccccccccccccccaaaaaccccccaacaaaaaccaaaacaaaaaaaacjjjqqqqttttxxyywyyyywvrrnnnfffcccccc
abccccccccccaaaaaaaaaacccccccccccccccccccaaaaaaaaacaaacccccccccccccaaacaacccccccccccccccccccaaaaaccccccaaaaaaaaccaaaaccccaaacccjjjjqqqqtttxwywwwyywwwrrnnnfffcccccc
abcccccccccccccaaaaaaacccccccccccccccccccaaaaaaaaaaaaaaaacccccccccccaaaaaccccccccccccccccccaaaaacccaaccccaaaaccccaacaacccaaaccccjjjiqqqtttwwywwwwwwwwrrroofffcccccc
abcccccccccccccaaaccccccccccccccccccccccaaaaaaaaaaaaaaaaaccccccccccccaaaaaacccccccccccccccccccaaacaaaccccaaaaaccccccccccccccccccciiiiqqqttwwwwwswwwwrrrroofffcccccc
abcccccccccccccaaccccccccccccaaaacccccccaaaaaaaaccaaaaacccccccccccccaaaaaaacccccccccccccccccccaaaaaaacccaaacaacccccaaaaacccccccccciiiqqqttwwwwsssssrrrrroofffaccccc
abcccccccccccccccccccccccccccaaaaccccccccacaaacccaaaaaaccccccaaccccaaaaaaccccccccaacaaccccccccaaaaaaccccaaaacacccccaaaaacccccccccciiiqqqtsswsssssssrrrrooofffaccccc
abcccccccccccccccccccccccccccaaaaccccccccccaaaccaaaaaaaccccccaaaaccaacaaaccccccccaaaaacccccccccaaaaaaaaccaaacacccccaaaaaacccccccccciiqqqssssssspposrrroooofffaccccc
abccccaaacccccccccccccccccccccaaacccccccccccccccaaacaaaccccaaaaaacccccaaaccccccccaaaaaacccccccaaaaaaaaaaaaaaaaaccccaaaaaaccccccaccciiiqqpsssssppppooooooogffaaccccc
abccccaaaaaacccaaaccccccccccccccccccccccccccccccccccccaccccaaaaacccccccccccccccccaaaaaaccccccaaaaaaaaaaaaaaaaaaccccaaaaaacccaaaaccciiiqqppppppppppoooooogggfaaacccc
abcccaaaaaaacccaaaccccccccccccccccccccccccccccccccccccccccccaaaaaccccccccccccccccaaaaaaccccccaaacaaaccccaaaaaacccccccaacccccaaaaaacciiipppppppphgggggggggggaaaacccc
abccaaaaaaaacccaaacaaacccccccccccccccccccccaacccccccccccccccaacaacccccaacccccccccccaaacccccccccccaaacccccaaaaacccccccccccccccaaaaacciiihppppphhhhgggggggggaaccccccc
abccaaaaaaacaaaaaaaaaacccccccccccccccccccccaaaccccccacccccccccccccccccaaccccccccccccccccccccccccaaaaccccaaaaaaccccccccccccccaaaaacccciihhhhhhhhhhgggggggccaaccccccc
abccccaaaaaaaaaaaaaaacccccccccccccccccccaaaaaaaaccccaaacaaaccccccccccaaaaccaaccccccccaacaacccccaaaaaaacccaacccccccccccccccccaacaaccccchhhhhhhhhaaaacccccccccccccccc
abccccaaaaaacaaaaaaaccccccccccccccccccccaaaaaaaaccccaaaaaaaccccccccccaaaaaaaacaccccccaaaaaccccccaaaaacccccccccccccccccccccccccccccccccchhhhhhacaaaaaccccccccccccccc
abccccaaccccccaaaaaacccccccccccccaaccccccaaaaaacccccaaaaaaccccccaaaaaaaaaaaaaaaccccccaaaaaacccaaaaaaacccccccccccccccccccccccccccccccccccccaaaaccaaacccccccccccaaaca
abccccccccccccaaaaaaaccccccccccccaaccccccaaaaaacccaaaaaaaaccccccaaaaaaaaaaaaaacccccccaaaaaacccaaaaaaaaccccccaaacccccccccccccccccccccccccccaaaaccccccccccccccccaaaaa
abccaaacccccccaaacaaacccccccccaaaaaaaacccaaaaaacccaaaaaaaaacccccaaaaaaaaaaaaaacccccccaaaaaccccaaaaaaaaccccccaaaaccccccccccccccccccccccccccaaaccccccccccccccccccaaaa
abcaaaacccccccaaccccccccccccccaaaaaaaacccaaccaacccaaaaaaaaaaccccccccaaaaaaacaacccccccccaaaccccccaaacaaccccccaaaacccccccccccccccccccccccccccccccccccccccccccccaaaaaa
`;

const data = input
  .trim()
  .split(/\r?\n/)
  .filter(x => !!x)
  .map(x => x.trim().split(""));
  ;

const graph = { };
let start = null;
let target = null;

for (let y = 0; y < data.length; y++) {
  for (let x = 0; x < data[0].length; x++) {
    if (data[y][x] === "S") {
      start = `${x};${y}`;
      data[y][x] = "a";
    }
    if (data[y][x] === "E") {
      target = `${x};${y}`;
      data[y][x] = "z";
    }
    graph[`${x};${y}`] = {
      key: `${x};${y}`,
      downwards: [],
      upwards: [],
      letter: data[y][x],
      value: data[y][x].charCodeAt(0) - 96,
    };
  }
}

for (let y = 0; y < data.length; y++) {
  for (let x = 0; x < data[0].length; x++) {
    const key = `${x};${y}`;
    const height = graph[key].value;
    const gridNeighbors = [];
    if (x > 0) gridNeighbors.push(graph[`${x-1};${y}`]);
    if (y > 0) gridNeighbors.push(graph[`${x};${y-1}`]);
    if (x < data[0].length - 1) gridNeighbors.push(graph[`${x+1};${y}`]);
    if (y < data.length - 1) gridNeighbors.push(graph[`${x};${y+1}`]);
    graph[key].downwards = gridNeighbors.filter(n => n.value >= height || n.value === height - 1);
    graph[key].upwards = gridNeighbors.filter(n => n.value <= height || n.value === height + 1);
  }
}

function solveFor(start, ends, linktype) {
  let paths = [[start]];
  let visited = new Set(start);
  let loop = 0, result = 0;
  
  while (loop++ < 1000 && result === 0) {
    const newPaths = []
    
    paths.forEach(path => {
      const candidates = graph[path.at(-1)][linktype].filter(c => !visited.has(c.key));
      candidates.forEach(candidate => {
        if (!visited.has(candidate.key)) {
          newPaths.push([...path, candidate.key]);
          visited.add(candidate.key);
        }
      });
    });

    paths = newPaths;

    paths.forEach(p => {
      if (ends.has(graph[p.at(-1)].key)) result = p.length - 1; // -1 because start is not a step
    });
  }
  return result;
}

const lowpoints = Object.values(graph).filter(n => n.value === 1).map(n => n.key);

console.log("Part 1", solveFor(start, new Set([target]), "upwards"));
console.log("Part 2", solveFor(target, new Set(lowpoints), "downwards"));