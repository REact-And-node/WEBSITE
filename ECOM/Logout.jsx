import React, { Component } from "react";

import authSys from "./services/authSys";
 class logout extends Component {
state = {
form: { username: "", password:""}
};

componentDidMount(url, obj) {
authSys.logout()
window.location="/All";
    }

render() {
   
    return ;
}}
export default logout