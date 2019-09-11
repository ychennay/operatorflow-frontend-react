import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

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
    age: "",
    multiline: "Controlled",
    zone: "us-east-1a",
    autoscaling: true
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
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSwitchChange = name => event => {
    console.log(`Changing ${name} to ${event.target.checked}`);
    setValues({ ...values, [name]: event.target.checked });
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
              autoFocus
              margin="dense"
              id="outlined-name"
              label="Cluster Name"
              type="email"
              onChange={handleChange("name")}
              defaultValue={values.name}
              required
            />
          </FormGroup>
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

          <Typography id="discrete-slider" gutterBottom>
            Worker Nodes
          </Typography>
          <Slider
            defaultValue={2}
            getAriaValueText={valuetext}
            aria-labelledby="discrete-slider-always"
            valueLabelDisplay="on"
            step={1}
            marks
            min={2}
            max={8}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Launch
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
