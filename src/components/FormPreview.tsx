import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { validateField } from "../utils/validation";
import { TextField, Typography, Button } from "@mui/material";
import { evaluate } from "mathjs";

const FormPreview: React.FC = () => {
  const { currentForm } = useSelector((s: RootState) => s.form);
  const [values, setValues] = useState<{ [key: string]: any }>({});
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});

  const handleChange = (id: string, value: any) => {
    const newValues = { ...values, [id]: value };
    currentForm.fields.forEach(f => {
      if (f.isDerived && f.formula && f.parents) {
        try {
          const scope: any = {};
          f.parents.forEach(pid => scope[pid] = newValues[pid] || 0);
          newValues[f.id] = evaluate(f.formula, scope);
        } catch {}
      }
    });
    setValues(newValues);
  };

  const handleSubmit = () => {
    const newErrors: any = {};
    currentForm.fields.forEach(f => {
      const err = validateField(values[f.id], f.validation);
      if (err) newErrors[f.id] = err;
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      alert("Form submitted successfully!");
    }
  };

  return (
    <div className="form-container">
      <Typography variant="h5">{currentForm.name || "Preview"}</Typography>
      {currentForm.fields.map(f => (
        <div key={f.id} style={{ marginTop: 10 }}>
          <TextField
            label={f.label}
            value={values[f.id] || ""}
            onChange={(e) => handleChange(f.id, e.target.value)}
            error={!!errors[f.id]}
            helperText={errors[f.id] || ""}
            fullWidth
          />
        </div>
      ))}
      <Button variant="contained" color="primary" style={{ marginTop: 20 }} onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default FormPreview;
