import React, { useState, useEffect } from "react";
import clsx from "clsx";
import moment from "moment";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import {fetchDatabricksResource} from "../../api_utils";
import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  TableSortLabel
} from "@material-ui/core";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

import { StatusBullet } from "../../..";

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 800
  },
  statusContainer: {
    display: "flex",
    alignItems: "center"
  },
  status: {
    marginRight: theme.spacing(1)
  },
  actions: {
    justifyContent: "flex-end"
  }
}));

const Jobs = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [state, setState] = useState({jobs: null}); // use React hooks to set Databricks clusters
  useEffect(()=> {
    if (!state.jobs) { 
      console.log("Need to fetch cluster information.");
      fetchDatabricksResource(props.auth.idToken, 'job').then(response => {
        if (response){
          setState({jobs: response.data.jobs});
        }
      });
    }
  })

  return (
 
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        action={
          <Button color="primary" size="small" variant="outlined">
            Create New Cluster
          </Button>
        }
        title="Spark Clusters"
      />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Cluster Name</TableCell>
                  <TableCell>Storage Volume Size (MB)</TableCell>
                  <TableCell>Region</TableCell>
                  <TableCell>Owner</TableCell>
                  <TableCell>Worker Instance</TableCell>
                  <TableCell>Master Instance</TableCell>
                  <TableCell>Autoscaling</TableCell>
                  <TableCell>Spark Deployment Version</TableCell>
                  <TableCell sortDirection="desc">
                    <Tooltip enterDelay={300} title="Sort">
                      <TableSortLabel active direction="desc">
                        Start Time
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                  <TableCell sortDirection="desc">
                    <Tooltip enterDelay={300} title="Sort">
                      <TableSortLabel active direction="desc">
                        Terminated Time
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {state.jobs && state.jobs.map(job => (
                  <TableRow hover key={job.cluster_id}>
                  <TableCell><em>{job.cluster_name}</em></TableCell>
                    <TableCell>{job.aws_attributes.ebs_volume_size}</TableCell>
                    <TableCell>{job.aws_attributes.zone_id}</TableCell>
                    <TableCell>{job.creator_user_name}</TableCell>
                    <TableCell>{job.node_type_id}</TableCell>
                    <TableCell>{job.driver_node_type_id}</TableCell>
                    <TableCell>{job.autoscale ? `${job.autoscale.min_workers} ⇒ ${job.autoscale.max_workers} nodes`: "Not Configured"}</TableCell>
                    <TableCell>{job.spark_version}</TableCell>
                    <TableCell>
                    {moment(job.start_time).format("MM/DD/YYYY")}
                  </TableCell>
                    <TableCell>
                      {moment(job.terminated_time).format("MM/DD/YYYY")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Button color="primary" size="small" variant="text">View all <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

Jobs.propTypes = {
  className: PropTypes.string
};

export default Jobs;
