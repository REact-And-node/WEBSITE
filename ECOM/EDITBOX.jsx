import React, { Component } from "react";
import http from "./services/httpServer";
import authSys from "./services/authSys";
import { Link } from "react-router-dom";
import NavBar from "./Navbar";
 class EDIT extends Component {
state = {
form: { },
errors:{name:"",
email:"",password:"",
amount:""},
match:"",
errors1:""
,
productDetails:{},
errors2:""
,
read:"",
catalog:[
        "Sunglasses",
        "Watches",
        "Belts ",
        "Handbags",
        "Wallets",
        "Formal Shoes",
        "Sport Shoes",
        "Floaters",
        "Sandals"]
};
   
async fetchData() {
    const user=authSys.getUser()
    let {id} = this.props.match.params;
       let response1 = await http.get(`/product/${id}`);
      console.log("productDetails",response1);
   let {data}=response1
this.state.productDetails=data
this.state.form=data
       this.setState(this.state)}
     
       componentDidMount(){
     this.fetchData();}
     Edit=()=>{
     
     }
     componentDidUpdate(prevProps, prevState){
     if (prevProps!==this.props)this.fetchData();}
async postData(url, obj) {
    try {
    let response = await http.put(url, obj);
    this.props.history.push("/Manage Products"); 
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
  handleChange = (e) =>{
const { currentTarget: input } = e;
let s1 = {...this.state };

s1.form[input.name] = input.value;


this.setState(s1)
  }
  isValid = (errors) => {
   
     let keys = Object.keys(errors); 
   
     let count = keys.reduce((acc, curr) => (errors [curr] ? acc + 1 : acc), 0); 
       return count == 0;};

   
              
          
        
handleSubmit = (e) => {
     e.preventDefault();
   
     let {id} = this.props.match.params;
   
     this.postData(`/product/${id}`, this.state.form)
     
    alert("successfully added   details")
   
     };
render() {
    let {category, name, description ,price,imglink} = this.state.form;
    let {errors,errors2=null,errors1=null,productDetails} = this.state;
    let {id} = this.props.match.params;
    const user=authSys.getUser()
    return (<React.Fragment>
      <NavBar user={user}/>
    <div className="container bg-light">
     <h1 className="text-center"><b>  Edit Product</b></h1>
     <div className="row">
          <div className="col-6">
     
  <div className="card" style={{width: "40rem",margin:"5rem",background:"black",color:"white",padding:"2rem"}}>
  <img className="card-img-top" src={productDetails.imglink} alt="Card image cap"/>
  <div className="card-body">
    <h5 className="card-title" style={{float:"left",fontSize:"large"}}>{productDetails.name}</h5>
    <br />
    <br />
    <h5 className="card-title" style={{float:"left",fontSize:"medium",color:"white"}}>Rs.{productDetails.price}</h5>
    <br />
    <br />
    <p className="card-text" style={{float:"left",color:"white",fontWeight:"bold",overflow: 'hidden', textOverflow: 'ellipsis'}}>{productDetails.description}</p>
    <div >
    </div>
  </div>
  </div>
  
          </div>
          <div className="col-6">
    <div className="form-group">
    <div className="row">
<div className="col-1"><h3></h3></div>
<div className="col-5"><h3>Name<b className="text-danger bg-light">*</b></h3></div>
<div className="col-6"><h3></h3></div>
     </div> 
   <div className="row">
<div className="col-1"></div>

<div className="col-11"> 
<input
   type="text"
    className="form-control"
    id="email ID"
    name="name" 
value={name}
   
    onChange={this.handleChange}
    />

  
     <br /><br />
   
    </div>

     </div>
    <div className="row">
<div className="col-1"><h3></h3></div>
<div className="col-5"><h3>Description<b className="text-danger bg-light">*</b></h3></div>
<div className="col-6"><h3></h3></div>
     </div> 
   <div className="row">
<div className="col-1"></div>

<div className="col-11"> 
<input
   type="text"
    className="form-control"
    id="email ID"
    name="description" 
value={description}
   
    onChange={this.handleChange}
    />


     <br /><br />
   
    </div>

     </div>
      <br />
      <div className="row">
<div className="col-1"><h3></h3></div>
<div className="col-5"><h3>Price<b className="text-danger bg-light">*</b></h3></div>
<div className="col-6"><h3></h3></div>
     </div> 
   <div className="row">
<div className="col-1"></div>

<div className="col-11"> 
<input
   type="text"
    className="form-control"
    id="email ID"
    name="price" 
value={price}
   
    onChange={this.handleChange}
    />

     <br /><br />
   
    </div>

     </div>

     
   <div className="row">
<div className="col-1"><h3></h3></div>
<div className="col-5"><h3>Image<b className="text-danger bg-light">*</b></h3></div>
<div className="col-6"><h3></h3></div>
     </div> 
   <div className="row">
<div className="col-1"></div>

<div className="col-11"> 
<input
   type="text"
    className="form-control"
    
    name="imagelink" 
   value={imglink}
   
    onChange={this.handleChange}
    readOnly
    />

     <br /><br />
   
    </div>

     </div>
    

     <div className="row">
<div className="col-3"><h3></h3></div>
<div className="col-9"></div>
</div>
 
<div className="row">
<div className="col-1"></div>

<div className="col-11"> 
<select  className=" form-select bg-light" name="category"   onChange={this.handleChange}  style ={{fontSize:"Medium",padding:"1%"}} 
value={category} disabled>
<option selected disabled>Select category</option>

     {
       this.state.catalog.map((st, index) => {
         return <option  value={st} >{st}</option>
       })
     }
    </select>

   <br />
  
    </div>
   
   </div>
     
    
   
     <div className="row">
<div className="col-3"><h3></h3></div>
<div className="col-1"><button className="btn btn-primary" onClick={this.handleSubmit} >SAVE</button></div>
<div className="col-1"><Link to={`/product/${id}/delete`}><button className="btn btn-secondary" >DELETE</button></Link></div>
</div>
<div className="col-6"><h3></h3></div>
     </div> 
     
   
     </div>
     </div>
     </div>
</React.Fragment>)}}
export default EDIT