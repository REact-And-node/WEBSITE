let express = require("express");
let app = express();
const jwt = require("jsonwebtoken");
let passport = require("passport");
let JWTStrategy = require("passport-jwt").Strategy;
let ExtractJWT = require("passport-jwt").ExtractJwt;

app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization" );
    res.header(
    "Access-Control-Expose-Headers","Authorization" );
    res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
    );

next();
});
let orders = [
    {orderId: 1, userId: 1, qty: 10, value: 55 },
    {orderId: 2, userId: 2, qty: 15, value: 75 },
    { orderId: 3, userId: 3, qty: 20, value: 20 },
    {orderId: 4, userId: 1, qty: 4, value: 100 },
    { orderId: 5, userId: 1, qty: 6, value: 72 },
    { orderId: 6, userId: 2, qty: 8, value: 96 },
    {orderId: 7, userId: 2, qty: 12, value: 240 },
    {orderId: 8, userId: 1, qty: 30, value: 450 },
    ];
    let users = [
        { id: 1, name: "John", password: "john", role: "customer" },
        { id: 2, name: "Sarah", password: "sarah", role: "customer" },
        { id: 3, name: "George", password: "george", role: "customer" }, 
        { id: 4, name: "Anna", password: "anna", role: "customer" },
        { id: 5, name: "Tim", password: "tim", role: "admin" },
        { id: 6, name: "Steve", password: "steve", role: "admin" }
    ]

    app.use(passport.initialize());

const port = 2410;
app.listen(port, () => console.log(`Node app listening on port ${port}!`));
const params ={ 
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
     secretOrKey:"jwtsecret23647832"};
    const jwtExpirySeconds = 1000000;
let strategyAll = new JWTStrategy(params, function (
    token,
    done
    ) {
    console.log("In JWTStrategy-All", token);
    let user1 = users.find((u) => u.id === token.id); console.log("user", user1);
    if (!user1)
    return done(null, false, { message: "Incorrect username or password" }); else return done(null, user1);  });
let strategyAdmin = new JWTStrategy(params, function (
    token,
    done
    ) {
    console.log("In JWTStrategy-All", token);
    let user1 = users.find((u) => u.id === token.id); console.log("user", user1);
    if (!user1)
    return done(null, false, { message: "Incorrect username or password" });
    else if (user1. role !== "admin")
    return done (null, false,{ message: "You do not have admin role" }); 
    else {return done(null, user1)};
    });
  
   
   passport.use("roleAll", strategyAll);
    passport.use("roleAdmin", strategyAdmin);
   
   
   app.post("/user", function (req, res) {
       let { username, password } = req.body;
       let user = users.find((u) => u.name === username && u.password===password);
       if (user) {
        let payload={ id: user.id }; 
       
        let token = jwt.sign (payload, params.secretOrKey, {
        algorithm: "HS256",
        expiresIn: jwtExpirySeconds,})
        res.setHeader("Authorization", token);
         res.send(payload);
        
       } else res.sendStatus (401);
       });
   app.get(
       "/user",
       passport.authenticate("roleAll",{ session: false }),
       function (req, res) {
           console.log("Get/user",req.user)
       res.send(req.user);}
       );
       app.get(
       "/myOrders",
       passport.authenticate("roleAll",{ session: false }),
       function (req, res) {
           console.log("Get/myOrders",req.user)
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