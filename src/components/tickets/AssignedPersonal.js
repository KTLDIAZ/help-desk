import React, { useState } from "react";
import { Button, MenuItem, TextField } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { updateTicket } from "../../redux/actionCreators/ticket";
import { useParams } from "react-router-dom";

export const AssignedPersonal = () => {
  const { personal } = useSelector((state) => state.tickets);
  const [assigned, setAssigned] = useState("");

  const handlePersonal = (e) => {
    setAssigned(e.target.value);
  };

  const { id } = useParams();

  const dispatch = useDispatch();
  const handleAssignedPersonal = (e) => {
    dispatch(updateTicket(id, assigned));
  };

  return (
    <>
      <TextField
        select
        fullWidth
        label="Asignar persona:"
        value={assigned}
        onChange={handlePersonal}
      >
        {personal &&
          personal.map((p, index) => (
            <MenuItem value={p.name} key={index}>
              {p.name}
            </MenuItem>
          ))}
      </TextField>
      <br />
      <br />
      <Button variant="contained" onClick={handleAssignedPersonal}>
        Asignar
      </Button>
    </>
  );
};
