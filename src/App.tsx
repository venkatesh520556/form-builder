import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import FormBuilder from "./components/FormBuilder";
import FormPreview from "./components/FormPreview";
import MyFormsList from "./components/MyFormsList";
import { AppBar, Toolbar, Button } from "@mui/material";
import "./App.css"; // Import styles for background and container


const App: React.FC = () => {
  return (
    <>
      <div className="app-overlay" />
      <Router>
        <AppBar position="static" color="transparent" style={{ backdropFilter: "blur(10px)" }}>
          <Toolbar>
            <Button color="inherit" component={Link} to="/create">Create</Button>
            <Button color="inherit" component={Link} to="/preview">Preview</Button>
            <Button color="inherit" component={Link} to="/myforms">My Forms</Button>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/create" element={<FormBuilder />} />
          <Route path="/preview" element={<FormPreview />} />
          <Route path="/myforms" element={<MyFormsList />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
