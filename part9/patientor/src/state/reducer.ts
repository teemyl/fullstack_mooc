import { State } from "./state";
import { Patient, Diagnosis } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "UPDATE_CURRENT_PATIENT";
      payload: Patient | undefined;
    }
  | {
      type: "SET_DIAGNOSES_LIST";
      payload: Diagnosis[];
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "UPDATE_CURRENT_PATIENT":
      return {
        ...state,
        patient: action.payload
      }
    case "SET_DIAGNOSES_LIST":
      return {
        ...state,
        diagnoses: action.payload
      }
    default:
      return state;
  }
};

export const setPatientList = (patientList: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patientList
  }
};

export const addPatient = (patient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: patient
  }
};

export const updateCurrentPatient = (patient: Patient): Action => {
  return {
    type: "UPDATE_CURRENT_PATIENT",
    payload: patient
  }
}

export const setDiagnosesList = (diagnosesList: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSES_LIST",
    payload: diagnosesList
  }
}