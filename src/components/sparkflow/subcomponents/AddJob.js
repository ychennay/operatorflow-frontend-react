import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

export default function FloatingActionButtons() {
  const classes = useStyles();

  return (
    <div>
      <Fab variant="extended" color="primary" aria-label="add" className={classes.extendedIcon}>
        Create
        <AddIcon />
      </Fab>
      <Fab variant="extended" color="secondary" aria-label="edit" className={classes.extendedIcon}>
        Edit
        <EditIcon />
      </Fab>
      <Fab variant="extended" aria-label="delete" className={classes.extendedIcon}>
      Delete
        <DeleteIcon />
      </Fab>
    </div>
  );
}
