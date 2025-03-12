import { CoursePart } from "../types";

interface PartProps {
    part: CoursePart;
}

const Part = ({ part }: PartProps) => {
    switch (part.kind) {
        case "basic":
            return (
                <div>
                    <p><strong>{part.name} {part.exerciseCount}</strong></p>
                    <p>{part.description}</p>
                </div>
            );
        case "group":
            return (
                <div>
                    <p><strong>{part.name} {part.exerciseCount}</strong></p>
                    <p>project exercises {part.groupProjectCount}</p>
                </div>
            );
        case "background":
            return (
                <div>
                    <p><strong>{part.name} {part.exerciseCount}</strong></p>
                    <p>{part.description}</p>
                    <p>required background: {part.backgroundMaterial}</p>
                </div>
            );
        case "special":
            return (
                <div>
                    <p><strong>{part.name} {part.exerciseCount}</strong></p>
                    <p>{part.description}</p>
                    <p>required skills: {part.requirements.join(", ")}</p>
                </div>
            );
        default:
            return null;
    }
};

export default Part;