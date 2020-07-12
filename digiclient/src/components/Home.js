import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userList: [],
    };
  }
  render() {
    return (
      <div className="container">
        <div class="form-signin">
          <div class="text-center mb-4">
            <img
              className="mb-4"
              src="https://seeklogo.com/images/D/digi-logo-0670E78EE4-seeklogo.com.png"
              alt=""
              width="200"
              height="200"
            />

            <p>Digi Demo App </p>
          </div>

          <a
            href="/register"
            className="btn btn-lg btn-danger btn-block"
            role="button"
          >
            Register
          </a>
          <a
            href="/login"
            className="btn btn-lg btn-primary btn-block"
            role="button"
          >
            Login
          </a>
        </div>
      </div>
    );
  }
}

export default Home;

// const Home =props=>{
//     return(
//         <div>Home</div>
//     )
// }
// export default Home;
