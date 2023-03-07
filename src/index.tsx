import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import PatientForm from './pages/patient-form';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <PatientForm />
  </React.StrictMode>
);
