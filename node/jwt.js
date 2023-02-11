const express = require("express");
let app = express();
app.use(express.json());
app.use(function (req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Credentials", true);
res.header(
"Access-Control-Allow-Headers",
"Origin, X-Requested-With,Authorization, Content-Type, Accept"
);
res.header(["Authorization", "Content-Type", "Accept"]
);

next();
});
let users =[
{ id: 1, name: "John", password: "john" },
{ id: 2, name: "Sarah", password: "sarah" },
{ id: 3, name: "George", password: "george" },
{ id: 4, name: "Anna", password: "anna" },
];
let orders = [
{orderId: 1, userId: 1, qty: 10, value: 55 },
{orderId: 2, userId: 2, qty: 15, value: 75 },
{ orderId: 3, userId: 3, qty: 20, value: 20 },
{ orderId: 4, userId: 1, qty: 4, value: 100 },
{ orderId: 5, userId: 1, qty: 6, value: 72 },
{ orderId: 6, userId: 2, qty: 8, value: 96 }, { orderId: 7, userId: 2, qty: 12, value: 240 },
{ orderId: 8, userId: 1, qty: 30, value: 450 },
];
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use("/myOrders",authenticateToken)
const port = 2410;
app.listen(port, () => console.log(`Node app listening on port ${port}!`));
const jwt = require("jsonwebtoken");
const jwt_key = "secret key237483"; 
const jwtExpiryTime = 300;
let cookieName="jwtToken"

app.post("/login", function (req, res) {
let { username, password } = req.body;

let user = users.find((u) => u.name == username && u.password==password);
if (user) {
const token = jwt.sign({ user }, jwt_key, {
algorithm:"HS256",
expiresIn: jwtExpiryTime,
});
res.cookie(cookieName,token)
res.send("Login Success")
}else  res.status(401).send("Login failed");
});
function authenticateToken (req, res, next) {
     console.log(req.headers);
    const token =req.cookies[cookieName];
     console.log("Token: ", token);
    if (!token) res.status(401).send("Please login first");
    else {
    jwt.verify(token, jwt_key, function (err, data) { if (err) res.status(403).send(err);
    else {
    console.log(data);
    req.user = data.user;
     next();
    }});
} 
} 

app.get("/myOrders", function (req, res) {
 
    let orders1 = orders.filter((ord) => ord.userId===req.user.id);
    res.send(orders1); 
    });
    app.get("/info", function (req, res) { res.send("Hello. Welcome to the tutorial"); });