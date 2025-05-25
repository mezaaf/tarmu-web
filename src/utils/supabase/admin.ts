import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!, // URL Supabase Project kamu
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // HARUS pakai service_role key
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

export default supabaseAdmin;
