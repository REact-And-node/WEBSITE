let fs = require("fs");
let readline = require("readline-sync");
let fname = readline.question("Enter name of file:"); 
let txt =readline.question ("Enter the text to be appended to file:");
fs.promises.access(fname).then(() =>
fs.promises
.readFile(fname, "utf8")
.then((content) => {
console.log("Before::", content);
fs.promises.appendFile(fname, txt).then(() => { console.log("Append success");
fs.promises
.readFile(fname, "utf8")
.then((content) => console.log("After::", content));
});
})
.catch((err) => console.log(err))
)
.catch((err) =>
fs.promises.writeFile(fname, txt).then(() => { console.log("Write success");
fs.promises
.readFile(fname, "utf8")
.then((content) => console.log(content));
})
.catch((err)=>console.log(err))
);