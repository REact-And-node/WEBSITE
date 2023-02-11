let fs = require("fs");
let readline = require("readline-sync");
let fname = "data.json";
let STORE = [{x:2,y:3}, {x:-4,y:10}, {x:0,y:0}, {x:6,y:-1},]
async function writeJson() {
    let data = JSON.stringify(STORE);
    try{
        let data1 =await fs.promises.writeFile(fname, data)
  console.log("Write success")  
    }
  
    catch{((err) => console.log(err))};}

   async function Point() {
        let x = readline.question ("Enter x : ");
        let y = readline.question ("Enter y : ");
        let array = { x: x, y: y };
       
            let data =await fs.promises.readFile(fname, "utf8")
        let obj = JSON.parse(data);
        obj.push(array);
        let data1 = JSON.stringify(obj);
        try{
            let data2 =await fs.promises
        .writeFile(fname, data1)
        console.log("New store UPDATED")}
        catch{((err) => console.log(err))};
     
        }
       async function readJson() {
            try{
                let data1 =await fs.promises
            .readFile(fname, "utf8")
          
            let obj = JSON.parse(data1);
             console.log(obj);}
            catch{((err) => console.log(err))};
            }
            
            let option = readline.question(
                "Enter Option 1: Create/Reset 2:Read 3:Add a Point ="
                );
                switch (option){
                case "1":
                writeJson();
                break;
                case "2":
                    readJson();
                break;
                case "3":
                    Point();
                break;
                }