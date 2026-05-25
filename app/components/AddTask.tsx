type Props = {
  taskInput: string;
  setTaskInput: (
    value: string
  ) => void;
  priority: string;
  setPriority: (
    value: string
  ) => void;
  addTask: () => Promise<void>;
};

export default function AddTask({
  taskInput,
  setTaskInput,
  priority,
  setPriority,
  addTask,
}: Props) {
  return (
    <div
      style={{
        display:
          "flex",
        flexWrap:
          "wrap",
        gap: "10px",
        marginBottom:
          "20px",
      }}
    >
      <input
        value={
          taskInput
        }
        onChange={(
          e
        ) =>
          setTaskInput(
            e.target
              .value
          )
        }
        placeholder="New task..."
        style={{
          flex: 1,
          padding:
            "14px",
          borderRadius:
            "12px",
          border:
            "none",
        }}
      />

      <select
        value={
          priority
        }
        onChange={(
          e
        ) =>
          setPriority(
            e.target
              .value
          )
        }
        style={{
          padding:
            "14px",
          borderRadius:
            "12px",
        }}
      >
        <option>
          High
        </option>
        <option>
          Medium
        </option>
        <option>
          Low
        </option>
      </select>

      <button
        onClick={
          addTask
        }
        style={{
          background:
            "#2563eb",
          color:
            "white",
          border:
            "none",
          padding:
            "14px 20px",
          borderRadius:
            "12px",
        }}
      >
        Add Task
      </button>
    </div>
  );
}