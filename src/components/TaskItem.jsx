import React from "react";

const TaskItem = ({ task, toggleComplete, deleteTask }) => {
  return (
    <li className="flex items-center justify-between bg-white rounded shadow p-2">
      <span
        className={`flex-1 ${
          task.completed ? "line-through text-gray-400" : ""
        }`}
        onClick={() => toggleComplete(task.id)}
      >
        {task.name}
      </span>
      <button
        onClick={() => deleteTask(task.id)}
        className="text-red-500 hover:text-red-700 ml-2"
      >
        Delete
      </button>
    </li>
  );
};

export default TaskItem;
