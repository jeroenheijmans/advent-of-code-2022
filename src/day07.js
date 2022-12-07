const input = `
$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k
`;

const data = input
  .trim()
  .split(/\r?\n/)
  .filter(x => !!x)
  .map(x => x)
  ;

let tree = { name: "/", directSize: 0, children: [], };
let pwd = tree;

data.forEach(command => {
  const ogCommand = command;

  if (command === "$ cd /") {
    console.log(ogCommand.padEnd(20, " "), "Go to root");
    pwd = tree;
  } else if (command.substring(0, 4) === "$ cd") {

    command = command.replace("$ cd ", "");
    if (command === "..") {
      console.log(ogCommand.padEnd(20, " "), "Go up one dir");
      pwd = pwd.parent;
    } else {
      console.log(ogCommand.padEnd(20, " "), "Go into dir", command);
      pwd[command] = pwd[command] || { name: command, parent: pwd, directSize: 0 };
      pwd.children = pwd.children || [];
      pwd.children.push(pwd[command]);
      pwd = pwd[command];
    }

  } else if (command.substring(0, 4) === "$ ls") {
    console.log(ogCommand.padEnd(20, " "), "List folder");
    // nothing to do?
  } else { // must be inside an `ls` result
    
    if (command.match(/\d+ .+/)) {
      console.log(ogCommand.padEnd(20, " "), "Add size for file");
      const directSize = parseInt(command.split(" ")[0]);
      const name = command.split(" ")[1];
      pwd.directSize += directSize;
      // filename no matter?
    } else if (command.match(/dir .+/)) {
      console.log(ogCommand.padEnd(20, " "), "Seeing directory");
      pwd[command.replace("dir ", "")] = { directSize: 0, parent: pwd };
    } else {
      throw new Error("Unknown command " + command);
    }
  }
});

function removeParents(pwd) {
  delete pwd.parent;
  if (!!pwd.children?.length) {
    pwd.children.forEach(c => removeParents(c));
  }
}
removeParents(tree);

console.log("");
console.dir(tree, { depth: 5 });
console.log("");

const flatsizes = {};

function recursiveSizeOf(pwd) {
  if (!pwd.children || pwd.children.length === 0) {
    return pwd.directSize;
  } else {
    return pwd.directSize + pwd.children.map(c => recursiveSizeOf(c)).reduce((a,b) => a+b, 0);
  }
}

function walk(pwd) {
  console.log("Walked", pwd.name);
  flatsizes[pwd.name] = pwd.size + recursiveSizeOf(pwd);
  if (!!pwd.children) {
    pwd.children.forEach(c => walk(c));
  } else {
    console.log("Hmm?", pwd.name);
  }
}

walk(tree);

console.log(flatsizes);

let part1 = 0;
let part2 = 0;

console.log("Part 1:", part1);
console.log("Part 2:", part2);