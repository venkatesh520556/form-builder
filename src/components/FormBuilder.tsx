import React, { useState } from "react";
import { Button, TextField, MenuItem, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addField, setFormName, saveForm } from "../redux/formSlice";
import { RootState } from "../redux/store";
import { v4 as uuid } from "uuid";
import { FieldType, FormField } from "../types/formTypes";
import FieldEditor from "./FieldEditor";

const fieldTypes: FieldType[] = ["text","number","textarea","select","radio","checkbox","date"];

const FormBuilder: React.FC = () => {
  const dispatch = useDispatch();
  const { currentForm } = useSelector((state: RootState) => state.form);
  const [newFieldType, setNewFieldType] = useState<FieldType>("text");

  const handleAddField = () => {
    const newField: FormField = {
      id: uuid(),
      type: newFieldType,
      label: "",
      validation: {},
    };
    dispatch(addField(newField));
  };

  return (
    <div className="form-container">
      <Typography variant="h5">Create Form</Typography>
      <TextField
        label="Form Name"
        fullWidth
        margin="normal"
        value={currentForm.name}
        onChange={(e) => dispatch(setFormName(e.target.value))}
      />

      {currentForm.fields.map((field) => (
        <FieldEditor key={field.id} field={field} />
      ))}

      <TextField
        select
        label="Field Type"
        value={newFieldType}
        onChange={(e) => setNewFieldType(e.target.value as FieldType)}
        style={{ marginRight: 10, minWidth: 140 }}
      >
        {fieldTypes.map((type) => (
          <MenuItem key={type} value={type}>{type}</MenuItem>
        ))}
      </TextField>
      <Button variant="contained" color="primary" onClick={handleAddField}>Add Field</Button>

      <div style={{ marginTop: 20 }}>
        <Button variant="outlined" color="primary" onClick={() => dispatch(saveForm())}>
          Save Form
        </Button>
      </div>
    </div>
  );
};

export default FormBuilder;
