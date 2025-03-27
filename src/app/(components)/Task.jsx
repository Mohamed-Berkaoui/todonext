"use client";

export default function Task({ task, onUpdateStatus, onDelete }) {
  const handleStatusChange = async (newStatus) => {
    try {
      const res = await fetch(`/api/tasks/${task._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        onUpdateStatus(task._id, newStatus);
      } else {
        console.error("Failed to update task status");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/tasks/${task._id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        onDelete(task._id);
      } else {
        console.error("Failed to delete task");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className={`task-item ${task.status}`}>
      <div>
        <strong>{task.task}</strong>
        <p>{new Date(task.date).toLocaleDateString()}</p>
        <p>{task.type}</p>
      </div>
      <div className="task-actions">
        <select
          value={task.status}
          onChange={(e) => handleStatusChange(e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="done">Done</option>
        </select>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}
 