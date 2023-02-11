import React, { Component } from "react";
import http from "./services/httpServer";
import authSys from "./services/authSys";
import NavBar from "./Navbar";
 class AddProduct extends Component {
state = {
form: { },
errors:{name:"",
email:"",password:"",
amount:""},
match:"",
errors2:""
,
productDetails:{},
form:{name:"",description:"",price:"",imglink:"",category:""}

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
this.state.productDetails=(data)
this.state.form=(data)
       this.setState(this.state)}
     
       componentDidMount(){
     this.fetchData();}
     Edit=()=>{
     
     }
     componentDidUpdate(prevProps, prevState){
     if (prevProps!==this.props)this.fetchData();}
async postData(url, obj) {
    try {
    let response = await http.post(url, obj);
    window.location="/Manage Products"
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





        
handleSubmit = (e) => {
     e.preventDefault();
    
     
    
     this.postData("/product",this.state.form)
     
   alert("Product Added Successfully")
   
  }
 

render() {
    let {category, name, description ,price,imglink} = this.state.form;
    let {errors,errors2=null,errors1=null,productDetails} = this.state;
    const user=authSys.getUser()
    return (<React.Fragment>
      
    <div className="container bg-light">
    <NavBar user={user} /> 
     <h1 className="text-center"><b>  Add Product</b></h1>
     <div className="row">
         
          <div className="col-12">
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
    
    name="imglink" 
   value={imglink}
   
    onChange={this.handleChange}

    />

     <br /><br />
   
    </div>

     </div>
    

     <div className="row">
<div className="col-3"><h3></h3></div>
<div className="col-9"><h3>{<span className="text-danger"><h3>{errors1}</h3></span>}</h3></div>
</div>
 
<div className="row">
<div className="col-1"></div>

<div className="col-11"> 
<select  className=" form-select bg-light" name="category"   onChange={this.handleChange}  style ={{fontSize:"Medium",padding:"1%"}} 
value={category} >
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
<div className="col-1"><button className="btn btn-primary" onClick={this.handleSubmit} >Add</button></div>

</div>
<div className="col-6"><h3></h3></div>
     </div> 
     
   
     </div>
     </div>
     </div>
</React.Fragment>)}}
export default AddProduct