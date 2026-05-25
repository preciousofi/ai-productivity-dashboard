import { Task } from "../types/task";

type Props = {
  task: Task;
  toggleTask: (
    task: Task
  ) => Promise<void>;
  deleteTask: (
    id: string
  ) => Promise<void>;
  editTask: (
    task: Task
  ) => Promise<void>;
};

export default function TaskCard({
  task,
  toggleTask,
  deleteTask,
  editTask,
}: Props) {
  const color =
    task.priority ===
    "High"
      ? "#dc2626"
      : task.priority ===
        "Medium"
      ? "#eab308"
      : "#16a34a";

  return (
    <div
      style={{
        background:
          "#111827",
        padding:
          "20px",
        borderRadius:
          "18px",
        display:
          "flex",
        justifyContent:
          "space-between",
        alignItems:
          "center",
        flexWrap:
          "wrap",
        gap: "15px",
      }}
    >
      <div>
        <h3
          style={{
            marginBottom:
              "8px",
            textDecoration:
              task.completed
                ? "line-through"
                : "none",
          }}
        >
          {task.title}
        </h3>

        <span
          style={{
            background:
              color,
            padding:
              "5px 12px",
            borderRadius:
              "999px",
            fontSize:
              "12px",
          }}
        >
          {task.priority}
        </span>
      </div>

      <div
        style={{
          display:
            "flex",
          gap: "10px",
          flexWrap:
            "wrap",
        }}
      >
        <button
          onClick={() =>
            editTask(
              task
            )
          }
          style={{
            padding:
              "10px 14px",
            borderRadius:
              "10px",
          }}
        >
          Edit
        </button>

        <button
          onClick={() =>
            toggleTask(
              task
            )
          }
          style={{
            padding:
              "10px 14px",
            borderRadius:
              "10px",
          }}
        >
          Done
        </button>

        <button
          onClick={() =>
            deleteTask(
              task.id
            )
          }
          style={{
            background:
              "#dc2626",
            color:
              "white",
            border:
              "none",
            padding:
              "10px 14px",
            borderRadius:
              "10px",
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}