import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Submit from "../Submit";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import AddToQueue from "@material-ui/icons/AddToQueue";

const zones = [
  {
    value: "us-east-1a",
    label: "us-east-1a"
  },
  {
    value: "us-east-1b",
    label: "us-east-1b"
  },
  {
    value: "us-east-1c",
    label: "us-east-1c"
  }
];

const workers = [
  {
    value: 1,
    label: "1 (min)"
  },
  {
    value: 2,
    label: "2"
  },
  {
    value: 3,
    label: "3"
  },
  {
    value: 4,
    label: "4 (max)"
  }
];

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

  const [values, setValues] = React.useState({
    name: `cluster-${Math.random()
      .toString(36)
      .substring(2, 10)}`,
    zone: "us-east-1a",
    autoscaling: true,
    minMaxWorkers: [2, 10],
    workers: 2
  });

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function valuetext(value) {
    return `${value}°C`;
  }

  const handleChange = name => event => {
    console.log(`Changing ${name} to ${event.target.value}`);

    setValues({
      ...values,
      [name]:
        name === "workers" ? parseInt(event.target.value) : event.target.value
    });
  };

  const handleSwitchChange = name => event => {
    console.log(`Changing ${name} to ${event.target.checked}`);
    setValues({ ...values, [name]: event.target.checked });
  };

  const handleMinMaxWorkersChange = (event, newValue) => {
    setValues({ ...values, minMaxWorkers: newValue });
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
      cluster_name: values.name,
      spark_version: "5.3.x-scala2.11",
      node_type_id: "i3.xlarge"
    };
    if (values.autoscaling) {
      payload.autoscale = {
        min_workers: values.minMaxWorkers[0],
        max_workers: values.minMaxWorkers[1]
      };
    } else {
      payload.num_workers = values.workers;
    }
    return payload;
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        {props.text}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Launch New Cluster</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Launch a new Databricks cluster to run your Spark jobs on. Configure
            autoscaling if your job memory and compute requirements are
            variable.
          </DialogContentText>
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  checked={values.autoscaling}
                  onChange={handleSwitchChange("autoscaling")}
                  value="autoscaling"
                  color="primary"
                />
              }
              label="Enabled Autoscaling"
            />
            <TextField
              id="outlined-select-zone"
              select
              label="Select"
              className={classes.textField}
              value={values.zone}
              onChange={handleChange("zone")}
              SelectProps={{
                MenuProps: {
                  className: classes.menu
                }
              }}
              helperText="Availability Zone"
              margin="normal"
              variant="outlined"
            >
              {zones.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              autoFocus
              margin="normal"
              id="outlined-name"
              label="Cluster Name"
              type="email"
              onChange={handleChange("name")}
              defaultValue={values.name}
              required
            />
          </FormGroup>
          <Grid item>
            <AddToQueue />
          </Grid>
          <Grid item>Workers to Provision (+1 Master Node)</Grid>

          {values.autoscaling ? (
            <Slider
              marks={true}
              step={1}
              min={1}
              max={16}
              value={values.minMaxWorkers}
              onChange={handleMinMaxWorkersChange}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              getAriaValueText={valuetext}
            />
          ) : (
            <Grid container spacing={2} alignItems="center">
              <Grid item xs>
                <Slider
                  step={1}
                  min={1}
                  max={16}
                  marks={true}
                  value={
                    typeof values.workers === "number" ? values.workers : 0
                  }
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
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel & Exit
          </Button>
          <Submit auth={props.auth} text={"Launch"} payload={prepareCreatePayload(values)} resource={"cluster"} />
        </DialogActions>
      </Dialog>
    </div>
  );
}
