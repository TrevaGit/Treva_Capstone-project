import React, { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  // Load tasks from localStorage when app starts
  useEffect(() => {
    try {
      const storedTasks = JSON.parse(localStorage.getItem("tasks"));
      if (storedTasks && Array.isArray(storedTasks)) {
        setTasks(storedTasks);
      }
    } catch (error) {
      console.error("Failed to load tasks from localStorage:", error);
    }
  }, []);

  // Save tasks to localStorage whenever tasks state changes
  useEffect(() => {
    try {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (error) {
      console.error("Failed to save tasks to localStorage:", error);
    }
  }, [tasks]);

  // Add a new task
  const handleAddTask = () => {
    if (input.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: input.trim(),
      completed: false, // important for Mark Complete
    };

    setTasks([...tasks, newTask]);
    setInput("");
  };

  // Delete a task
  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle completed status
  const handleToggle = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Start editing a task
  const handleEdit = (task) => {
    setEditingId(task.id);
    setEditText(task.text);
  };

  // Save edited task
  const handleSave = (id) => {
    if (editText.trim() === "") return;

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: editText.trim() } : task
      )
    );
    setEditingId(null);
    setEditText("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">To-Do List</h1>

      {/* Add Task */}
      <div className="flex gap-2 mb-6 w-full max-w-md">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a task"
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {/* Task List */}
      <div className="w-full max-w-md space-y-3">
        {tasks.length === 0 && (
          <p className="text-gray-500 text-center">No tasks yet</p>
        )}

        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white p-3 rounded shadow flex items-center justify-between"
          >
            {editingId === task.id ? (
              <div className="flex gap-2 w-full">
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="flex-1 p-1 border rounded"
                />
                <button
                  onClick={() => handleSave(task.id)}
                  className="bg-green-500 text-white px-2 rounded"
                >
                  Save
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  {/* Mark Complete Checkbox */}
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggle(task.id)}
                  />
                  <span
                    className={
                      task.completed ? "line-through text-gray-500" : ""
                    }
                  >
                    {task.text}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(task)}
                    className="bg-yellow-400 text-white px-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="bg-red-500 text-white px-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;