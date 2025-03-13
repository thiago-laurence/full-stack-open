import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import patientService from "../services/patients";
import diagnosisService from "../services/diagnosis";
import { Patient, Diagnosis, NewHealthCheckEntry, HealthCheckRating } from "../types";
import EntryDetails from "./EntryDetails/EntryDetails";
import MultipleSelectChip from "./MultipleSelect";

const PatientProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>();
  const [error, setError] = useState<string | null>(null);
  const [diagnosis, setDiagnosis] = useState<Diagnosis[] | null>();
  const minValue = Math.min(...Object.values(HealthCheckRating).filter(v => typeof v === "number") as number[]);
  const maxValue = Math.max(...Object.values(HealthCheckRating).filter(v => typeof v === "number") as number[]);
  const [newEntry, setNewEntry] = useState<NewHealthCheckEntry>({
    date: "",
    specialist: "",
    description: "",
    diagnosisCodes: [],
    type: "HealthCheck",
    healthCheckRating: 0
  });

  const handleError = (e: unknown) => {
    if (axios.isAxiosError(e)) {
      if (e?.response?.data && typeof e?.response?.data === "string") {
        const message = `Error: ${e.response.status} - ${e.response.data}`;
        console.error(message);
        setError(message);
      } else {
        setError("Unrecognized axios error");
      }
    } else {
      console.error("Unknown error", e);
      setError("Unknown error");
    }
  };

  useEffect(() => {
    if (!id) return;

    const fetchPatient = async () => {
      const patient = await patientService.getPatient(id);
      setPatient(patient);
    };

    const fetchDiagnosis = async () => {
      const diagnosis = await diagnosisService.getAll();
      setDiagnosis(diagnosis);
    };

    void fetchPatient()
      .catch((e: unknown) => handleError(e));
    
    void fetchDiagnosis()
      .catch((e: unknown) => handleError(e));
  }, [id]);

  if (!patient || !diagnosis) return <p>{ error }</p>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const addedEntry = await patientService.addEntry(id!, newEntry);
      setPatient({ ...patient, entries: patient.entries?.concat(addedEntry) });
      setNewEntry({
        date: "",
        specialist: "",
        description: "",
        diagnosisCodes: [],
        type: "HealthCheck",
        healthCheckRating: 0
      });
    } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data);
      } else {
          console.error(error);
      }
    }
  };

  const handleChangeMultipleSelect = (value: string[]) => {
    setNewEntry({ ...newEntry, diagnosisCodes: value });
  };

  return (
    <div>
      <h1>Patient Profile</h1>
        <div>
          <h2>
            { patient.name }
            { 
              patient.gender === "male" ? <MaleIcon /> :
              patient.gender === "female" ? <FemaleIcon /> : <QuestionMarkIcon />
            }
          </h2> 
          <p>
            <strong>SSN:</strong> {patient.ssn}</p>
          <p>
            <strong>Occupation:</strong> {patient.occupation}</p>
          <p>
            <strong>Entries:</strong>
          </p>
            <p>Add new HealthCheck entry</p>
            { error && <p style={{ color: "red" }}>{ error }</p> }
            <form onSubmit={handleSubmit}>
              <div>
                <label>Date</label>
                <input
                  type="date"
                  value={newEntry.date}
                  onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                  required
                />
              </div>
              <div>
                <label>Description</label>
                <input
                  type="text"
                  value={newEntry.description}
                  onChange={(e) => setNewEntry({ ...newEntry, description: e.target.value })}
                  required
                />
              </div>
              <div>
                <label>Specialist</label>
                <input
                  type="text"
                  value={newEntry.specialist}
                  onChange={(e) => setNewEntry({ ...newEntry, specialist: e.target.value })}
                  required
                />
              </div>
              <div>
                <label>Health Check Rating</label>
                <input
                  type="number"
                  min={minValue}
                  max={maxValue}
                  value={newEntry.healthCheckRating}
                  onChange={(e) => setNewEntry({ ...newEntry, healthCheckRating: Number(e.target.value) })}
                  required
                />
              </div>
              <div>
                <label>Diagnosis Codes</label>
                <MultipleSelectChip items={diagnosis!.map(d => d.code)} handleAction={handleChangeMultipleSelect} selectedItems={newEntry.diagnosisCodes!} />
              </div>
              <button type="submit">Add Entry</button>
            </form>

          {patient.entries?.map((entry, i) => (
            <div style={{ border: "1px solid black", padding: "10px", marginBottom: '10px', borderRadius: "5px" }} key={i}>
              <EntryDetails entry={entry} />
            </div>
          ))}
        </div>
    </div>
  );
};

export default PatientProfile;