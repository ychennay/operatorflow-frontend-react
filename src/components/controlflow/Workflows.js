
/* eslint-disable no-script-url */

import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

// Generate Workflow Data
function createData(id, date, name, owner, version, bytesProcessed, jobType) {
  return { id, date, name, owner, version, bytesProcessed, jobType };
}

const rows = [
  createData(0, '16 Mar, 2019', 'shakespeare_word_count',  'yuchen_test@mailinator.com', 'v1', '4523442', 'Spark'),
  createData(1, '16 Mar, 2019', 'twitter_api_clustering_model', 'ychennay@gmail.com', 'v1', '4523442', 'scikit-learn'),
  createData(2, '16 Mar, 2019', 'shakespeare_word_count', 'testing_tester@mailinator.com','v1',  '4523442', 'Tensorflow'),
  createData(3, '16 Mar, 2019', 'marketo_customer_reporting', 'ychen244@syr.edu', 'v1', '4523442', 'Spark'),
  createData(4, '15 Mar, 2019', 'salesforce_ltv_sales_model', 'analytics@gmail.com', 'v1', '4523442', 'Tensorflow'),
];

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Workflows() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Recently Executed Workflows</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Owner</TableCell>
            <TableCell>Bytes Processed</TableCell>
            <TableCell align="right">Job Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.owner}</TableCell>
              <TableCell>{row.bytesProcessed}</TableCell>
              <TableCell align="right">{row.jobType}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="javascript:;">
          See more Workflows
        </Link>
      </div>
    </React.Fragment>
  );
}