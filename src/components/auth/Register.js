import React from "react";
import { Button, Grid, MenuItem, TextField } from "@material-ui/core";
import { FormGrid } from "../ui/FormGrid";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { useState } from "react";
import { startRegisterWithEmailPassword } from "./../../redux/actionCreators/auth";

const roles = [
  {
    value: "user",
    label: "Usuario",
  },
  {
    value: "first_level",
    label: "1er Nivel",
  },
  {
    value: "second_level",
    label: "2do Nivel",
  },
  {
    value: "admin",
    label: "Admin",
  },
];

export const Register = () => {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.ui);

  const [state, handleChange] = useForm({
    name: "Melvin Diaz",
    email: "melvindiaz99@gmail.com",
    password: "123456",
  });

  const { name, email, password } = state;

  const [rol, setRol] = useState("user");

  const handleRol = (e) => {
    setRol(e.target.value);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(startRegisterWithEmailPassword(name, email, password, rol));
  };

  return (
    <FormGrid tittle="Registrar usuario">
      <TextField
        fullWidth
        variant="outlined"
        margin="dense"
        onChange={handleChange}
        name="name"
        value={name}
        label="Nombre"
        placeholder="Nombre"
        type="text"
      />
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
      <TextField
        id="standard-select-currency"
        select
        fullWidth
        label="Rol"
        value={rol}
        onChange={handleRol}
      >
        {roles.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <Grid item xs={12}>
        <Button
          onClick={handleRegister}
          fullWidth
          variant="contained"
          color="primary"
          disabled={loading}
        >
          Registrar
        </Button>
      </Grid>
    </FormGrid>
  );
};
