import { CoursePart } from "../types";
import Part from "./Part";

interface ContentProps {
    parts: CoursePart[];
}

const Content = ({ parts }: ContentProps) => {
    return (
        <div>
            {
                parts.map(p => 
                    <Part part={p} key={p.name} />
                )
            }
        </div>
    );
}

export default Content;