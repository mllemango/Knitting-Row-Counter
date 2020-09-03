import React, { Component } from "react";
import { Button, Typography, Box } from "@material-ui/core";
import { NewProjectCard, ProjectList } from "./Project";
import Cookies from 'universal-cookie';

// const cookies = new Cookies();
class App extends Component {
  constructor() {
    super();

    this.state = {
      createNewProjectButton: true,
    };
    
  }

  render() {
    const createNewProjectButton = this.state.createNewProjectButton;
    const newProjectButton = (
      <div justifyContent="center">
        <Button
          color="Primary"
          align="center"
          variant="outlined"
          onClick={() => {
            this.setState({ createNewProjectButton: false });
          }}
        >
          Add New Project
        </Button>
      </div>
    );

    return (
      <div>
        {/* title */}
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          m={1}
          p={2}
        >
          <img src={require("./yarnIcon.png")} alt="yarnIcon" width="70px" />
          <Typography align="center" variant="h2">
            Row Counter
          </Typography>
        </Box>

        {/* project */}
        <ProjectList />
        <Box display="flex" flexDirection="column" align="center" p={2} >
          {createNewProjectButton
            ? newProjectButton
            : <NewProjectCard/>}
        </Box>
      </div>
    );
  }
}

export default App;
