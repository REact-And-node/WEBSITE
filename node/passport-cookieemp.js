let express = require("express");
let app = express();
let passport = require("passport"); 
let CookieStrategy = require("passport-cookie").Strategy;
app.use(express.json());
app.use(function (req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Credentials", true);
res.header(
"Access-Control-Allow-Headers",
"Origin, X-Requested-With,Authorization, Content-Type, Accept"
);


next();
});
let emp=[
    {empCode:1451,name:"Jack",department:"Finance",designation:"Manager",salary:52500,gender:" Male"},
    {empCode:1029,name:"Steve",department:"Technology",designation:"Manager",salary:71000,gender:"Male"},
    {empCode:1891,name:"Anna",department:"HR",designation:"Manager",salary:55100,gender:"Female"},
    {empCode:1322,name:"Kathy",department:"Operations",designation:"Manager",salary:49200,gender:"Female"},
    {empCode:1367,name:"Bob",department:"Marketing",designation:"Manager",salary:39000,gender:
    "Male"},
    {empCode:1561,name:"George",department:"Finance",designation:"Trainee",salary:22500,gender
    :"Male"},
    {empCode:1777,name:"Harry",department:"Technology",designation:"Trainee",salary:31000,gender:"Male"},
    {empCode:1606,name:"Julia",department:"HR",designation:"Manager",Trainee:25100,gender:"Female"},
    {empCode:1509,name:"Kristina",department:"Operations",designation:"Trainee",salary:19200,gender:"Female"},
    {empCode:1533,name:"William",department:"Marketing",designation:"Trainee",salary:16200,gender:"Male"},
    {empCode:1161,name:"Stephen",department:"Finance",designation:"VP",salary:82500,gender:"Male"},
    {empCode:1377,name:"Winston",department:"Technology",designation:"VP",salary:91000,gender:
    "Male"},
    {empCode:1206,name:"Victoria",department:"HR",designation:"Manager",VP:65100,gender:"Female"},
    {empCode:1809,name:"Pamela",department:"Operations",designation:"VP",salary:78600,gender:
    "Female"},
    {empCode:1033,name:"Tim",department:"Marketing",designation:"VP",salary:66800,gender:"Male"},
    {empCode:1787,name:"Peter",department:"Technology",designation:"Manager",salary:47400,gender:"Male"},
    {empCode:1276,name:"Barbara",department:"Technology",designation:"Trainee",salary:21800,gender:"Female"},
    {empCode:1859,name:"Donna",department:"Operations",designation:"Trainee",salary:21900,gender:"Female"},
    {empCode:1874,name:"Igor",department:"Operations",designation:"Manager",salary:48300,gender:"Male"},
    {empCode:1111,name:"MD NAFISH ALAM",department:"Marketing",designation:"VP",salary:66800,gender:"Male"},
    ]
let tracker=[]
    const cookieParser = require("cookie-parser");
    app.use(cookieParser());
    app.use(passport.initialize());
    const myCookie = "passportCookie";
const port = 2410;
app.listen(port, () => console.log(`Node app listening on port ${port}!`));

let strategyAll = new CookieStrategy({ cookieName: myCookie }, function (
    token,
    done
    ) {
    console.log("In CookieStrategy-All", token);
    let user1 = emp.find((u) => u.empCode == token.empCode); console.log("user", user1);
    if (!user1)
    return done(null, false, { message: "Incorrect username or password" }); else return done(null, user1);  });
let strategyAdmin = new CookieStrategy({ cookieName: myCookie }, function (
    token,
    done
    ) {
    console.log("In CookieStrategy-All", token);
    let user1 = emp.find((u) => u.empCode == token.empCode); console.log("user", user1);
    if (!user1)
    return done(null, false, { message: "Incorrect username or password" });
    else if (user1. role !== "VP")
    return done (null, false,{ message: "You do not have admin role" }); 
    else {return done(null, user1)};
    });
  
   
   passport.use("roleAll", strategyAll);
    passport.use("roleAdmin", strategyAdmin);
   
   
   app.post("/login", function (req, res) {
       let { username, password } = req.body;
       let user = emp.find((u) => u.name == username && u.empCode==password);
       if (user) {
        let payload={ empCode: user.empCode ,name: user.name ,expiresIn: Date.now(),url:"/login"}; 
       
        res.cookie(myCookie, payload);
   
         res.send(payload) 
        
       } else res.sendStatus (401);
       });
   app.get("/myDetails",function (req, res) {
          
           let payload={  expiresIn: Date.now(),url:"/myDetails"};
           tracker.push(payload)
       res.send(emp);}
       );
       app.get(
       "/myOrders",
       passport.authenticate("roleAll",{ session: false }),
       function (req, res) {
           console.log("Get/myOrders",req.user)
           let payload={ empCode: user.empCode ,name: user.name ,expiresIn: Date.now(),url:"/myDetails"};
           tracker.push(payload)
       let orders1 = orders.filter((ord) => ord.userId===req.user.id);
       
       res.send(orders1);
       }
       );
       app.get(
           "/allOrders",
           passport.authenticate("roleAdmin", { session: false }),
           function (req, res) {
           console.log("In GET /allOrders", req.user);
           res.send(orders);
           }
           );