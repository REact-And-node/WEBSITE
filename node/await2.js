let fs = require("fs");
let readline = require("readline-sync");
let filename = "data.json";
let courseData = {
course: "Node.js",
students: [
{ name: "Jack", age: 25 },
{ name: "Steve", age: 26 },
{ name: "Anna", age: 27 },]}
async function writeJson() {
    let data = JSON.stringify(courseData);
    try {
        let data1 = await fs.promises.writeFile(filename, data); 
        console.log("write FILE success"); } 
        catch (err) {
        console.log(err);
        }}

    async function enrollNewStudent() {
        let name = readline.question ("Enter name of student : ");
        let age = readline.question ("Enter age : ");
        let newStudent = { name: name, age: age };
        try {
            let data1 = await fs.promises.readFile(filename, "utf8");
            let obj = JSON.parse(data1);
            obj.students.push(newStudent);
            let data2 = JSON.stringify(obj);
            await fs.promises.writeFile(filename, data2);
            console.log("Student enrolled");
            } catch (err) {
            console.log(err);
            }
        }
       async function readJson() {
        try {
            let data = await fs.promises.readFile(filename, "utf8"); 
            console.log("readFile",data); } catch (err) {
            console.log(err);
            }
            }
            
            let option = readline.question(
                "Enter Option 1: Write 2: Enroll Student 3: Read="
                );
                switch (option){
                case "1":
                writeJson();
                break;
                case "2":
                enrollNewStudent();
                break;
                case "3":
                readJson();
                break;
                }