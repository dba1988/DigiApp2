import React, { Component } from 'react';

class DigiUsers extends Component{
constructor(props) {
    super(props)

    this.state = {
        userList:[]
         
    }
}
componentDidMount() {
    // fetch(`/api/digiusers`)
    // .then(res=>res.json())
    // .then(userList=>this.setState({userList},()=>console.log('data Return ',userList)
    // ))
}

render(){
    return(
        <div className="container">
        <ul className="list-group">
            {this.props.userList.map(user=>
                <li key={user._id}  className="list-group-item">{user.name}  {user.email}</li>)}
        </ul>
      </div>
    );
  
    
}
}



export default DigiUsers;
