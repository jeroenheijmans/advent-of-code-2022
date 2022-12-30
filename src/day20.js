const input = `
1
2
-3
3
-2
0
4
`;

class Nr {
    prev = null;
    next = null;

    constructor(val, index) {
        this.val = parseInt(val);
        this.fullval = parseInt(val) * 811589153
        this.index = index;
    }
}

function parseData() {
    const data = input
        .trim()
        .split(/\r?\n/)
        .filter(x => !!x)
        .map((x, index) => new Nr(x, index));

    data.forEach((nr, idx) => {
        const prevIdx = (idx - 1 + data.length) % data.length;
        const nextIdx = (idx + 1 + data.length) % data.length;
        nr.prev = data[prevIdx];
        nr.next = data[nextIdx];
    });

    return data;
}

function show(data) {
  return data
    .slice(0)
    .sort((a,b) => a.index-b.index)
    .map(nr => nr.val)
    .join(", ");
}

function showFull(data) {
    return data
        .slice(0)
        .sort((a,b) => a.index-b.index)
        .map(nr => `[${nr.index}] ${nr.val.toString().padStart(2, " ")} - (Prev: ${nr.prev.val.toString().padStart(2, " ")}, Next: ${nr.next.val.toString().padStart(2, " ")})`)
}

function move(nr, times) {
    for (let i = 0; i < Math.abs(times); i++) {
        if (nr.val < 0) {
            const currentPrev = nr.prev;
            const currentNext = nr.next;

            currentPrev.prev.next = nr;
            currentPrev.next = currentNext;
            currentNext.prev = currentPrev;
            nr.next = currentPrev;
            nr.prev = currentPrev.prev;
            currentPrev.prev = nr;

            const temp = currentPrev.index;
            currentPrev.index = nr.index;
            nr.index = temp;
        } else {
            const currentPrev = nr.prev;
            const currentNext = nr.next;

            currentNext.next.prev = nr;
            currentPrev.next = currentNext;
            currentNext.prev = currentPrev;
            nr.next = currentNext.next;
            nr.prev = currentNext;
            currentNext.next = nr;

            const temp = currentNext.index;
            currentNext.index = nr.index;
            nr.index = temp;
        }
    }
}

const part1Data = parseData();
const part2Data = parseData();

part1Data.forEach(nr => {
    move(nr, nr.val);
});

for (let n = 0; n < 10; n++) {
    part2Data.forEach(nr => {
        move(nr, nr.fullval % (part2Data.length + 1));
    });
}

function getResult(data, member = nr => nr.val) {
    let result = 0;
    let current = data.find(nr => nr.val === 0);
    let i = 0;
    while (i++ < 3001) {
        current = current.next;
        if (i % 1000 === 0) {
            result += member(current);
        }
    }
    return result;
}

let part1 = getResult(part1Data);
let part2 = getResult(part2Data, nr => nr.fullval);

console.log("Part 1:", part1);
console.log("Part 2:", part2);