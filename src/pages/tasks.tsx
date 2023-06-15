import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useTaskManager } from "@/store/useTaskManager";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const TaskManager = (): JSX.Element => {
  const createTaskRef = useRef<HTMLInputElement>(null);
  const {
    tasks: tasksFromLocalStorage,
    searchTask,
    addTask,
    updateTask,
    deleteTask,
    setSearchTask,
  } = useTaskManager();
  const [tasks, setTasks] = useLocalStorage<Task[]>(
    "tasks",
    tasksFromLocalStorage || []
  );

  const handleAddTask = () => {
    const title = createTaskRef.current?.value || "";
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
    };

    addTask(newTask);
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleUpdateTask = (taskId: number, updatedTask: Task) => {
    updateTask(taskId, updatedTask);
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedTask } : task
      )
    );
  };

  const handleDeleteTask = (taskId: number) => {
    deleteTask(taskId);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTask(e.target.value);
  };

  // See! I already give you everything!
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTask.toLowerCase())
  );

  return (
    <div>
      <h1>Task Manager</h1>

      <input type="text" ref={createTaskRef} />

      <button onClick={handleAddTask}>Add Task</button>

      <input type="text" onChange={handleSearch} placeholder="Search Task" />

      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <input
              type="text"
              value={task.title}
              onChange={(e) =>
                handleUpdateTask(task.id, { ...task, title: e.target.value })
              }
            />
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
