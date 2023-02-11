let fs = require("fs");
let fname="hello.txt";
async function readFile(filename) {
try {
let data = await fs.promises.readFile(filename, "utf8"); 
console.log("readFile",data); } catch (err) {
console.log(err);
}
}
async function writeFile(filename,Data) {
try {
let data = await fs.promises.writeFile(filename, Data); 
console.log("write FILE success"); } 
catch (err) {
console.log(err);
}
}
async function appended(filename,Data) {
try {
let data = await fs.promises.appendFile(filename, Data); 
console.log("write appendFile success"); } 
catch (err) {
console.log(err);
}
}
async function checkAccess(filename) { 
    console.log("access:", filename);
    let data=await
fs.promises
.access(filename)
.then(() => console.log("Exists"))
.catch((err) => console.log("Does not exist"));
}
async function stat(filename) { 
    try {
    let data=await
fs.promises
.stat(filename)
console.log(data);}
catch (err) {
    console.log(err);
    }
}

let readline = require("readline-sync");
let txt = readline.question("Enter text to be appended: ");

async function exer1(filename, data) {
try {
   
await fs.promises.appendFile(filename, data);
console.log("Append success");
let data1 = await fs.promises.readFile(filename, "utf8");
console.log(data);
} catch (err) { console.log(err);
}
}



async function exer(filename, data) {
    try {
    await fs.promises. access (filename);
    let data1 = await fs.promises.readFile(filename, "utf8"); console.log("Before::", data1);
    await fs.promises.appendFile(filename, data); console.log("Append success");
    let data2 = await fs.promises.readFile(filename, "utf8"); console.log("After::", data2);
    } catch (err) {
    await fs.promises.writeFile(filename, data); console.log("Write success");
    let data3 = await fs.promises.readFile(filename, "utf8"); console.log(data3);
    }}
exer(fname, txt);

