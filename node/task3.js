
let fs = require("fs");
let readline = require("readline-sync");


 async function readFile(filename) {
    try{
        let data1 =await fs.promises
    .readFile(filename, "utf8")
  
    let obj = JSON.parse(data1);
     console.log(obj);}
    catch{((err) => console.log(err))};
    }

async function writeFile(filename,data) {
   
    try{
        let data1 =await fs.promises.writeFile(filename, data)
  console.log("Write success")  
    }
    catch{((err) => console.log(err))};}
async function appendFile(filename,data2) {
   
   let data =await fs.promises.readFile(filename, "utf8")
        let obj = (data);
        console.log("BEFORE::",obj)
      obj=obj-(-data2)
      
let data1 = JSON.stringify(obj);
try{
    let data2 =await     fs.promises
        .writeFile(fname, data1)
      
        console.log("After::",data1)
}

        catch{((err) => console.log(err))}


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