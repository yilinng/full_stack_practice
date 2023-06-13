import axios from "axios";
import { Patient, PatientFormValues, NewEntry, Entry } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const updateEntry = async (id: string, object: NewEntry) => {
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${id}/entries`,
    object
  );

  return data;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll, create, updateEntry
};

