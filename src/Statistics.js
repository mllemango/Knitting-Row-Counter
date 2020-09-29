import React, { Component } from "react";
import { Box, Typography } from "@material-ui/core";

export default class Statistics extends Component {
    constructor() {
        super();
    
        this.state = {
          projectExists: false,
        };
    
        
      }

      componentDidMount() {
        const dayStats = localStorage.getItem('dayStats');
        if (dayStats !== null) {
          
        }
      }


      render() {
          return(
            <Box 
            paddingLeft="10px"
            marginLeft="15px"
            width="375px"
            bgcolor='primary.light'
            position="absolute"
            float='right'
            maxHeight="600px"
            textAlign="left"
            right='50px'
            >
                <Typography> Project Statistics</Typography>

            </Box>
          );
      }
}