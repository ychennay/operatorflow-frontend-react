import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  }
}));

const cardObjects = [
  {
    title: "KubeFlow",
    descriptor:
      "Run batch data processing or machine learning inference/training jobs on Tensorflow, distributed behind a Kubeernetes cluster and supported with Istio.",
    imageLink:
      "https://github.com/ychennay/ychennay.github.io/raw/master/static_images/kubeflow-second.png",
    pushHistory: "/"
  },
  {
    title: "SparkFlow",
    descriptor:
      "Start, stop, and monitor Apache Spark jobs as interactive Databricks-managed Notebooks.",
    imageLink:
      "https://github.com/ychennay/ychennay.github.io/raw/master/static_images/databricks-logo.png",
    pushHistory: "/sparkflow"
  },
  {
    title: "ControlFlow",
    descriptor:
      "Manage all of your Workflows from one centralized location, export and report on your organization's data metrics.",
    imageLink:
      "https://github.com/ychennay/ychennay.github.io/raw/master/static_images/controlflow-logo.png",
      pushHistory: "/dashboard"
  }
];


export default function Album(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <i className="material-icons">code</i>
          <Typography variant="h6" color="inherit" noWrap>
            Contribute to the OperatorFlow project on Github
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Make Data Happen
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Start a new machine learning or data processing task with just a
              few clicks.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    Start a New Job
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Tutorial
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="secondary">
                    Documentation
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cardObjects.map(card => (
              <Grid item key={card.title} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={card.imageLink}
                    title={card.title}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.title}
                    </Typography>
                    <Typography>{card.descriptor}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => props.history.push(card.pushHistory)}
                    >
                      Start
                    </Button>
                    <Button size="small" color="primary">
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}
