import React, { Component } from "react";
import { Link } from "react-router-dom"; 
import sale from "./image/sale.png"
import http from "./services/httpServer";
import queryString from 'query-string'
import authSys from "./services/authSys";
import LeftPanelOptionscb from "./Optioncb";
import NavBar from "./Navbar";
class Cheques extends Component { 
  state = {Employees:[],pageInfo:[], cities: ["London", "Paris", "New Delhi", "Bangalore"], 
  companies: ["Apple", "Google", "Facebook", "Microsoft", "Tesla"], 
ages:[25,30,35,40,45,50],
cartdata:[],
cart:[],
form:{Address2:"",Address1:""}};

  async fetchData() {
  let queryParams = queryString.parse(this.props.location.search);
  let {catolog} = this.props.match.params;
  let response = await http.get(`/product`);
  console.log("Employees",response);
  let {data} = response;
  this.setState({ Employees:data.rows});}

  componentDidMount(){
this.fetchData();}
Edit=()=>{

}
componentDidUpdate(prevProps, prevState){
if (prevProps!==this.props)this.fetchData();}


 callURL= (url, options) => {
    let searchString = this.makeSearchString(options);
    this.props.history.push({ pathname: url, search: searchString.toString()})
    }
  handlePage = (incr) => {
    let queryParams = queryString.parse(this.props.location.search);

    let { page =1 } = queryParams;
    let newPage = +page + incr; 
    queryParams.page = newPage;
    this.callURL(`/`, queryParams);
    };
    
   

    filterParam = (arr, name, values) => {

        if (!values) return arr;
        let valuesArr = values.split(",");
        
        let arr1 = arr.filter((a1) => valuesArr.find((val) => val.category === a1.category));
        
        return arr1;
        
        };
    makeAllOptions= (arr) => {

        let json = {};
     
       json.bankName = this.getDifferentValues(arr, "category");
      
        return json;}
    
      makeAllOptions1= (arr) => {
  
        let json = {};
        json.productName= this.getDifferentValues(arr, "category");
        json.productId= this.getDifferentValues(arr, "productId");
      
      
        return json;}
        callURL= (url, options) => {
          let searchString = this.makeSearchString(options);
          this.props.history.push({ pathname: url, search: searchString.toString(",")})
          }
        getDifferentValues = (arr, name) =>
        arr.reduce(
            (acc, curr) =>
        acc.find((val) => val === curr[name]) ? acc: [...acc, curr[name]],[]
        );
    makeSearchString = (options) => {
      let {page, category, amount, minAge } = options;
      let searchStr = "";
      searchStr = this.addToQueryString(searchStr, "page", page);
      searchStr = this.addToQueryString(searchStr, "category", category);
      searchStr = this.addToQueryString(searchStr, "amount", amount);
      searchStr = this.addToQueryString(searchStr, "minAge", minAge);
      return searchStr;
      };
    
      addToQueryString = (str, paramName, paramValue)=> paramValue
      ? str
      ? `${str}&${paramName}=${paramValue}`
      : `${paramName}=${paramValue}`
      : str;
      handleOptionChange = (options) => { 
  
        this.callURL("/Cheques", options);
    };
    async postData(url, obj) {
    
      let response = await http.post(url, obj);
      
  } 
    async postData(url, obj) {
    
      let response = await http.post(url, obj);
      
  } 
    async delete(url) {
    
      let response = await http.post(url);
      
  } 
    addtocart=(a)=>{
      console.log(a)
      const s1={...this.state}
      let {cart=s1.cart.length} = this.props.match.params;
     let idd=s1.cartdata.findIndex((st)=>st==a)
      console.log(idd)
      idd===-1?s1.cartdata.push(s1.Employees[a-1].id):s1.cartdata.splice(idd,1)
     
      let ab={...s1.Employees[a],quantity:1}
       idd===-1?s1.cart.push(ab):s1.cart.splice(s1.Employees[idd],1)
  
      console.log(idd)
      console.log(s1.cartdata)
      console.log(s1.cart)

this.setState(s1)
    }
    quantityincr=(index)=>{
      
      let s1={...this.state}
 
        s1.cart[index].quantity=s1.cart[index].quantity + 1
     
      this.setState(s1)
           }
          quantitydec=(index)=>{
      console.log(index)
     
      let s1={...this.state}
       console.log( s1.cart[index].quantity)
      s1.cart[index].quantity<2?s1.cart.splice(index,1)
    :
      s1.cart[index].quantity=s1.cart[index].quantity - 1
      let map=s1.cart.map((id)=>id.id)
      map==undefined?s1.cartdata=[]:s1.cartdata=map
      this.setState(s1)
           }

