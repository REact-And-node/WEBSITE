import React, { Component } from "react";
import { Link } from "react-router-dom"; 
import http from "./services/httpServer";
import NavBar from "./Navbar";
import queryString from 'query-string'
import authSys from "./services/authSys";
import LeftPanelOptionscb from "./Optioncb";
import ReactSearchBox from "react-search-box";
class MAnage extends Component { 
  state = {Employees:[],search:[], cities: ["London", "Paris", "New Delhi", "Bangalore"], 
  companies: ["Apple", "Google", "Facebook", "Microsoft", "Tesla"], 
ages:[25,30,35,40,45,50],searchInput:"",
form:{}};

  async fetchData() {
  let queryParams = queryString.parse(this.props.location.search);
  let {id} = this.props.match.params;
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
    this.callURL(`/Cheques`, queryParams);
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
  
        this.callURL("/allNet", options);
    };

     handleChange = (e) => {
     
      const { currentTarget: input } = e;
      let s1 = {...this.state };

      s1.searchInput = input.value;
      
      s1.searchInput.length==1?
     s1.search=s1.Employees.filter((country) =>
         country.name[0]==s1.searchInput[0]
    ):s1.searchInput.length==2?
     s1.search=s1.Employees.filter((country) =>
         country.name[0]==s1.searchInput[0] && country.name[1]==s1.searchInput[1]
    ):s1.searchInput.length==3?
     s1.search=s1.Employees.filter((country) =>
         country.name[0]==s1.searchInput[0] && country.name[1]==s1.searchInput[1]
         && country.name[2]==s1.searchInput[2]
    )
    :s1.searchInput.length==4?
     s1.search=s1.Employees.filter((country) =>
         country.name[0]==s1.searchInput[0] && country.name[1]==s1.searchInput[1]
         && country.name[2]==s1.searchInput[2]
         && country.name[3]==s1.searchInput[3]
    )
    :s1.searchInput.length==5?
     s1.search=s1.Employees.filter((country) =>
         country.name[0]==s1.searchInput[0] && country.name[1]==s1.searchInput[1]
         && country.name[2]==s1.searchInput[2]
         && country.name[3]==s1.searchInput[3]
         && country.name[4]==s1.searchInput[4]
    )
    :s1.searchInput.length==6?
     s1.search=s1.Employees.filter((country) =>
         country.name[0]==s1.searchInput[0] && country.name[1]==s1.searchInput[1]
         && country.name[2]==s1.searchInput[2]
         && country.name[3]==s1.searchInput[3]
         && country.name[4]==s1.searchInput[4]
         && country.name[5]==s1.searchInput[5]
    )
    :s1.searchInput.length==7?
     s1.search=s1.Employees.filter((country) =>
         country.name[0]==s1.searchInput[0] && country.name[1]==s1.searchInput[1]
         && country.name[2]==s1.searchInput[2]
         && country.name[3]==s1.searchInput[3]
         && country.name[6]==s1.searchInput[6]
         && country.name[4]==s1.searchInput[4]
         && country.name[5]==s1.searchInput[5]
    )
    :s1.searchInput.length==8?
     s1.search=s1.Employees.filter((country) =>
         country.name[0]==s1.searchInput[0] && country.name[1]==s1.searchInput[1]
         && country.name[2]==s1.searchInput[2]
         && country.name[3]==s1.searchInput[3]
         && country.name[6]==s1.searchInput[6]
         && country.name[7]==s1.searchInput[7]
         && country.name[4]==s1.searchInput[4]
         && country.name[5]==s1.searchInput[5]
    )
    :s1.searchInput.length==9?
     s1.search=s1.Employees.filter((country) =>
         country.name[0]==s1.searchInput[0] && country.name[1]==s1.searchInput[1]
         && country.name[2]==s1.searchInput[2]
         && country.name[3]==s1.searchInput[3]
         && country.name[6]==s1.searchInput[6]
         && country.name[7]==s1.searchInput[7]
         && country.name[4]==s1.searchInput[4]
         && country.name[5]==s1.searchInput[5]
         && country.name[8]==s1.searchInput[8]
       
    )
    :s1.searchInput.length==10?
     s1.search=s1.Employees.filter((country) =>
         country.name[0]==s1.searchInput[0] && country.name[1]==s1.searchInput[1]
         && country.name[2]==s1.searchInput[2]
         && country.name[3]==s1.searchInput[3]
         && country.name[6]==s1.searchInput[6]
         && country.name[7]==s1.searchInput[7]
         && country.name[4]==s1.searchInput[4]
         && country.name[5]==s1.searchInput[5]
         && country.name[8]==s1.searchInput[8]
         && country.name[9]==s1.searchInput[9]
       
    ):
    s1.searchInput.length==11?
     s1.search=s1.Employees.filter((country) =>
         country.name[0]==s1.searchInput[0] && country.name[1]==s1.searchInput[1]
         && country.name[2]==s1.searchInput[2]
         && country.name[3]==s1.searchInput[3]
         && country.name[6]==s1.searchInput[6]
         && country.name[7]==s1.searchInput[7]
         && country.name[4]==s1.searchInput[4]
         && country.name[5]==s1.searchInput[5]
         && country.name[8]==s1.searchInput[8]
         && country.name[9]==s1.searchInput[9]
         && country.name[10]==s1.searchInput[10]
       
    ):
    console.log(s1.searchInput.length)
    
    this.setState(s1)
   }


render() {
 
  const { cities, companies, search,Employees} = this.state;
let sty=this.state.searchInput==""?Employees:search
const user=authSys.getUser()
   return (
    
    <div className="container">
         <NavBar user={user} /> 
      <Link to={`/AddProduct`}>
      <button className="btn btn-success">Add product</button>
      </Link>
      <br />
      <br />
    <input
        placeholder="search"
   name="searchInput"
       className="form-control"
       onKeyUp={this.handleChange}
    
      />
      <br /> <br />
      <div className="row bg-dark text-light" style={{fontSize:"large",color:"#2e242c"}}>
        <div className="col-2">#</div>
        <div className="col-4">Tittle</div>
        <div className="col-2">Category</div>
        <div className="col-2">price</div>
        <div className="col-2"></div>
      </div>
      
      
      {sty.map((st)=>
        
        <div className="row border" style={{fontSize:"medium",color:"#2e242c",fontWeight:"bold"}}>
        <div className="col-2">{st.id}</div>
        <div className="col-4">{st.name}</div>
        <div className="col-2">{st.category}</div>
        <div className="col-2">{st.price}</div>
        <div className="col-2">
 <div className="row">
<div className="col-6"><Link to={`/product/${st.id}/edit`}>Edit</Link> </div>
<div className="col-6"><Link to={`/product/${st.id}/delete`}>delete</Link></div>

</div>


        </div>
      </div>
        
        )}
      
      </div>
      
      )
      
      
      ;
}}
export default MAnage