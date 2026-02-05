import { useQuery } from '@tanstack/react-query'
import './App.css'

// ユーザーの型定義
interface User {
  id: number
  name: string
  email: string
  phone: string
  website: string
}

// ユーザーデータを取得する関数
const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  if (!response.ok) {
    throw new Error('ネットワークエラーが発生しました')
  }
  return response.json()
}

function App() {
  // useQueryフックを使用してデータを取得
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['users'], // キャッシュのキー
    queryFn: fetchUsers, // データ取得関数
  })

  if (isLoading) {
    return <div className="loading">読み込み中...</div>
  }

  if (isError) {
    return <div className="error">エラー: {error.message}</div>
  }

  return (
    <div className="App">
      <h1>ユーザー一覧</h1>
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
