import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors';

const app = new Hono()

app.use(
  "*",
  cors({
    // origin: "http://localhost:5173",
    origin: "*",
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type"],
  })
);

let transcript = "";

app.post("/stream", async (c) => {
  const { text } = await c.req.json();

  transcript += " " + text;

  return c.json({ ok: true });
});

app.get("/final", (c) => {
  return c.json({ text: transcript.trim() });
});

app.post("/reset", (c) => {
  transcript = "";
  return c.json({ ok: true });
});

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})

export default app;