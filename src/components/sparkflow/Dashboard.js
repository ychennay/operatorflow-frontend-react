import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import AddJob from "./subcomponents/AddJob";
import { TasksProgress, TotalProfit, Clusters } from "./subcomponents";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Dashboard = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={6}>
        <Grid item lg={4} md={6} xl={3} xs={12}>
          <TasksProgress />
        </Grid>
        <Grid item lg={4} md={6} xl={3} xs={12}>
          <AddJob />
        </Grid>
        <Grid item lg={4} md={6} xl={3} xs={12}>
          <TotalProfit />
        </Grid>
        <Grid item xs={12}>
          <Clusters auth={props.auth}/>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
