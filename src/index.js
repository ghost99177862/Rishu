// index.js
import { supabase } from './supabase.js'   // include .js extension

async function getUsers() {
  const { data, error } = await supabase
    .from('parvat')
    .select('*')

  if (error) {
    console.error("Fetch error:", error)
  } else {
    console.log("Users:", data)
  }
}

getUsers()



// import { supabase } from './supabase.js'

async function addUser(id, email) {
  const { data, error } = await supabase
    .from('parvat')
    .insert([{ id, email }])

  if (error) {
    console.error("Insert error:", error)
  } else {
    console.log("Inserted:", data)
  }
}

addUser(1, "test@example.com")
