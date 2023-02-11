
  var express = require("express");
var app = express();
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );  
  res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,OPTIONS");
  next();
});
const port= 2410;

customers = [
    {
      custId: 1,
      name: "ABC",
      password: "abc1234",
      role: "admin",
      email: "abc@gmail.com"
    },
    {
      custId: 2,
      name: "Willie",
      password: "willie1234",
      role: "student",
      email: "willie@gmail.com"
    },
    {
      custId: 3,
      name: "Jack",
      password: "jack1234",
      role: "faculty",
      email: "jack@gmail.com"
    },
    {
      custId: 4,
      name: "James",
      password: "james1234",
      role: "student",
      email: "james@gmail.com"
    },
    {
      custId: 5,
      name: "Harry",
      password: "harry1234",
      role: "faculty",
      email: "harry@gmail.com"
    },
    {
      custId: 6,
      name: "Tia",
      password: "tia1234",
      role: "student",
      email: "tia@gmail.com"
    },
    {
      custId: 7,
      name: "Aditya",
      password: "aditya123",
      role: "faculty",
      email: "aditya@gmail.com"
    },
    {
      custId: 8,
      name: "Sonu",
      password: "sonu1234",
      role: "student",
      email: "sonu@gmail.com"
    },
    {
      custId: 9,
      name: "Ellie",
      password: "ellie1234",
      role: "student",
      email: "ellie@gmail.com"
    },
    {
      custId: 10,
      name: "Gia",
      password: "gia1234",
      role: "faculty",
      email: "gia@gmail.com"
    }
    , {
      custId: 11,
      name: "Rita",
      password: "Rita1234",
      role: "student",
      email: "Rita@gmail.com"
    }
  ];
  courses = [
    {
      courseId: 1,
      name: "ANGULAR",
      code: "ANG97",
      description: "All fundamentals of Angular 7",
      faculty: ["Daniel", "Jack"],
      students: ["Sam"]
    },
    {
      courseId: 2,
      name: "JAVASCRIPT",
      code: "JS124",
      description: "Intoduction to javascript",
      faculty: ["Aditya"],
      students: ["James", "Joy", "Monu", "Rita"]
    },
    {
      courseId: 3,
      name: "REACT",
      code: "RCT56",
      description: "React Javascript library",
      faculty: ["Jack", "Gia"],
      students: ["Raima", "Rita", "Sonu", "James"]
    },
    {
      courseId: 4,
      name: "BOOTSTRAP",
      code: "BS297",
      description: "Bootstrap Designing Framework",
      faculty: [],
      students: ["James", "Tia", "Ellie"]
    },
    {
      courseId: 5,
      name: "CSS",
      code: "CS365",
      description: "Basic stylesheet language",
      faculty: [],
      students: ["James", "Rita", "Monica"]
    },
    {
      courseId: 6,
      name: "REST AND MICROSERVICES",
      code: "RM392",
      description: "Introduction to Microservices",
      faculty: [],
      students: ["Sam"]
    },
    {
      courseId: 7,
      name: "NODE",
      code: "ND725",
      description: "Introduction to Node",
      faculty: ["Sonia"],
      students: ["Saransh", "Shrey", "Monica"]
    }
  ];
  faculties = [
    { id: 5, name: "Daniel", courses: ["ANGULAR"] },
    { id: 4, name: "Sonia", courses: ["NODE"] },
    { id: 3, name: "Jack", courses: ["REACT", "ANGULAR"] },
    { id: 2, name: "Gia", courses: ["REACT"] },
    { id: 1, name: "Aditya", courses: ["ANGULAR"] }
  ];
  classes = [
    {
      classId: 1,
      course: "REACT",
      time: "07:45",
      endTime: "08:45",
      topic: "Redux",
      facultyName: "Jack"
    },
    {
      classId: 2,
      course: "ANGULAR",
      time: "15:45",
      endTime: "17:40",
      topic: "Component",
      facultyName: "Jack"
    },
    {
      classId: 3,
      course: "JAVASCRIPT",
      time: "15:45",
      endTime: "17:40",
      topic: "Component",
      facultyName: "Aditya"
    }
  ];
  students = [
    {
      id: 16,
      name: "Willie",
      dob: "31-July-1997",
      gender: "male",
      about: "Pursuing Graduation",
      courses: ["NODE"]
    },
    {
      id: 15,
      name: "Tia",
      dob: "30-July-1997",
      gender: "male",
      about: "Pursuing Graduation",
      courses: []
    },
    {
      id: 14,
      name: "Apoorv",
      dob: "31-August-1998",
      gender: "male",
      about: "Want to learn new technologies",
      courses: []
    },
    {
      id: 13,
      name: "Joy",
      dob: "31-July-1997",
      gender: "male",
      about: "Pursuing Graduation",
      courses: ["JAVASCRIPT"]
    },
    {
      id: 12,
      name: "Rachel",
      dob: "31-August-1998",
      gender: "female",
      about: "Pursuing Graduation",
      courses: []
    },
    {
      id: 11,
      name: "Monica",
      dob: "30-July-1997",
      gender: "female",
      about: "Want to learn new technologies",
      courses: ["CSS", "NODE"]
    },
    {
      id: 10,
      name: "Monu",
      dob: "12-May-1997",
      gender: "male",
      about: "Pursuing Graduation",
      courses: ["JAVASCRIPT"]
    },
    {
      id: 9,
      name: "Sonu",
      dob: "12-May-1997",
      gender: "male",
      about: "Pursuing Graduation",
      courses: ["REACT"]
    },
    {
      id: 8,
      name: "Raima",
      dob: "30-July-1997",
      gender: "female",
      about: "Want to learn new technologies",
      courses: ["REACT"]
    },
    {
      id: 7,
      name: "Rita",
      dob: "31-August-1998",
      gender: "female",
      about: "Pursuing Graduation",
      courses: ["JAVASCRIPT", "REACT", "CSS"]
    },
    {
      id: 6,
      name: "Shrey",
      dob: "12-May-1997",
      gender: "male",
      about: "Pursuing Graduation",
      courses: ["NODE"]
    },
    {
      id: 5,
      name: "Saransh",
      dob: "31-July-1997",
      gender: "male",
      about: "Want to learn new technologies",
      courses: ["NODE"]
    },
    {
      id: 4,
      name: "Sanya",
      dob: "31-July-1997",
      gender: "male",
      about: "Want to learn new technologies",
      courses: []
    },
    {
      id: 3,
      name: "James",
      dob: "12-July-1994",
      gender: "male",
      about: "Pursuing Graduation",
      courses: ["JAVASCRIPT", "BOOTSTRAP", "CSS", "REACT"]
    },
    {
      id: 2,
      name: "Sam",
      dob: "12-July-1994",
      gender: "male",
      about: "Pursuing Graduation",
      courses: ["ANGULAR", "REST AND MICROSERVICES"]
    },
    {
      id: 1,
      name: "Ellie",
      dob: "12-June-1992",
      gender: "female",
      about: "Want to learn new technologies",
      courses: ["BOOTSTRAP"]
    }
  ];


