import { supabase } from './supabase.js'

async function addUser(email) {
  // check if user already exists
  const { data: existing, error: fetchError } = await supabase
    .from('parvat')
    .select('*')
    .eq('email', email)
    .limit(1)

  if (fetchError) {
    console.error("Fetch error:", fetchError)
    return
  }

  if (existing.length === 0) {
    const { data, error } = await supabase
      .from('parvat')
      .insert([{ email }])
    if (error) {
      console.error("Insert error:", error)
    } else {
      console.log("Inserted:", email)
    }
  } else {
    console.log("User already exists:", email)
  }
}

async function main() {
  await addUser("test@example.com")
  await addUser("ritik@example.com")
  await addUser("ritikbhanfgd@example.com")
  await addUser("eiufvervftyt@example.com")
  await addUser("yrtrtyt@example.com")

  const { data, error } = await supabase.from('parvat').select('*')
  if (error) console.error("Fetch error:", error)
  else console.log("Users:", data)
}

main()
