import { useUser } from '../hooks/useUsers'

function UserDetail({ userId }: { userId: number }) {
  const { data: user, isLoading } = useUser(userId)

  if (isLoading) return <div>読み込み中...</div>

  return <div>{user?.name}</div>
}

export default UserDetail
