type AddTaskProps = {
  taskInput: string;
  setTaskInput: (
    value: string
  ) => void;
  addTask: () => void;
  handleKeyDown: (
    e: React.KeyboardEvent
  ) => void;
};

export default function AddTask({
  taskInput,
  setTaskInput,
  addTask,
  handleKeyDown,
}: AddTaskProps) {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        marginBottom: "30px",
        flexWrap: "wrap",
      }}
    >
      <input
        value={taskInput}
        onChange={(e) =>
          setTaskInput(e.target.value)
        }
        onKeyDown={handleKeyDown}
        placeholder="Enter a task..."
        style={{
          flex: 1,
          minWidth: "250px",
          padding: "14px",
          borderRadius: "10px",
          border: "1px solid #334155",
          background: "#0f172a",
          color: "white",
          fontSize: "16px",
        }}
      />

      <button
        onClick={addTask}
        style={{
          padding: "14px 22px",
          background: "#2563eb",
          border: "none",
          borderRadius: "10px",
          color: "white",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Add Task
      </button>
    </div>
  );
}