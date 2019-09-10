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

const jobStatusColors = { // map the Databricks cluster status to
    ACTIVE: "success",
    EXPIRED: "danger",
    RESTARTING: "info"
  };

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
            Register New Job
          </Button>
        }
        title="Registered Spark Jobs"
      />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Job Name</TableCell>
                  <TableCell>Schedule Trigger</TableCell>
                  <TableCell>Notebook (Version)</TableCell>
                  <TableCell>Region</TableCell>
                  <TableCell>Owner</TableCell>
                  <TableCell>Scheduled Timezone</TableCell>
                  <TableCell>Workers Used</TableCell>
                  <TableCell>Autoscaling</TableCell>
                  <TableCell sortDirection="desc">
                    <Tooltip enterDelay={300} title="Sort">
                      <TableSortLabel active direction="desc">
                        Created Date
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {state.jobs && state.jobs.map(job => (
                  <TableRow hover key={job.job_id}>
                  <TableCell><em><b>{job.settings.name}</b></em></TableCell>
                    <TableCell>{job.settings.schedule.quartz_cron_expression}</TableCell>
                    <TableCell>{`${job.settings.notebook_task.notebook_path} (v${job.settings.notebook_task.revision_timestamp})`}</TableCell>
                    <TableCell>{job.settings.new_cluster.aws_attributes.zone_id}</TableCell>
                    <TableCell>{job.creator_user_name}</TableCell>
                    <TableCell>{job.settings.schedule.timezone_id}</TableCell>
                    <TableCell>{job.settings.new_cluster.num_workers}</TableCell>
                    <TableCell>{job.autoscale ? `${job.autoscale.min_workers} ⇒ ${job.autoscale.max_workers} nodes`: "Not Configured"}</TableCell>
                    <TableCell>
                    {moment(job.created_time).format("MM/DD/YYYY")}
                  </TableCell>
                  <TableCell>
                  <div className={classes.statusContainer}>
                    <StatusBullet
                      className={classes.status}
                      color={jobStatusColors["ACTIVE"]}
                      size="md"
                    />
                    ACTIVE
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
      </CardActions>
    </Card>
  );
};

Jobs.propTypes = {
  className: PropTypes.string
};

export default Jobs;
