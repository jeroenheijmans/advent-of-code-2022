const input = `
#.####################################################################################################
#<<v<.^<<<v.^v<>v^^vvv<<v<^><<>^^^v^v<^<v^>>.<v<v>^vv>>vvv<^<v>v^.<v^>>>>v<^^<v^v<v>>v^.v><<^vv^<><>>#
#<<v^.<^><.<<v<vv<vv><.<^.><>vv>v<>v^^>vv^<<.<^<>.v>vv>v^v>vv<v>.<<^^<.^...<<v^.^.v>>.<<><^v>vv>>v^^<#
#>v<vv>^<^>^^^^^>v<v>v.v.v>v^v^<.^^<^>^<>>^v>v<^.v^^v<^>^>^>vvv<>>.^<>^>^>v>.>.<>v..v>>vvv^>>>vv<^vv>#
#<<>v^.>v^>>v<^><v>.^v.<^v^<<<>v><>^><>v<.v>^v^><v^<>>vvv^>>>v.v.<^^.^<v<^.<<v^<<<vv<v<<>>v><v>^<^<v>#
#>>vv<v>^^^<vv<>^>>>^.<v^<^^>.v>^<>v<<..v<>^v<v>>vvv..v>v<>>^>>^>>^^^<.^^<^>v<.v<^^v^.>^<v><>.^<^^>>.#
#<v<><.<><<<^v<v<<v<>.<^>^v>v^.^.<v>vv>v..^><^.<v<<>v<^>>v<>vvv<vv<<><vv<>>^><.v<v<^^v^>v>>v>v^<vv^^<#
#>^^v^><<<^.^<v><><v^^^^.^>>>>.^v.v<.<^v>v><>^.>>.^>v>>^>>^>^><^^^<v^^^>v<^>^^<vvv<^v^<>.^vv<^>.^>^^<#
#<<vv^^^><<<v.<v>^>v>^^><v<<><<^<<<v>.<v^<<>><>^>>>><v<.^>>>><^<>>v^vv^<.<>.>>.^v>.v^>.>vvvv^v<><v^<<#
#>>v>>^<<v.^v.vvvv<>>><>^v<^<>><v<^vv<.v>v>^<v<>>^<>>>^.>^v<>>vv<vvv^<vv.<<.v<<>.>^^<>^<>^v^^^>>>^.^>#
#>><>vv>^>>v^>v>^^v.<<^v.<..>>>^^vvvv..^v>^>.<.v<^<<.><.^>.<v><<>.<v^vv><^<<>v^vv^>v<^.^^>^<<^.<<<>.<#
#<>v>>v<>>>.v<<v<^^v<>^v<^^<v.>^<^v>vv>^>v<vv><v<v<^>>vv>>>v.<<<><.<><>.<>>^><<^vvvvv^<<<v<vv>>.<<^<.#
#><<.>^v<>^.vv^>^><><.<^>>vv^vvv><v><.>^^^v^..><><.vv<^>v.v<vvv><^^v.<>v<.^v<^>>>v<v^<>^>v<v^v>^v><>>#
#><v>.>^<<v>>.<<<<vv^<<^v^>vv<^^v><>><<v<^>vv>^^>v^^^<<v.vv<><^>>>>>>>^>^^.>>^.<>^<^<v.^.<v^^>.>>v^<<#
#>><<.<^<.<<>vv<>>v<.<><^^>^<>v^<<^^^>^^<<^<>^<<v<^^^.v>v<^v>.<v<.vv>^>><.>^<.>.>>v^><<v<^<^.><.^.^v<#
#>v^^v>v><^><<^^^<<vv>>.v>^<>^^>v>^.v>>v^<^v<v^^>vv^v><>^>><^<v.v>v><<<<>v.<.^>^<v.<<<<v^<<<<>>^>v^<>#
#<^^v<<^>v.<<>^vv^^<^<v>>vvv^^<>>^v^v..v^v>v.^<^.<<v<>v><.<^<^v<>^>v<vv>v><<.vv^.>^>v..>><<.v<^v^>>^.#
#>v^v.v^v><>vv<^v^<v^v<>v<v<<>>..^.<vv^v>v.>^<vv>><^>v>>^^v^vv<^<^>>v^v>^^^><v.>>^^.v.^>><<><.vv.^>>>#
#.^>>.<^v.>vvv<v>>^<.v<v<<v^v>v.>.>v<^.<^.v.<.>vvv^vv><.^^v>>>v>^>^vv<<.<^<>>vv.^>vvvvv^><><v^<^v^>v.#
#<>v^^^.>^>>>^>v.<^.<<^^<>>v>vv.v.^.><v^<v^v<^>^>><vv>^.^.<^^<<<<v>^.>.<<.>.>^><v.v^.^<><^>^v><.vv^<<#
#>>vv^^<v<<v<.>v>^...>vv..^v^>^<>v^^^<<<.>^v>>>>.>^<.v><v><^^^vv>.v^>v.>v^>>><^v<>vv>v>v.^><^v<^^<vv>#
#>^<><<.>.>>v>>v<<^^v^.v^>.>>vv^.><<v^<v^>>>vvv<v<.<>^>>>>v>^^^.v^<.v><<v><.<v^<<<^>v^v^^^.>>>^>>v<><#
#<^v<^<<^<v^>^^<.<..vvv^^v^^><<.>^v<<vv<<>v<>><<>>v^.<v><>.<^vv<<>>>>^><v<<^v^vv.v.<vv^>^>><<^<<<v^^>#
#<v>^><><^^v>><<^>>^>><.>>v<^v>^v.<<v^>^<v>vv^^<<v><vvv>^.<v^v<^v^.^<<^<v>v^v>v.>v<>><v.v.><<^vvv^>.<#
#>><.<><>>>v...v<><v>v<^>><vv^<^^<v<v^<v>^.<^v><>>v<v^v>v^>>v<^>v<>.vv<<^^^v<>v<<^><^<v^.<^<^.>v^..><#
#><<>^vv.v<<v<<^v.><>^.<.<<<^^.v^<v^<vvv^v^>^>><^<>^>>^>^vv.^>vvvv<^<v.>^<.^vvv<><.^^>>^..v<^^<><<>><#
#<.><v<><^.><<.^<^^v^v><>^>.<^>.<v^^^>><^vv^vv<<>v.vv<^.^>^>.>>.<<^v>>^^.vv>vvv<vv>^>>>v^<>v.>.>v<>>.#
#<v>>>>^><^v^>^^vvv^<<v<v<<^^><^<vv><v>>v<>v^^>v>.<>v>^>v>>v.>.>>>^^^vv<<<>^><^<><v<^^^^^.<^vvv^<<<.<#
#.<v^<>>vv<^v^<v>>v<><.>.^^>^<v^>>v<<.<>v>^^v^v<>vv^^v>v>vvvvv>v^^<<^<><^v<v>>^<<v>>^.^v<^<<<<^v<.<><#
#<.^v>^vv^>^v<>>^^v.v<vvv.v<<^.>v><^vv>><.^<><v>..><>>.vv>>>.>v<v><v^..<v<<<^^><v<v<.v^..<v.^v<>>><^>#
#>vv.<..>^vv<^><>v>^vv<^.>^.<v^<v>vvv>>><<^v<>^<^v>^v.^v^v^><^><^<v.^vv<>^v>^<<^v^^>^^>^.v<>.<>v>>.^>#
#<v^^v<.<<vv.<>v^<^>^.<^<v<v^<<v<v.<^^>^>^v>>.<v.>^v.^v.^><<^>v<v.^vv^.^^>>>^<<>>^^<vv>v.<>^.v>^v.>v>#
#<>v>>^^<<>^^>><^vvv^^<<><><vv<vv>v>>>^><^.<v<^.>>v<<<vv.^<<^^><v><^.<><<v>^v^<^><>v..><<...<^.v.^v.>#
#>.>^>v><..^<^^^v^v<v><<^.^>.^v^v<^>>v><<.>v^<<^<<>^<.>>>v<.>>v>^^.<<>>^><v..v<vvvvv^v.<<<v..^^>.<^<<#
#<v>>.^<..>><>v^^>^^>.^^v^vv<>.<<v>><^<^<.^>^^>^<<.v^<<v^.^>v^^>>>.v><>^^<<><^<vv>^v.<^<v<<vv^v.<<<v<#
#.^^^<<v>v^vv^vv^>v^<v<^.v<^^>v^.^^^^>^<<^^>.>^^>^v<.vv>><v^v<vvv^>^>^<^^<v<>.v>^<v.<v^>.<v^.^>v^vv<>#
####################################################################################################.#
`;

