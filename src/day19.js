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
            .map(x => ({ key: x[1], value: parseInt(x[0]) }));
    }

    canBeConstructedFrom(resources) {
        return this.costs.every(cost => resources[cost.key] >= cost.value);
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

    constructableRobotsFor(resources) {
        const result = [];
        if (this.ore.canBeConstructedFrom(resources)) result.push("ore");
        if (this.clay.canBeConstructedFrom(resources)) result.push("clay");
        if (this.obsidian.canBeConstructedFrom(resources)) result.push("obsidian");
        if (this.geode.canBeConstructedFrom(resources)) result.push("geode");
        return result;
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

class Resources {
    constructor(ore = 0, clay = 0, obsidian = 0, geode = 0) {
        this.ore = ore;
        this.clay = clay;
        this.obsidian = obsidian;
        this.geode = geode;
    }

    clone() {
        return new Resources(this.ore, this.clay, this.obsidian, this.geode);
    }
}

class RobotCollection {
    constructor(ore = 1, clay = 0, obsidian = 0, geode = 0) {
        this.ore = ore;
        this.clay = clay;
        this.obsidian = obsidian;
        this.geode = geode;
    }

    clone() {
        return new Resources(this.ore, this.clay, this.obsidian, this.geode);
    }
}

class State {
    constructor(time, resources, robots) {
        this.time = time;
        this.resources = resources;
        this.robots = robots;
    }

    // TODO: Perhaps more efficient to only update it when needed
    // instead of running stringification every time a change is
    // done?
    get key() {
        // Time doesn't matter for the key, reaching the same
        // combination of resources+robots is no bueno ever.
        return JSON.stringify({ res: this.resources, rob: this.robots });
    }

    collect() {
        this.resources.ore += this.robots.ore * 1;
        this.resources.clay += this.robots.clay * 1;
        this.resources.obsidian += this.robots.obsidian * 1;
        this.resources.geode += this.robots.geode * 1;
    }

    cloneForTime(time) {
        return new State(time, this.resources.clone(), this.robots.clone());
    }

    payForRobot(blueprint, newRobotKey) {
        blueprint[newRobotKey].costs.forEach(c => {
            this.resources[c.key] -= c.value;
        });
    }
}

function simulate(blueprint) {
    const start = new State(1, new Resources(), new RobotCollection());
    let visited = new Set();
    let states = [start];

    for (let time = 2; time <= 5; time++) {
        console.log("\n----------------\nAt time", time);
        console.log(states);

        let newStates = [];

        states.forEach(state => {
            if (visited.has(state.key)) return;
            visited.add(state.key);

            blueprint.constructableRobotsFor(state.resources).forEach(newRobotKey => {
                const newState = state.cloneForTime(time);
                newState.payForRobot(blueprint, newRobotKey);
                newState.collect();
                newState.robots[newRobotKey]++;
                newStates.push(newState);
            });

            // Also add a state where no robot is constructed:
            // Initialize new state:
            const newState = state.cloneForTime(time);
            newState.collect();
            newStates.push(newState);
        });

        states = newStates;

        // TODO: Prune less promising states...
    }
}

simulate(blueprints[0]);


let part1 = 0;
let part2 = 0;

// Solution here!

console.log("Part 1:", part1);
console.log("Part 2:", part2);
