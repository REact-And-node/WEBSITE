import React, { Component } from "react";
import { Link } from "react-router-dom"; 
import http from "./services/httpServer";
import queryString from 'query-string'
import sale from "./image/sale.png"
import authSys from "./services/authSys";
import NavBar from "./Navbar";
class CompA extends Component { 
  state = {cart:[]};

  async fetchData() {
  let queryParams = queryString.parse(this.props.location.search);
  let {id} = this.props.match.params;
  let response = await http.get(`/cart`);
  console.log("cart",response);
  let {data} = response;
  this.setState({ cart:data});}

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

   
    makeSearchString = (options) => {
      let {page, city, company, minAge } = options;
      let searchStr = "";
      searchStr = this.addToQueryString(searchStr, "page", page);
      searchStr = this.addToQueryString(searchStr, "city", city);
      searchStr = this.addToQueryString(searchStr, "company", company);
      searchStr = this.addToQueryString(searchStr, "minAge", minAge);
      return searchStr;
      };
      async postData(url, obj) {
    
        let response = await http.put(url, obj);
        
    } 
    async postData(url, obj) {
      try {
      let response = await http.post(url, obj);
      window.location="/Cart"
  } 
       catch (ex) {
      if (ex.response && ex.response.status===400){
      let errors2={}; 
      errors2.email= ex.response.data;
      this.setState({errors2: errors2 });
      }
     else if (ex.response && ex.response.status===200){
      let errors2={}; 
      errors2.email= ex.response.data;
      this.setState({errors2: errors2 });
      }
  }
      }
     quantityincr=(index)=>{
 let s1={...this.state}
 
   s1.cart[index].quantity=s1.cart[index].quantity + 1

 this.setState(s1)
      }
     quantitydec=(index)=>{
 console.log(index)
 let s1={...this.state}
 
  

  s1.cart[index].quantity==0?s1.cart.splice(index,1):s1.cart[index].quantity=s1.cart[index].quantity - 1
  
 
 this.setState(s1)
      }
      addToQueryString = (str, paramName, paramValue)=> paramValue
      ? str
      ? `${str}&${paramName}=${paramValue}`
      : `${paramName}=${paramValue}`
      : str;
     
render() {
 
  const { cities, companies, ages} = this.state;
  const {cart=[]} = this.props

    console.log("cart",cart)
let cartvalue=cart.reduce((acc,curr)=>acc+curr.price*curr.quantity,0)
const user=authSys.getUser()
   return (<React.Fragment>
    <NavBar user={user} cart={this.state.cart}/>

  <div className="container">

  <img src={sale} alt="" style={{width:"100%"}}/>
<h1 className="text-center">You Have {this.state.cart.length} Items In Your Cart</h1>
 <h2>
Cart Value:{cartvalue}
   </h2>
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
}}
export default CompA