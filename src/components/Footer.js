import React from 'react'
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

export default function  Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Engineered for Syracuse University's College of Engineering and Computer Science."} <br/>
      {"Original repository was forked from jspruance's aws-cognito tutorial. Thank you to the developers of the React Material UI dashboard template. "}
      <br/>
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}