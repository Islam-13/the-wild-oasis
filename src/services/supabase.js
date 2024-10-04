import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://ykdcjczxpskhvqgvwcpt.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrZGNqY3p4cHNraHZxZ3Z3Y3B0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYwMzY0MTAsImV4cCI6MjA0MTYxMjQxMH0._ydJPNhzp5M7z51jLqf014pgfeK4wsJpgbBB1pEpYXg";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
