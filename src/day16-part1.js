let input = `
Valve JZ has flow rate=0; tunnels lead to valves IR, LY
Valve KD has flow rate=0; tunnels lead to valves NJ, ZS
Valve VW has flow rate=0; tunnels lead to valves IT, VH
Valve HS has flow rate=0; tunnels lead to valves OC, PN
Valve EU has flow rate=19; tunnel leads to valve GQ
Valve XF has flow rate=0; tunnels lead to valves WL, QD
Valve DD has flow rate=8; tunnels lead to valves GQ, YY, JV, SK
Valve TA has flow rate=0; tunnels lead to valves NJ, VJ
Valve IR has flow rate=9; tunnels lead to valves JZ, WI, VJ, GC, WG
Valve SS has flow rate=17; tunnels lead to valves SI, IZ, RK, WI
Valve SG has flow rate=0; tunnels lead to valves NV, NJ
Valve IT has flow rate=0; tunnels lead to valves LL, VW
Valve CP has flow rate=24; tunnels lead to valves HN, ZK, EJ
Valve SK has flow rate=0; tunnels lead to valves LL, DD
Valve IS has flow rate=0; tunnels lead to valves AA, LL
Valve HN has flow rate=0; tunnels lead to valves FF, CP
Valve VH has flow rate=10; tunnels lead to valves QO, VW, RV, PN
Valve JV has flow rate=0; tunnels lead to valves DD, RK
Valve ZS has flow rate=0; tunnels lead to valves KD, LL
Valve UC has flow rate=25; tunnels lead to valves JD, IV
Valve WI has flow rate=0; tunnels lead to valves SS, IR
Valve UR has flow rate=0; tunnels lead to valves QD, LY
Valve GC has flow rate=0; tunnels lead to valves AA, IR
Valve YY has flow rate=0; tunnels lead to valves DD, AA
Valve IV has flow rate=0; tunnels lead to valves ZK, UC
Valve BM has flow rate=0; tunnels lead to valves SA, WL
Valve JD has flow rate=0; tunnels lead to valves IZ, UC
Valve WL has flow rate=12; tunnels lead to valves EF, BM, EJ, XF
Valve AA has flow rate=0; tunnels lead to valves NV, YY, GC, IS, QO
Valve WG has flow rate=0; tunnels lead to valves LL, IR
Valve GQ has flow rate=0; tunnels lead to valves EU, DD
Valve SI has flow rate=0; tunnels lead to valves SS, NJ
Valve KH has flow rate=13; tunnels lead to valves SA, ON
Valve PC has flow rate=22; tunnel leads to valve ON
Valve QD has flow rate=14; tunnels lead to valves XF, UR
Valve IZ has flow rate=0; tunnels lead to valves SS, JD
Valve QO has flow rate=0; tunnels lead to valves AA, VH
Valve SA has flow rate=0; tunnels lead to valves BM, KH
Valve NV has flow rate=0; tunnels lead to valves AA, SG
Valve ZK has flow rate=0; tunnels lead to valves CP, IV
Valve ON has flow rate=0; tunnels lead to valves PC, KH
Valve PN has flow rate=0; tunnels lead to valves HS, VH
Valve RV has flow rate=0; tunnels lead to valves NJ, VH
Valve RK has flow rate=0; tunnels lead to valves SS, JV
Valve OC has flow rate=18; tunnel leads to valve HS
Valve EF has flow rate=0; tunnels lead to valves LY, WL
Valve VJ has flow rate=0; tunnels lead to valves TA, IR
Valve LL has flow rate=5; tunnels lead to valves ZS, IT, SK, IS, WG
Valve FF has flow rate=0; tunnels lead to valves HN, LY
Valve LY has flow rate=21; tunnels lead to valves EF, FF, UR, JZ
Valve EJ has flow rate=0; tunnels lead to valves WL, CP
Valve NJ has flow rate=6; tunnels lead to valves RV, KD, SG, SI, TA
`;

input2 = `
Valve AA has flow rate=0; tunnels lead to valves DD, II, BB
Valve BB has flow rate=13; tunnels lead to valves CC, AA
Valve CC has flow rate=2; tunnels lead to valves DD, BB
Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE
Valve EE has flow rate=3; tunnels lead to valves FF, DD
Valve FF has flow rate=0; tunnels lead to valves EE, GG
Valve GG has flow rate=0; tunnels lead to valves FF, HH
Valve HH has flow rate=22; tunnel leads to valve GG
Valve II has flow rate=0; tunnels lead to valves AA, JJ
Valve JJ has flow rate=21; tunnel leads to valve II
`;

const data = input
    .trim()
    .split(/\r?\n/)
    .filter(x => !!x)
    .map(x => x)
    ;

class Valve {
    constructor (key, flow, tunnels = []) {
        this.key = key;
        this.flow = flow;
        this.tunnels = tunnels;
    }
}

const locations = { };

data.forEach(line => {
    const [_, key, flow, targets] = /Valve (\w\w) has flow rate=(\d+); .+ valves? (.+)/.exec(line);
    const tunnels = targets.split(", ");
    const valve = new Valve(key, parseInt(flow), tunnels);
    locations[key] = valve;
});

class State {
    constructor(
        timeIndex,
        currentLocationKey,
        openValves = [],
        totalFlow = 0,
        releasedPressure = 0,
        justCameFrom = null,
    ) {
        this.timeIndex = timeIndex;
        this.currentLocationKey = currentLocationKey;
        this.openValves = openValves.sort();

        this.smallkey = `${currentLocationKey};${openValves.join(",")}`;
        this.key = `${timeIndex};${this.smallkey}`;

        this.totalFlow = totalFlow;
        this.releasedPressure = releasedPressure;
        this.justCameFrom = justCameFrom;

        this.minimalPredictedTotalRelease = (30 - timeIndex) * totalFlow + releasedPressure;
    }
}

const start = new State(-1, "AA");

let edges = [start];

for (let time = 0; time < 30; time++) {
    console.log("Parsing time index", time, " - number of states:", edges.length);
    // console.log(edges);
    let newEdges = [];
    edges.forEach(state => {
        if (!state.openValves.includes(state.currentLocationKey)) {
            if (locations[state.currentLocationKey].flow > 0) {
                // Open valve!
                newEdges.push(new State(
                    time,
                    state.currentLocationKey,
                    [...state.openValves, state.currentLocationKey],
                    state.totalFlow + locations[state.currentLocationKey].flow,
                    state.releasedPressure + state.totalFlow,
                ));
            }
        }
        locations[state.currentLocationKey].tunnels
            .filter(target => target.key !== state.justCameFrom)
            // TODO: Filter on dead ends by using a map of "opened valves" to "sensible locations"
            .forEach(target => {
            // Move to location
            newEdges.push(new State(
                time,
                target,
                state.openValves.slice(),
                state.totalFlow,
                state.releasedPressure + state.totalFlow,
                state.currentLocationKey,
            ));
        });
    });

    // Prune only best ways to reach states:
    const keyed = newEdges.reduce((result, next) => {
        if (!result[next.key] || result[next.key].releasedPressure < next.releasedPressure) {
            result[next.key] = next;
        }
        return result;
    }, { });

    edges = Object.values(keyed);
}

let part1 = edges.sort((a,b) => b.releasedPressure - a.releasedPressure)[0].releasedPressure;

console.log("Part 1:", part1);