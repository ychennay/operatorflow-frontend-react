import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import { TasksProgress, Clusters, Jobs, Workspaces} from "./subcomponents";
import Runs from "./subcomponents/Runs";
import LoginRequiredModal from "../LoginRequiredModal";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Dashboard = props => {
  const classes = useStyles();

  return (
    (props.auth.isAuthenticated) ? <div className={classes.root}>
      <Grid container spacing={6}>
        <Grid item lg={4} md={6} xl={3} xs={12}>
          <TasksProgress />
        </Grid>
        <Grid item lg={4} md={6} xl={3} xs={12}>
        <Runs auth={props.auth}/>
        </Grid>
        <Grid item lg={4} md={6} xl={3} xs={12}>
          <Workspaces auth={props.auth}/>
        </Grid>
        <Grid item xs={12}>
          <Clusters auth={props.auth}/>
        </Grid>
        <Grid item xs={12}>
        <Jobs auth={props.auth}/>
      </Grid>
      </Grid>
    </div> : <LoginRequiredModal {...props}/>
  );
};

export default Dashboard;
