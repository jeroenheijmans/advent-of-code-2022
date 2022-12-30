const input = `
root: pppw + sjmn
dbpl: 5
cczh: sllz + lgvd
zczc: 2
ptdq: humn - dvpt
dvpt: 3
lfqf: 4
humn: 5
ljgn: 2
sjmn: drzm * dbpl
sllz: 4
pppw: cczh / lfqf
lgvd: ljgn * ptdq
drzm: hmdt - zczc
hmdt: 32
`;

const getMonkeys = () => input
    .trim()
    .split(/\r?\n/)
    .filter(x => !!x)
    .map(x => x.split(": "))
    .map(x => {
        if (x[1].match(/\d+/)) {
            return {
                key: x[0],
                val: parseInt(x[1]),
            };
        } else {
            const [lhs, operator, rhs] = x[1].split(" ");
            return {
                key: x[0],
                val: null,
                lhs,
                rhs,
                calc: registers => {
                    switch(operator) {
                        case "+":
                            return registers[lhs].val + registers[rhs].val;
                        case "-":
                            return registers[lhs].val - registers[rhs].val;
                        case "/":
                            return registers[lhs].val / registers[rhs].val;
                        case "*":
                            return registers[lhs].val * registers[rhs].val;
                        default:
                            throw new Error("unknown calculation");
                    }
                }
            }
        }
    }).reduce((result, curr) => { result[curr.key] = curr; return result; }, {});

const monkeys = getMonkeys();

while (next = Object.values(monkeys).find(m =>
        m.val === null
        && monkeys[m.lhs].val !== null
        && monkeys[m.rhs].val !== null)) {
    next.val = next.calc(monkeys);
}

let part1 = monkeys["root"].val;
let part2 = 0;

console.log("Part 1:", part1);
console.log("Part 2:", part2);