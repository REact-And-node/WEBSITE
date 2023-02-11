import React, { Component } from "react"; 
import Cheques from "./main";
import queryString from "query-string";
import { Link } from "react-router-dom";
class LeftPanelOptionscb extends Component {
    state={
       catalog:["All",
        "Sunglasses",
        "Watches",
        "Belts",
        "Handbags",
        "Wallets",
        "Formal Shoes",
        "Sport Shoes",
        "Floaters",
        "Sandals"]
    }
    handleChange = (e) => {
        let { currentTarget: input } = e; 
        let options = {...this.props.options };
        options.page=1
        options[input.name] =input.value;
        console.log(options)
     
        this.props.onOptionChange(options)
        };
        updateCBs = (inpValue, checked, value) => {
        let inpArr = inpValue ? inpValue.split(",") : [];
        let index1 = inpArr.findIndex((ele) => ele === value);
        if(index1>=0){inpArr.splice (index1, 1)}
        
        else if (checked) {inpArr.push(value);}
        else {
        let index = inpArr.findIndex((ele) => ele === value);
        console.log(index)
        if (index>=0) inpArr.splice (index, 1);
        
        }
        return inpArr.join(",")}
        makeDropdown = (arr, values, name, label) =>(
            <div className="form-group">
            <select
            className="form-control"
            onChange={this.handleChange}
            name={name}
           >
                
            <option value="">{label}</option>
            {arr.map((opt) => (
            <option  
            value={opt}
            name={name}
             onChange={this.handleChange}>{opt}</option>
            ))}
            </select>
            </div>
            )
            
        makeCheckboxes = (arr, isActive, name, label) =>(
        <React.Fragment>
           isActive=
        {arr.map((opt) => (
        <div className="form-control" >
         
          <ul style={{listStyle: "none",fontSize:"large",fontWeight:"bolder" ,color:"gray"}}>
<Link to={`/${opt}`} style={{textDecoration:"none",fontWeight:"bold" ,color:"gray"}}> 
 <li    name={name}   onChange={this.handleChange}>{opt}</li></Link>
 
</ul>
      
       
        </div>))}
        </React.Fragment>
        );

    render() {
            let{options,param} = this.props;
        let { category, amount='', } = options;
        // let {catolog} = this.props.match.params;
         console.log("option=>",param)
    
        return (
       
          
        <div className="row">
       
      
       {this.state.catalog.map((opt) => (
        opt===param?
        <div className="" style={{background:"#D3D3D3"}}>
         
          <ul style={{listStyle: "none",fontSize:"large",fontWeight:"bolder" ,color:"gray"}}>
<Link   to={`/product/${opt}`} style={{textDecoration:"none",fontWeight:"bold" ,color:"gray"}}> 
 <li>{opt}</li></Link>
 
</ul>
      
       
        </div>
        :
        <div className="border">
         
        <ul style={{listStyle: "none",fontSize:"large",fontWeight:"bolder" ,color:"gray"}}>
<Link   to={`/product/${opt}`} style={{textDecoration:"none",fontWeight:"bold" ,color:"gray"}}> 
<li>{opt}</li></Link>

</ul>
    
     
      </div>))}
       

       
        </div>
        )}}
        export default LeftPanelOptionscb;