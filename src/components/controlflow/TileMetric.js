/* eslint-disable no-script-url */

import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Total Model Runs</Title>
      <Typography component="p" variant="h4">
        4,560
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        as of September 12th, 2019
      </Typography>
      <div>
        <Link color="primary" href="javascript:;">
          View history
        </Link>
      </div>
    </React.Fragment>
  );
}