import { useState } from 'react';
import axios from 'axios';
import { addEntry } from '../services/diaryService';
import { NewDiaryEntry, Weather, Visibility } from '../types';

type Props = {
    setError: (message: string) => void;
}

const DiaryForm = ({ setError }: Props) => {
    const [date, setDate] = useState('');
    const [weather, setWeather] = useState<Weather>(Weather.Sunny);
    const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
    const [comment, setComment] = useState('');

    const entryCreation = (e: React.FormEvent) => {
        e.preventDefault();
        const newEntry: NewDiaryEntry = {
            date,
            weather,
            visibility,
            comment,
        };
        addEntry(newEntry).then((savedEntry) => {
            console.log(savedEntry);
            setDate('');
            setWeather(Weather.Sunny);
            setVisibility(Visibility.Great);
            setComment('');
        }).catch((error) => {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data);
            } else {
                console.error(error);
            }
        });
    }

    return (
        <form onSubmit={entryCreation}>
            <h2>Add new entry</h2>
            <div>
                <label>Date</label>
                <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
            </div>
            <div>
                <label>Weather</label>
                <select value={weather} onChange={(event) => setWeather(event.target.value as Weather)}>
                    {Object.values(Weather).map(weather => (
                        <option key={weather} value={weather}>
                            {weather}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Visibility</label>
                <select value={visibility} onChange={(event) => setVisibility(event.target.value as Visibility)}>
                    {Object.values(Visibility).map(visibility => (
                        <option key={visibility} value={visibility}>
                            {visibility}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Comment</label>
                <textarea value={comment} onChange={(event) => setComment(event.target.value)}></textarea>
            </div>
            <button type="submit">Save</button>
        </form>
    );
}

export default DiaryForm;