const data = input
    .trim()
    .split(/\r?\n/)
    .filter(x => !!x)
    .map(x => x)
;

const maxDepth = Math.min(1000, data.length * data.length * 2);

class Location {
    constructor(time, x, y, blizzards = []) {
        this.time = time;
        this.x = x;
        this.y = y;
        this.key = `${x};${y}`;
        this.fullkey = `${time};${x};${y}`;
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

const width = data[0].length - 2;
const height = data.length - 2;

const locationsPerTimeIndex = { 0: { } };
const start = new Location(0, 0, -1);
const end = new Location(0, width - 1, height);

locationsPerTimeIndex[0][start.key] = start;
locationsPerTimeIndex[0][end.key] = end;

for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
        const loc = new Location(0, x, y, initialBlizzardVectors[data[y+1][x+1]]);
        locationsPerTimeIndex[0][loc.key] = loc;
    }
}

for (let time = 1; time < maxDepth; time++) {
    console.log("Generating level at time index", time);
    locationsPerTimeIndex[time] = Object.values(locationsPerTimeIndex[time - 1])
        .map(oldLocation => new Location(
            time,
            oldLocation.x,
            oldLocation.y,
        ))
        .reduce((acc, curr) => { acc[curr.key] = curr; return acc; }, {});
    
    Object.values(locationsPerTimeIndex[time - 1]).forEach(loc => {
        loc.blizzards.forEach(blizzard => {
            const newX = ((loc.x + blizzard[0]) + width) % width;
            const newY = ((loc.y + blizzard[1]) + height) % height;
            const newLoc = locationsPerTimeIndex[time][`${newX};${newY}`];
            newLoc.blizzards.push(blizzard);
        });
    });

    Object.values(locationsPerTimeIndex[time - 1]).forEach(loc => {
        const potentialTargets = [
            locationsPerTimeIndex[time][loc.key], // wait
            locationsPerTimeIndex[time][`${loc.x - 0};${loc.y - 1}`], // north
            locationsPerTimeIndex[time][`${loc.x + 1};${loc.y - 0}`], // east
            locationsPerTimeIndex[time][`${loc.x - 0};${loc.y + 1}`], // south
            locationsPerTimeIndex[time][`${loc.x - 1};${loc.y - 0}`], // west
        ];

        loc.targets = potentialTargets
            .filter(t => !!t) // out of bounds, no node at coordinates found
            .filter(t => t.blizzards.length === 0);
    });
}

