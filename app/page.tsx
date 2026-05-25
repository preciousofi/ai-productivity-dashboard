"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { supabase } from "@/lib/supabase";
import { fetchTasks } from "./hooks/useTasks";
import { Task } from "./types/task";

import Header from "./components/Header";
import StatsCards from "./components/StatsCards";
import AddTask from "./components/AddTask";
import TaskCard from "./components/TaskCard";

export default function Home() {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [user, setUser] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

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

  useEffect(() => {
    getUser();

    const {
      data: { subscription },
    } =
      supabase.auth.onAuthStateChange(
        (
          _,
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
            loadTasks(
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
      await loadTasks(
        user.id
      );
    }

    setLoading(false);
  }

  async function loadTasks(
    userId: string
  ) {
    const data =
      await fetchTasks(
        userId
      );

    setTasks(data);
  }

  async function signUp() {
    const { error } =
      await supabase.auth.signUp(
        {
          email,
          password,
        }
      );

    if (error)
      alert(
        error.message
      );
  }

  async function signIn() {
    const { error } =
      await supabase.auth.signInWithPassword(
        {
          email,
          password,
        }
      );

    if (error)
      alert(
        error.message
      );
  }

  async function logout() {
    await supabase.auth.signOut();
  }

  async function addTask() {
    if (
      !taskInput.trim() ||
      !user
    )
      return;

    await supabase
      .from("tasks")
      .insert({
        title:
          taskInput,
        completed:
          false,
        priority,
        user_id:
          user.id,
      });

    setTaskInput("");

    await loadTasks(
      user.id
    );
  }

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

    await loadTasks(
      user.id
    );
  }

  async function deleteTask(
    id: string
  ) {
    await supabase
      .from("tasks")
      .delete()
      .eq("id", id);

    await loadTasks(
      user.id
    );
  }

  async function editTask(
    task: Task
  ) {
    const title =
      prompt(
        "Edit task",
        task.title
      );

    if (!title)
      return;

    await supabase
      .from("tasks")
      .update({
        title,
      })
      .eq(
        "id",
        task.id
      );

    await loadTasks(
      user.id
    );
  }

  const filteredTasks =
    useMemo(() => {
      return tasks.filter(
        (task) => {
          const searchMatch =
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
              searchMatch &&
              task.completed
            );
          }

          if (
            filter ===
            "Pending"
          ) {
            return (
              searchMatch &&
              !task.completed
            );
          }

          return (
            searchMatch
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

  if (loading)
    return (
      <main>
        Loading...
      </main>
    );

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
            display:
              "flex",
            flexDirection:
              "column",
            gap: "12px",
            width:
              "350px",
          }}
        >
          <h1
            style={{
              color:
                "black",
            }}
          >
            AI Dashboard
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
          <option>All</option>
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
        {filteredTasks.map(
          (task) => (
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
        )}
      </div>
    </main>
  );
}