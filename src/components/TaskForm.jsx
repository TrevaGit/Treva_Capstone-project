import React, { useState } from "react";

const TaskForm = ({ addTask }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex mb-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a new task"
        className="flex-grow border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 rounded-r"
      >
        Add
      </button>
    </form>
  );
};

export default TaskForm;
