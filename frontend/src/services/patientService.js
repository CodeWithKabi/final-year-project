import axios from "axios";

const API = "http://127.0.0.1:5000";


// =========================================
// GET ALL PATIENTS
// =========================================

export const getPatients = async () => {

  return await axios.get(`${API}/patients`);

};


// =========================================
// ADD PATIENT
// =========================================

export const addPatient = async (patientData) => {

  return await axios.post(
    `${API}/patients`,
    patientData
  );

};


// =========================================
// UPDATE PATIENT
// =========================================

export const updatePatient = async (id, patientData) => {

  return await axios.put(
    `${API}/patients/${id}`,
    patientData
  );

};


// =========================================
// DELETE PATIENT
// =========================================

export const deletePatient = async (id) => {

  return await axios.delete(
    `${API}/patients/${id}`
  );

};
