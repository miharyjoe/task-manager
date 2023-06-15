import create, { State } from "zustand";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface TaskManagerState extends State {
  tasks: Task[];
  searchTask: string;
  addTask: (newTask: Task) => void;
  updateTask: (taskId: number, updatedTask: Partial<Task>) => void;
  deleteTask: (taskId: number) => void;
  setSearchTask: (searchValue: string) => void;
}

const useTaskManager = create<TaskManagerState>((set) => ({
  tasks: [],
  searchTask: "",
  addTask: (newTask: Task) =>
    set((state) => ({
      tasks: [...state.tasks, newTask],
    })),
  updateTask: (taskId: number, updatedTask: Partial<Task>) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedTask } : task
      ),
    })),
  deleteTask: (taskId: number) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    })),
  setSearchTask: (searchValue: string) =>
    set(() => ({
      searchTask: searchValue,
    })),
}));

export { useTaskManager };
