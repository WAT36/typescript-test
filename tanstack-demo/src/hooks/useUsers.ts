import { useQuery } from '@tanstack/react-query'
import { fetchUsers, fetchUser } from '../api/users'

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })
}

export function useUser(userId: number) {
  return useQuery({
    queryKey: ['users', userId],
    queryFn: () => fetchUser(userId),
    enabled: !!userId, // userIdがある時だけ実行
  })
}
