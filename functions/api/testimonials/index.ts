import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const testimonialSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be under 50 characters").regex(/^[^<>&"']+$/, "Invalid characters detected"),
  email: z.string().email("Invalid email address").max(100, "Email must be under 100 characters"),
  content: z.string().min(10, "Review must be at least 10 characters").max(500, "Review must be under 500 characters")
    .regex(/^[^<>]+$/, "HTML tags are not allowed"),
});

export async function onRequestGet({ env }: any) {
  const supabaseUrl = 'https://qlwfzuphgnfnfgpyqxim.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsd2Z6dXBoZ25mbmZncHlxeGltIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzM5Mzg1MSwiZXhwIjoyMDkyOTY5ODUxfQ.kodusGeKxorSQWSPVey3yXXYsS7gLulSwOIj_xZ6Jec';
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('status', 'approved')
    .order('created_at', { ascending: false });
    
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  return new Response(JSON.stringify({ data }), { headers: { 'Content-Type': 'application/json' } });
}

export async function onRequestPost({ request, env }: any) {
  const supabaseUrl = 'https://qlwfzuphgnfnfgpyqxim.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsd2Z6dXBoZ25mbmZncHlxeGltIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzM5Mzg1MSwiZXhwIjoyMDkyOTY5ODUxfQ.kodusGeKxorSQWSPVey3yXXYsS7gLulSwOIj_xZ6Jec';
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  try {
    const body = await request.json();
    const result = testimonialSchema.safeParse(body);
    
    if (!result.success) {
      const firstError = result.error?.issues?.[0];
      return new Response(JSON.stringify({ 
        error: firstError ? firstError.message : 'Invalid input' 
      }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }
    
    const { error } = await supabase.from("testimonials").insert([{ 
      name: result.data.name,
      content: result.data.content,
      status: 'pending' 
    }]);

    if (error) throw error;
    return new Response(JSON.stringify({ success: true, message: "Testimonial submitted successfully for approval." }), { headers: { 'Content-Type': 'application/json' } });
  } catch (err: any) {
    console.error("Supabase Error:", err);
    return new Response(JSON.stringify({ error: "Failed to save the testimonial. Please try again later." }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
