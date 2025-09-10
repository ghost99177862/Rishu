// import { createClient } from '@supabase/supabase-js'
// const supabaseUrl = "https://srsanpfqszlqgiozzzop.supabase.co"
// const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNyc2FucGZxc3pscWdpb3p6em9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1MTQ4ODgsImV4cCI6MjA3MzA5MDg4OH0.YqgJTmcwFKiFdJmc66XIDgOXsYvr-Q91skapLZEidu0"

// const supabase = createClient(supabaseUrl, supabaseAnonKey)

// module.exports = { supabase }


// supabase.js
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = "https://srsanpfqszlqgiozzzop.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNyc2FucGZxc3pscWdpb3p6em9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1MTQ4ODgsImV4cCI6MjA3MzA5MDg4OH0.YqgJTmcwFKiFdJmc66XIDgOXsYvr-Q91skapLZEidu0"



// 👇 must use `export` so index.js can import it
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
