declare const getTask: (req: any, res: any) => Promise<void>;
declare const addEditTask: (req: any, res: any) => Promise<void>;
declare const deleteTask: (req: any, res: any) => Promise<void>;
export { getTask, addEditTask, deleteTask };
