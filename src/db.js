import { supabase } from './supabase.js'

// Insert a user
export async function addUser(id, email) {
  const { data, error } = await supabase
    .from('parvat') // 👈 your table name
    .insert([{ id, email }])

  if (error) {
    console.error("Insert error:", error)
    return null
  }
  return data
}

// Fetch users
export async function getUsers() {
  const { data, error } = await supabase
    .from('parvat')
    .select('*')

  if (error) {
    console.error("Fetch error:", error)
    return []
  }
  return data
}
