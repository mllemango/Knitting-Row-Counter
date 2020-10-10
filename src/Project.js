import React, { Component } from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  CircularProgress,
  Switch,
  FormControlLabel,
} from "@material-ui/core";
import { RadioButtonUnchecked, RadioButtonChecked } from "@material-ui/icons";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

// import yarnIcon from './yarnball.png'
export class NewProjectCard extends Component {
  constructor() {
    super();
    this.state = {
      name: "Current",
      totRow: 100,
      curRow: 0,
      startTime: 0,
      lastUpdated: 0,
      hasPattern: false,
      patternRepeat: 0,
      patternStart: 0,
    };
  }

  setProject() {
    this.setState({ startTime: new Date() });
    localStorage.setItem("project", JSON.stringify(this.state));
    window.location.reload();
  }

  render() {
    const hasPattern = this.state.hasPattern;
    return (
      <div>
        <Box
          width={1 / 2}
          justifyContent="center"
          alignItems="center"
          direction="column"
          // bgcolor="grey.300"
        >
          <TextField
            color="primary"
            variant="standard"
            fullWidth
            id="projectName"
            label="Project Name"
            autoFocus
            defaultValue="Current"
            onChange={(event) => this.setState({ name: event.target.value })}
          ></TextField>
          <TextField
            color="primary"
            variant="standard"
            margin="normal"
            id="totalRowCount"
            label="Total Row Count"
            type="number"
            fullWidth
            defaultValue="100"
            onChange={(event) => this.setState({ totRow: event.target.value })}
          ></TextField>
          <TextField
            color="primary"
            variant="standard"
            margin="normal"
            id="curRowCount"
            label="Current Row Count"
            type="number"
            fullWidth
            defaultValue="0"
            onChange={(event) => this.setState({ curRow: event.target.value })}
          ></TextField>
          <FormControlLabel
            control={
              <Switch
                checked={hasPattern}
                onChange={(event) =>
                  this.setState({ hasPattern: event.target.checked })
                }
                name="hasPattern"
                id="hasPattern"
                color="primary"
              />
            }
            label="Project contains pattern"
          />
          {hasPattern
            ? [
                <TextField
                  color="primary"
                  variant="standard"
                  margin="normal"
                  id="patternRepeat"
                  label="Pattern repeats every"
                  type="number"
                  fullWidth
                  defaultValue="0"
                  onChange={(event) =>
                    this.setState({ patternRepeat: event.target.value })
                  }
                ></TextField>,
                <TextField
                  color="primary"
                  variant="standard"
                  margin="normal"
                  id="patternStart"
                  label="Pattern starts at row"
                  type="number"
                  fullWidth
                  defaultValue="0"
                  onChange={(event) =>
                    this.setState({ patternStart: event.target.value })
                  }
                ></TextField>,
              ]
            : null}
        </Box>
        <Box p={4}>
          <Button
            color="Primary"
            align="center"
            variant="outlined"
            onClick={() => {
              this.setProject();
            }}
          >
            Start
          </Button>
        </Box>
      </div>
    );
  }
}

export function Project() {
  const projectJson = JSON.parse(localStorage.getItem("project"));
  // const projectJson = localStorage.getItem("project")
  var projectName = "";
  var projectView = "";
  if (projectJson === null) {
    projectName = "Start new project";
  } else {
    projectName = "Project: " + projectJson.name;
    projectView = <ProjectView projectJson={projectJson} />;
  }
  return (
    <div align="center">
      <Typography
        variant="h4"
        color="secondary"
        style={{ paddingBottom: "15px" }}
      >
        {projectName}
      </Typography>
      <Box
        width={1 / 2}
        justifyContent="center"
        alignItems="center"
        // border="1px solid black"
        // position='absolute'
        // bgcolor="grey.300"
      >
        {projectView}
      </Box>
    </div>
  );
}

class ProjectView extends Component {
  constructor() {
    super();
    this.state = {
      value: 0,
    };
  }

