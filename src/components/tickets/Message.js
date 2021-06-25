import React, { useState } from "react";
import {
  Paper,
  Box,
  Grid,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    maxWidth: "70%",
  },
  image: {
    maxWidth: "100%",
    maxHeight: "360px",
  },
}));

export const Message = ({ left, author, date, image, message }) => {
  const classes = useStyles();

  const [show, setShow] = useState(false);

  const showImage = (e) => {
    setShow(!show);
  };

  return (
    <Box
      display="flex"
      flexDirection={left ? "row" : "row-reverse"}
      p={1}
      m={1}
      bgcolor="background.paper"
    >
      <Paper className={classes.paper} elevation={4} square>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography paragraph variant="body2">
                {message}
              </Typography>
              <Typography variant="body2">{left && author}</Typography>
              <Typography variant="body2" color="textSecondary">
                {date}
              </Typography>
            </Grid>
            {image && (
              <>
                <Grid item>
                  {show && (
                    <img className={classes.image} alt="complex" src={image} />
                  )}
                </Grid>
                <Grid item>
                  <Button variant="contained" onClick={showImage}>
                    Ver foto
                  </Button>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};
