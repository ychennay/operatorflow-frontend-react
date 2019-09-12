import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog";
import Slider from "@material-ui/core/Slider";
import Submit from "../Submit";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormGroup from "@material-ui/core/FormGroup";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import AddToQueue from "@material-ui/icons/AddToQueue";
import { fetchDatabricksResource } from "../api_utils";
import CircularIndeterminate from "../../Loading";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  dense: {
    marginTop: theme.spacing(2)
  },
  menu: {
    width: 200
  }
}));

export default function FormDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [workspaces, setWorkspaces] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorState, setErrorState] = useState(true);

  useEffect(() => {
    if (!workspaces) {
      fetchDatabricksResource(props.auth.idToken, "workspace").then(
        response => {
          if (response.data) {
            setWorkspaces(response.data.objects);
          }
        }
      );
    }
  });

  const [values, setValues] = React.useState({
    name: `job-${Math.random()
      .toString(36)
      .substring(2, 10)}`,
    notebook: "Select a Spark notebook to run",
    emailNotification: "",
    workers: 2,
    schedule: "0 15 10 15 * ?"
  });

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const handleChange = name => event => {
    if (name === "notebook") {
      setErrorState(false);
    }

    setValues({
      ...values,
      [name]:
        name === "workers" ? parseInt(event.target.value) : event.target.value
    });
  };

  const handleBlur = () => {
    if (values.workers < 0) {
      setValues({ ...values, workers: 0 });
    } else if (values.workers > 10) {
      setValues({ ...values, workers: 10 });
    }
  };

  const handleSliderChange = (event, newValue) => {
    setValues({ ...values, workers: parseInt(newValue) });
  };

  const prepareCreatePayload = values => {
    let payload = {
      "name": values.name,
      "new_cluster": {
        "spark_version": "5.3.x-scala2.11",
        "node_type_id": "r3.xlarge",
        "aws_attributes": {
          "availability": "ON_DEMAND"
        },
        "num_workers": values.workers
      },
      "email_notifications": {
        "on_start":
          values.emailNotification === "" ? [] : [values.emailNotification],
        "on_success":
          values.emailNotification === "" ? [] : [values.emailNotification],
        "on_failure":
          values.emailNotification === "" ? [] : [values.emailNotification]
      },
      "schedule": {
        "quartz_cron_expression": values.schedule,
        "timezone_id": "America/Los_Angeles"
      },

      "notebook_task": {
        "notebook_path": values.notebook
      }
    };
    return payload;
  };

  return workspaces ? (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        {props.text}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Register New Job</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Create a new recurring job that can be run either via triggers or on
            a scheduled basis.
          </DialogContentText>
          <FormGroup row>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  id="outlined-select-zone"
                  select
                  error={errorState}
                  label="Select"
                  className={classes.textField}
                  value={values.notebook}
                  onChange={handleChange("notebook")}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu
                    }
                  }}
                  helperText="Notebook to execute job with"
                  margin="normal"
                  variant="outlined"
                >
                  {workspaces.map(workspace => (
                    <MenuItem key={workspace.path} value={workspace.path}>
                      {workspace.path.split("/").reverse()[0]}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  autoFocus
                  margin="normal"
                  id="outlined-name"
                  label="Job Name"
                  type="email"
                  onChange={handleChange("name")}
                  defaultValue={values.name}
                  required
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12}>
                <DialogContentText>
                  Select a recipient you'd like to send an email to when the job
                  run begins, and a schedule with which to run your job.
                </DialogContentText>
                <TextField
                  id="outlined-name"
                  label="Email Address"
                  className={classes.textField}
                  type="email"
                  name="email"
                  onChange={handleChange("emailNotification")}
                  autoComplete="email"
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-helperText"
                  label="Job Execution Schedule"
                  defaultValue="0 15 10 15 * ?"
                  className={classes.textField}
                  helperText="Enter a valid cron expression"
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </FormGroup>
          <Grid item>
            <AddToQueue />
          </Grid>
          <Grid item>Workers to Provision (+1 Master Node)</Grid>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs>
              <Slider
                step={1}
                min={1}
                max={16}
                marks={true}
                value={typeof values.workers === "number" ? values.workers : 0}
                onChange={handleSliderChange}
                aria-labelledby="input-slider"
              />
            </Grid>
            <Grid item>
              <Input
                className={classes.input}
                value={values.workers}
                margin="dense"
                onChange={handleChange("workers")}
                onBlur={handleBlur}
                inputProps={{
                  step: 1,
                  min: 1,
                  max: 10,
                  type: "number",
                  "aria-labelledby": "input-slider"
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel & Exit
          </Button>
          <Submit
            disabled={errorState}
            auth={props.auth}
            text={"Register"}
            payload={prepareCreatePayload(values)}
            resource={"job"}
          />
        </DialogActions>
      </Dialog>
    </div>
  ) : (
    <CircularIndeterminate />
  );
}
