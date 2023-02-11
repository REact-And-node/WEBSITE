import React, { Component } from "react";
import { Route, Switch,Redirect} from "react-router-dom";
 import CompA from "./CART";
import Login from "./Login";
import NavBar from "./Navbar";

import logout from "./Logout";
import authSys from "./services/authSys";

import NotAllowed from "./notalo";
import NotAllowed1 from "./Welcome";
import NotAllowed2 from "./w2";
import ADDEmp from "./addcustomer";
import http from "./services/httpServer";
import Hello1 from "./customerDetails";
import Payee from "./payee";
import Cheques from "./main";
import MAnage from "./manage";
import Myorder from "./Myorder";
import ViewNet from "./ViewNet";
import AddProduct from "./AddProduct";
import CT from "./chectrans";
import EDIT from "./EDITBOX";
import DeletePerson from "./delete";
class MainComponent extends Component {
  state={cart:[]}
 
render() {
  const user=authSys.getUser()
let {cart}=this.state
console.log("this.props.cart",this.props.cart)
console.log(this.props.cart)
return (<React.Fragment>

<div className="container">


<Switch>
  
<Route
path="/All"
render={(props) =><Cheques {...props}/>}/>
<Route path="/Login" component={Login} />
<Route path="/Logout" component={logout} />
<Route path="/product/:id/delete" component={DeletePerson} />
<Route path="/product/:id/edit" component={EDIT} />

<Route path="/AddProduct" component={AddProduct} />


<Route path="/My orders" component={Myorder} />
<Route path="/Manage Products" component={MAnage}  />
<Route
path="/product/:catolog"
render={(props) =><Cheques {...props} {...props}  />}/>
<Route
path="/All"
render={(props) =><Cheques {...props} cheques={cart}/>}/>
 
<Route path="/Cart" component={CompA} />




</Switch>
</div>
</React.Fragment>);
}
}
export default MainComponent;