import React, { Component } from "react";
import http from "./services/httpServer";
import {Link} from "react-router-dom";
import queryString from 'query-string'
import Cheques from "./main";
class NavBar extends Component {
    state={
        cart:[]
    }
     
render() {  
    // let {cart} = this.props.match.params;
    let {user,cart}=this.props
    cart===undefined ?this.state.cart=[]:this.state.cart=cart
    let names = [{tittle:"Add Customer",val:"addcustomer"},{tittle:"view All  Customer",val:"allCustomer"}];
    let names1 = [{tittle:"Cheques",val:"Cheques"},{tittle:"Net Banking",val:"allNet"}];
    let names2 = [{tittle:"Cheques",val:"viewCheques"},{tittle:"Net Banking",val:"viewNet"}];
    let customerDetails = [{tittle:"customerDetails",val:"customerDetails"},{tittle:"nomineeDetails",val:"nomineeDetails"}];
    let Shoes = ["Formal Shoes","Sport Shoes","Floaters","Sandals"];
        let QURY=["Watches" ,"Sunglasses" ,"Belts" ,"Handbags", "Wallets" ]
        let payee = ["Add Payee",
        "Cheque",
        "NetBanking"];
      let uu=[ "My orders",
      "Manage Products",
       "Logout"
      ]     
return (<React.Fragment>




<nav className="navbar navbar-expand-sm navbar-dark bg-dark ">
<div className="col-10">

    <ul className="navbar-nav mr-auto">
    <li className="nav-item">
<Link to="/All" className="navbar-brand">
HOME
</Link></li>


{QURY.map((n1) => (<li className="nav-item">
<Link key={n1} className="nav-link"  to={`/product/${n1}`}>
 <b>{n1}</b>
</Link></li>
))}



{(
<li className="nav-item dropdown">
<a className="nav-link dropdown-toggle"
href="#"
id="navbarDropdown"
role="button"
data-toggle="dropdown"><b>Shoes</b>
</a>
<div className="dropdown-menu">
{Shoes.map((n1) => (
<Link key={n1} className="dropdown-item" to={`/product/${n1}`}>
{n1}
</Link>
))}
</div>
</li>
)}



</ul>
</div>
<div className="col-2">
<ul className="navbar-nav mr-auto">
{user &&(
<li className="nav-item dropdown">
<a className="nav-link dropdown-toggle"
href="#"
id="navbarDropdown"
role="button"
data-toggle="dropdown"><b>{user.email}</b>
</a>
<div className="dropdown-menu">
{uu.map((n1) => (
<Link key={n1} className="dropdown-item" to={`/${n1}`}>
{n1}
</Link>
))}
</div>
</li>
)}
{!user&&(<li className="nav-item">
<Link to="/Login" className="navbar-brand">
Login
</Link>
</li>)}
{user&&(<li className="nav-item">
<Link to="/product/Cart" className="navbar-brand">
Cart <button className="btn btn-danger">{this.state.cart.length}</button>
</Link>
</li>)}

</ul>
</div>


</nav>
</React.Fragment>)}}
export default NavBar