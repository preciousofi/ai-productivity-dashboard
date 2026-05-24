type Task = {
  id: string;
  title: string;
  completed: boolean;
  priority: string;
};

type Props = {
  task: Task;
  toggleTask: (
    task: Task
  ) => void;
  deleteTask: (
    id: string
  ) => void;
  editTask: (
    task: Task
  ) => void;
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
          "#0f172a",
        padding:
          "20px",
        borderRadius:
          "16px",
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
            textDecoration:
              task.completed
                ? "line-through"
                : "none",
          }}
        >
          {
            task.title
          }
        </h3>

        <span
          style={{
            background:
              color,
            padding:
              "4px 10px",
            borderRadius:
              "999px",
            fontSize:
              "12px",
          }}
        >
          {
            task.priority
          }
        </span>
      </div>

      <div
        style={{
          display:
            "flex",
          gap: "10px",
        }}
      >
        <button
          onClick={() =>
            editTask(
              task
            )
          }
        >
          Edit
        </button>

        <button
          onClick={() =>
            toggleTask(
              task
            )
          }
        >
          Done
        </button>

        <button
          onClick={() =>
            deleteTask(
              task.id
            )
          }
        >
          Delete
        </button>
      </div>
    </div>
  );
}