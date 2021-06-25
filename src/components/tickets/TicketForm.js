import { Button, Grid, MenuItem, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { FormGrid } from "../ui/FormGrid";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "./../../hooks/useForm";
import { createTicket } from "./../../redux/actionCreators/ticket";

const classifications = [
  {
    value: "Incidente",
    label: "Incidente",
  },
  {
    value: "Solicitud",
    label: "Solicitud",
  },
  {
    value: "Reclamo",
    label: "Reclamo",
  },
  {
    value: "Sugerencia",
    label: "Sugerencia",
  },
];

const priorities = [
  {
    value: "Alta",
    label: "Alta",
  },
  {
    value: "Media",
    label: "Media",
  },
  {
    value: "Baja",
    label: "Baja",
  },
];

export const TicketForm = () => {
  const [classification, setClassification] = useState("");

  const handleClassification = (event) => {
    setClassification(event.target.value);
  };

  const [priority, setPriority] = useState("");

  const handlePriority = (e) => {
    setPriority(e.target.value);
  };

  const dispatch = useDispatch();

  const [formState, handleChange] = useForm({
    subject: "",
    description: "",
  });

  const { description, subject } = formState;

  const [photo, setPhoto] = useState();

  const handlePhoto = (e) => {
    setPhoto(e.target.files[0]);
  };

  const { displayName, uid } = useSelector((state) => state.auth);

  const handleSubmit = async () => {
    const ticket = {
      uid,
      subject,
      priority,
      classification,
      claimant: displayName,
      requested: new Date(),
      status: "open",
    };
    const message = {
      author: displayName,
      message: description,
      date: new Date(),
    };
    dispatch(createTicket(ticket, message, photo));
  };

  return (
    <FormGrid tittle="Enviar ticket">
      <TextField
        fullWidth
        required
        margin="dense"
        onChange={handleChange}
        value={subject}
        name="subject"
        label="Asunto"
        placeholder="Asunto"
        type="email"
      />
      <TextField
        select
        fullWidth
        label="Tipo de solicitud"
        value={classification}
        onChange={handleClassification}
      >
        {classifications.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        id="standard-select-currency"
        select
        fullWidth
        label="Prioridad"
        value={priority}
        onChange={handlePriority}
      >
        {priorities.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        fullWidth
        required
        variant="outlined"
        margin="normal"
        multiline
        rows={6}
        onChange={handleChange}
        value={description}
        name="description"
        label="Descripcion"
        placeholder="Descripcion"
        type="text"
      />
      <Grid container justify="center">
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="contained-button-file"
          multiple
          onChange={handlePhoto}
          type="file"
        />
        <label htmlFor="contained-button-file">
          <Button
            variant="contained"
            color="default"
            component="span"
            startIcon={<CloudUploadIcon />}
          >
            Upload
          </Button>
        </label>
      </Grid>

      <Grid item xs={12}>
        <Button
          onClick={handleSubmit}
          fullWidth
          variant="contained"
          color="primary"
        >
          Enviar
        </Button>
      </Grid>
    </FormGrid>
  );
};
