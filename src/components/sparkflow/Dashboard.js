import React, {useState} from "react";
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

let API_GATEWAY_POST_PAYLOAD_TEMPLATE = {
  operation: "read",
  tableName: "databricks-api",
  payload: {
    Key: {
      user_id: "yuchen_test@mailinator.com"
    }
  }
};


// curl 'https://<databricks-instance>/api/2.0/token/list' -X GET -H "Authorization: Bearer <personal-access-token-value>"

const DATABRICKS_DEPLOYMENT_API_BASE_URL = "https://dbc-e3636760-d7f1.cloud.databricks.com/api/2.0";

const makeApiEndpoint = (resource, action) => `${DATABRICKS_DEPLOYMENT_API_BASE_URL}/${resource}/${action}`

const getClusters = async accessToken => {
    try {
        const headers = {
          "Authorization": `Bearer: ${accessToken}`
        };
    
        return await axios(
            makeApiEndpoint("clusters", "list"),
          {
            headers: headers
          }
        );
    
      } catch (e) {
        console.log(`😱 Axios request failed! : ${e}`);
        return e;
      }
}

const Dashboard = props => {
  const classes = useStyles();
  

  console.log(props);
  getClusters(props.da)

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
