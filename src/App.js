import React, { Component } from "react";
import { Button, Typography, Box, Divider } from "@material-ui/core";
import { NewProjectCard, Project } from "./Project";
import Cookies from "universal-cookie";
import Footer from "./footer.js";
import Note from "./Note.js";

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
    //TODO: fix bug where space in project name increments row count

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
          color="primary"
          align="center"
          variant="outlined"
          onClick={() => {
            this.setState({ newProjectView: true });
          }}
        >
          New Project
        </Button>
      </div>
    );
    return (
      <div align="center">
        {/* title */}
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          p={1}
          backgroundColor="secondary"
        >
          <img
            src={require("./logo.png")}
            alt="yarnIcon"
            width="40%"
            height="40%"
          />
        </Box>
        <Divider variant="middle" style={{ marginBottom: 30 }} />

        {/* project */}
        <Box
          width="500px"
          border="1px solid black"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Project />
        </Box>

        {/* notes */}
        <Box>{Note}</Box>
        {/* new project button */}
        {/* <Divider variant="middle" style={{ marginTop: 20, marginBottom: 10 }} /> */}

        <Box display="flex" flexDirection="column" align="center" p={2}>
          {projectExists
            ? null
            : [newProjectView ? <NewProjectCard /> : newProjectButton]}
        </Box>
        <Box
          marginTop={10}
          alignItems="center"
          display="flex"
          flexDirection="row"
          justifyContent="center"
          margin="auto"
          left="0"
          right="0"
        >
          <Typography variant="overline" color="secondary">
            use space bar or tap current row to increase
          </Typography>
        </Box>

        {/* footer */}
        <Footer />
      </div>
    );
  }
}

export default App;
