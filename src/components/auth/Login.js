import React from "react";
import { Button, Grid, TextField } from "@material-ui/core";
import { FormGrid } from "../ui/FormGrid";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { startLoginEmailPassword } from "../../redux/actionCreators/auth";

export const Login = () => {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.ui);

  const [state, handleChange] = useForm({
    email: "melvindiaz99@gmail.com",
    password: "123456",
  });

  const { email, password } = state;

  const handelLogin = (e) => {
    e.preventDefault();
    dispatch(startLoginEmailPassword(email, password));
  };

  return (
    <FormGrid tittle="Iniciar sesión">
      <TextField
        fullWidth
        variant="outlined"
        margin="dense"
        onChange={handleChange}
        name="email"
        value={email}
        label="Correo"
        placeholder="Correo"
        type="email"
      />
      <TextField
        fullWidth
        variant="outlined"
        margin="dense"
        onChange={handleChange}
        name="password"
        value={password}
        label="Contraseña"
        placeholder="Contraseña"
        type="password"
      />

      <Grid item xs={12}>
        <Button
          onClick={handelLogin}
          fullWidth
          variant="contained"
          color="primary"
          disabled={loading}
        >
          Iniciar sesión
        </Button>
      </Grid>
    </FormGrid>
  );
};
