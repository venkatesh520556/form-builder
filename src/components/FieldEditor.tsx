import React from "react";
import { TextField, Checkbox, FormControlLabel, Button } from "@mui/material";
import { FormField } from "../types/formTypes";
import { useDispatch } from "react-redux";
import { updateField, removeField } from "../redux/formSlice";

const FieldEditor: React.FC<{ field: FormField }> = ({ field }) => {
  const dispatch = useDispatch();

  const handleChange = (prop: keyof FormField, value: any) => {
    dispatch(updateField({ ...field, [prop]: value }));
  };

  return (
    <div className="field-editor-container">
      <TextField
        label="Label"
        value={field.label}
        onChange={(e) => handleChange("label", e.target.value)}
        // Use flexible width with CSS class instead
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={field.validation?.required || false}
            onChange={(e) =>
              handleChange("validation", {
                ...field.validation,
                required: e.target.checked,
              })
            }
          />
        }
        label="Required"
      />
      <Button onClick={() => dispatch(removeField(field.id))} color="error" variant="outlined">
        Delete
      </Button>
    </div>
  );
};

export default FieldEditor;
