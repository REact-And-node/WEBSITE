import React, { Component } from "react";
import { Link } from "react-router-dom"; 
import http from "./services/httpServer";
import NavBar from "./Navbar";
import queryString from 'query-string'
import authSys from "./services/authSys";
import sale from "./image/sale.png"
import LeftPanelOptionscb from "./Optioncb";
class Myorder extends Component { 
  state = {Myorder:[],pageInfo:[], cities: ["London", "Paris", "New Delhi", "Bangalore"], 
  companies: ["Apple", "Google", "Facebook", "Microsoft", "Tesla"], 
ages:[25,30,35,40,45,50]};

  async fetchData() {
  let queryParams = queryString.parse(this.props.location.search);
  let {id} = this.props.match.params;
  const user=authSys.getUser()
  let response = await http.get(`/Myorder`);
  console.log("Myorder",response);
  let {data} = response;
  this.setState({ Myorder:data.rows});}

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
    this.callURL(`/Myorder`, queryParams);
    };
    
   

    filterParam = (arr, name, values) => {

        if (!values) return arr;
        let valuesArr = values.split(",");
        
        let arr1 = arr.filter((a1) => valuesArr.find((val) => val.bankName === a1.bank));
        
        return arr1;
        
        };
    makeAllOptions= (arr) => {

        let json = {};
     
       json.bankName = this.getDifferentValues(arr, "bankName");
      
        return json;}
    
      makeAllOptions1= (arr) => {
  
        let json = {};
        json.productName= this.getDifferentValues(arr, "productName");
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
      let {page, bank, amount, minAge } = options;
      let searchStr = "";
      searchStr = this.addToQueryString(searchStr, "page", page);
      searchStr = this.addToQueryString(searchStr, "bank", bank);
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
  
        this.callURL("/Myorder", options);
    };
render() {
  const { cities, companies, ages,Myorder} = this.state;

  let Myordervalue=Myorder.reduce((acc,curr)=>acc+curr.price*curr.quantity,0)
  const user=authSys.getUser()
     return (
    <div className="container">
      <NavBar user={user} /> 
    <img src={sale} alt="" style={{width:"100%"}}/>
  <h1 >List Of Order</h1>
   
      <div className="row text-center border bg-dark text-white " style ={{fontSize:"large"}}>
   
      <div className="col-2 text-center">  Name </div>
    
    <div className="col-2 text-center"> City </div>
    <div className="col-4 text-center"> Address </div>
    <div className="col-2 text-center"> Amount </div>
    <div className="col-2 text-center"> Items </div>
  
    </div>
    
    {Myorder.map((pr,index) => (<React.Fragment>


      <div className="row border">
      <div className="col-2 text-center"  style={{fontSize:"medium",color:"#2e242c"}}>  {pr.Name}   
      </div>
      <div className="col-2 text-center"  style={{fontSize:"medium",color:"#2e242c"}}>  {pr.City}  </div>
      <div className="col-4 text-center" style={{fontSize:"medium",color:"#2e242c"}}>    {pr.Address}  </div>
     <div className="col-2 text-center" style={{fontSize:"medium",color:"#2e242c"}}> {pr.Amount}  </div>
   <div className="col-2 text-center"  style={{fontSize:"medium",color:"#2e242c"}}>
    {pr.Items}  
    </div>
      </div>
  
    </React.Fragment>
  
    ))}
    <br />
  
  
  

    </div>);
  }}
export default Myorder