import React, { Component } from "react";
import fetch from "node-fetch";

class Message extends Component {
  constructor() {
    super();

    this.state = {
      message: ""
    };
  }

  async componentDidMount() {
    if (!this.state.message) {
      let response = await fetch(`http://localhost:3001/message`);
      let json = await response.json();
      this.setState({ message: json.data });
    }
  }

  render() {
    return (
      <div>
        <h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default Message;

// const wrapper = document.getElementById("container");
// // wrapper ? ReactDOM.render(<Form />, wrapper) : false;
