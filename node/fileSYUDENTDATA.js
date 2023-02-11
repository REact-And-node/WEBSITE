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
let students = [
    { id: 1, name: "Jack", course: "React", grade: "A", city: "London" },
    { id: 2, name: "Tim", course: "Node", grade: "A", city: "Paris" },
    { id: 3, name: "Anna", course: "JS", grade: "B", city: "London" },
    { id: 4, name: "Bob", course: "Angular", grade: "B", city: "Mumbai" },
    { id: 5, name: "Mary", course: "React", grade: "A", city: "Tokyo" },
    { id: 6, name: "Steve", course: "React", grade: "B", city: "London" },
    { id: 7, name: "Kathy", course: "Node", grade: "C", city: "Tokyo" },
    { id: 8, name: "Vivian", course: "Node", grade: "D", city: "Mumbai" },
    { id: 9, name: "Edwards", course: "JS", grade: "D", city: "Mumbai" },
    { id: 10, name: "George", course: "JS", grade: "C", city: "Tokyo" },
    { id: 11, name: "Sam", course: "Angular", grade: "B", city: "Paris" },
    { id: 12, name: "Amy", course: "Angular", grade: "A", city: "Paris" },
    { id: 13, name: "Jill", course: "JS", grade: "A", city: "Tokyo" },
    { id: 14, name: "Duke", course: "JS", grade: "B", city: "Mumbai" },
    { id: 15, name: "Anita", course: "JS", grade: "B", city: "Paris" },
    { id: 16, name: "Mike", course: "React", grade: "C", city: "London" },
    { id: 17, name: "Teddy", course: "Node", grade: "C", city: "Tokyo" },
    { id: 18, name: "Charles", course: "JS", grade: "D", city: "Mumbai" },
    { id: 19, name: "Bill", course: "Node", grade: "D", city: "London" },
    { id: 20, name: "Carla", course: "React", grade: "D", city: "Tokyo" },
    { id: 21, name: "Joanna", course: "JS", grade: "A", city: "Paris" },
    { id: 22, name: "Pam", course: "JS", grade: "B", city: "Paris" },
  ];
  
  module.exports.studentsData = students;

let fname = "student.json";
app.get("/svr/resetData", function (req, res) {
  let data = JSON.stringify(students); 
    fs.promises
    .writeFile(fname, data)
    .then(() => res.send("Data in file is reset"))
    .catch((err) => console.log(err))
  });



    app.get("/svr/students/course/:name", function (req, res) {
        let name=req.params.name
        fs.promises
            .readFile(fname, "utf8")
            .then((data) => { 
                let obj = JSON.parse(data);
                let find=obj.filter((st)=>st.course==name)
            console.log("In string format:", find);
           
            
            res.send(find);
            })
            .catch((err) => console.log(err)); 
    
        });
    app.get("/svr/students/:id", function (req, res) {
        let id=req.params.id
        fs.promises
            .readFile(fname, "utf8")
            .then((data) => { 
                let obj = JSON.parse(data);
                let find=obj.find((st)=>st.id==id)
            console.log("In string format:", find);
           
            
            res.send(find);
            })
            .catch((err) => console.log(err)); 
    
        });
    app.get("/svr/students", function (req, res) {
     
        fs.promises
            .readFile(fname, "utf8")
            .then((data) => {
            console.log("In string format:", data);
            let obj = JSON.parse(data);
            res.send(obj);
            })
            .catch((err) => console.log(err)); 
    
        });





   
       
            app.post("/svr/students", function (req, res) {
                let body= req.body;
                fs.promises.readFile(fname, "utf8").then((data) => {
                    let obj = JSON.parse(data);
                   
                let maxid = obj.reduce(
                (acc, curr) => (curr.id > acc? curr.id : acc),
                0
                );
                 let newid = maxid + 1;
let newStudent = { ...body, id: newid };
obj.push(newStudent);
let data1 = JSON.stringify(obj);
                    fs.promises
                    .writeFile(fname, data1)
                    .then(() => 
                    res.status(200).send("New student enrolled"))
                    .catch((err) => console.log(err))
                    })
              
});
            app.put("/svr/students/:id", function (req, res) {
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

app.delete ("/svr/students/:id", function (req, res) {
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
        res.status(200).send(obj))
        .catch((err) => console.log(err))
        })
  
});
