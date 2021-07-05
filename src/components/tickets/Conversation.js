import React, { useState } from "react";
import {
  Grid,
  makeStyles,
  Typography,
  Paper,
  TextField,
  Button,
  MenuItem,
} from "@material-ui/core";
import { Messages } from "./Messages";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  respondTicket,
  updateTicketStatus,
} from "./../../redux/actionCreators/ticket";
import SendIcon from "@material-ui/icons/Send";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "absolute",
    top: "12%",
    left: "35%",
    margin: `${theme.spacing(1)}px auto`,
    overflow: "hidden",
    padding: theme.spacing(0, 3),
    width: "60%",
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
  textField: {
    marginTop: 10,
    marginLeft: 10,
  },
}));

const statuss = [
  {
    label: "Abierto",
  },
  {
    label: "Pendiente",
  },
  {
    label: "Cerrado",
  },
];
export const Conversation = ({ subject }) => {
  const classes = useStyles();

  const { tickets, auth } = useSelector((state) => state);
  const { ticket } = tickets;
  const { displayName } = auth;
  const [message, setMessage] = useState("");

  const { id } = useParams();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    const payload = {
      message,
      author: displayName,
      date: new Date(),
    };
    if (message) dispatch(respondTicket(id, payload));
    dispatch(updateTicketStatus(id, status));
  };

  const [status, setStatus] = useState(ticket?.status);

  const handleStatus = ({ target }) => {
    setStatus(target.value);
  };

  console.log(status);
  return (
    <div className={classes.root}>
      <Paper elevation={8} square>
        <div className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} zeroMinWidth>
              <Typography align="center" variant="h4" noWrap>
                {ticket && ticket.subject}
              </Typography>
            </Grid>
            <Messages />
            <Grid item xs={12}>
              <TextField
                label="Responder: "
                type="text"
                style={{ margin: 8 }}
                fullWidth
                margin="normal"
                multiline
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <datalist id="rfc">
                      <option value="XAXX010101000">asdassa</option>
                      <option value="XEXX010101000"></option>
                    </datalist>
                  ),
                  inputProps: {
                    list: "rfc",
                  },
                }}
              />
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={4}>
                    <TextField
                      select
                      fullWidth
                      label="Cambiar estado del ticket:"
                      value={status}
                      defaultValue={status}
                      onChange={handleStatus}
                    >
                      {statuss &&
                        statuss.map((s, index) => (
                          <MenuItem value={s.label} key={index}>
                            {s.label}
                          </MenuItem>
                        ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.textField}
                      endIcon={<SendIcon></SendIcon>}
                      onClick={handleSubmit}
                    >
                      Enviar
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Paper>
    </div>
  );
};
