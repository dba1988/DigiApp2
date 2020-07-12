import React, { Component } from "react";
import DigiUsers from "./DigiUsers";
import { SerUrl } from "../config/ServerUrl";
export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name: "",
        searchresult:[],
        isLoading:true,
        errorMessage:"",
        isLogin :false
      };
      
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
 componentDidMount() {
     if(this.props.location.state == undefined){ this.setState({isLogin:false}); this.props.history.push('/login')}
     else{this.setState({isLogin:true});}
 }
 
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,isLoading:true
    });
  }
  handleSubmit(event) {
    fetch(SerUrl + "/api/digiusersbyname/"+ this.state.name)
      .then(async (response) => {
        const data = await response.json();
        console.log(data);
        if (!response.ok) {
          const error = (data && data.isLogin)
          return Promise.reject(error);
        }
        this.setState({searchresult:data,isLoading:false})
      })
      .catch((error) => {
        this.setState({ errorMessage: error.toString() });
        console.error("There was an error!", error);
      });
    event.preventDefault();
  }
  
  render() {
    return (
      <div>
        <h1>Welcome   : {this.props.location.state.username}</h1>

        <form onSubmit={this.handleSubmit}>
          
          <div className="form-group">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Search"
              value={this.state.name}
              onChange={this.handleChange}
              required
            />
          </div>
         
          
          <button type="submit" className="btn btn-lg btn-danger btn-block">
            Search
          </button>
        </form>

        <div>
            {this.state.isLoading && <div>Search and Find </div>}
          {!this.state.isLoading &&  <DigiUsers userList={this.state.searchresult}/>}
        </div>
      </div>
    );
  }
}
