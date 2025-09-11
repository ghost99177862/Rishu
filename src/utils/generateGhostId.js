import { supabase } from "../supabase.js";

export const generateGhostId = async () => {
  const { count, error } = await supabase
    .from("users")
    .select("*", { count: "exact", head: true });

  if (error) throw new Error(error.message);

  // GhostID = Ghost + next number
  return `Ghost${count + 1}`;
};
