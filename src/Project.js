import React, {useState, Component} from 'react';
import { Button, TextField, Box, Typography, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export class NewProjectCard extends Component{

  constructor() {
    super();
    this.state = {
      name: "",
      totRow: 0,
      curRow: 0,
      time: 0,
    };
  }

  setProject(){
    // console.log(this.state)
    this.setState({time: new Date()});
    // console.log(projects);
    cookies.set("project",JSON.stringify(this.state));
    window.location.reload();
  };

  render(){
    
  return(
    <div align='center'>
      <Box
        width={1/2}
        justifyContent="center"
        alignItems="center"
        direction='column'
        // bgcolor="grey.300"
      >
        <TextField
          color='primary'
          variant="standard"
          fullWidth
          id="projectName"
          label="Project Name"
          autoFocus
          onChange={(event) => this.setState({name: event.target.value})}> 
          </TextField>
          <TextField
          color='primary'
          variant='standard'
          margin='normal'
          id='totalRowCount'
          label='Total Row Count'
          type='number'
          fullWidth
          onChange={(event) => this.setState({totRow: event.target.value})}> 
          </TextField>
          <TextField
          color='primary'
          variant='standard'
          margin='normal'
          id='curRowCount'
          label='Current Row Count'
          type='number'
          fullWidth
          onChange={(event) => this.setState({curRow: event.target.value})}> 
          </TextField>
      </Box>
      <Box p={4}>
        <Button
          color="Primary"
          align="center"
          variant="outlined"
          onClick={() => {this.setProject()}}
        >
          Start
        </Button>
      </Box>
    </div>
  );
}}

export function ProjectList() {
  const projectJson = cookies.get("project");
  var projectName = '';
  var projectView = '';
  if (projectJson === undefined) {
    projectName = "Start new project"
  }
  else {
    projectName = 'Current project: ' +  projectJson.name;
    projectView = <ProjectView projectJson={projectJson}/>;
  }
  return (
    <div align='center'>
      <Box
        width={1/2}
        justifyContent="center"
        alignItems="center"
        // bgcolor="grey.300"
        >
      <Typography 
        align='center'
        variant='h5'>
        {projectName}
      </Typography>
      {projectView}
      </Box>
    </div>
  );
}

function ProjectView(projectJson) {
  const curRow = projectJson.projectJson.curRow;
  const totRow = projectJson.projectJson.totRow;
  const completion = Math.round((curRow/totRow)*100);
  console.log("..")
  return (
    <div align='center'>
      <Box>
        <Typography>Currently on row</Typography>
      </Box>
      <Box position='relative' display='inline-flex' p={4}>
       <CircularProgress variant="static" value={completion}  size={150} thickness={4.5}/>
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
          <Typography variant="h4" component="div" color="primary"> {curRow}</Typography>
        </Box>
      </Box>
      <Box>
        <Typography>{completion}% complete!</Typography>
      </Box>

    </div>
  );
}

