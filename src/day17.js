let input = ">>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>";

const jets = input.split("");

const pieces = [
    { key: "-", width: 4, height: 1, coords: [[0,0],[1,0],[2,0],[3,0]] },
    { key: "+", width: 3, height: 3, coords: [[0,1],[1,0],[1,1],[2,1],[1,2]] },
    { key: "J", width: 3, height: 3, coords: [[0,0],[1,0],[2,0],[2,1],[2,2]] },
    { key: "I", width: 1, height: 4, coords: [[0,0],[0,1],[0,2],[0,3]] },
    { key: "O", width: 2, height: 2, coords: [[0,0],[0,1],[1,0],[1,1]] },
];
const levelwidth = 7;
const maxDrops = 1e5;

let part1 = 0;
let part2 = 0;

const lines = {};

let drops = 0;
let nextPieceIndex = 0;
let nextJetIndex = 0;
let height = -1;

while (drops++ < maxDrops) {
    if (drops % 1e4 === 0) console.log("Dropped pieces:", drops);
    let piece = pieces[nextPieceIndex++];
    let px = 2;
    let py = height + 4;

    while (true) {
        if (py < 0) throw new Error("Shouldn't fall through the floor");

        let jet = jets[nextJetIndex++];
        let dx = jet === "<" ? -1 : +1;
        let jetMoveIsBlocked = piece.coords.some(c => {
            let x = px + c[0] + dx;
            let y = py + c[1];
            if (x < 0 || x >= levelwidth) return true;
            if (lines[y] && lines[y].includes(x)) return true;
        });

        if (!jetMoveIsBlocked) px += dx;

        let fallMoveIsBlocked = piece.coords.some(c => {
            let x = px + c[0];
            let y = py + c[1] - 1;
            return y < 0 || (lines[y] && lines[y].includes(x));
        })

        if (fallMoveIsBlocked) {
            piece.coords.forEach(c => {
                let x = px + c[0];
                let y = py + c[1];
                lines[y] = lines[y] || [];
                lines[y].push(x);
                height = Math.max(height, y);
            });
            break;
        }

        py--;
        nextJetIndex %= jets.length;
    }

    if (drops === 2022) {
        part1 = height;
    }

    nextPieceIndex %= pieces.length;
}

console.log("Part 1:", part1);