function printTime(time) {
    for (let y = - 1; y < height + 1; y++) {
        let line = "";
        for (let x = -1; x < width + 1; x++) {
            const key = `${x};${y}`;
            if (!locationsPerTimeIndex[time][key]) {
                line += "#";
            } else if (locationsPerTimeIndex[time][key].blizzards.length === 0) {
                line += ".";
            } else if (locationsPerTimeIndex[time][key].blizzards.length === 1) {
                line += Object.keys(initialBlizzardVectors)
                    .find(k => initialBlizzardVectors[k][0] === locationsPerTimeIndex[time][key].blizzards[0]);
            } else {
                line += locationsPerTimeIndex[time][key].blizzards.length;
            }
        }
        console.log(line);
    }
    console.log();
}

// printTime(0);
// printTime(1);
// printTime(2);
// printTime(3);
// printTime(4);
// printTime(5);

let part1 = 0;
let part2 = 0;

let edges = new Set([start]);
let goals = [start, end, start, end];
let nextStop = goals.pop();

let time = 0;
while (time++ < maxDepth) {
    console.log("Searching level at time index", time);
    let newEdges = new Set();
    Array.from(edges).forEach(edge => {
        // Safe guard against bugs:
        if (edge.targets.some(t => t.time !== time)) {
            throw new Error("Uh oh how could we reach that?");
        }
        edge.targets.forEach(t => newEdges.add(t));
    });
    if (part1 === 0 && Array.from(newEdges).find(loc => loc.x === end.x && loc.y === end.y)) {
        part1 = time;
    }
    const currentGoal = Array.from(newEdges).find(loc => loc.x === nextStop.x && loc.y === nextStop.y);
    if (currentGoal) {
        console.log("Next goal:", nextStop.key, " - further goals:", goals.map(g => g.key).join(" >>> "));
        newEdges = new Set([currentGoal])
        nextStop = goals.pop();
        if (goals.length === 0) {
            part2 = time;
            break;
        }
    }
    edges = newEdges;
}

console.log("Part 1:", part1);
console.log("Part 2:", part2);