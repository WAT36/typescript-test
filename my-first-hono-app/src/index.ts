import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/api/hello', (c) => {
  return c.json({
    message: 'Hello from Hono API!',
    timestamp: new Date().toISOString()
  })
})

app.get('/posts/:id', (c) => {
  const id = c.req.param('id')
  const page = c.req.query('page')

  return c.json({
    postId: id,
    page: page || '1'
  })
})

app.get('/custom', (c) => {
  c.header('X-Custom-Header', 'My Value')
  c.header('X-Powered-By', 'Hono')

  return c.text('Check the headers!')
})

// CRUD機能
type User = {
  id: number
  name: string
  email: string
}
let users: User[] = []

// ユーザー一覧取得 (Read)
app.get('/users', (c) => {
  return c.json({ users })
})

// 特定ユーザー取得 (Read)
app.get('/users/:id', (c) => {
  const id = parseInt(c.req.param('id'))
  const user = users.find(u => u.id === id)

  if (!user) {
    return c.json({ error: 'User not found' }, 404)
  }

  return c.json({ user })
})

// ユーザー作成 (Create)
app.post('/users', async (c) => {
  const { name, email } = await c.req.json()

  const newUser: User = {
    id: Date.now(),
    name,
    email
  }

  users.push(newUser)

  return c.json({ message: 'User created', user: newUser }, 201)
})

// ユーザー更新 (Update)
app.patch('/users/:id', async (c) => {
  const id = parseInt(c.req.param('id'))
  const { name, email } = await c.req.json()

  const userIndex = users.findIndex(u => u.id === id)

  if (userIndex === -1) {
    return c.json({ error: 'User not found' }, 404)
  }

  if (name) users[userIndex].name = name
  if (email) users[userIndex].email = email

  return c.json({ message: 'User updated', user: users[userIndex] })
})

// ユーザー削除 (Delete)
app.delete('/users/:id', (c) => {
  const id = parseInt(c.req.param('id'))
  const initialLength = users.length

  users = users.filter(u => u.id !== id)

  if (users.length === initialLength) {
    return c.json({ error: 'User not found' }, 404)
  }

  return c.json({ message: 'User deleted' })
})

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