  IncrementCurRow(projectJson) {
    const curRow = projectJson.curRow;
    const totRow = projectJson.totRow;
    if (curRow < totRow) {
      projectJson.lastUpdated = new Date();
      projectJson.curRow = parseInt(curRow) + 1;
      localStorage.setItem("project", JSON.stringify(projectJson));
      this.setState({ value: this.state.value + 1 }); //forcing a rerender
    }
  }

  DecrementCurRow(projectJson) {
    const curRow = projectJson.curRow;
    if (curRow > 0) {
      projectJson.lastUpdated = new Date();
      projectJson.curRow = parseInt(curRow) - 1;
      localStorage.setItem("project", JSON.stringify(projectJson));
      this.setState({ value: this.state.value - 1 }); //forcing a rerender
    }
  }

  render() {
    const projectJson = this.props.projectJson;
    const curRow = parseInt(projectJson.curRow);
    const totRow = parseInt(projectJson.totRow);
    const lastUpdatedTimestamp = Date.parse(projectJson.lastUpdated);
    const lastUpdatedDate = new Date(lastUpdatedTimestamp).toLocaleDateString();
    const lastUpdatedTime = new Date(lastUpdatedTimestamp).toLocaleTimeString();
    let completion = Math.round((curRow / totRow) * 100);
    if (isNaN(completion)) completion = 0;
    const hasPattern = projectJson.hasPattern;
    return (
      <div align="center">
        <Box>
          <Typography variant="subtitle2" color="secondary">
            Current Row
          </Typography>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
        >
          <RemoveCircleIcon
            variant="static"
            color="primary"
            style={{
              display: "flex",
              position: "relative",
              paddingRight: "15px",
            }}
            onClick={() => this.DecrementCurRow(projectJson)}
          />
          <Box
            position="relative"
            display="inline-flex"
            p={1}
            onClick={() => this.IncrementCurRow(projectJson)}
          >
            <CircularProgress
              variant="static"
              value={completion}
              size={150}
              thickness={4.5}
              color="primary"
            />
            <Box
              top={0}
              left={0}
              bottom={0}
              right={0}
              position="absolute"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="h3" component="div" color="primary">
                {curRow}
              </Typography>
            </Box>
          </Box>
          <AddCircleIcon
            variant="static"
            color="primary"
            style={{
              display: "flex",
              position: "relative",
              paddingLeft: "15px",
            }}
            onClick={() => this.IncrementCurRow(projectJson)}
          />
        </Box>
        {hasPattern ? (
          <Box
            // border="1px solid black"
            position="relative"
            display="flex"
            flexDirection="column"
            paddingBottom={2}
          >
            {this.DeterminePattern(projectJson)}
          </Box>
        ) : null}

        <Box>
          <Typography color="secondary">Total rows: {totRow}</Typography>
          <Typography color="secondary">{completion}% complete!</Typography>
          <Typography color="secondary">
            last row updated on {lastUpdatedDate} {lastUpdatedTime}
          </Typography>
        </Box>
      </div>
    );
  }

  DeterminePattern(projectJson) {
    let pattern = [];
    let repeat = parseInt(projectJson.patternRepeat);
    let start = parseInt(projectJson.patternStart);
    let curRow = parseInt(projectJson.curRow);
    if (curRow < start) {
      for (let i = 0; i < repeat; i++) {
        pattern.push(<PatternUnfinished />);
      }
    } else {
      let curPatternFinished = (curRow - (start - 1)) % repeat;
      if (curPatternFinished === 0) curPatternFinished = repeat;
      let curPatternUnfinished = repeat - curPatternFinished;
      for (let i = 0; i < curPatternFinished; i++) {
        pattern.push(<PatternFinished />);
      }
      for (let i = 0; i < curPatternUnfinished; i++) {
        pattern.push(<PatternUnfinished />);
      }
    }

    return <div>{pattern}</div>;
  }
}

function PatternUnfinished() {
  return <RadioButtonUnchecked color="primary" fontSize="small" />;
}

function PatternFinished() {
  return <RadioButtonChecked color="primary" fontSize="small" />;
}
