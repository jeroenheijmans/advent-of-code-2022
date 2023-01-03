let input = `
`;

input = `
Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian.
Blueprint 2: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 8 clay. Each geode robot costs 3 ore and 12 obsidian.
`;

function getAllMatches(text, regex) {
    console.log("---matching", text);
    let result = [];
    let match;
    while (match = regex.exec(text)) {
        console.log("matched!", match);
        result.push(match[1]);
    }
    return result;
}

class Robot {
    constructor(produces, costs) {
        this.produces = produces;

        const [_, data] = /costs ([^.]+)/g.exec(costs);
        this.costs = data
            .split(" and ")
            .map(x => x.split(" "))
            .reduce((result, next) => {
                result[next[1]] = parseInt(next[0]);
                return result;
            }, {});
    }
}

class Blueprint {
    constructor(id, ore, clay, obsidian, geode) {
        this.id = id;
        this.ore = ore;
        this.clay = clay;
        this.obsidian = obsidian;
        this.geode = geode;
    } 
}

const blueprints = input
    .trim()
    .split(/\r?\n/)
    .filter(x => !!x)
    .map(line => {
        const [_1, id, bots] = /Blueprint (\d+): (.+)/.exec(line);
        const [ore, clay, obsidian, geode] = bots.split(". Each");
        return new Blueprint(
            id,
            new Robot("ore", ore),
            new Robot("clay", clay),
            new Robot("obsidian", obsidian),
            new Robot("geode", geode),
        );
    });



let part1 = 0;
let part2 = 0;

// Solution here!

console.log("Part 1:", part1);
console.log("Part 2:", part2);
