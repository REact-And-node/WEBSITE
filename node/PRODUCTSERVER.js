let express = require("express");
let app = express();
app.use(express.json());
app.use(function (req, res, next) {
res.header("Access-Control-Allow-Origin",'*');
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
app.listen(port, () => console.log(`Node app listening on port ${port}!`));
let baseURL = "https://repo-8qu2.onrender.com/productServer";
let axios = require("axios");
app.get("/myserver/customers",async function (req, res) {
    try{
let data=await axios
.get(baseURL + "/customers")

    console.log(response);
     res.send(response.data);
}
catch{(function (error) {
if (error.response) {
let {status, statusText} = error.response; 
console.log(status, statusText); 
res.status(status).send(statusText); } 
else res.status (404).send(error);
})};
});
app.get("/myserver/products",async function (req, res) {
    try{
    let data=await axios
.get(baseURL + "/products")
 
    console.log(response);
     res.send(response.data);
}
catch{(function (error) {
if (error.response) {
let {status, statusText} = error.response; 
console.log(status, statusText); 
res.status(status).send(statusText); } 
else res.status (404).send(error);
});}
});
app.get("/myserver/orders",async function (req, res) {
    let { cust, prod} = req.query;
    let params ={};
    if (cust) params.cust = cust;
    if (prod) params.prod = prod; 
    try{
    let data=await axios
    .get(baseURL + "/orders",{ params : params })

    console.log(response);
     res.send(response.data);
}
catch{(function (error) {
if (error.response) {
let {status, statusText} = error.response; 
console.log(status, statusText); 
res.status(status).send(statusText); } 
else res.status (404).send(error);
});}
});  
app.get("/myserver/orders/customer/:cust",async function (req, res) {
    let { cust} = req.params;
    try{
        let data=await axios.get(`${baseURL}/orders/customer/${cust}`)
       
              console.log(response.data);
               res.send(response.data);
          }
          catch{(function (error) {
          if (error.response) {
          let { status, statusText } = error.response;
           console.log(status, statusText);
            res.status(status).send(statusText);
          } else res.status(404).send(error);
          })};
});
app.get("/myserver/orders/product/:prod",async function (req, res) {
     let { prod} = req.params; 
     
     try{
        let data=await axios.get(`${baseURL}/orders/product/${prod}`)
       
              console.log(response.data);
               res.send(response.data);
          }
          catch{(function (error) {
          if (error.response) {
          let { status, statusText } = error.response;
           console.log(status, statusText);
            res.status(status).send(statusText);
          } else res.status(404).send(error);
          })};
});

app.post("/myserver/orders", async function (req, res) {
    try {
    let body  =req.body;
    let response = await axios.post(`${baseURL}/orders`, body); console.log(response.data);
    res.send(response.data);
    } catch (error) {
    if (error.response) {
    let {status, statusText } = error.response;
    console.log("Error::", status, statusText);
    res.status(status).send(statusText);
    }else res.status(404).send(error);
    }
    });