import { Task } from "../page";

type TaskCardProps = {
  task: Task;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
};

export default function TaskCard({
  task,
  toggleTask,
  deleteTask,
}: TaskCardProps) {
  const priorityColor =
    task.priority === "High"
      ? "#dc2626"
      : task.priority === "Medium"
      ? "#ca8a04"
      : "#16a34a";

  return (
    <div
      style={{
        background: "#0f172a",
        padding: "20px",
        borderRadius: "16px",
        border: "1px solid #1e293b",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "15px",
      }}
    >
      <div>
        <h3
          style={{
            textDecoration: task.completed
              ? "line-through"
              : "none",
            marginBottom: "10px",
            fontSize: "18px",
          }}
        >
          {task.text}
        </h3>

        <span
          style={{
            background: priorityColor,
            padding: "5px 10px",
            borderRadius: "999px",
            fontSize: "12px",
          }}
        >
          {task.priority}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          gap: "10px",
        }}
      >
        <button
          onClick={() =>
            toggleTask(task.id)
          }
          style={{
            background: task.completed
              ? "#16a34a"
              : "#334155",
            border: "none",
            padding: "10px 14px",
            borderRadius: "8px",
            color: "white",
            cursor: "pointer",
          }}
        >
          {task.completed
            ? "Completed"
            : "Done"}
        </button>

        <button
          onClick={() =>
            deleteTask(task.id)
          }
          style={{
            background: "#dc2626",
            border: "none",
            padding: "10px 14px",
            borderRadius: "8px",
            color: "white",
            cursor: "pointer",
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}