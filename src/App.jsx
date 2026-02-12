import React, { useState } from "react";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const App = () => {
  // Main state for tasks
  const [tasks, setTasks] = useState([]);

  // Add a new task
  const addTask = (taskName) => {
    if (!taskName.trim()) return;
    const newTask = {
      id: Date.now(),
      name: taskName,
      completed: false,
    };
    setTasks([newTask, ...tasks]);
  };

  // Toggle task completion
  const toggleComplete = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete a task
  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="container mx-auto p-4 max-w-md">
        {/* Task Form */}
        <TaskForm addTask={addTask} />

        {/* Task List */}
        <TaskList
          tasks={tasks}
          toggleComplete={toggleComplete}
          deleteTask={deleteTask}
        />
      </div>
    </div>
  );
};

export default App;
