import React, {useState, useEffect} from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import AddJob from "./subcomponents/AddJob";
import axios from "axios";
import { TasksProgress, TotalProfit, LatestOrders } from "./subcomponents";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const API_GATEWAY_ENDPOINT = "https://19mgxwhsm8.execute-api.us-east-1.amazonaws.com"

let API_GATEWAY_POST_PAYLOAD_TEMPLATE = {
  operation: "read",
  tableName: "databricks-api",
  payload: {
    Key: {
      user_id: "yuchen_test@mailinator.com"
    }
  }
};

const Dashboard = props => {
  const classes = useStyles();

  const [state, setState] = useState({"clusters": null}); // use React hooks to set Databricks clusters
  useEffect(()=> {
    if (!state.clusters) { 
      console.log("Need to fetch cluster information.");
      fetchDatabricksClusters(props.auth.idToken).then(data => setState(data.clusters));
    }
  })

  const fetchDatabricksClusters = async idToken => {
    try {
      const headers = {
        Authorization: idToken
      };
      return await axios.get(
        `${API_GATEWAY_ENDPOINT}/v1/cluster`,
        API_GATEWAY_POST_PAYLOAD_TEMPLATE,
        {
          headers: headers
        }
      );
    } catch (e) {
      console.log(`😱 Axios request failed! : ${e}`);
      return e;
    }
  };
  

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
          <LatestOrders />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
