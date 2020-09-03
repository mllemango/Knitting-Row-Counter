import React, { Component } from 'react';
import { Button, Typography, TextField, Box } from '@material-ui/core';


class App extends Component {
  constructor() {
      super();

      this.state = {
          displayProjectButton: false
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
              autoFocus> 
              </TextField>
              <TextField
              color='primary'
              variant='standard'
              margin='normal'
              id='totalRowCount'
              label='Total Row Count'
              type='number'
              fullWidth>
              </TextField>
              <TextField
              color='primary'
              variant='standard'
              margin='normal'
              id='curRowCount'
              label='Current Row Count'
              type='number'
              fullWidth>
              </TextField>
          </Box>
          <Box p={4}>
            <Button
              color='Primary'
              align='center'
              variant='outlined'>
              Start
            </Button>
          </Box>
          
        </div>
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
