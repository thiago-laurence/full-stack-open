import { DiaryEntry } from "../types";

interface Props {
    entries: DiaryEntry[];
}

const DiaryEntries = ({ entries }: Props) => {
    return (
        <div>
            <h2>Diary Entries</h2>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Weather</th>
                        <th>Visibility</th>
                        <th>Comment</th>
                    </tr>
                </thead>
                <tbody>
                    {entries.map(entry => (
                        <tr key={entry.id}>
                            <td>{entry.date}</td>
                            <td>{entry.weather}</td>
                            <td>{entry.visibility}</td>
                            <td>{entry.comment}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DiaryEntries;