import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FileUploadTempEditor from "./components/fileUploadTempEditor/fileUploadTempEditor";
import Dashboard from "./components/dashboard/dashboard";
import View from "./components/view/view";

function App() {
  return (
    <Router>
    <Routes>
    <Route exact path="/" element={<Dashboard />} />
      <Route exact path="/dashboard" element={<Dashboard />} />
      <Route exact path="/file-upload-temp-editor" element={< FileUploadTempEditor/>} />
      <Route exact path="/view" element={<View />} />
    </Routes>
  </Router>
  );
}

export default App;
