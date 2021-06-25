import React from "react";
import { Grid, makeStyles, Typography, Paper } from "@material-ui/core";
import { useSelector } from "react-redux";
import { AssignedPersonal } from "./AssignedPersonal";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "absolute",
    top: "12%",
    left: "5%",
    margin: `${theme.spacing(1)}px auto`,
    overflow: "hidden",
    padding: theme.spacing(0, 3),
    width: "32%",
    [theme.breakpoints.down("md")]: {
      width: "80%",
      left: "10%",
      right: "10%",
      top: "10%",
    },
  },
  container: {
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(5),
  },
  navlink: {
    textDecorationLine: "none",
  },
}));

export const TicketPanel = () => {
  const classes = useStyles();

  const { ticket } = useSelector((state) => state.tickets);
  const { requested, subject, claimant, classification, priority, status } =
    !!ticket && ticket;
  return (
    <div className={classes.root}>
      <Paper elevation={8} square>
        <div className={classes.container}>
          <Grid container spacing={3}>
            {ticket && (
              <Grid item>
                <Typography variant="body1">{`Asunto: ${subject}`}</Typography>
                <Typography variant="body1">
                  {`Solicitante: ${claimant}`}
                </Typography>
                <Typography variant="body1">
                  {`Tipo de solicitud: ${classification}`}
                </Typography>
                <Typography variant="body1">
                  {`Prioridad: ${priority}`}
                </Typography>
                <Typography variant="body1">{`Estado: ${status}`}</Typography>
                <Typography variant="body1">
                  {`Fecha de solicitud: ${requested}`}
                </Typography>
                <Typography variant="body1">
                  {`Persona asignada: ${
                    ticket.assigned ? ticket.assigned : "Nadie"
                  }`}
                </Typography>
                <AssignedPersonal />
              </Grid>
            )}
          </Grid>
        </div>
      </Paper>
    </div>
  );
};
