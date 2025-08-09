import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { loadFormToCurrent } from "../redux/formSlice";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const MyFormsList: React.FC = () => {
  const { savedForms } = useSelector((s: RootState) => s.form);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="form-container">
      <Typography variant="h5">My Forms</Typography>
      {savedForms.map(form => (
        <div key={form.id} style={{ marginBottom: 15, border: "1px solid #ccc", padding: 15, borderRadius: 8, backgroundColor: "#fafafa" }}>
          <strong>{form.name}</strong> ({new Date(form.createdAt).toLocaleString()})
          <br />
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              dispatch(loadFormToCurrent(form));
              navigate("/preview");
            }}
            style={{ marginTop: 10 }}
          >
            Preview
          </Button>
        </div>
      ))}
    </div>
  );
};

export default MyFormsList;
