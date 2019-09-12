import React, { useState, useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { fetchDatabricksResource } from "../../sparkflow/api_utils";
import LinearProgress from '@material-ui/core/LinearProgress';

import Grid from "@material-ui/core/Grid";
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

const Buckets = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [state, setState] = useState({ buckets: null });
  useEffect(() => {
    if (!state.buckets) {
      console.log("Need to fetch bucket information.");
      fetchDatabricksResource(props.auth.idToken, "bucket", true).then(
        response => {
          if (response.data) {
            setState({ buckets: response.data.buckets });
          }
        }
      );
    }
  });
  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        subtitle={`${state.buckets ? state.buckets.length : 0} in total`}
        title="Available Object Stores (S3 Buckets)"
      />
      <Divider />
      {state.buckets ? (
        <CardContent className={classes.content}>
          <List>
            {state.buckets.map((bucket, i) => (
              <ListItem
                divider={i < state.buckets.length - 1}
                key={bucket.name}
              >
                <ListItemAvatar>
                  <img
                    alt="Product"
                    className={classes.image}
                    src={`/images/logos/s3.png`}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={`${bucket.name} - ${bucket.files} files`}
                  secondary={`Created on ${bucket.createdAt}`}
                />
                <IconButton edge="end" size="small">
                  <MoreVertIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </CardContent>
      ) : (
     
          <Grid item xs={12}>
            <LinearProgress />
            <br />
            <LinearProgress color="secondary" />
          </Grid>
      )}
      <Divider />
      <CardActions className={classes.actions}>
        <Button color="primary" size="small" variant="text">
          View all <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

Buckets.propTypes = {
  className: PropTypes.string
};

export default Buckets;
