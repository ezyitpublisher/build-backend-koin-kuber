import { Model } from 'sequelize';
interface TaskAttributes {
    id: number;
    title: string;
    task: string;
    status: number;
}
declare class Task extends Model<TaskAttributes> implements TaskAttributes {
    id: number;
    title: string;
    task: string;
    status: number;
}
export default Task;
