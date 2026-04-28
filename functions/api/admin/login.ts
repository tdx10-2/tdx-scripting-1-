export async function onRequestPost({ request, env }: any) {
  try {
    const body = await request.json();
    const { pass } = body;
    const adminPasscode = env.VITE_ADMIN_PASSCODE || env.ADMIN_PASSCODE || 'kareem';
    
    if (pass === adminPasscode) {
      return new Response(JSON.stringify({ success: true }), { headers: { 'Content-Type': 'application/json' } });
    } else {
      return new Response(JSON.stringify({ error: "Incorrect passcode" }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }
  } catch (err: any) {
    return new Response(JSON.stringify({ error: "Invalid request payload" }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }
}
