import React from "react";
import { Grid, makeStyles, Typography, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "absolute",
    top: "12%",
    left: "27%",
    right: "27%",
    margin: `${theme.spacing(1)}px auto`,
    overflow: "hidden",
    padding: theme.spacing(0, 3),
    width: "30%",
    [theme.breakpoints.down("md")]: {
      width: "80%",
      left: 0,
      top: "10%",
    },
  },
  paper: {
    maxWidth: "350px",
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(5),
  },
  navlink: {
    textDecorationLine: "none",
  },
}));

export const FormGrid = ({ children, tittle }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={8} square>
        <div className={classes.paper}>
          <Grid container spacing={3}>
            <Grid item xs={12} zeroMinWidth>
              <Typography align="center" variant="h4" noWrap>
                {tittle}
              </Typography>
            </Grid>
            {children}
          </Grid>
        </div>
      </Paper>
    </div>
  );
};