           handleChange = (e) =>{
            const { currentTarget: input } = e;
            let s1 = {...this.state };
            
            s1.form[input.name] = input.value;
            
            
            this.setState(s1)
              }
            
            
            
            
            
                    
            handleSubmit = (e) => {
                 e.preventDefault();
                 const user=authSys.getUser()
                 let {form}=this.state
                 let cartvalue=this.state.cart.reduce((acc,curr)=>acc+curr.price*curr.quantity,0)
                 let quantityvalue=this.state.cart.reduce((acc,curr)=>acc+curr.quantity,0)
                let arr={name:form.Name,address:form.Address1+","+form.Address2,city:form.City,amount:"RS."+cartvalue,items:quantityvalue,email:user.email}
                console.log(arr)
                console.log(quantityvalue)
                 this.postData("/myorder",arr)
                 
               alert("Product Added Successfully")
               
              }
           checkout=()=>{
            const { cities, companies,cart} = this.state;
            const { name,address} = this.state.form;
     
            let cartvalue=cart.reduce((acc,curr)=>acc+curr.price*curr.quantity,0)
            let quantityvalue=cart.reduce((acc,curr)=>acc+curr.quantity,0)
            return(<React.Fragment>
<div className="coaintainer">
<img src={sale} alt="" style={{width:"100%"}}/>

<h1 className="text-center">Summary of your Order</h1>
<h2 className="text-center">Your order has {quantityvalue} items</h2>
<div className="row text-center border bg-dark text-white" style ={{fontSize:"large"}}>
       
       <div className="col-4"><b>name</b></div>
     
     <div className="col-4"><b>Quantity</b></div>
     <div className="col-4"><b>value</b></div>
   
     </div>
        
     {this.state.cart.map((pr,index) => (
     <div className="row text-center border" style ={{fontSize:"large"}}>
   
      
       <div className="col-4"><b>{pr.name}</b>
       </div>
       <div className="col-4"><b>{pr.quantity}</b></div>
       <div className="col-4" > <b>{pr.quantity*pr.price}</b></div>
     
      
          </div>
      
        ))}
        <div className="row text-center border" style ={{fontSize:"large"}}>
       
       <div className="col-4"> <b>Total</b></div>
     
     <div className="col-4 "><b></b></div>
     <div className="col-4 "><b>{cartvalue}</b></div>
   
     </div>
<h1 className="text-center">Delivery Details</h1>
<br />
<br />
<br />
<br />
<div className="row">
 
  <div className="row">
<div className="col-1"><h3></h3></div>
<div className="col-5"><h3>Name</h3></div>
<div className="col-6"><h3></h3></div>
     </div> 
   <div className="row">
<div className="col-1"></div>

<div className="col-11"> 
<input
   type="text"
    className="form-control"
    id="email ID"
    name="Name" 

   
    onChange={this.handleChange}
    />

     <br /><br />
   
    </div>

     </div>

     <div className="row">
<div className="col-1"><h3></h3></div>
<div className="col-5"><h3>Address<b className="text-danger bg-light">*</b></h3></div>
<div className="col-6"><h3></h3></div>
     </div> 
   <div className="row">
<div className="col-1"></div>

<div className="col-11"> 
<input
   type="text"
    className="form-control"
    id="email ID"
    name="Address1" 
value={name}
   
    onChange={this.handleChange}
    />

     <br /><br />
   
    </div>

     </div>
   <div className="row">
<div className="col-1"></div>

<div className="col-11"> 
<input
   type="text"
    className="form-control"
    id="email ID"
    name="Address2" 

   
    onChange={this.handleChange}
    />

     <br /><br />
   
    </div>

     </div>
     <div className="row">
<div className="col-1"><h3></h3></div>
<div className="col-5"><h3>City<b className="text-danger bg-light">*</b></h3></div>
<div className="col-6"><h3></h3></div>
     </div> 
   <div className="row">
<div className="col-1"></div>

<div className="col-11"> 
<input
   type="text"
    className="form-control"
    id="email ID"
    name="City" 

   
    onChange={this.handleChange}
    />

     <br /><br />
   
    </div>

     </div>



     <div className="row">
<div className="col-3"><h3></h3></div>
<div className="col-1"><button className="btn btn-primary btn-lg" onClick={this.handleSubmit} >order Complete</button></div>


<div className="col-6"><h3></h3></div>
     </div> 
     
</div>
</div>
            </React.Fragment>)
           }
    cart=()=>{
    
 
        const { cities, companies, cart} = this.state;
     
      let cartvalue=cart.reduce((acc,curr)=>acc+curr.price*curr.quantity,0)
      const user=authSys.getUser()
         return (<React.Fragment>
          
      
        <div className="container">
      
        <img src={sale} alt="" style={{width:"100%"}}/>
      <h1 className="text-center">You Have {this.state.cart.length} Items In Your Cart</h1>
      <div className="row">
      <div className="col-4"> <h2>
      Cart Value:{cartvalue} 

         </h2></div>
      <div className="col-6"></div>
      <div className="col-2"><Link to={`/product/CheckOut`}><button className="btn btn-primary btn-lg">Check Out</button></Link></div>

      </div>
      
       
          <div className="row text-center border bg-dark text-white " style ={{fontSize:"large"}}>
       
          <div className="col-8 "> <b>product details </b></div>
        
        <div className="col-2 text-right"><b>Quantity</b></div>
        <div className="col-2 "><b>value</b></div>
      
        </div>
           <div className="row">
        {this.state.cart.map((pr,index) => (<React.Fragment>
        <div className="row" >
        <div className="col-8 ">
          <div className="row">
          <div className="col-2"><img  src={pr.imglink} alt="Card image cap" style={{width: "10rem",margin:"1rem"}}/>
          </div>
          <div className="col-2"></div>
          <div className="col-8" style={{float:"left",fontSize:"medium",color:"gray"}}>
             <b>{pr.name}</b>
             <br />
             <b> {pr.category}</b>
             <br />
             <b> {pr.description}</b>
            
          </div>
         </div>
        </div>
        <div className="col-3 text-center">
        <button className="btn btn-success btn-lg" onClick={()=>this.quantityincr(index)}>+</button>
      
        <button className="btn btn-light btn-lg">{pr.quantity}</button>
        <button className="btn btn-warning btn-lg" onClick={()=>this.quantitydec(index)}>-</button>
        </div>
        <div className="col-1 "  style={{float:"left",fontSize:"medium",color:"black"}}>
        {pr.price*pr.quantity}
        </div>
          </div>
      
        </React.Fragment>
      
        ))}
        <br />
      
      
      
       
        </div>
        </div></React.Fragment>);
      
    }
render() {
 
  const { cities, companies, ages,Employees} = this.state;
  
  const user=authSys.getUser()
 let queryParams = queryString.parse(this.props.location.search)
 
 let {catolog} = this.props.match.params;
 console.log(catolog)
  let max=5
  let startindex=(queryParams.page-1)*max
 let page=1

  let EndIndex=startindex>1?max+startindex:Employees.length<max+startindex?Employees.length-1:max
 
 

 
 let tu=catolog===undefined||catolog=="All"?Employees:
 catolog==="Watches"? Employees.filter((st,index)=>st.category==="Watches "||st.category==="Watches") :
 catolog=="Sunglasses"? Employees.filter((st,index)=>st.category==="Sunglasses "||st.category==="Sunglasses") :
 catolog=="Belts"? Employees.filter((st,index)=>st.category==="Belts "||st.category==="Belts") :
 catolog=="Handbags"? Employees.filter((st,index)=>st.category==="Handbags "||st.category==="Handbags") :
 catolog=="Wallets"? Employees.filter((st,index)=>st.category==="Wallets "||st.category==="Wallets") :
 catolog=="Sport Shoes"? Employees.filter((st,index)=>st.category=== "Sport Shoes"||st.category=== "Sport Shoes") :
 catolog=="Formal Shoes"? Employees.filter((st,index)=>st.category==="Formal Shoes "||st.category==="Formal Shoes") :
 catolog=="Sandals"? Employees.filter((st,index)=>st.category==="Sandals"||st.category==="Sandals") :
 Employees.filter((st,index)=>st.category==="Floaters"||st.category==="Floaters") 

  let sty=tu.filter((st,index)=>index>=startindex&&index<EndIndex) 
   console.log(sty)
   EndIndex= EndIndex>tu.length?EndIndex=tu.length:max+startindex 

   return (
  <div className="container">
   <NavBar user={user} cart={this.state.cart}/>
   {catolog=="Cart"?this.cart():catolog=="CheckOut"? this.checkout():<React.Fragment>
    <img src={sale} alt="" style={{width:"100%"}}/>
    <div className="row">
    <div className="col-3">
    <LeftPanelOptionscb
  options={queryParams}
param={catolog}

onOptionChange={this.handleOptionChange}
  />
    </div>
  
    <div className="col-9">
        
   


  <div className="row">

    <div className="col-12">
   
     <div className="row text-center bg-light border">
  {tu.map((pr,index) => (<React.Fragment>
  <div className="card" style={{width: "30rem",margin:"1rem"}}>
  <img className="card-img-top" src={pr.imglink} alt="Card image cap"/>
  <div className="card-body">
    <h5 className="card-title" style={{float:"left",fontSize:"large"}}>{pr.name}</h5>
    <br />
    <br />
    <h5 className="card-title" style={{float:"left",fontSize:"medium",color:"gray"}}>Rs.{pr.price}</h5>
    <br />
    <br />
    <p className="card-text" style={{float:"left",color:"gray",fontWeight:"bold",overflow: 'hidden', textOverflow: 'ellipsis'}}>{pr.description}</p>
    <div >
    {this.state.cartdata.find((st)=>st===pr.id)?
    <button className="btn btn-warning form-control" style={{width:"100%"}} onClick={()=>this.addtocart(pr.id)}>
  remove from cart
     </button>: <button className="btn btn-success form-control" style={{width:"100%"}} onClick={()=>this.addtocart(pr.id)}>
  Add to cart
     </button>}
    </div>
  </div>
</div>
  </React.Fragment>

  ))}</div>
  <br />
 
   </div>
 </div>
  </div>

  </div>
  </React.Fragment>
 } 
  </div>);
}}
export default Cheques