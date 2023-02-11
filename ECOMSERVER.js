
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
const {  Pool } = require('pg')
 
const pool = new Pool({
  user: 'postgres',
  host: 'db.fdbmetlrjwvoeiipzrdw.supabase.co',
  database: 'postgres',
  password: 'Nafish@7131',
  port: 5432,
}); 
const port= 2410;
let cart=[]
let data=[
    {
       id: 1,
      category: "Watches",
      description:
        "The look that made Swiss watches the toast of the world. Still unbeatable.",
      imgLink:
        "https://images.pexels.com/photos/125779/pexels-photo-125779.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
      name: "Silver",
      price: 1600
    },
    {
       id: 2,
      category: "Watches",
      description: "Dark, black beauty. Sure to look good on the wrist.",
      imgLink:
        "https://images.pexels.com/photos/1697566/pexels-photo-1697566.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      name: "Black",
      price: 899
    },
    {
       id: 3,
      category: "Watches",
      description:
        "Multi chronographs, stop watch, timers. Altimeter. What else.",
      imgLink:
        "https://images.pexels.com/photos/8287770/pexels-photo-8287770.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      name: "Chronograph",
      price: 1199
    },
    {
       id: 4,
      category: "Watches",
      description: "For all ages. For all times. Classic Look. Classic leather.",
      imgLink:
        "https://images.pexels.com/photos/236915/pexels-photo-236915.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      name: "Classic",
      price: 1250
    },
    {
       id: 5,
      category: "Watches",
      description: "The original Apple Watch. Still a great buy.",
      imgLink:
        "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      name: "Apple v1",
      price: 999
    },
    {
       id: 6,
      category: "Watches",
      description: "Mechanical 28 jewelled watch. Connoisseur delight.",
      imgLink:
        "https://images.pexels.com/photos/47339/mechanics-movement-feinmechanik-wrist-watch-47339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      name: "Jewelled",
      price: 1999
    },
    {
       id: 7,
      category: "Sunglasses",
      description: "Desirable, reddish tint. Sure to attract attention.",
      imgLink:
        "https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      name: "Tinted Red",
      price: 399
    },
    {
       id: 8,
      category: "Sunglasses",
      description: "Nostalgic, bluish tint, sure to get memories back. Vintage.",
      imgLink:
        "https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      name: "Oldies",
      price: 199
    },
    {
       id: 9,
      category: "Sunglasses",
      description: "Trendy, young sunglasses with retro look. Teen favourite.",
      imgLink:
        "https://images.pexels.com/photos/1362558/pexels-photo-1362558.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      name: "Youthful",
      price: 219
    },
    {
       id: 10,
      category: "Sunglasses",
      description: "Chic sunglasses. Classic dark shades, sure to generate envy.",
      imgLink:
        "https://images.pexels.com/photos/65659/glasses-glass-circle-light-transmittance-65659.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      name: "Classic Dark",
      price: 249
    },
    {
       id: 11,
      category: "Watches",
      description: "Apple Watch Version 2. A delight.",
      imgLink:
        "https://images.pexels.com/photos/277406/pexels-photo-277406.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      name: "Apple v2",
      price: 1499
    },
    {
       id: 12,
      category: "Belts",
      description: "Stylish formal brown belt. An office favourite.",
      imgLink:
        "https://as1.ftcdn.net/jpg/02/14/48/72/500_F_214487233_Aahw3DohDu6dSSfMqWCcU1QDatxpDt6E.jpg",
      name: "Fab Brown",
      price: 149
    },
    {
       id: 13,
      category: "Handbags",
      description: "Desirable travel bag. Mix of convenience and style",
      imgLink:
        "https://images.pexels.com/photos/2534961/pexels-photo-2534961.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      name: "Travel Lite",
      price: 199
    },
    {
       id: 14,
      category: "Handbags",
      description: "3 Pockets, 2 Zips -  ideal for shopping and parties",
      imgLink:
        "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      name: "Chic Leather",
      price: 749
    },
    {
       id: 15,
      category: "Belts",
      description: "Signature belt from Gucci ",
      imgLink:
        "https://img.shopstyle-cdn.com/pim/c7/a6/c7a695a8db5a375b222f15bea045bdea_xlarge.jpg",
      name: "Raw Edge",
      price: 799
    },
    {
       id: 16,
      category: "Belts",
      description: "Iconic metallic belt",
      imgLink:
        "https://img.shopstyle-cdn.com/pim/81/78/8178fa6c3b27d3f3e0fe18d019c992ea_xlarge.jpg",
      name: "Goofy Black",
      price: 349
    },
    {
       id: 17,
      category: "Sunglasses",
      description: "Min black faded front shades",
      imgLink:
        "https://cdn.shopify.com/s/files/1/0898/5824/products/QUAY_HIGHKEY_Mini_BLACK_FADE_FRONT_450x.jpg",
      name: "Quay Shades",
      price: 479
    },
    {
       id: 18,
      category: "Belts",
      description: "Evergreen formal belt with classic buckle",
      imgLink:
        "https://as1.ftcdn.net/jpg/02/02/45/86/500_F_202458696_CYlcJbJfjgUb2VgQnPSUxHU79v6I3SC6.jpg",
      name: "Classic Brown",
      price: 128
    },
    {
       id: 19,
      category: "Handbags",
      description: "Beach handbag to go along with a beach holiday",
      imgLink:
        "https://images.pexels.com/photos/2305000/pexels-photo-2305000.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      name: "Funky Jute",
      price: 99
    }
  ];
