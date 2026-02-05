import { useUsers } from './hooks/useUsers'
import CreateUserForm from './components/CreateUserForm'
import './App.css'

function App() {
  // カスタムフックを使用
  const { data, isLoading, isError, error } = useUsers()

  if (isLoading) {
    return <div className="loading">読み込み中...</div>
  }

  if (isError) {
    return <div className="error">エラー: {error.message}</div>
  }

  return (
    <div className="App">
      <h1>ユーザー一覧</h1>
      <CreateUserForm />
      <div className="user-list">
        {data?.map((user) => (
          <div key={user.id} className="user-card">
            <h2>{user.name}</h2>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>Website: {user.website}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
