"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

import Header from "./components/Header";
import StatsCards from "./components/StatsCards";
import AddTask from "./components/AddTask";
import TaskCard from "./components/TaskCard";

type Task = {
  id: string;
  title: string;
  completed: boolean;
  priority: string;
  user_id: string;
  created_at: string;
};

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [taskInput, setTaskInput] =
    useState("");

  const [priority, setPriority] =
    useState("Medium");

  const [tasks, setTasks] =
    useState<Task[]>([]);

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState("All");

  // AUTH
  useEffect(() => {
    getUser();

    const {
      data: { subscription },
    } =
      supabase.auth.onAuthStateChange(
        (
          _event,
          session
        ) => {
          const currentUser =
            session?.user ??
            null;

          setUser(
            currentUser
          );

          if (
            currentUser
          ) {
            fetchTasks(
              currentUser.id
            );
          } else {
            setTasks([]);
          }
        }
      );

    return () =>
      subscription.unsubscribe();
  }, []);

  async function getUser() {
    const {
      data: { user },
    } =
      await supabase.auth.getUser();

    setUser(user);

    if (user) {
      await fetchTasks(
        user.id
      );
    }

    setLoading(false);
  }

  // FETCH
  async function fetchTasks(
    userId: string
  ) {
    const {
      data,
      error,
    } = await supabase
      .from("tasks")
      .select("*")
      .eq(
        "user_id",
        userId
      )
      .order(
        "created_at",
        {
          ascending:
            false,
        }
      );

    if (error) {
      console.log(
        error
      );
      return;
    }

    setTasks(
      data || []
    );
  }

  // SIGNUP
  async function signUp() {
    const { error } =
      await supabase.auth.signUp(
        {
          email,
          password,
        }
      );

    if (error) {
      alert(
        error.message
      );
    }
  }

  // LOGIN
  async function signIn() {
    const { error } =
      await supabase.auth.signInWithPassword(
        {
          email,
          password,
        }
      );

    if (error) {
      alert(
        error.message
      );
    }
  }

  // LOGOUT
  async function logout() {
    await supabase.auth.signOut();
  }

  // ADD TASK
  async function addTask() {
    if (
      !taskInput.trim() ||
      !user
    )
      return;

    const {
      data,
      error,
    } = await supabase
      .from("tasks")
      .insert({
        title:
          taskInput,
        completed:
          false,
        priority,
        user_id:
          user.id,
      })
      .select();

    if (error) {
      alert(
        error.message
      );
      return;
    }

    setTaskInput("");

    if (data) {
      setTasks([
        ...data,
        ...tasks,
      ]);
    }
  }

  // TOGGLE
  async function toggleTask(
    task: Task
  ) {
    await supabase
      .from("tasks")
      .update({
        completed:
          !task.completed,
      })
      .eq(
        "id",
        task.id
      );

    fetchTasks(
      user.id
    );
  }

  // DELETE
  async function deleteTask(
    id: string
  ) {
    await supabase
      .from("tasks")
      .delete()
      .eq("id", id);

    fetchTasks(
      user.id
    );
  }

  // EDIT
  async function editTask(
    task: Task
  ) {
    const newTitle =
      prompt(
        "Edit task",
        task.title
      );

    if (
      !newTitle
    )
      return;

    await supabase
      .from("tasks")
      .update({
        title:
          newTitle,
      })
      .eq(
        "id",
        task.id
      );

    fetchTasks(
      user.id
    );
  }

  // SEARCH + FILTER
  const filteredTasks =
    useMemo(() => {
      return tasks.filter(
        (task) => {
          const matchesSearch =
            task.title
              .toLowerCase()
              .includes(
                search.toLowerCase()
              );

          if (
            filter ===
            "Completed"
          ) {
            return (
              matchesSearch &&
              task.completed
            );
          }

          if (
            filter ===
            "Pending"
          ) {
            return (
              matchesSearch &&
              !task.completed
            );
          }

          return (
            matchesSearch
          );
        }
      );
    }, [
      tasks,
      search,
      filter,
    ]);

  const completed =
    tasks.filter(
      (t) =>
        t.completed
    ).length;

  const pending =
    tasks.length -
    completed;

  // LOADING
  if (loading) {
    return (
      <main
        style={{
          minHeight:
            "100vh",
          display:
            "flex",
          justifyContent:
            "center",
          alignItems:
            "center",
          background:
            "#020617",
          color:
            "white",
        }}
      >
        Loading...
      </main>
    );
  }

  // LOGIN SCREEN
  if (!user) {
    return (
      <main
        style={{
          minHeight:
            "100vh",
          display:
            "flex",
          justifyContent:
            "center",
          alignItems:
            "center",
          background:
            "#020617",
        }}
      >
        <div
          style={{
            background:
              "white",
            padding:
              "30px",
            borderRadius:
              "20px",
            width:
              "350px",
            display:
              "flex",
            flexDirection:
              "column",
            gap:
              "12px",
          }}
        >
          <h1
            style={{
              color:
                "black",
            }}
          >
            AI Task Manager
          </h1>

          <input
            placeholder="Email"
            value={email}
            onChange={(
              e
            ) =>
              setEmail(
                e.target
                  .value
              )
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={
              password
            }
            onChange={(
              e
            ) =>
              setPassword(
                e.target
                  .value
              )
            }
          />

          <button
            onClick={
              signUp
            }
          >
            Sign Up
          </button>

          <button
            onClick={
              signIn
            }
          >
            Login
          </button>
        </div>
      </main>
    );
  }

  // DASHBOARD
  return (
    <main
      style={{
        minHeight:
          "100vh",
        background:
          "#020617",
        color:
          "white",
        padding:
          "40px",
      }}
    >
      <Header
        email={
          user.email
        }
        logout={
          logout
        }
      />

      <StatsCards
        total={
          tasks.length
        }
        completed={
          completed
        }
        pending={
          pending
        }
      />

      <div
        style={{
          display:
            "flex",
          gap: "10px",
          flexWrap:
            "wrap",
          marginBottom:
            "20px",
        }}
      >
        <input
          placeholder="Search..."
          value={search}
          onChange={(
            e
          ) =>
            setSearch(
              e.target
                .value
            )
          }
        />

        <select
          value={filter}
          onChange={(
            e
          ) =>
            setFilter(
              e.target
                .value
            )
          }
        >
          <option>
            All
          </option>
          <option>
            Completed
          </option>
          <option>
            Pending
          </option>
        </select>
      </div>

      <AddTask
        taskInput={
          taskInput
        }
        setTaskInput={
          setTaskInput
        }
        priority={
          priority
        }
        setPriority={
          setPriority
        }
        addTask={
          addTask
        }
      />

      <div
        style={{
          display:
            "grid",
          gap: "15px",
        }}
      >
        {filteredTasks.length ===
        0 ? (
          <div
            style={{
              background:
                "#0f172a",
              padding:
                "30px",
              borderRadius:
                "16px",
              textAlign:
                "center",
            }}
          >
            No tasks yet 🚀
          </div>
        ) : (
          filteredTasks.map(
            (
              task
            ) => (
              <TaskCard
                key={
                  task.id
                }
                task={
                  task
                }
                toggleTask={
                  toggleTask
                }
                deleteTask={
                  deleteTask
                }
                editTask={
                  editTask
                }
              />
            )
          )
        )}
      </div>
    </main>
  );
}