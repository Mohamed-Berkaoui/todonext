"use client";

import { useState } from "react";

export default function AddTask({ onTaskAdded }) {
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("Work");

  const handleAddTask = async (e) => {
    e.preventDefault();

    if (!task.trim() || !date || !type) return;

    const newTask = {
      task,
      status: "pending",
      date,
      type,
    };

    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (res.ok) {
        const data = await res.json();
        onTaskAdded(data);
        setTask("");
        setDate("");
        setType("Work");
      } else {
        console.error("Failed to add task");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <form className="add-task-form" onSubmit={handleAddTask}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Task"
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <select value={type} onChange={(e) => setType(e.target.value)} required>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Other">Other</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
}
