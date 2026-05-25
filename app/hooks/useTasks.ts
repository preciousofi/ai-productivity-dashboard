import { supabase } from "@/lib/supabase";
import { Task } from "../types/task";

export async function fetchTasks(
  userId: string
): Promise<Task[]> {
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
      error.message
    );
    return [];
  }

  return data || [];
}