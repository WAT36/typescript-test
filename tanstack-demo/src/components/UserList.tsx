import { useUsers } from '../hooks/useUsers'

function UserList() {
  const { data: users, isLoading } = useUsers()

  if (isLoading) return <div>読み込み中...</div>

  return (
    <div>
      {users?.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  )
}

export default UserList
