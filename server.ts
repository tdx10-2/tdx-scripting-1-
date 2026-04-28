import express from "express";
import path from "path";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set('trust proxy', 1);
app.use(express.json());

// Initialize Supabase admin client (requires SUPABASE_SERVICE_ROLE_KEY for write without RLS, or anon key)
const supabaseUrl = 'https://qlwfzuphgnfnfgpyqxim.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsd2Z6dXBoZ25mbmZncHlxeGltIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzM5Mzg1MSwiZXhwIjoyMDkyOTY5ODUxfQ.kodusGeKxorSQWSPVey3yXXYsS7gLulSwOIj_xZ6Jec';
const supabase = createClient(supabaseUrl, supabaseKey);

// Zod Schema for validation
const testimonialSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be under 50 characters").regex(/^[^<>&"']+$/, "Invalid characters detected"),
  email: z.string().email("Invalid email address").max(100, "Email must be under 100 characters"),
  content: z.string().min(10, "Review must be at least 10 characters").max(500, "Review must be under 500 characters")
    .regex(/^[^<>]+$/, "HTML tags are not allowed"),
});

const apiRouter = express.Router();

apiRouter.get("/testimonials", async (req, res) => {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('status', 'approved')
    .order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json({ data });
});

apiRouter.post("/testimonials", async (req, res) => {
  try {
    const result = testimonialSchema.safeParse(req.body);
    
    if (!result.success) {
      const firstError = result.error?.issues?.[0];
      return res.status(400).json({ 
        error: firstError ? firstError.message : 'Invalid input' 
      });
    }
    
    const { error } = await supabase.from("testimonials").insert([{ 
      name: result.data.name,
      content: result.data.content,
      status: 'pending' 
    }]);

    if (error) throw error;
    res.json({ success: true, message: "Testimonial submitted successfully for approval." });
  } catch (err: any) {
    console.error("Supabase Error:", err);
    res.status(500).json({ error: "Failed to save the testimonial. Please try again later." });
  }
});

apiRouter.post("/admin/login", (req, res) => {
  const { pass } = req.body;
  const adminPasscode = process.env.VITE_ADMIN_PASSCODE || process.env.ADMIN_PASSCODE || 'kareem';
  if (pass === adminPasscode) {
    res.json({ success: true });
  } else {
    res.status(401).json({ error: "Incorrect passcode" });
  }
});

apiRouter.patch("/admin/testimonials/:id", async (req, res) => {
  const { id } = req.params;
  const { pass, status } = req.body;
  const adminPasscode = process.env.VITE_ADMIN_PASSCODE || process.env.ADMIN_PASSCODE || 'kareem';
  
  if (pass !== adminPasscode) return res.status(401).json({ error: "Unauthorized" });

  try {
    if (status === 'delete') {
      const { error } = await supabase.from('testimonials').delete().eq('id', id);
      if (error) throw error;
    } else {
      const { error } = await supabase.from('testimonials').update({ status }).eq('id', id);
      if (error) throw error;
    }
    res.json({ success: true });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Failed to perform admin action." });
  }
});

apiRouter.get("/testimonials/admin", async (req, res) => {
  const adminPasscode = process.env.VITE_ADMIN_PASSCODE || process.env.ADMIN_PASSCODE || 'kareem';
  const pass = req.query.pass;
  if (pass !== adminPasscode) return res.status(401).json({ error: "Unauthorized" });

  const { data, error } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json({ data });
});

app.use("/api", apiRouter);

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
