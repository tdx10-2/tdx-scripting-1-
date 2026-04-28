import { createClient } from "@supabase/supabase-js";

export async function onRequestGet({ request, env }: any) {
  const url = new URL(request.url);
  const pass = url.searchParams.get('pass');
  const adminPasscode = env.VITE_ADMIN_PASSCODE || env.ADMIN_PASSCODE || 'kareem';
  
  if (pass !== adminPasscode) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { 'Content-Type': 'application/json' } });
  }

  const supabaseUrl = 'https://qlwfzuphgnfnfgpyqxim.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsd2Z6dXBoZ25mbmZncHlxeGltIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzM5Mzg1MSwiZXhwIjoyMDkyOTY5ODUxfQ.kodusGeKxorSQWSPVey3yXXYsS7gLulSwOIj_xZ6Jec';
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data, error } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  return new Response(JSON.stringify({ data }), { headers: { 'Content-Type': 'application/json' } });
}
