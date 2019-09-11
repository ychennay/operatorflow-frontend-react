import React, { useState, useEffect } from "react";
import clsx from "clsx";
import moment from "moment";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import AddCluster from '../AddCluster';
import { makeStyles } from "@material-ui/styles";
import {fetchDatabricksResource} from "../../api_utils";
import RefreshIcon from "@material-ui/icons/Refresh";
import CircularProgress from "@material-ui/core/CircularProgress";

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

const clusterStatusColors = { // map the Databricks cluster status to
  TERMINATED: "danger",
  RUNNING: "success",
  RESTARTING: "info"
};

const Clusters = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [state, setState] = useState({clusters: null}); // use React hooks to set Databricks clusters
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  useEffect(()=> {
    if (!state.clusters) { 
      console.log("Need to fetch cluster information.");
      fetchDatabricksResource(props.auth.idToken, 'cluster').then(response => {
        if (response.data){
          setState({clusters: response.data.clusters});
          setSuccess(true);
        }
      });
    }
  })

  return (
 
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        action={<Tooltip title="Quickly provision compute both for your adhoc Spark notebook executions and scheduled Jobs."><AddCluster auth={props.auth} text="Launch New Cluster"/></Tooltip>}
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
                {state.clusters && state.clusters.map(cluster => (
                  <TableRow hover key={cluster.cluster_id}>
                  <TableCell><em>{cluster.cluster_name}</em></TableCell>
                    <TableCell>{cluster.aws_attributes.ebs_volume_size}</TableCell>
                    <TableCell>{cluster.aws_attributes.zone_id}</TableCell>
                    <TableCell>{cluster.creator_user_name}</TableCell>
                    <TableCell>{cluster.node_type_id}</TableCell>
                    <TableCell>{cluster.driver_node_type_id}</TableCell>
                    <TableCell>{cluster.autoscale ? `${cluster.autoscale.min_workers} ⇒ ${cluster.autoscale.max_workers} nodes`: "Not Configured"}</TableCell>
                    <TableCell>{cluster.spark_version}</TableCell>
                    <TableCell>
                    {moment(cluster.start_time).format("MM/DD/YYYY")}
                  </TableCell>
                    <TableCell>
                      {moment(cluster.terminated_time).format("MM/DD/YYYY")}
                    </TableCell>
                    <TableCell>
                      <div className={classes.statusContainer}>
                        <StatusBullet
                          className={classes.status}
                          color={clusterStatusColors[cluster.state]}
                          size="md"
                        />
                        {cluster.state}
                      </div>
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
          {
            loading ? (
              <CircularProgress className={classes.progress} />
            ) : (
              <Button
                size="small"
                variant="text"
                onClick={() => {
                  console.log("Refreshing cache.")
                  setLoading(true);
                  fetchDatabricksResource(
                    props.auth.idToken,
                    "cluster",
                    true
                  ).then(response => {
                    if (response.data) {
                        console.log("New cluster data:", response.data.clusters)
                        setState({clusters: response.data.clusters});
                      setLoading(false);
                      setSuccess(true);
                    }
                  });
                }}
              >
                <Tooltip title="Update data for latest changes">
                  <RefreshIcon size="large" />
                </Tooltip>
              </Button>
            )
          }
      </CardActions>
    </Card>
  );
};

Clusters.propTypes = {
  className: PropTypes.string
};

export default Clusters;