app.post("/login", function(req, res) {
  
  var email = req.body.email;
  var password = req.body.password;

  var cust = customers.find(function(item) {
    return item.email ==email && item.password == password;
  });
  console.log(cust);
  
  let custRec= { email:cust.email,name:cust.name,role:cust.role}
  console.log(cust);

  if (!cust){ 
    res.status(500).send("Login Failed. Check the email and password");}
        else
       { 

            res.send(custRec);}
});
app.post("/user", function(req, res) {
  var    name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  var role=req.body.role

    let custRec= {custId:customers.length+1,name:name ,email:email,password:password,role:role}
  let custRec1= {id:faculties.length+1,name:name,  dob: "", gender: "",about: "", courses: [] ,faculty:[]}
  let custRec2= {id:students.length+1,name:name,  dob: "", gender: "",about: "", courses: [] }
  role=="faculty"? customers.unshift(custRec):customers.unshift(custRec)
  role=="faculty"? faculties.unshift(custRec1):students.unshift(custRec2)
  console.log(custRec);
 res.send(custRec)
});
app.post("/class", function(req, res) {
  var    name = req.params.name;
  var classId = req.body.classId;
  var course = req.body.course;
  var time = req.body.time;
  var endTime = req.body.endTime;
  var topic=req.body.topic
  var facultyName=req.body.facultyName

  let find=students.find((st)=>st.name==name)
  let index=students.findIndex((st)=>st.name==name)
 let custRec= {
  classId:classId ,
  course: course,
  time: time,
  endTime: endTime,
  topic: topic,
  facultyName: facultyName
  }

classes.push(custRec)
 res.send(custRec)
});
app.put("/class/:classId", function(req, res) {
  var    name = req.params.name;
  var classId = req.body.classId;
  var course = req.body.course;
  var time = req.body.time;
  var endTime = req.body.endTime;
  var topic=req.body.topic
  var facultyName=req.body.facultyName

  let find=classes.findIndex((st)=>st.classId==classId)

 let custRec= {
  classId:classId ,
  course: course,
  time: time,
  endTime: endTime,
  topic: topic,
  facultyName: facultyName
  }

classes[find]=custRec
 res.send(custRec)
});
app.post("/details/:name", function(req, res) {
  var    name = req.params.name;
  var gender = req.body.gender;
  var dob = req.body.dob;
  var about=req.body.about
  let find=students.find((st)=>st.name==name)
  let index=students.findIndex((st)=>st.name==name)
 let custRec= {
    id: find.id,
    name: find.name,
    dob:dob ,
    gender: gender,
    about: about,
    courses: []
  }
  students[index]=custRec
  console.log(custRec)
 res.send(custRec)
});
app.get("/alluser", function(req, res) {
 
 res.send(customers)
});
app.get("/allstudents", function(req, res) {

 res.send(students)
});
app.get("/Faculty", function(req, res) {

 res.send(faculties)
});
app.get("/courses", function(req, res) {
let course=courses.map((st)=>st.name)
 res.send(course)
});
app.get("/allcourses", function(req, res) {

 res.send(courses)
});
app.get("/addstudent/:id", function(req, res) {
let id=req.params.id
let course=courses.find((st)=>st.courseId==id)
 res.send(course)
});
app.get("/classes", function(req, res) {

 res.send(classes)
});

