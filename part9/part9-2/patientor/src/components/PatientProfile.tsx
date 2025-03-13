import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import patientService from "../services/patients";
import { Patient } from "../types";

const PatientProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>();
  useEffect(() => {
    if (!id) return;

    const fetchPatient = async () => {
      const patient = await patientService.getPatient(id);
      setPatient(patient);
    };
    void fetchPatient();
  }
  , [id]);

  return (
    <div>
      <h1>Patient Profile</h1>
      {patient ? (
        <div>
          <h2>
            {patient.name}
            {patient.gender === "male" ? <MaleIcon /> :
            patient.gender === "female" ? <FemaleIcon /> : <QuestionMarkIcon />}
          </h2> 
          <p><strong>SSN:</strong> {patient.ssn}</p>
          <p><strong>Occupation:</strong> {patient.occupation}</p>
        </div>
      ) : (
        <p>Loading patient data...</p>
      )}
    </div>
  );
};

export default PatientProfile;