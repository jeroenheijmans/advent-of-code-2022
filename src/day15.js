const input = `
Sensor at x=98246, y=1908027: closest beacon is at x=1076513, y=2000000
Sensor at x=1339369, y=2083853: closest beacon is at x=1076513, y=2000000
Sensor at x=679177, y=3007305: closest beacon is at x=1076513, y=2000000
Sensor at x=20262, y=3978297: closest beacon is at x=13166, y=4136840
Sensor at x=3260165, y=2268955: closest beacon is at x=4044141, y=2290104
Sensor at x=2577675, y=3062584: closest beacon is at x=2141091, y=2828176
Sensor at x=3683313, y=2729137: closest beacon is at x=4044141, y=2290104
Sensor at x=1056412, y=370641: closest beacon is at x=1076513, y=2000000
Sensor at x=2827280, y=1827095: closest beacon is at x=2757345, y=1800840
Sensor at x=1640458, y=3954524: closest beacon is at x=2141091, y=2828176
Sensor at x=2139884, y=1162189: closest beacon is at x=2757345, y=1800840
Sensor at x=3777450, y=3714504: closest beacon is at x=3355953, y=3271922
Sensor at x=1108884, y=2426713: closest beacon is at x=1076513, y=2000000
Sensor at x=2364307, y=20668: closest beacon is at x=2972273, y=-494417
Sensor at x=3226902, y=2838842: closest beacon is at x=3355953, y=3271922
Sensor at x=22804, y=3803886: closest beacon is at x=13166, y=4136840
Sensor at x=2216477, y=2547945: closest beacon is at x=2141091, y=2828176
Sensor at x=1690953, y=2203555: closest beacon is at x=1076513, y=2000000
Sensor at x=3055156, y=3386812: closest beacon is at x=3355953, y=3271922
Sensor at x=3538996, y=719130: closest beacon is at x=2972273, y=-494417
Sensor at x=2108918, y=2669413: closest beacon is at x=2141091, y=2828176
Sensor at x=3999776, y=2044283: closest beacon is at x=4044141, y=2290104
Sensor at x=2184714, y=2763072: closest beacon is at x=2141091, y=2828176
Sensor at x=2615462, y=2273553: closest beacon is at x=2757345, y=1800840
`;

const data = input
  .trim()
  .split(/\r?\n/)
  .filter(x => !!x)
  .map(x => /(\d+)\D+(\d+)\D+(\d+)\D+(\d+)/.exec(x))
  .map(x => ({
    sensorx: parseInt(x[1]),
    sensory: parseInt(x[2]),
    beaconx: parseInt(x[3]),
    beacony: parseInt(x[4]),
  }))
  ;


const targetY = 2000000;
const slices = [];
data.forEach(entry => {
  const dist = Math.abs(entry.sensorx - entry.beaconx) + Math.abs(entry.sensory - entry.beacony);
  const ydiff = Math.abs(entry.sensory - targetY);
  const xspread = dist - ydiff;

  if (xspread <= 0) return;

  const fromx = entry.sensorx - xspread;
  const tox = entry.sensorx + xspread;
  slices.push({fromx, tox});
});

const minx = Math.min(...slices.map(s => s.fromx));
const maxx = Math.max(...slices.map(s => s.tox));

let part1 = 0;

for (let i = minx; i <= maxx; i++) {
  if (slices.some(s => i >= s.fromx && i < s.tox)) part1++;
}

function solvePart2() {
  
  for (let targetY = 0; targetY <= 4000000; targetY++) {
    let slices = [];
    data.forEach(entry => {
      const dist = Math.abs(entry.sensorx - entry.beaconx) + Math.abs(entry.sensory - entry.beacony);
      const ydiff = Math.abs(entry.sensory - targetY);
      const xspread = dist - ydiff;

      if (xspread <= 0) return;

      const fromx = Math.max(0, entry.sensorx - xspread);
      const tox = Math.min(4000000, entry.sensorx + xspread);
      slices.push({fromx, tox});
    });

    let folded = false;
    do {
      folded = false;
      for (let n = 0; n < slices.length; n++) {
        if (folded) break;
        for (let m = n + 1; m < slices.length; m++) {
          if (folded) break;
          if (slices[m].fromx > slices[n].tox + 1) continue;
          if (slices[m].tox < slices[n].fromx - 1) continue;
          newslice = {fromx: Math.min(slices[m].fromx, slices[n].fromx), tox: Math.max(slices[m].tox, slices[n].tox)};
          slices = slices.filter(s => s !== slices[m] && s !== slices[n]);
          slices.push(newslice);
          folded = true;
        }
      }
    } while (folded);

    if (slices.length === 2) {
      const smallestTo = Math.min(slices[0].tox, slices[1].tox);
      const largestFrom = Math.max(slices[0].fromx, slices[1].fromx);

      const smallestFrom = Math.min(slices[0].fromx, slices[1].fromx);
      const largestTo = Math.max(slices[0].tox, slices[1].tox);

      if (largestFrom - smallestTo === 2 && smallestFrom === 0 && largestTo === 4000000) {
        const theX = largestFrom - 1;
        const theY = targetY;
        const frequency = theX * 4000000 + theY;
        console.log(slices);
        return frequency;
      }
    }
  }
}

let part2 = solvePart2();

console.log("Part 1", part1);
console.log("Part 2", part2);