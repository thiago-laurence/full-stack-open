import diagnosesData from '../../data/diagnosis';
import { Diagnosis } from '../types';

const getDiagnoses = (): Diagnosis[] => {
    return diagnosesData;
}

export default {
    getDiagnoses
};