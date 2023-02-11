let express = require("express");
let fs = require("fs"); 
let readline = require("readline-sync");
let app = express();
app.use(express.json());
app.use(function (req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header(
"Access-Control-Allow-Methods",
"GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
);
res.header(
"Access-Control-Allow-Headers",
"Origin, X-Requested-With, Content-Type, Accept"
);
next();
});

const port = 2410;
app.listen(port, () => console.log('Node app listening on port',port));
let customers  = [
    {id: "DFI61", name:"Vishal", city:"Delhi", age:27, gender:"Male", payment:"Credit Card"},
    {id: "JUW88", name:"Amit", city:"Noida", age:49, gender:"Male", payment:"Debit Card"},
    {id: "KPW09", name:"Pradeep", city:"Gurgaon", age:21, gender:"Male", payment:"Wallet"},
    {id: "ABR12", name:"Rohit", city:"Jaipur", age:34, gender:"Male", payment:" Debit Card"},
    {id: "BR451", name:"Preeti", city:"Delhi", age:29, gender:"Female", payment:"Credit Card"},
    {id: "MKR52", name:"Neha", city:"Noida", age:42, gender:" Female ", payment:"Debit Card"},
    {id: "BTT66", name:"Swati", city:"Gurgaon", age:24, gender:" Female ", payment:"Wallet"},
    {id: "CDP09", name:"Meghna", city:"Jaipur", age:38, gender:" Female ", payment:" Debit Card"},
    {id: "KK562", name:"Irfan", city:"Delhi", age:25, gender:"Male", payment:"Credit Card"},
    {id: "LPR34", name:"Gagan", city:"Noida", age:51, gender:" Female ", payment:"Debit Card"},
    {id: "MQC11", name:"John", city:"Gurgaon", age:24, gender:"Male", payment:"Wallet"},
    {id: "AXY22", name:"Gurmeet", city:"Jaipur", age:31, gender:"Male", payment:" Debit Card"}
   ];
  
 

let fname = "customers.json";
app.get("/resetData", function (req, res) {
  let data = JSON.stringify(customers ); 
    fs.promises
    .writeFile(fname, data)
    .then(() => res.send("customers data in file is reset"))
    .catch((err) => console.log(err))
  });



    app.get("/customers", function (req, res) {
     
        fs.promises
            .readFile(fname, "utf8")
            .then((data) => {
            console.log("In string format:", data);
            let obj = JSON.parse(data);
            res.send(obj);
            })
            .catch((err) => console.log(err)); 
    
        });





   
       
            app.post("/customers", function (req, res) {
                let body= req.body;
                fs.promises.readFile(fname, "utf8").then((data) => {
                    let obj = JSON.parse(data);
                   
                let maxid = obj.reduce(
                (acc, curr) => (curr.id > acc? curr.id : acc),
                0
                );
                 let newid = maxid + 1;
let newcustomers= { ...body, id: newid };
obj.push(newcustomers);
let data1 = JSON.stringify(obj);
                    fs.promises
                    .writeFile(fname, data1)
                    .then(() => 
                    res.status(200).send("New customers added"))
                    .catch((err) => console.log(err))
                    })
              
});
            app.put("/customers/:id", function (req, res) {
                let body= req.body;
                let id=req.params.id
                fs.promises.readFile(fname, "utf8").then((data) => {
                    let obj = JSON.parse(data);
                   
                let maxid = obj.findIndex((st)=>st.id==id);
                 let newid = obj[maxid].id ;
let newStudent = { ...body, id: newid };
obj[maxid]=(newStudent);
let data1 = JSON.stringify(obj);
                    fs.promises
                    .writeFile(fname, data1)
                    .then(() => 
                    res.status(200).send(newStudent))
                    .catch((err) => console.log(err))
                    })
              
});

app.delete ("/customers/:id", function (req, res) {
    let body= req.body;
    let id=req.params.id
    fs.promises.readFile(fname, "utf8").then((data) => {
        let obj = JSON.parse(data);   
    let student = obj.findIndex((st)=>st.id==id);
obj.splice(student,1)
let data1 = JSON.stringify(obj);
        fs.promises
        .writeFile(fname, data1)
        .then(() => 
        res.status(200).send("deleted:"+id)
        )
        .catch((err) => console.log(err))
        })
  
});
