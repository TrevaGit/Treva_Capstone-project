import React, { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  // Load tasks from localStorage
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

  // Save tasks to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (error) {
      console.error("Failed to save tasks to localStorage:", error);
    }
  }, [tasks]);

  const handleAddTask = () => {
    if (input.trim() === "") return;
    const newTask = { id: Date.now(), text: input.trim(), completed: false };
    setTasks([...tasks, newTask]);
    setInput("");
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleToggle = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleEdit = (task) => {
    setEditingId(task.id);
    setEditText(task.text);
  };

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
    <div className="min-h-screen bg-purple-600 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold mb-6 text-purple-100 drop-shadow-lg">
        To-Do List
      </h1>

      {/* Add Task */}
      <div className="flex gap-2 mb-6 w-full max-w-md">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a task"
          className="flex-1 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-300 transition"
        />
        <button
          onClick={handleAddTask}
          className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white px-4 py-2 rounded shadow transition-transform hover:scale-105"
        >
          Add
        </button>
      </div>

      {/* Task List */}
      <div className="w-full max-w-md space-y-3">
        {tasks.length === 0 && (
          <p className="text-gray-100 text-center">No tasks yet</p>
        )}

        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg flex items-center justify-between transition-transform hover:scale-105"
          >
            {editingId === task.id ? (
              <div className="flex gap-2 w-full">
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="flex-1 p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-300 transition"
                />
                <button
                  onClick={() => handleSave(task.id)}
                  className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white px-3 rounded shadow transition-transform hover:scale-105"
                >
                  Save
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggle(task.id)}
                    className="w-5 h-5 accent-purple-500"
                  />
                  <span
                    className={
                      task.completed
                        ? "line-through text-gray-400"
                        : "text-gray-800"
                    }
                  >
                    {task.text}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(task)}
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white px-3 py-1 rounded shadow transition-transform hover:scale-105"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white px-3 py-1 rounded shadow transition-transform hover:scale-105"
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