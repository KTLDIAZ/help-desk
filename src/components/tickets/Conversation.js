import React, { useState } from "react";
import {
  Grid,
  makeStyles,
  Typography,
  Paper,
  TextField,
  Button,
} from "@material-ui/core";
import { Messages } from "./Messages";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { respondTicket } from "./../../redux/actionCreators/ticket";
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
}));

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
    dispatch(respondTicket(id, payload));
  };

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
              <Button
                variant="contained"
                color="primary"
                endIcon={<SendIcon></SendIcon>}
                onClick={handleSubmit}
              >
                Enviar
              </Button>
            </Grid>
          </Grid>
        </div>
      </Paper>
    </div>
  );
};
