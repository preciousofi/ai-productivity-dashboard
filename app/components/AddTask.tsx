type Props = {
  taskInput: string;
  setTaskInput: (
    value: string
  ) => void;
  priority: string;
  setPriority: (
    value: string
  ) => void;
  addTask: () => void;
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
        gap: "10px",
        flexWrap:
          "wrap",
        marginBottom:
          "25px",
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
        placeholder="Add task..."
        style={{
          flex: 1,
          padding:
            "14px",
          borderRadius:
            "10px",
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
            "10px",
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
            "14px 18px",
          borderRadius:
            "10px",
        }}
      >
        Add
      </button>
    </div>
  );
}