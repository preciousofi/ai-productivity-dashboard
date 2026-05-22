"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import AddTask from "./components/AddTask";
import Header from "./components/Header";
import StatsCards from "./components/StatsCards";
import TaskCard from "./components/TaskCard";

export type Task = {
  id: number;
  text: string;
  completed: boolean;
  priority: "High" | "Medium" | "Low";
};

export default function Home() {
  const [taskInput, setTaskInput] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState("All");

  const [tasks, setTasks] = useState<
    Task[]
  >([]);

  // Load tasks
  useEffect(() => {
    const savedTasks =
      localStorage.getItem("tasks");

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks
  useEffect(() => {
    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks)
    );
  }, [tasks]);

  // Add task
  const addTask = () => {
    if (!taskInput.trim()) return;

    const priorities = [
      "High",
      "Medium",
      "Low",
    ] as const;

    const randomPriority =
      priorities[
        Math.floor(
          Math.random() *
            priorities.length
        )
      ];

    const newTask: Task = {
      id: Date.now(),
      text: taskInput,
      completed: false,
      priority: randomPriority,
    };

    setTasks([newTask, ...tasks]);

    setTaskInput("");
  };

  // Enter key support
  const handleKeyDown = (
    e: React.KeyboardEvent
  ) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  // Toggle
  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed:
                !task.completed,
            }
          : task
      )
    );
  };

  // Delete
  const deleteTask = (id: number) => {
    setTasks(
      tasks.filter(
        (task) => task.id !== id
      )
    );
  };

  // Filter logic
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.text
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      if (filter === "Completed") {
        return (
          matchesSearch &&
          task.completed
        );
      }

      if (filter === "Pending") {
        return (
          matchesSearch &&
          !task.completed
        );
      }

      return matchesSearch;
    });
  }, [tasks, search, filter]);

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "white",
        padding: "30px",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <Header />

        <StatsCards
          total={tasks.length}
          completed={completedTasks}
          pending={
            tasks.length -
            completedTasks
          }
        />

        {/* Search */}
        <div
          style={{
            display: "flex",
            gap: "15px",
            marginBottom: "20px",
            flexWrap: "wrap",
          }}
        >
          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search tasks..."
            style={{
              flex: 1,
              minWidth: "250px",
              padding: "14px",
              borderRadius: "10px",
              border: "1px solid #334155",
              background: "#0f172a",
              color: "white",
            }}
          />

          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value)
            }
            style={{
              padding: "14px",
              borderRadius: "10px",
              background: "#0f172a",
              color: "white",
              border: "1px solid #334155",
            }}
          >
            <option>All</option>
            <option>Completed</option>
            <option>Pending</option>
          </select>
        </div>

        <AddTask
          taskInput={taskInput}
          setTaskInput={setTaskInput}
          addTask={addTask}
          handleKeyDown={handleKeyDown}
        />

        {/* Empty state */}
        {filteredTasks.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              marginTop: "60px",
              color: "#94a3b8",
            }}
          >
            <h2>No tasks found.</h2>

            <p>
              Add a new task to get
              started.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gap: "15px",
            }}
          >
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                toggleTask={toggleTask}
                deleteTask={deleteTask}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}