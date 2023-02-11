import React ,{Component} from "react";
import http from "./services/httpServer";
class DeletePerson extends Component {
async componentDidMount() {
const {id} = this.props.match.params;

let response = await http.deleteApi(`/product/${id}/delete`);
 this.props.history.push("/Manage Products");
 console.log(id)
}
render() {
return "";
}
}
export default DeletePerson;