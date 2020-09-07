import React, { Component } from "react";
import { Button, Typography, Box } from "@material-ui/core";
import { NewProjectCard, ProjectList } from "./Project";
import Cookies from "universal-cookie";


const cookies = new Cookies();

// const cookies = new Cookies();
class App extends Component {
  constructor() {
    super();

    this.state = {
      projectExists: false,
      newProjectView: false,
    };

    if (cookies.get("project") !== undefined) {
      this.setState({ projectExists: true });
    }

    this.spaceFunction = this.spaceFunction.bind(this);
  }

  spaceFunction(event) {
    if (event.keyCode === 32) {
      const project = cookies.get("project");
      const curRow = parseInt(project.curRow);
      const totRow = parseInt(project.totRow);
      if (curRow !== totRow || curRow === 0) {
        project.lastUpdated = new Date();
        project.curRow = curRow + 1;
        cookies.set("project", project);
        this.setState(this.state);
      }
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.spaceFunction, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.spaceFunction, false);
  }

  render() {
    const projectExists = this.state.projectExists;
    const newProjectView = this.state.newProjectView;
    const newProjectButton = (
      <div justifyContent="center">
        <Button
          color="Primary"
          align="center"
          variant="outlined"
          onClick={() => {
            this.setState({ newProjectView: true });
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

        <Box display="flex" flexDirection="column" align="center" p={2}>
          {projectExists
            ? "project view placeholder"
            : [newProjectView ? <NewProjectCard /> : newProjectButton]}
        </Box>
      </div>
    );
  }
}

export default App;
