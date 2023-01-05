let input = `
`;

input = `
1=12=1--2220--2=21
2=20---12
1=2=-=2-0=0=022
1212=--0-20=1
1202-1
2=2-=1-
1-22-12-1
1-1-1120=1=120221
10-02
122-12=
2-2
20001--=20100
1-=-00=00=2
1=--0200=--0=2--1-
1==--001
1-10011
1-1=2-==2=2
2-=02=02222-=0
1-121=
2012=2==
1--
1212-2
1--10-112=
100--1011-=-12---
2=
120
1=12-1-==0==2-02
1==10
12==2201112-1=-
22201=
202-022=1111-0
1-=1-=--2
111011---
2-=1122101--1-2-11
22100
1=20-112
21=--1
1-000--21=110101=
2-10=02-121=
112
121=0-2000=-=01=12=
11=-121-=-1
1-20==---=000-
111221==2-122111
1=122=22010120121
2-11=-22=2
1-
101=0121121-2122
1=2221-11-2-=
212
11=-==00--
121-0--1===111
11
2==00-21222=-2
2=-02-=22-2=1
22==-1222=-1-12--
1--22
2110-=2-0-211-12=
202222-1111
2-=-=1222221=
1=-=-==-1=
1-1-0121
12-1==0222
11---100
1--01020-2
10=20
12=1=-002-02-=1222
1011-0--0121-
101-2==
2112021212==212
1-==1-=110-021-22
1==20111-2022-0
1=1=2-=0=
1-0==11-1--
1--21-21-0-2-
11-111=-=10==10-
12-
202-10221=
1-1=-00=0
2-=11
200-
21=1=12022-01-0--=
1=---0=021-0==
1-=00-1-0210=2
1121=1=2=20-
220100-02111=2211-
1-0-00-0200-001-
1002
12-=0-012-111
1=-0111-10=0
21=10-2=1=00-120-
201=
21
2000=0-=
11==0--212=--12-121
11-220-0=22-011==
1-1-0=1-21-101==
111=
2--1=2=-
1==0=0-
1=021222=0---2-1=
2-20=210212-0122
1-2100-021=-2=010-11
1-=-1-0-1-=-0
20-122200202-12-0=
2=-20
1-1-=-
11=2=1=1-
1=11-=-20=20
`;

const data = input
    .trim()
    .split(/\r?\n/)
    .filter(x => !!x)
    .map(x => x)
    ;

const snafuMap = {
    "=": -2,
    "-": -1,
    "0": 0,
    "1": 1,
    "2": 2,
}

function snafuToDecimal(text) {
    let fiver = 1;
    let result = 0;
    for (let i = text.length - 1; i >= 0; i--) {
        const char = text[i];
        result += fiver * snafuMap[char];
        fiver *= 5;
    }
    return result;
}

function decimalToSnafu(nr) {
    // TODO... but let's try by hand first
}

if (snafuToDecimal("            1".trim()) !==         1) throw new Error("Error for:         1");
if (snafuToDecimal("            2".trim()) !==         2) throw new Error("Error for:         2");
if (snafuToDecimal("           1=".trim()) !==         3) throw new Error("Error for:         3");
if (snafuToDecimal("           1-".trim()) !==         4) throw new Error("Error for:         4");
if (snafuToDecimal("           10".trim()) !==         5) throw new Error("Error for:         5");
if (snafuToDecimal("           11".trim()) !==         6) throw new Error("Error for:         6");
if (snafuToDecimal("           12".trim()) !==         7) throw new Error("Error for:         7");
if (snafuToDecimal("           2=".trim()) !==         8) throw new Error("Error for:         8");
if (snafuToDecimal("           2-".trim()) !==         9) throw new Error("Error for:         9");
if (snafuToDecimal("           20".trim()) !==        10) throw new Error("Error for:        10");
if (snafuToDecimal("          1=0".trim()) !==        15) throw new Error("Error for:        15");
if (snafuToDecimal("          1-0".trim()) !==        20) throw new Error("Error for:        20");
if (snafuToDecimal("       1=11-2".trim()) !==      2022) throw new Error("Error for:      2022");
if (snafuToDecimal("      1-0---0".trim()) !==     12345) throw new Error("Error for:     12345");
if (snafuToDecimal("1121-1110-1=0".trim()) !== 314159265) throw new Error("Error for: 314159265");

let decimalSum = data.map(x => snafuToDecimal(x)).reduce((a,b) => a+b);
let part1 = "20=212=1-12=200=00-1"; // started with all 2s and manually found it.... sorry!
let check = snafuToDecimal(part1);

console.log(decimalSum);
console.log(part1);
console.log(decimalSum === check ? "ANSWERED!!" : (decimalSum < part1 ? "GOOD" :"baadddddd"));

console.log("Part 1:", part1);
console.log("Part 2:", "should be a free star, non!?");
