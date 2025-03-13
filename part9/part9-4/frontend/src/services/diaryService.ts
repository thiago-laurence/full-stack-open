import axios from 'axios';
import { DiaryEntry, NewDiaryEntry } from '../types';

const baseUrl = 'http://localhost:3000/api/diaries';

export const getAllEntrys = async () => {
  const response = await axios.get<DiaryEntry[]>(baseUrl + '/sensitive');
  return response.data;
}

export const addEntry = async (entry: NewDiaryEntry) => {
  const response = await axios.post<DiaryEntry>(baseUrl, entry);
  return response.data;
}