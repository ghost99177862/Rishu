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

async function addUser(email) {
  const { data, error } = await supabase
    .from('parvat')
    .insert([{ email }])

  if (error) {
    console.error("Insert error:", error)
  } else {
    console.log("Inserted:", data)
  }
}

addUser("test@example.com")

addUser("ritik@example.com")

addUser("ritikbhanfgd@example.com")


addUser("eiufvervftyt@example.com")
addUser("yrtrtyt@example.com")
