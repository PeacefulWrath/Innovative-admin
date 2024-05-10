import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FileUploadTempEditor from "./components/fileUploadTempEditor/fileUploadTempEditor";
import Dashboard from "./components/dashboard/dashboard";
import ViewFileTemplate from "./components/viewFileTemplate/viewFileTemplate";
import PdfDetails from "./components/viewFileTemplate/pdfDetails";
import McqTemplateEditor from "./components/mcqTemplateEditor/mcqTemplateEditor";
import ViewMcqTemplate from "./components/viewMcqTemplate/viewMcqTemplate";
import InvoiceManagement from "./components/invoiceManagement/invoiceManagement";
import UserManagement from "./components/userManagement/userManagement";
import PurchaseOrderManagement from "./components/purchaseOrderManagement/purchaseOrderManagement";
import QuizTemplateEditor from "./components/quizTemplateEditor/quizTemplateEditor";
import ViewQuizTemplate from "./components/viewQuizTemplate/viewQuizTemplate"

function App() {
  return (
    <Router>
    <Routes>
    <Route exact path="/" element={<Dashboard />} />
      <Route exact path="/dashboard" element={<Dashboard />} />
      <Route exact path="/file-upload-temp-editor" element={< FileUploadTempEditor/>} />
      <Route exact path="/mcq-temp-editor" element={< McqTemplateEditor/>} />
      <Route exact path="/quiz-temp-editor" element={<QuizTemplateEditor />} />
      <Route exact path="/user-management" element={< UserManagement/>} />
      <Route exact path="/invoice-management" element={< InvoiceManagement/>} />
      <Route exact path="/purchase-order-management" element={< PurchaseOrderManagement/>} />
      <Route exact path="/view-file-template" element={<ViewFileTemplate />} />
      <Route exact path="/view-mcq-template" element={<ViewMcqTemplate />} />
      <Route exact path="/view-quiz-template" element={<ViewQuizTemplate />} />
      <Route path="/pdfDetails" element={<PdfDetails />} />
    </Routes>
  </Router>
  );
}

export default App;
