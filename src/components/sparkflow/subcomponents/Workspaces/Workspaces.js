import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import moment from 'moment';
import {fetchDatabricksResource} from "../../api_utils";
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
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import RefreshIcon from "@material-ui/icons/Refresh";
import Tooltip from "@material-ui/core/Tooltip";
import CircularProgress from "@material-ui/core/CircularProgress";



const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  content: {
    padding: 0
  },
  image: {
    height: 48,
    width: 48
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const Workspaces = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [state, setState] = useState({workspaces: null});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(()=> {
    if (!state.workspaces) { 
      console.log("Need to fetch workspace information.");
      fetchDatabricksResource(props.auth.idToken, 'workspace').then(response => {
        if (response.data){
          setState({workspaces: response.data.objects});
        }
      });
    }
  })
  return (
    state.workspaces && <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        subtitle={`${state.workspaces.length} in total`}
        title="Workspaces"
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
                  "workspace",
                  true
                ).then(response => {
                  if (response.data) {
                    setState({ workspaces: response.data.objects });
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
          {state.workspaces.map((workspace, i) => (
            <ListItem
              divider={i < state.workspaces.length - 1}
              key={workspace.path}
            >
              <ListItemAvatar>
                <img
                  alt="Product"
                  className={classes.image}
                  src={`/images/languages/${workspace.language.toLowerCase()}.png`}
                />
              </ListItemAvatar>
              <ListItemText
                primary={workspace.path.split("/").reverse()[0]}
                secondary={`Updated ${moment().subtract(2, 'hours').fromNow()}`}
              />
              <IconButton
                edge="end"
                size="small"
              >
                <MoreVertIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Button
          color="primary"
          size="small"
          variant="text"
        >
          View all <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

Workspaces.propTypes = {
  className: PropTypes.string
};

export default Workspaces;