app.get("/allStudentCourse/:name", function(req, res) {
  let name=req.params.name
  let stud=students.filter((s1)=>s1.name==name )
  console.log(stud)
  let course=courses.filter((st)=>stud.find((s1)=>s1.courses.find((s2)=>s2==st.name)))
  res.send(course)
 });
 app.get("/allfacultyCourse/:name", function(req, res) {
  let name=req.params.name
  let stud=faculties.filter((s1)=>s1.name==name )
  
  let course=courses.filter((st)=>stud.find((s1)=>s1.courses.find((s2)=>s2==st.name)))
  res.send(course)
 });
 app.get("/class/:name", function(req, res) {
  let name=req.params.name
  let stud=faculties.filter((s1)=>s1.name==name )
  
  let course=classes.filter((st)=>stud.find((s1)=>s1.courses.find((s2)=>s2==st.course)))
  res.send(course)
 });
 app.get("/time/:classid", function(req, res) {
  let classid=req.params.classid

  let course=classes.find((st)=>st.classId==classid)
  res.send(course)
 });
app.get("/alltime/:name", function(req, res) {
  let name=req.params.name
  let stud=students.filter((s1)=>s1.name==name )
  console.log(stud)
  let course=classes.filter((st)=>stud.find((s1)=>s1.courses.find((s2)=>s2==st.course)))
  res.send(course)
 });
 app.get("/student/:name", function(req, res) {
  let name=req.params.name
  let stud=students.filter((s1)=>s1.name==name )
 
  res.send(stud)
 });
app.put("/addstudent/:id", function(req, res) {
  let id=req.params.id
  let body=req.body
 
  let course=courses.findIndex((st)=>st.courseId==id)
  let json={ courseId: id,
    name: body.name,
    code:body.code,
    description: body.description,
    faculty:courses[course].faculty,
    students: body.students}
    
    courses[course]=json
    let student=students.filter((st)=>json.students.find((s1)=>s1==st.name?st.courses.find((st)=>st==json.name)?"":st.courses.push(json.name):""))

    console.log(json.students)
    console.log(student)
   res.send(courses)
  });
app.put("/addFaculty/:id", function(req, res) {
  let id=req.params.id
  let body=req.body
 
  let course=courses.findIndex((st)=>st.courseId==id)
  let json={ courseId: id,
    name: body.name,
    code:body.code,
    description: body.description,
  faculty:body.faculty,
    students:courses[course].students}
    
    courses[course]=json
    let student=faculties.filter((st)=>json.faculty.find((s1)=>s1==st.name?st.courses.find((st)=>st==json.name)?"":st.courses.push(json.name):""))

    console.log(json.students)
    console.log(student)
   res.send(courses)
  });


app.listen(port, () => console.log(`Node app listening on port ${port}!`));
