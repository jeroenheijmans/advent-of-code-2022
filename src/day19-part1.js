let input = `
Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 3 ore and 19 clay. Each geode robot costs 4 ore and 15 obsidian.
Blueprint 2: Each ore robot costs 4 ore. Each clay robot costs 3 ore. Each obsidian robot costs 2 ore and 20 clay. Each geode robot costs 2 ore and 9 obsidian.
Blueprint 3: Each ore robot costs 4 ore. Each clay robot costs 3 ore. Each obsidian robot costs 4 ore and 19 clay. Each geode robot costs 4 ore and 12 obsidian.
Blueprint 4: Each ore robot costs 3 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 17 clay. Each geode robot costs 2 ore and 13 obsidian.
Blueprint 5: Each ore robot costs 2 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 16 clay. Each geode robot costs 3 ore and 13 obsidian.
Blueprint 6: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 16 clay. Each geode robot costs 2 ore and 15 obsidian.
Blueprint 7: Each ore robot costs 3 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 6 clay. Each geode robot costs 3 ore and 16 obsidian.
Blueprint 8: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 11 clay. Each geode robot costs 3 ore and 14 obsidian.
Blueprint 9: Each ore robot costs 3 ore. Each clay robot costs 3 ore. Each obsidian robot costs 2 ore and 11 clay. Each geode robot costs 2 ore and 19 obsidian.
Blueprint 10: Each ore robot costs 3 ore. Each clay robot costs 3 ore. Each obsidian robot costs 2 ore and 19 clay. Each geode robot costs 2 ore and 12 obsidian.
Blueprint 11: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 7 clay. Each geode robot costs 2 ore and 16 obsidian.
Blueprint 12: Each ore robot costs 2 ore. Each clay robot costs 2 ore. Each obsidian robot costs 2 ore and 7 clay. Each geode robot costs 2 ore and 14 obsidian.
Blueprint 13: Each ore robot costs 2 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 11 clay. Each geode robot costs 3 ore and 8 obsidian.
Blueprint 14: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 4 ore and 8 obsidian.
Blueprint 15: Each ore robot costs 3 ore. Each clay robot costs 4 ore. Each obsidian robot costs 3 ore and 16 clay. Each geode robot costs 3 ore and 14 obsidian.
Blueprint 16: Each ore robot costs 4 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 18 clay. Each geode robot costs 4 ore and 8 obsidian.
Blueprint 17: Each ore robot costs 4 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 11 clay. Each geode robot costs 4 ore and 7 obsidian.
Blueprint 18: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 2 ore and 8 clay. Each geode robot costs 3 ore and 9 obsidian.
Blueprint 19: Each ore robot costs 2 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 13 clay. Each geode robot costs 3 ore and 11 obsidian.
Blueprint 20: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 2 ore and 17 clay. Each geode robot costs 3 ore and 11 obsidian.
Blueprint 21: Each ore robot costs 3 ore. Each clay robot costs 3 ore. Each obsidian robot costs 2 ore and 20 clay. Each geode robot costs 3 ore and 18 obsidian.
Blueprint 22: Each ore robot costs 3 ore. Each clay robot costs 4 ore. Each obsidian robot costs 3 ore and 20 clay. Each geode robot costs 3 ore and 14 obsidian.
Blueprint 23: Each ore robot costs 4 ore. Each clay robot costs 3 ore. Each obsidian robot costs 2 ore and 7 clay. Each geode robot costs 3 ore and 8 obsidian.
Blueprint 24: Each ore robot costs 4 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 20 clay. Each geode robot costs 2 ore and 19 obsidian.
Blueprint 25: Each ore robot costs 2 ore. Each clay robot costs 4 ore. Each obsidian robot costs 2 ore and 20 clay. Each geode robot costs 3 ore and 15 obsidian.
Blueprint 26: Each ore robot costs 3 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 19 clay. Each geode robot costs 3 ore and 17 obsidian.
Blueprint 27: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 2 ore and 9 clay. Each geode robot costs 3 ore and 19 obsidian.
Blueprint 28: Each ore robot costs 3 ore. Each clay robot costs 3 ore. Each obsidian robot costs 2 ore and 19 clay. Each geode robot costs 2 ore and 20 obsidian.
Blueprint 29: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 2 ore and 10 clay. Each geode robot costs 3 ore and 14 obsidian.
Blueprint 30: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 12 clay. Each geode robot costs 4 ore and 19 obsidian.
`;

input2 = `
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
        if (this.geode.canBeConstructedFrom(resources)) result.push("geode");
        if (this.obsidian.canBeConstructedFrom(resources)) result.push("obsidian");
        if (this.clay.canBeConstructedFrom(resources)) result.push("clay");
        if (this.ore.canBeConstructedFrom(resources)) result.push("ore");
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

    generateKey() {
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

    for (let time = 1; time <= 32; time++) {
        // console.log("\n----------------");
        console.log("At time", time, " - length of states:", states.length);
        // console.log(states);

        let newStates = [];

        states.forEach(state => {
            const key = state.generateKey();
            if (visited.has(key)) return;
            visited.add(key);

            const constructables = blueprint.constructableRobotsFor(state.resources);
            constructables.forEach(robotKey => {
                if (robotKey === "obsidian" && time > 29) return;
                if (robotKey === "clay" && time > 26) return;
                if (robotKey === "ore" && time > 23) return;
                const newState = state.cloneForTime(time);
                newState.payForRobot(blueprint, robotKey);
                newState.collect();
                newState.robots[robotKey]++;
                newStates.push(newState);
            });
            

            // Also add a state where no robot is constructed, but only if none could be constructed:
            if (constructables.length < 4) {
                const newState = state.cloneForTime(time);
                newState.collect();
                newStates.push(newState);
            }
        });

        states = newStates;

        // Prune less promising states with some guessing:
        if (time > 20) {
            states = states.filter(s => s.robots.clay > 0);
        }
        if (time > 24) {
            states = states.filter(s => s.robots.obsidian > 0);
        }
        if (time > 25) {
            const temp = states.filter(s => s.robots.geode > 0);
            if (temp.length > 0) states = temp;
        }
    }

    console.log("Blueprint", blueprint.id, "best end state calculation...");
    const result = states.map(s => s.resources.geode).reduce((acc, curr) => Math.max(acc,curr), 0);
    console.log("...resulted in", result);
    return result;
}

let part1 = blueprints.slice(0, 3).map(b => simulate(b)).reduce((a,b) => a*b);

console.log("Part 1:", part2);
