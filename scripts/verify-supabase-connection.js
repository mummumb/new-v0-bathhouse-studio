import { createClient } from "@supabase/supabase-js"

// This script verifies the connection to the Supabase database by fetching one record.
// It requires SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables to be set.

async function verifySupabaseConnection() {
  console.log("Attempting to connect to Supabase...")

  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error(
      "Error: Missing Supabase environment variables. Please ensure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set.",
    )
    return
  }

  try {
    // Initialize the Supabase client
    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    console.log("Supabase client initialized.")

    // Attempt to fetch data from the 'journal' table
    console.log("Fetching data from the 'journal' table...")
    const { data, error } = await supabase.from("journal").select("*").limit(1)

    if (error) {
      console.error("Supabase query error:", error.message)
      throw error
    }

    console.log("\n✅ Supabase connection successful!")
    if (data && data.length > 0) {
      console.log("Successfully fetched data. Here is the first record:")
      console.log(JSON.stringify(data[0], null, 2))
    } else {
      console.log("The 'journal' table is empty or does not exist, but the connection was successful.")
    }
  } catch (error) {
    console.error("\n❌ Failed to connect to Supabase.")
    console.error("Please check the following:")
    console.error("1. Your Supabase project is running.")
    console.error("2. The SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables are correct.")
    console.error("3. Your machine has a stable internet connection to reach Supabase.")
  }
}

verifySupabaseConnection()
