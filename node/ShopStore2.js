let express = require("express");
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
app.listen(port, () => console.log('Node app listening on port ',port));
let { Store} = require("./shopsdata.js");
let { shops, products,purchases} = Store;

let fs = require("fs"); 
let fname = "store.json";
app.get("/svr/resetData", function (req, res) {
  let data = JSON.stringify(Store); 
  fs.writeFile(fname, data, function (err) 
  { if (err) res.status (404).send(err);
       else res.send("Data in file is reset");
  });
  });
    app.get("/shops", function (req, res) {
     
        fs.readFile(fname, "utf8", function (err, data) { if (err) res.status(404).send(err); else{
        let customersArray = JSON.parse(data);
        res.send(customersArray);
      }  });
    
        });
    app.get("/purchases", function (req, res) {
      let product=req.query.product
        fs.readFile(fname, "utf8", function (err, data) { if (err) res.status(404).send(err); else{
        let customersArray = JSON.parse(data);
     
        res.send(customersArray);
      }  });
    
        });
    app.get("/products", function (req, res) {
        fs.readFile(fname, "utf8", function (err, data) { if (err) res.status(404).send(err); else{
        let customersArray = JSON.parse(data);
        res.send(customersArray);
      }  });
    
        });
    app.get("/purchases/shops/:shopId", function (req, res) {
        let shopId=req.params.shopId
        fs.readFile(fname, "utf8", function (err, data) { if (err) res.status(404).send(err); else{
        let customersArray = JSON.parse(data);
        let filter=customersArray.purchases.filter((st)=>st.shopId==shopId)
        res.send(filter);
      }  });
    
        });
    app.get("/totalPurchase/shop/:shopId", function (req, res) {
        let shopId=req.params.shopId
        let productId=req.params.productId
        fs.readFile(fname, "utf8", function (err, data) { if (err) res.status(404).send(err); else{
        let customersArray = JSON.parse(data);
        let filter=customersArray.purchases.filter((st)=>st.shopId==shopId)
        res.send(filter);
      }  });
    
        });
    app.get("/totalPurchase/product/:shopId", function (req, res) {
        let shopId=req.params.shopId
        let productId=req.params.productId
        fs.readFile(fname, "utf8", function (err, data) { if (err) res.status(404).send(err); else{
        let customersArray = JSON.parse(data);
        let filter=customersArray.purchases.filter((st)=>st.productid==shopId)
        res.send(filter);
      }  });
    
        });
    app.get("/purchases/products/:productid", function (req, res) {
        let productid=req.params.productid
        fs.readFile(fname, "utf8", function (err, data) { if (err) res.status(404).send(err); else{
        let customersArray = JSON.parse(data);
        let filter=customersArray.purchases.filter((st)=>st.productid==productid)
        res.send(filter);
      }  });
    
        });
    app.get("/products/:productId", function (req, res) {
        let productId=req.params.productId
        fs.readFile(fname, "utf8", function (err, data) { if (err) res.status(404).send(err); else{
        let customersArray = JSON.parse(data);
        let filter=customersArray.products.find((st)=>st.productId==productId)
        res.send(filter);
      }  });
    
        });
    app.get("/products/add/:productId", function (req, res) {
        let productId=req.params.productId
        fs.readFile(fname, "utf8", function (err, data) { if (err) res.status(404).send(err); else{
        let customersArray = JSON.parse(data);
        let filter=customersArray.products.find((st)=>st.productId==productId)
        res.send(filter);
      }  });
    
        });

       
            app.post("/products", function (req, res) {
                let body= req.body;
                fs.readFile(fname, "utf8", function (err, data) { if (err) res.status(404).send(err);
                else {
                let customersArray = JSON.parse(data);
                let maxid = customersArray.products.reduce(
                (acc, curr) => (curr.productId > acc? curr.productId : acc),
                0
                );
                let newid = maxid + 1;
let newcustomers = { ...body, productId: newid };
customersArray.products.push(newcustomers);
let data1 = JSON.stringify(customersArray);
fs.writeFile(fname,data1, function (err) { if (err) res.status (404).send(err);
else res.send(newcustomers);
});
}
});
});
app.post("/purchases", function (req, res) {
    let body= req.body;
    fs.readFile(fname, "utf8", function (err, data) { if (err) res.status(404).send(err);
    else {
    let customersArray = JSON.parse(data);
    let maxid = customersArray.purchases.reduce(
    (acc, curr) => (curr.purchaseId > acc? curr.purchaseId : acc),
    0
    );
    let newid = maxid + 1;
let newcustomers = { ...body, purchaseId: newid };
customersArray.purchases.push(newcustomers);
let data1 = JSON.stringify(customersArray);
fs.writeFile(fname,data1, function (err) { if (err) res.status (404).send(err);
else res.send(newcustomers);
});
}
});
});
            app.post("/shops", function (req, res) {
                let body= req.body;
                fs.readFile(fname, "utf8", function (err, data) { if (err) res.status(404).send(err);
                else {
                let customersArray = JSON.parse(data);
                let maxid = customersArray.shops.reduce(
                (acc, curr) => (curr.shopId > acc? curr.shopId : acc),
                0
                );
                let newid = maxid + 1;
let newcustomers = { ...body, shopId: newid };
customersArray.shops.push(newcustomers);
let data1 = JSON.stringify(customersArray);
fs.writeFile(fname,data1, function (err) { if (err) res.status (404).send(err);
else res.send(newcustomers);
});
}
});

});
app.put("/products/:productId", function (req, res) {
    let body= req.body;
    let productId= req.params.productId;
    fs.readFile(fname, "utf8", function (err, data) { if (err) res.status(484).send(err);
    else {
    let customersArray = JSON.parse(data);
    let index = customersArray.products.findIndex((st) => st.productId ==productId);
    if (index >= 0) {
    let updatedcustomers = { ...customersArray[index], ...body };
    customersArray.products[index] = updatedcustomers;
    let data1 = JSON.stringify(customersArray);
    fs.writeFile(fname, data1, function (err) {
    if (err) res.status (404).send(err);
    else res.send(updatedcustomers);
    });
} 
else res.status (404).send("No student found");}
});
});