let user=[{email:"user@gmail.com", password:"user"}]
  app.get("/product", function (req, res, next) 
  { console.log("shops api"); 
  
  {pool.query(`SELECT * FROM ecom`, function (err, result) {
  if (err) { res.status(400).send(err);}
  console.log("Inside /users get api"); 
  console.log(result); 
  res.send(result)
  
   
  });} })
  app.get("/product/:id", function (req, res, next) 
  { console.log("shops api"); 
  const id=req.params.id
  
  {pool.query(`SELECT * FROM ecom`, function (err, result) {
  if (err) { res.status(400).send(err);}
  console.log("Inside /users get api"); 
  console.log(result); 
  let find=result.rows.find((st)=>st.id===id)
  res.send(find)
  
   
  });} })
  app.post("/product", function (req, res, next) { 


    const query=`insert into ecom(name,description,price,imglink,category)
    VALUES($1,$2,$3,$4,$5)`;
    var values = Object.values(req.body);
    console.log(values);
    pool.query(query, values, function (err, result) {
    if (err) {
    res.status(400).send("add product Failed");
    }
    console.log(query);
    res.send(`${result} insertion successful`);
     
    });
    });
  app.post("/myorder", function (req, res, next) { 


    const query=`insert into myorder(name,address,city,amount,items,email)
    VALUES($1,$2,$3,$4,$5,$6)`;
    var values = Object.values(req.body);
    console.log(values);
    pool.query(query, values, function (err, result) {
    if (err) {
    res.status(400).send("add product Failed");
    }
    console.log(query);
    res.send(`${result} insertion successful`);
     
    });
    });

    app.put("/product/:id", function (req, res, next) {
      console.log(" put ");   
      const id=req.params.id 
      let name= req.body.name;
     
      let category= req.body.category;
      let description= req.body.description;
      let price= req.body.price;
      let imglink= req.body.imglink;
     const values=[name,description,price,imglink,category]
    console.log(values)
    const query =`UPDATE ecom SET name=$1,
    description=$2,price=$3,
    imglink=$4,category=$5
    WHERE id=${id}`;
    
    pool.query(query,values,function (err, result) { if (err) {
     
       res.status(400).send(err);
       }
    
       res.send(`${result} update successful`);
      
       });
       });



  app.delete("/product/:id/delete", function (req, res, next) { 

    const id=req.params.id

    {pool.query(`DELETE FROM ecom WHERE id=${id}`, function (err, result) {
      if (err) { res.status(400).send(err);}
      console.log("Inside /users get api"); 
      console.log(result); 
      
      res.send(result)
      
       
      });} })
  app.get("/Myorder", function (req, res, next) 
  { console.log("shops api"); 
  
  {pool.query(`SELECT * FROM myorder`, function (err, result) {
  if (err) { res.status(400).send(err);}
  console.log("Inside /users get api"); 
  console.log(result); 
  res.send(result)
  
   
  });} })

app.post("/login", function(req, res) {
  
  var email = req.body.email;
  var password = req.body.password;

 console.log(user)
    var cust = user.find((item)=> item.email==email && item.password ==password
  )
  
console.log (cust,"cust");
  
  let custRec= {email:cust.email}
  console.log(cust);

  if (!cust){ 
    res.status(500).send("Login Failed. Check the email and password");}
        else
       { 

            res.send(custRec);
          }
        })
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
app.post("/cart", function(req, res) {
  var body = req.body;
  var id = req.body.id;
  console.log(body)

  let find=cart.findIndex((st)=>st.id==id)
  let find1=cart.find((st)=>st.id==id)

  find===-1?cart.push(body):cart.splice(cart[find],1)

 res.send(cart)
});
app.put("/cart", function(req, res) {
  var body = req.body;
  var id = req.body.id;
  console.log(body)

  let find=cart.findIndex((st)=>st.id==id)
  let find1=cart.find((st)=>st.id==id)

  find===-1?cart.push(body):cart[find]=body

 res.send(cart)
});
app.delete("/cart", function(req, res) {
 cart=[]


 res.send(cart)
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

app.get("/cart", function(req, res) {

 res.send(cart)
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
