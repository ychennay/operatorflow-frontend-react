import React, { useState, useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import moment from "moment";
import { fetchDatabricksResource } from "../../api_utils";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import RefreshIcon from "@material-ui/icons/Refresh";
import Tooltip from "@material-ui/core/Tooltip";
import CircularProgress from "@material-ui/core/CircularProgress";

import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton
} from "@material-ui/core";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%"
  },
  content: {
    padding: 0
  },
  image: {
    height: 48,
    width: 48
  },
  actions: {
    justifyContent: "flex-end"
  }
}));

const Runs = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [state, setState] = useState({ runs: null });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!state.runs) {
      console.log("Need to fetch runs information.");
      fetchDatabricksResource(props.auth.idToken, "run").then(response => {
        if (response.data) {
          setState({ runs: response.data.runs });
        }
      });
    }
  });
  return (
    state.runs && (
      <Card {...rest} className={clsx(classes.root, className)}>
        <CardHeader
          subtitle={`${state.runs.length} in total`}
          title="Recent Spark Runs"
          action={
            loading ? (
              <CircularProgress className={classes.progress} />
            ) : (
              <Button
                size="small"
                variant="text"
                onClick={() => {
                  setLoading(true);
                  fetchDatabricksResource(
                    props.auth.idToken,
                    "run",
                    false
                  ).then(response => {
                    if (response.data) {
                        console.log("New data", response.data.runs)
                      setState({ runs: response.data.runs });
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
        />

        <Divider />
        <CardContent className={classes.content}>
          <List>
            {state.runs.map((run, i) => (
              <ListItem divider={i < state.runs.length - 1} key={run.run_id}>
                <ListItemAvatar>
                  {run.state.result_state === "SUCCESS" ? (
                    <CheckCircleIcon />
                  ) : (
                    <ErrorIcon />
                  )}
                </ListItemAvatar>
                <ListItemText
                  primary={
                    run.task.notebook_task.notebook_path.split("/").reverse()[0]
                  }
                  secondary={`Updated ${moment()
                    .subtract(2, "hours")
                    .fromNow()}`}
                />
                <IconButton edge="end" size="small">
                  <MoreVertIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </CardContent>
        <Divider />
        <CardActions className={classes.actions}>
          <Button color="primary" size="small" variant="text">
            View all <ArrowRightIcon />
          </Button>
        </CardActions>
      </Card>
    )
  );
};

Runs.propTypes = {
  className: PropTypes.string
};

export default Runs;
