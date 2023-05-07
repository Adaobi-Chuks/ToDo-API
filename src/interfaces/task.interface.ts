interface ITask {
    id: number;
    title: string;
    isCompleted: boolean;
    UserId: number;
}

type ITaskOpt = Omit<ITask, 'id' | 'isCompleted'>;

export {
    ITask,
    ITaskOpt
};