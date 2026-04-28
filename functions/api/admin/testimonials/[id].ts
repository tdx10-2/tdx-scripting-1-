import { createClient } from "@supabase/supabase-js";

export async function onRequestPatch({ request, env, params }: any) {
  const { id } = params;
  
  try {
    const body = await request.json();
    const { pass, status } = body;
    const adminPasscode = env.VITE_ADMIN_PASSCODE || env.ADMIN_PASSCODE || 'kareem';
    
    if (pass !== adminPasscode) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }

    const supabaseUrl = 'https://qlwfzuphgnfnfgpyqxim.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsd2Z6dXBoZ25mbmZncHlxeGltIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzM5Mzg1MSwiZXhwIjoyMDkyOTY5ODUxfQ.kodusGeKxorSQWSPVey3yXXYsS7gLulSwOIj_xZ6Jec';
    const supabase = createClient(supabaseUrl, supabaseKey);

    if (status === 'delete') {
      const { error } = await supabase.from('testimonials').delete().eq('id', id);
      if (error) throw error;
    } else {
      const { error } = await supabase.from('testimonials').update({ status }).eq('id', id);
      if (error) throw error;
    }
    
    return new Response(JSON.stringify({ success: true }), { headers: { 'Content-Type': 'application/json' } });
  } catch (err: any) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to perform admin action." }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
