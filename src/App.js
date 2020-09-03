import React, { Component } from 'react';
import { Button, Typography, Grid, TextField, Avatar, Box } from '@material-ui/core';
import { getByPlaceholderText } from '@testing-library/react';


class App extends Component {
  constructor() {
      super();

      this.state = {
          displayProjectButton: true
          }
  }
  
  render() {
      const displayProjectButton = this.state.displayProjectButton;
      const newProjectButton = (
        <div justifyContent='center'>
          <Button 
              color='Primary'
              align='center'
              variant='outlined'
              onClick={() => { this.setState({ displayProjectButton: false}) }}> 
              Add New Project
          </Button>
        </div>
      );

      const newProjectCard = (
        <Box
          width={1/3}
          container
          justify="center"
          direction='column'
          >
          <TextField
            color='primary'
            variant="standard"
            required
            id="projectName"
            label="Project Name"
            autoFocus> 
            </TextField>
            <TextField
            color='primary'
            variant='standard'
            margin='normal'
            id='totalRowCount'
            label='Total Row Count'
            type='number'
            required>
            </TextField>
            <TextField
            color='primary'
            variant='standard'
            margin='normal'
            id='curRowCount'
            label='Current Row Count'
            type='number'
            required>
            </TextField>
            <Button
              color='Primary'
              align='center'
              variant='outlined'>
              Start
            </Button>

        </Box>
      )
      return (
        <div>

          <Box display='flex' flexDirection="row" justifyContent="center" m={1} p ={2}>
            <img src={require('./yarnIcon.png')} alt="yarnIcon" width='70px'/>
            <Typography
              align='center'
              variant='h2'> 
              Row Counter
            </Typography>
          </Box>
          
          <Box display='flex' justifyContent="center">
              {displayProjectButton ? newProjectButton : newProjectCard}
          </Box>
        </div>

      )
  }
}

export default App;
