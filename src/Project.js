import React, {useState, Component} from 'react';
import { Button, TextField, Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
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
    cookies.set("project",JSON.stringify(this.state));
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


function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export function ProjectList() {
  // const classes = useStyles();

  return (
    <div align='center'>
      <Box
        width={1/2}
        justifyContent="center"
        alignItems="center"
        bgcolor="grey.300"
        >
      <Typography 
        align='center'
        variant='h5'>
        Projects
      </Typography>
        <List >
          <ListItem button alignItems="flex-start">
            <ListItemText primary="Project 1" />
          </ListItem>
          <ListItemLink href="#simple-list">
            <ListItemText primary="Project 2" />
          </ListItemLink>
        </List>
      </Box>
    </div>
  );
}
