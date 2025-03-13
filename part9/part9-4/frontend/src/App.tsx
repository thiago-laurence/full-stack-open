import { useState, useEffect } from 'react';
import { DiaryEntry } from './types';
import { getAllEntrys } from './services/diaryService';
import DiaryEntries from './components/DiaryEntries';
import DiaryForm from './components/DiaryForm';
import Notify from './components/Notify';

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  useEffect(() => {
    getAllEntrys().then((entries) => setDiaryEntries(entries));
  }, []);

  const [errorMessage, setErrorMessage] = useState('')
  const notify = (message: string) => {
    setErrorMessage(message)
    setTimeout(() => {
        setErrorMessage('')
    }, 5000)
  }

  return (
    <>
      <Notify errorMessage={errorMessage} />
      <DiaryForm setError={notify} />
      <DiaryEntries entries={diaryEntries} />
    </>
  )
}

export default App
