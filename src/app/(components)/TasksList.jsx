"use client";

import { useEffect, useState } from "react";
import Task from "./Task";

export default function TasksList() {
  const [tasks, setTasks] = useState([
    {
      _id: "1",
      task: "Complete project documentation",
      status: "pending",
      userId: "5f1e7a1b2c3d4e5f67890123",
      Date: "2025-03-31T00:00:00.000Z",
      type: "Work"
    },
    {
      _id: "2",
      task: "Buy groceries",
      status: "pending",
      userId: "5f1e7a1b2c3d4e5f67890124",
      Date: "2025-03-30T00:00:00.000Z",
      type: "Personal"
    },
    {
      _id: "3",
      task: "Go for a run",
      status: "pending",
      userId: "5f1e7a1b2c3d4e5f67890125",
      Date: "2025-04-01T00:00:00.000Z",
      type: "Health"
    }
  ]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [titleFilter, setTitleFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("/api/tasks");
        if (res.ok) {
          const data = await res.json();
          setTasks(data);
        } else {
          console.error("Failed to fetch tasks");
        }
      } catch (err) {
        console.error("Error:", err);
      }
    };

    fetchTasks();
  }, []);

  const handleUpdateStatus = (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task._id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const handleDelete = (taskId) => {
    setTasks((prev) => prev.filter((task) => task._id !== taskId));
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      statusFilter === "all" ? true : task.status === statusFilter;
    const matchesTitle =
      titleFilter.trim() === ""
        ? true
        : task.task.toLowerCase().includes(titleFilter.toLowerCase());
    const matchesType =
      typeFilter === "all" ? true : task.type === typeFilter;
    return matchesStatus && matchesTitle && matchesType;
  });

  return (
    <div className="tasks-list-container">
      {/* Filters */}
      <div className="task-filters">
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="done">Done</option>
        </select>

        <input
          type="text"
          placeholder="Search by title..."
          value={titleFilter}
          onChange={(e) => setTitleFilter(e.target.value)}
        />

        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="all">All Types</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Health">Health</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Task List */}
      <div className="tasks-list">
        {filteredTasks.map((task) => (
          <Task
            key={task._id}
            task={task}
            onUpdateStatus={handleUpdateStatus}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
