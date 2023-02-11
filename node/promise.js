
let fs = require("fs");
let readline = require("readline-sync");
function getStat(filename) {
 console.log("stat:", filename);
fs.promises
.stat(filename)
.then((content) => console.log(content))
.catch((err) => checkAccess(fname))
}

function checkAccess(filename) { 
    console.log("access:", filename);
fs.promises
.access(filename)
.then(() => console.log("Exists"))
.catch((err) => console.log("Does not exist"));
}
function readFile(filename) { 
console.log("readFile:", filename);
fs.promises
.readFile(filename, "utf8")
.then((content) => console.log("File content::", content))
.catch((err) => console.log(err));
}

function writeFile(filename, data) { console.log("writeFile:", filename);
fs.promises.writeFile(filename, data).catch((err) => console.log(err));
}
function appendFile(filename,data2) {
   
    fs.promises.readFile(filename, "utf8").then((data) => {
        let obj = (data);
        console.log("BEFORE::",obj)
      obj=obj-(-data2)
      
let data1 = JSON.stringify(obj);
        fs.promises
        .writeFile(fname, data1)
        .then(() => 
        console.log("After::",data1))
        .catch((err) => console.log(err))
    })

}
let fname="hello.txt";

let option = readline.question(
    "Enter Option 1:Create/Reset 2:Read 3:Add+2 4:Add+3="
    );
    switch (option){
    case "1":
        writeFile(fname,"0")
    break;
    case "2":
        readFile(fname)
    break;
    case "3":
        appendFile(fname,"2")
    break;
    case "4":
        appendFile(fname,"3")
    break;
    }