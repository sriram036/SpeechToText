import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello from Hono on Vercel 🚀')
})

// 👇 THIS is what Vercel needs
export default app