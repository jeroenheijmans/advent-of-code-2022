const input = `
draai 90
spring 0
draai -90
loop 3
draai 90
loop 3
draai 180
loop 3
draai 90
loop 3
draai 90
loop 4
draai -90
draai 90
spring 47
draai 90
spring 6
draai 180
loop 5
draai 45
loop 1
draai 45
loop 2
draai 45
loop 1
draai 45
loop 2
draai 90
loop 3
draai 180
loop 3
draai 90
loop 3
draai 180
draai 90
spring -37
draai -90
draai -90
loop 4
draai 90
loop 3
draai 90
loop 3
draai 180
loop 3
draai 90
loop 3
draai 90
loop 4
draai -90
draai 90
spring 12
draai 90
spring 6
draai 180
loop 6
draai -90
loop 2
draai 180
loop 4
draai -90
draai 90
spring -21
draai 90
spring 6
draai 180
draai -90
loop 4
draai 90
loop 3
draai 90
loop 3
draai 180
loop 3
draai 90
loop 3
draai 90
loop 4
draai -90
draai 90
spring 56
draai 90
spring 6
draai 180
draai 90
loop 2
draai -45
loop 2
draai -45
loop 2
draai 315
loop 2
draai -45
loop 2
draai -90
loop 6
draai 180
draai 90
spring -32
draai -90
loop 6
draai 135
loop 3
draai -90
loop 3
draai 135
loop 6
draai 180
draai 90
spring 3
draai -90
loop 5
draai 45
loop 1
draai 45
loop 2
draai 45
loop 1
draai 45
loop 2
draai 90
loop 3
draai 180
loop 3
draai 90
loop 3
draai 180
draai 90
spring 10
draai -90
loop 6
draai 135
loop 6
draai -135
loop 6
draai 90
spring -43
draai 90
spring 6
draai 180
draai 90
loop 3
draai -45
loop 1
draai -45
loop 1
draai -45
loop 1
draai -45
loop 2
draai 45
loop 1
draai 45
loop 1
draai 45
loop 1
draai 45
loop 3
draai -90
`;

const data = input
    .trim()
    .split(/\r?\n/)
    .filter(x => !!x)
    .map(x => x.split(" "))
    ;

const pos = [0, 0];
const vectors = [[0,1], [1,1], [1,0], [1,-1], [0,-1], [-1,-1], [-1,0], [-1, 1]];
let vectorIndex = 0;
const rotations = {
    "45": 1,
    "90": 2,
    "135": 3,
    "180": 4,
    "225": 5,
    "270": 6,
    "315": 7,
    "360": 8,
    "-45": -1,
    "-90": -2,
    "-135": -3,
    "-180": -4,
    "-225": -5,
    "-270": -6,
    "-315": -7,
    "-360": -8,
};

let grid = {}, maxx = 0, maxy = 0, minx = 0, miny = 0;

for (let i = 0; i < data.length; i++) {
    if (data[i][0] === "draai") {
        vectorIndex = (vectorIndex + vectors.length + rotations[data[i][1]]) % vectors.length;
    } else {
        const step = parseInt(data[i][1]);

        for (let x = step; x > 0; x--) {
            grid[pos[1]] = grid[pos[1]] || {};
            grid[pos[1]][pos[0]] = "#";
            
            pos[0] = pos[0] + vectors[vectorIndex][0];
            pos[1] = pos[1] + vectors[vectorIndex][1];

            maxx = Math.max(maxx, pos[0]);
            minx = Math.min(minx, pos[0]);
            maxy = Math.max(maxy, pos[1]);
            miny = Math.min(miny, pos[1]);
        }
        
        grid[pos[1]] = grid[pos[1]] || {};
        grid[pos[1]][pos[0]] = "#";
    }
}

let part1 = Math.abs(pos[0]) + Math.abs(pos[1]);

console.log("Part 1 ended at", pos, "solution is then:", part1);

console.log("Part 2:");
let part2 = "";
for (let y = miny - 2; y < maxy + 3; y++) {
    for (let x = minx - 2; x < maxx + 3; x++) {
        if (grid[y] && grid[y][x]) {
            part2 += " ";
        } else {
            part2 += "#";
        }
    }
    part2 += "\n";
}
console.log(part2);