const input = `
#.#####
#.....#
#>....#
#.....#
#...v.#
#.....#
#####.#
`;

const data = input
    .trim()
    .split(/\r?\n/)
    .filter(x => !!x)
    .map(x => x)
    ;

class Location {
    constructor(time, x, y, blizzards = []) {
        this.time = time;
        this.x = x;
        this.y = y;
        this.key = `${x};${y}`;
        this.blizzards = blizzards;
    }
}

const initialBlizzardVectors = {
    ">": [[+1, 0]],
    "<": [[-1, 0]],
    "v": [[0, +1]],
    "^": [[0, -1]],
    ".": [],
};

const locationsPerTimeIndex = [[]];

for (let y = 1; y < data.length - 1; y++) {
    for (let x = 1; x < data[0].length - 1; x++) {
        const loc = new Location(0, x, y, initialBlizzardVectors[data[y][x]]);
        locationsPerTimeIndex[0][loc.key] = loc;
    }
}

// link level 0 locations to each other

for (let time = 1; time < 500; time++) {
    locationsPerTimeIndex.push(
        locationsPerTimeIndex[time - 1].map(oldLocation => new Location(
            oldLocation.time + 1,
            oldLocation.x,
            oldLocation.y,
        ))
    );
    
    // set new blizzards based on old ones
    // link locations to each other
}

let part1 = 0;
let part2 = 0;

const start = { x: 1, y: 0 };
const end = { x: data[data.length - 1].indexOf("."), y: data.length - 1 };

// Search shortest path to end

console.log("Part 1:", part1);
console.log("Part 2:", part2);