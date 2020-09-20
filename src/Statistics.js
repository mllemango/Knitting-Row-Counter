import React, { Component } from "react";


class Statistics extends Component {
    constructor() {
        super();
    
        this.state = {
          projectExists: false,
        };
    
        if (cookies.get("project") !== undefined) {
          this.setState({ projectExists: true });
        }
      }


      render() {
          return(
            null
          );
      }
}